'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { pickCurrentStreamer, secondsUntilNextRotation, VIBE_STREAMERS, type VibeStreamer } from '@/lib/goodVibeStreamers';

type LivePayload = {
  live: { twitch: string; display: string; title: string; viewers: number; startedAt: string; game: string | null }[];
  reason: string;
  count?: number;
};

/**
 * GoodVibeStream — relays a real Twitch live coding stream into a DuoDrive
 * Initium room, rotating the picked streamer every ~3 minutes (when live filtering
 * is active) or every 15 minutes (deterministic fallback). Each stream gets its
 * own Duo Chat (live, interactive). When the channel is offline Twitch's player
 * handles the offline screen gracefully.
 */
export function GoodVibeStream() {
  const [streamer, setStreamer] = useState<VibeStreamer | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [parentHost, setParentHost] = useState<string>('duodrive.live');
  const [livePayload, setLivePayload] = useState<LivePayload | null>(null);
  const [chat, setChat] = useState<{ who: string; txt: string; t: number; cls?: string }[]>([
    { who: 'system', txt: 'GoodVibeStream is relaying — say hi to the builder', t: Date.now(), cls: 'sync' },
    { who: 'tide', txt: 'love this rotation idea. one channel an hour 🙏', t: Date.now() - 60_000, cls: 'pirate' },
    { who: 'iva', txt: 'is the relay open source?', t: Date.now() - 120_000, cls: 'pirate' },
    { who: 'cortex', txt: 'auto-pair protocol could match this builder with a Refiner from the Cortex', t: Date.now() - 180_000, cls: 'sync' },
  ]);
  const [val, setVal] = useState('');
  const liveRef = useRef<LivePayload | null>(null);

  // Pick a streamer — ONLY actually-live ones. Returns null when none live.
  function pickStreamer(): VibeStreamer | null {
    const lp = liveRef.current;
    if (lp && lp.live.length > 0) {
      const bucket = Math.floor(Date.now() / (3 * 60 * 1000));
      const idx = bucket % lp.live.length;
      const liveLogin = lp.live[idx].twitch.toLowerCase();
      const match = VIBE_STREAMERS.find((s) => s.twitch.toLowerCase() === liveLogin);
      if (match) return match;
    }
    return null;
  }

  function nextRotationSeconds(): number {
    const ms = 3 * 60 * 1000;
    const next = (Math.floor(Date.now() / ms) + 1) * ms;
    return Math.max(0, Math.floor((next - Date.now()) / 1000));
  }

  // Fetch live payload on mount + every 90s
  useEffect(() => {
    let cancelled = false;
    async function fetchLive() {
      try {
        const r = await fetch('/api/twitch-live', { cache: 'no-store' });
        if (!r.ok) return;
        const j = (await r.json()) as LivePayload;
        if (cancelled) return;
        liveRef.current = j;
        setLivePayload(j);
        // Re-pick if the current pick isn't actually live (when we have data)
        if (j.live.length > 0) {
          const newPick = pickStreamer();
          setStreamer(newPick);
          setSecondsLeft(nextRotationSeconds());
        }
      } catch {}
    }
    fetchLive();
    const i = setInterval(fetchLive, 90_000);
    return () => { cancelled = true; clearInterval(i); };
  }, []);

  useEffect(() => {
    setStreamer(pickStreamer());
    setSecondsLeft(nextRotationSeconds());
    setParentHost(typeof window !== 'undefined' ? window.location.hostname : 'duodrive.live');

    const i = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setStreamer(pickStreamer());
          return nextRotationSeconds();
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Synthetic chat ticker — adds a cortex/community message every 6-12s
  useEffect(() => {
    const voices = [
      { who: 'koa', txt: 'this is exactly what live coding needs' },
      { who: 'sigil', txt: 'auto-pairing recommendation: pair this builder with @rune.dash for the test layer' },
      { who: 'wren', txt: 'staking 12 votus on this streamer entering an Initium', cls: 'forge' },
      { who: 'iko', txt: 'the rotation is genius — 1 minute of every coder, 15 min total' },
      { who: 'bram.dash', txt: 'imagine if every twitch coder had a duo on tap' },
      { who: 'ven.dash', txt: 'we should auto-suggest a refiner if this builder pauses' },
      { who: 'oda', txt: 'this channel is wild btw. gold tier vibe coding.' },
      { who: 'system', txt: 'Avari Echo flagged: "the streamer just shipped a small thing"' },
      { who: 'crow', txt: 'what would this builder unlock with an Avari Sync?' },
      { who: 'shoji', txt: 'the discipline of streaming forces clarity. always.' },
    ];
    const tick = () => {
      const v = voices[Math.floor(Math.random() * voices.length)];
      setChat((c) => [...c.slice(-19), { who: v.who, txt: v.txt, t: Date.now(), cls: (v as any).cls || 'pirate' }]);
    };
    const id = setInterval(tick, 6000 + Math.random() * 6000);
    return () => clearInterval(id);
  }, []);

  // No-live state: show graceful empty when no curated builder is currently live
  if (!streamer) {
    const reason = livePayload?.reason;
    const isUnconfigured = reason === 'no-credentials';
    return (
      <div className="grid lg:grid-cols-[1fr_360px] gap-3">
        <div className="hairline rounded-2xl glass-frosted overflow-hidden">
          <div className="aspect-video relative flex items-center justify-center" style={{ background: 'color-mix(in oklab, var(--bg) 85%, var(--ink))' }}>
            <div className="text-center px-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ background: 'var(--fg-faint)' }} />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--fg-faint)' }}>
                  No curated builders live right now
                </span>
              </div>
              <h3 className="font-light text-[clamp(20px,2.6vw,28px)] tracking-tight leading-tight mb-3" style={{ color: 'var(--fg)' }}>
                The relay is <span className="twin-text">listening.</span>
              </h3>
              <p className="text-[13px] leading-relaxed max-w-md mx-auto" style={{ color: 'var(--fg-muted)' }}>
                {isUnconfigured
                  ? 'Twitch live filtering is awaiting app credentials. Once configured, the relay shows only actually-live builders.'
                  : 'All ' + VIBE_STREAMERS.length + ' curated builders are currently offline. The relay will resume the moment one of them goes live.'}
              </p>
              <p className="mt-4 text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
                checking every 90s
              </p>
            </div>
          </div>
          <div className="p-5">
            <p className="chip mb-3 inline-flex" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}>
              Watching for live builders
            </p>
            <div className="flex flex-wrap gap-1.5">
              {VIBE_STREAMERS.map((s) => (
                <a
                  key={s.twitch}
                  href={`https://twitch.tv/${s.twitch}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full hairline transition-colors hover:[color:var(--pirate)]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  {s.emoji} {s.display}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hairline rounded-2xl glass p-5">
          <p className="chip mb-3 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
            Waiting room
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            When a curated builder goes live, the relay swaps in their stream automatically. Until then, the chat is on standby.
          </p>
          <div className="mt-4 hairline-t pt-4 text-[12px] leading-relaxed" style={{ color: 'var(--fg)' }}>
            <p className="mb-2"><span className="font-mono text-[10px] tracking-wider uppercase mr-1" style={{ color: 'var(--pirate)' }}>· tip</span> Subscribe to a builder on twitch — we relay them when they go live next.</p>
            <p><span className="font-mono text-[10px] tracking-wider uppercase mr-1" style={{ color: 'var(--sync)' }}>· tip</span> Propose a Vibe Coder Scout role in the Cortex to expand the curated list.</p>
          </div>
        </div>
      </div>
    );
  }

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
  };

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-3">
      {/* Stream tile + meta */}
      <div className="hairline rounded-2xl glass-frosted overflow-hidden">
        <div className="aspect-video relative bg-black">
          <iframe
            src={`https://player.twitch.tv/?channel=${streamer.twitch}&parent=${parentHost}&parent=duodrive.live&parent=www.duodrive.live&autoplay=false&muted=true`}
            title={`Live: ${streamer.display}`}
            allow="autoplay; fullscreen"
            className="w-full h-full"
            frameBorder={0}
            scrolling="no"
          />
          <div className="absolute top-3 left-3 chip text-[10px]" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}>
            <span className="live-dot mr-1.5" /> Relayed live
          </div>
          <div className="absolute top-3 right-3 chip text-[10px]" style={{ color: 'var(--sync)' }}>
            ⟳ swaps in {fmtTime(secondsLeft)}
          </div>
          {livePayload && livePayload.reason === 'ok' && livePayload.count !== undefined && livePayload.count > 0 && (
            <div className="absolute bottom-3 left-3 chip text-[9px]" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}>
              · {livePayload.count} curated builder{livePayload.count > 1 ? 's' : ''} live now
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
            <div>
              <p className="text-[14px] font-medium" style={{ color: 'var(--fg)' }}>
                <span className="mr-1.5" style={{ filter: 'grayscale(0.2)' }}>{streamer.emoji}</span>
                {streamer.display}
              </p>
              <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--pirate)' }}>{streamer.vibe}</p>
            </div>
            <a
              href={`https://twitch.tv/${streamer.twitch}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full hairline transition-colors hover:[color:var(--pirate)]"
              style={{ color: 'var(--fg-muted)' }}
            >
              twitch.tv/{streamer.twitch} ↗
            </a>
          </div>
          <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--fg-muted)' }}>
            {streamer.bio}
          </p>
          <div className="hairline-t pt-3 grid grid-cols-3 gap-3 text-[10px] font-mono tracking-wider uppercase">
            <div>
              <p style={{ color: 'var(--fg-faint)' }}>Stack</p>
              <p className="mt-0.5" style={{ color: 'var(--sync)' }}>{streamer.stack}</p>
            </div>
            <div>
              <p style={{ color: 'var(--fg-faint)' }}>Followers</p>
              <p className="mt-0.5" style={{ color: 'var(--pirate)' }}>{(streamer.followers / 1000).toFixed(0)}K</p>
            </div>
            <div>
              <p style={{ color: 'var(--fg-faint)' }}>Auto-pair</p>
              <p className="mt-0.5" style={{ color: 'var(--forge)' }}>open</p>
            </div>
          </div>
        </div>
      </div>

      {/* Duo chat (live) */}
      <div className="hairline rounded-2xl glass flex flex-col" style={{ minHeight: '500px' }}>
        <div className="px-4 py-3 hairline-b flex items-center justify-between">
          <p className="chip" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
            DuoDrive Chat
          </p>
          <span className="text-[9px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            community + relay
          </span>
        </div>
        <div className="flex-1 px-4 py-3 space-y-2 max-h-[440px] overflow-y-auto no-scrollbar text-[13px]">
          {chat.map((m, i) => (
            <div key={i} className="leading-snug tick-in">
              <span
                className="font-mono text-[11px] tracking-wider uppercase"
                style={{
                  color:
                    m.who === 'system' ? 'var(--fg-faint)' :
                    m.cls === 'forge' ? 'var(--forge)' :
                    m.cls === 'sync' ? 'var(--sync)' :
                    'var(--pirate)',
                }}
              >
                {m.who}
              </span>
              <span className="ml-2" style={{ color: 'var(--fg)' }}>{m.txt}</span>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!val.trim()) return;
            setChat([...chat, { who: 'you', txt: val.trim(), t: Date.now() }]);
            setVal('');
          }}
          className="hairline-t px-3 py-2 flex items-center gap-2"
        >
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder="say hi to the builder…"
            className="flex-1 bg-transparent text-[13px] focus:outline-none px-2"
            style={{ color: 'var(--fg)' }}
          />
          <button
            type="submit"
            className="text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full hairline transition-colors hover:[color:var(--sync)]"
            style={{ color: 'var(--fg-muted)' }}
          >
            Send
          </button>
        </form>
      </div>

      {/* Rotation queue */}
      <div className="lg:col-span-2 hairline rounded-2xl glass p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <p className="chip" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}>
            ⟳ Rotation queue · 15-min cycle
          </p>
          <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            {VIBE_STREAMERS.length} curated builders
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x -mx-4 px-4 lg:mx-0 lg:px-0 pb-1">
          {VIBE_STREAMERS.map((s) => {
            const isCurrent = s.twitch === streamer.twitch;
            const liveSet = new Set((livePayload?.live ?? []).map((l) => l.twitch.toLowerCase()));
            const isLiveNow = liveSet.has(s.twitch.toLowerCase());
            const liveData = (livePayload?.live ?? []).find((l) => l.twitch.toLowerCase() === s.twitch.toLowerCase());
            return (
              <a
                key={s.twitch}
                href={`https://twitch.tv/${s.twitch}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 snap-start hairline rounded-xl glass p-3 lift transition-all"
                style={{
                  minWidth: '180px',
                  boxShadow: isCurrent
                    ? `0 0 0 1px var(--pirate), 0 0 30px color-mix(in oklab, var(--pirate) 30%, transparent)`
                    : isLiveNow
                      ? `0 0 0 1px color-mix(in oklab, var(--pirate) 50%, transparent)`
                      : 'var(--shadow-glass)',
                }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono tracking-wider uppercase flex items-center gap-1.5" style={{ color: isCurrent ? 'var(--pirate)' : isLiveNow ? 'var(--pirate)' : 'var(--fg-faint)' }}>
                    {(isCurrent || isLiveNow) && <span className="live-dot" />}
                    {isCurrent ? 'LIVE' : isLiveNow ? 'live' : 'queued'}
                  </span>
                  <span className="text-[16px]">{s.emoji}</span>
                </div>
                <p className="text-[12px] font-medium" style={{ color: 'var(--fg)' }}>{s.display}</p>
                <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
                  {s.stack.split(',')[0]}
                </p>
                {isLiveNow && liveData && (
                  <p className="text-[10px] font-mono tracking-wider uppercase mt-1" style={{ color: 'var(--forge)' }}>
                    {liveData.viewers.toLocaleString()} watching
                  </p>
                )}
              </a>
            );
          })}
        </div>
        <p className="mt-4 text-[11px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          The relay rotates every 15 minutes. When a streamer goes offline, the next in queue takes over. <Link href="/auto-pair" style={{ color: 'var(--sync)' }}>Auto-pair protocol</Link> — community-voted suggestions for which two builders should team up.
        </p>
      </div>
    </div>
  );
}
