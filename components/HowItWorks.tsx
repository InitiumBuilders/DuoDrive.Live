'use client';
import { useEffect, useState } from 'react';

const FRAMES = [
  {
    num: '01',
    side: 'pirate',
    title: 'Find your Avari Sync',
    body: 'A Pirate writes prompts and steers. A Refiner ships and edits. The duo is the unit, not the individual.',
    chips: ['Browse Vibe Coders', 'Post your role', 'Two-Key invite'],
    visual: 'pair',
  },
  {
    num: '02',
    side: 'sync',
    title: 'Open an Initium',
    body: 'Name the project. Set the goal. Both partners sign with Dash EVO ID. The vault opens. You\'re live.',
    chips: ['INI-009 created', 'Two keys aligned', 'Forge meter on'],
    visual: 'vault',
  },
  {
    num: '03',
    side: 'refiner',
    title: 'The community drives',
    body: 'Watchers stake VOTUS to amplify. The Cortex self-organizes into roles. The Avari Signal hides the tally — direction over noise.',
    chips: ['Cortex active', 'VOTUS routed', 'Whispers open'],
    visual: 'cortex',
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setActive((x) => (x + 1) % FRAMES.length), 4500);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative px-5 md:px-8 py-24 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <p
          className="chip mx-auto mb-5 inline-flex"
          style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 32%, transparent)' }}
        >
          How it works
        </p>
        <h2 className="font-light text-[clamp(28px,4.5vw,52px)] leading-tight tracking-tight">
          Two flames. <span className="twin-text">One anvil.</span>
        </h2>
      </div>

      {/* desktop: three columns; mobile: stacked with progress dots */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {FRAMES.map((f, i) => (
          <Frame key={f.num} f={f} active={i === active} onClick={() => setActive(i)} />
        ))}
      </div>

      {/* mobile carousel */}
      <div className="md:hidden">
        <Frame f={FRAMES[active]} active={true} />
        <div className="flex items-center justify-center gap-2 mt-5">
          {FRAMES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`step ${i + 1}`}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: i === active ? '32px' : '8px',
                background: i === active ? 'var(--sync)' : 'var(--hairline-strong)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Frame({ f, active, onClick }: { f: typeof FRAMES[0]; active: boolean; onClick?: () => void }) {
  const accent = f.side === 'pirate' ? 'var(--pirate)' : f.side === 'refiner' ? 'var(--refiner)' : 'var(--sync)';
  return (
    <button
      onClick={onClick}
      className="hairline rounded-2xl p-6 glass relative overflow-hidden text-left group transition-all duration-500"
      style={{
        boxShadow: active ? `0 0 0 1px ${accent}, 0 24px 60px color-mix(in oklab, ${accent} 18%, transparent)` : 'var(--shadow-glass)',
      }}
    >
      <div
        className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-3xl transition-opacity duration-500"
        style={{ background: `color-mix(in oklab, ${accent} 35%, transparent)`, opacity: active ? 0.9 : 0.4 }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[11px] tracking-wider uppercase" style={{ color: accent }}>
            · {f.num}
          </p>
          {active && (
            <span className="flex items-center gap-1.5">
              <span className="live-dot" />
              <span className="text-[9px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
                playing
              </span>
            </span>
          )}
        </div>
        <h3 className="font-medium text-[18px] mb-2 leading-tight">{f.title}</h3>
        <p className="text-[13px] mb-4 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          {f.body}
        </p>

        <FrameVisual kind={f.visual} accent={accent} active={active} />

        <div className="hairline-t pt-3 mt-4 flex flex-wrap gap-1.5">
          {f.chips.map((c) => (
            <span
              key={c}
              className="text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full hairline transition-colors"
              style={{
                color: active ? accent : 'var(--fg-faint)',
                borderColor: active ? `color-mix(in oklab, ${accent} 35%, transparent)` : 'var(--hairline)',
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function FrameVisual({ kind, accent, active }: { kind: string; accent: string; active: boolean }) {
  if (kind === 'pair') {
    return (
      <div className="flex items-center justify-center gap-2 h-16 mb-1">
        <div className="w-10 h-10 rounded-full halo halo-rotating" style={{ background: 'linear-gradient(135deg, var(--pirate), var(--sync))' }} />
        <div className="w-px h-6" style={{ background: 'var(--hairline-strong)' }} />
        <div className="w-10 h-10 rounded-full halo halo-rotating" style={{ background: 'linear-gradient(135deg, var(--refiner), var(--sync))' }} />
      </div>
    );
  }
  if (kind === 'vault') {
    return (
      <div className="h-16 mb-1 flex items-center justify-center gap-2">
        <KeyDot color="var(--pirate)" pulse={active} />
        <div
          className="h-1 w-12 rounded-full transition-all duration-700"
          style={{
            background: active ? 'linear-gradient(90deg, var(--pirate), var(--sync), var(--refiner))' : 'var(--hairline-strong)',
          }}
        />
        <KeyDot color="var(--refiner)" pulse={active} />
      </div>
    );
  }
  // cortex
  return (
    <div className="h-16 mb-1 flex items-center justify-center">
      <svg viewBox="0 0 120 60" className="h-full">
        <circle cx="60" cy="30" r="6" fill={accent} />
        {[
          [20, 15], [100, 15], [20, 45], [100, 45], [60, 8], [60, 52],
        ].map(([x, y], i) => (
          <g key={i}>
            <line x1="60" y1="30" x2={x} y2={y} stroke={accent} strokeWidth="0.4" strokeOpacity={active ? 0.5 : 0.2} />
            <circle cx={x} cy={y} r="2" fill={accent} fillOpacity={active ? 0.8 : 0.4}>
              {active && <animate attributeName="r" values="2;3;2" dur={`${1.6 + i * 0.2}s`} repeatCount="indefinite" />}
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

function KeyDot({ color, pulse }: { color: string; pulse: boolean }) {
  return (
    <span
      className="block w-4 h-4 rounded-full"
      style={{
        background: color,
        boxShadow: pulse ? `0 0 16px ${color}` : 'none',
        transition: 'box-shadow .5s',
      }}
    />
  );
}
