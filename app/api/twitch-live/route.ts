import { NextResponse } from 'next/server';
import { VIBE_STREAMERS } from '@/lib/goodVibeStreamers';

/**
 * GET /api/twitch-live
 * Returns which curated VibeStreamers are currently live on Twitch.
 *
 * Requires env: TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET (Vercel)
 * Without those, returns { live: [], reason: "no-credentials" } and the
 * client falls back to deterministic rotation.
 *
 * Cached for 90s (Vercel edge cache + Cache-Control header).
 */

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
    const handles = VIBE_STREAMERS.map((s) => s.twitch.toLowerCase());
    // Helix Get Streams accepts up to 100 user_login params per call
    const params = new URLSearchParams();
    for (const h of handles) params.append('user_login', h);
    params.set('first', '100');

    const r = await fetch(`https://api.twitch.tv/helix/streams?${params.toString()}`, {
      headers: {
        'Client-Id': id,
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 },
    });

    if (!r.ok) {
      return NextResponse.json(
        { live: [], reason: 'twitch-api-error', status: r.status },
        { status: 200, headers: { 'Cache-Control': 'public, s-maxage=30' } },
      );
    }

    type StreamPayload = {
      user_login: string;
      user_name: string;
      type: string;
      title: string;
      viewer_count: number;
      started_at: string;
      thumbnail_url?: string;
      game_name?: string;
    };
    const j = (await r.json()) as { data?: StreamPayload[] };
    const live = (j.data ?? [])
      .filter((s) => s.type === 'live')
      .map((s) => ({
        twitch: s.user_login,
        display: s.user_name,
        title: s.title,
        viewers: s.viewer_count,
        startedAt: s.started_at,
        game: s.game_name ?? null,
      }));

    return NextResponse.json(
      { live, count: live.length, reason: 'ok' },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
    );
  } catch (e) {
    return NextResponse.json(
      { live: [], reason: 'exception', error: String(e) },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=30' } },
    );
  }
}
