'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const TICKER_EVENTS = [
  { t: 'jordash', txt: 'echo-catch this: "the screen is the forge"', kind: 'echo', cls: 'sync' },
  { t: 'davara', txt: '+ Whisper.tsx · 38 lines', kind: 'commit', cls: 'refiner' },
  { t: 'lily.eth', txt: 'staking 18 VOTUS on the cortex role proposal', kind: 'votus', cls: 'forge' },
  { t: 'cortex', txt: 'new role claimed: Audio Director', kind: 'role', cls: 'pirate' },
  { t: 'shoji', txt: 'word coined — "drive brevity"', kind: 'word', cls: 'sync' },
  { t: 'davara', txt: '+ AvariSignal.tsx · 142 lines', kind: 'commit', cls: 'refiner' },
  { t: 'jules.dev', txt: 'I would pay just to watch jordash brainstorm', kind: 'chat', cls: 'pirate' },
  { t: 'system', txt: 'Avari Echo flagged a worth-keeping moment', kind: 'echo', cls: 'sync' },
  { t: 'pirate.0x', txt: 'staking 12 VOTUS on /signup ships tonight', kind: 'votus', cls: 'forge' },
  { t: 'opal', txt: 'forge meter just hit 80%', kind: 'forge', cls: 'forge' },
];

export function LiveNowRail() {
  const [n, setN] = useState(3);
  useEffect(() => {
    const i = setInterval(() => setN((x) => Math.min(TICKER_EVENTS.length, x + 1)), 2200);
    return () => clearInterval(i);
  }, []);
  const visible = TICKER_EVENTS.slice(0, n);

  return (
    <Link
      href="/rn/jordash-x-davara"
      className="group block hairline rounded-2xl glass p-3.5 transition-all hover:border-[color:color-mix(in_oklab,var(--sync)_40%,transparent)] hover:scale-[1.015]"
      style={{ minWidth: '260px', maxWidth: '280px', opacity: 0.92 }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.92'; }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="live-dot" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--fg-muted)' }}>
            Live · in the room now
          </span>
        </div>
        <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--sync)' }}>
          enter →
        </span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex -space-x-1.5">
          <div
            className="w-7 h-7 rounded-full halo halo-rotating border-2"
            style={{ background: 'linear-gradient(135deg, var(--pirate), var(--sync))', borderColor: 'var(--bg)' }}
          />
          <div
            className="w-7 h-7 rounded-full halo halo-rotating border-2"
            style={{ background: 'linear-gradient(135deg, var(--refiner), var(--sync))', borderColor: 'var(--bg)' }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium truncate">
            <span style={{ color: 'var(--pirate)' }}>Jordash</span>
            <span style={{ color: 'var(--fg-faint)' }}> × </span>
            <span style={{ color: 'var(--refiner)' }}>Davara</span>
          </p>
          <p className="text-[10px] font-mono tracking-wider uppercase truncate" style={{ color: 'var(--fg-faint)' }}>
            INI-009 · building DuoDrive
          </p>
        </div>
      </div>
      <div className="hairline-t pt-3 space-y-1.5 max-h-[160px] overflow-hidden no-scrollbar relative">
        <div
          className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--surface-solid), transparent)' }}
        />
        {visible.slice(-5).reverse().map((e, i) => (
          <div key={`${e.txt}-${i}-${n}`} className="text-[11px] flex items-baseline gap-2 tick-in">
            <span
              className="font-mono text-[9px] tracking-wider uppercase shrink-0"
              style={{
                color:
                  e.cls === 'pirate' ? 'var(--pirate)' :
                  e.cls === 'refiner' ? 'var(--refiner)' :
                  e.cls === 'forge' ? 'var(--forge)' :
                  'var(--sync)',
              }}
            >
              {e.t}
            </span>
            <span className="truncate" style={{ color: 'var(--fg-muted)' }}>{e.txt}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}
