import { NextResponse } from 'next/server';
import { VIBE_STREAMERS } from '@/lib/goodVibeStreamers';

/**
 * GET /api/twitch-live
 * Returns currently-live vibe coders on Twitch, in priority order:
 *   1. Our curated VibeStreamers (ThePrimeagen, Tsoding, etc.) who are live now
 *   2. Top live streams in 'Software and Game Development' (game_id=1469308723)
 *   3. Top live streams in 'Science & Technology' (game_id=509670) as backup
 *
 * Always returns at least *something* live when Twitch creds are present,
 * so the GoodVibeStream relay never sits empty.
 *
 * Requires env: TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET (Vercel)
 * Without those, returns { live: [], reason: "no-credentials" } and the
 * client renders the listening empty state.
 *
 * Cached for 90s (Vercel edge cache + Cache-Control header).
 */

const SOFTWARE_GAME_DEV_GAME_ID = '1469308723'; // Software and Game Development
const SCIENCE_TECH_GAME_ID = '509670';           // Science & Technology

export const runtime = 'nodejs';
export const revalidate = 90;

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAppToken(): Promise<string | null> {
  const id = process.env.TWITCH_CLIENT_ID;
  const secret = process.env.TWITCH_CLIENT_SECRET;
  if (!id || !secret) return null;

  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const r = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: id,
      client_secret: secret,
      grant_type: 'client_credentials',
    }),
    cache: 'no-store',
  });
  if (!r.ok) return null;
  const j = (await r.json()) as { access_token?: string; expires_in?: number };
  if (!j.access_token) return null;
  cachedToken = {
    token: j.access_token,
    expiresAt: Date.now() + (j.expires_in ?? 3600) * 1000,
  };
  return cachedToken.token;
}

export async function GET() {
  try {
    const token = await getAppToken();
    if (!token) {
      return NextResponse.json(
        {
          live: [],
          reason: 'no-credentials',
          note: 'Set TWITCH_CLIENT_ID + TWITCH_CLIENT_SECRET on Vercel to enable real-time live filtering.',
        },
        {
          status: 200,
          headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
        },
      );
    }

    const id = process.env.TWITCH_CLIENT_ID!;
    const headers = { 'Client-Id': id, Authorization: `Bearer ${token}` };

    type StreamPayload = {
      user_login: string;
      user_name: string;
      type: string;
      title: string;
      viewer_count: number;
      started_at: string;
      thumbnail_url?: string;
      game_name?: string;
      language?: string;
    };

    const mapStream = (s: StreamPayload, source: 'curated' | 'category') => ({
      twitch: s.user_login,
      display: s.user_name,
      title: s.title,
      viewers: s.viewer_count,
      startedAt: s.started_at,
      game: s.game_name ?? null,
      language: s.language ?? null,
      source,
    });

    // 1) Check curated list first
    const handles = VIBE_STREAMERS.map((s) => s.twitch.toLowerCase());
    const curatedParams = new URLSearchParams();
    for (const h of handles) curatedParams.append('user_login', h);
    curatedParams.set('first', '100');

    const curatedR = await fetch(`https://api.twitch.tv/helix/streams?${curatedParams.toString()}`, {
      headers,
      next: { revalidate: 60 },
    });

    let curatedLive: ReturnType<typeof mapStream>[] = [];
    if (curatedR.ok) {
      const j = (await curatedR.json()) as { data?: StreamPayload[] };
      curatedLive = (j.data ?? [])
        .filter((s) => s.type === 'live')
        .map((s) => mapStream(s, 'curated'));
    }

    // 2) Always also fetch top live in Software & Game Dev for the broader pool
    const catParams = new URLSearchParams({
      game_id: SOFTWARE_GAME_DEV_GAME_ID,
      first: '20',
      language: 'en',
    });
    const catR = await fetch(`https://api.twitch.tv/helix/streams?${catParams.toString()}`, {
      headers,
      next: { revalidate: 60 },
    });
    let categoryLive: ReturnType<typeof mapStream>[] = [];
    if (catR.ok) {
      const j = (await catR.json()) as { data?: StreamPayload[] };
      categoryLive = (j.data ?? [])
        .filter((s) => s.type === 'live')
        // Filter out streams whose title screams "playing a game" rather than building.
        // Light heuristic, conservative: skip when title contains common gameplay markers.
        .filter((s) => {
          const t = (s.title || '').toLowerCase();
          const skip = /\bplaying\b|\bspeedrun|\bplaythrough|\bcasual\b|\bnoobs?\b|\bgta|\bminecraft\b/.test(t);
          return !skip;
        })
        .map((s) => mapStream(s, 'category'));
    }

    // De-dup: curated wins
    const seen = new Set(curatedLive.map((s) => s.twitch.toLowerCase()));
    const dedupCategory = categoryLive.filter((s) => !seen.has(s.twitch.toLowerCase()));

    const live = [...curatedLive, ...dedupCategory];

    return NextResponse.json(
      {
        live,
        count: live.length,
        curatedCount: curatedLive.length,
        categoryCount: dedupCategory.length,
        reason: 'ok',
      },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
    );
  } catch (e) {
    return NextResponse.json(
      { live: [], reason: 'exception', error: String(e) },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=30' } },
    );
  }
}
