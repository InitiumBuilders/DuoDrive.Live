'use client';
import { useEffect, useRef, useState } from 'react';
import { DECISIONS, FLOW_STEPS, stageIndex, type CortexDecision } from '@/lib/cortex';

/**
 * CortexFocus — single-decision-at-a-time consensus interface.
 * One Cortex card front-and-center. A flow timeline above it shows the
 * decision's journey. A swipe carousel at the bottom browses other open
 * decisions. A self-running animation at the very bottom previews the
 * full lifecycle for first-time visitors.
 */

export function CortexFocus() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [staked, setStaked] = useState<Record<string, number>>(
    DECISIONS.reduce((a, d) => ({ ...a, [d.id]: d.staked }), {} as Record<string, number>),
  );
  const [whispers, setWhispers] = useState<Record<string, number>>(
    DECISIONS.reduce((a, d) => ({ ...a, [d.id]: d.whisper }), {} as Record<string, number>),
  );
  const [floatingChips, setFloatingChips] = useState<{ id: number; label: string; cls: string }[]>([]);
  const chipIdRef = useRef(0);

  const decision = DECISIONS[activeIdx];
  const stake = (amount: number) => {
    setStaked((s) => ({ ...s, [decision.id]: (s[decision.id] || 0) + amount }));
    setWhispers((w) => ({ ...w, [decision.id]: Math.min(0.99, (w[decision.id] || 0) + 0.01) }));
    const id = chipIdRef.current++;
    setFloatingChips((c) => [...c, { id, label: `+${amount} VOTUS`, cls: 'forge' }]);
    setTimeout(() => setFloatingChips((c) => c.filter((x) => x.id !== id)), 2200);
  };

  const next = () => setActiveIdx((i) => (i + 1) % DECISIONS.length);
  const prev = () => setActiveIdx((i) => (i - 1 + DECISIONS.length) % DECISIONS.length);

  // Auto-advance every 24s if user hasn't interacted recently
  const lastInteractRef = useRef(Date.now());
  useEffect(() => {
    const i = setInterval(() => {
      if (Date.now() - lastInteractRef.current > 24_000) {
        setActiveIdx((idx) => (idx + 1) % DECISIONS.length);
      }
    }, 8_000);
    return () => clearInterval(i);
  }, []);
  const interact = () => {
    lastInteractRef.current = Date.now();
  };

  return (
    <div className="space-y-6 w-full min-w-0 overflow-hidden">
      <FocusCard
        d={decision}
        staked={staked[decision.id] ?? decision.staked}
        whisper={whispers[decision.id] ?? decision.whisper}
        onStake={(amt) => { interact(); stake(amt); }}
        onPrev={() => { interact(); prev(); }}
        onNext={() => { interact(); next(); }}
        floatingChips={floatingChips}
        position={activeIdx}
        total={DECISIONS.length}
      />

      <BrowseTray
        decisions={DECISIONS}
        activeIdx={activeIdx}
        onSelect={(i) => { interact(); setActiveIdx(i); }}
      />

      <FlowAnimation />
    </div>
  );
}

/* ============================================================ */
/* Focus card — the single Cortex front-and-center               */
/* ============================================================ */
function FocusCard({
  d, staked, whisper, onStake, onPrev, onNext, floatingChips, position, total,
}: {
  d: CortexDecision;
  staked: number;
  whisper: number;
  onStake: (amt: number) => void;
  onPrev: () => void;
  onNext: () => void;
  floatingChips: { id: number; label: string; cls: string }[];
  position: number;
  total: number;
}) {
  return (
    <article className="hairline rounded-3xl glass-frosted relative overflow-hidden p-5 md:p-9 w-full min-w-0">
      <div className="absolute inset-0 iridescent opacity-30 pointer-events-none" />
      <div className="relative w-full min-w-0">
        {/* Top strip: id + initium + closes-in + position */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="chip"
              style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}
            >
              ✦ Cortex Decision · {d.id}
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
              {d.initium} · closes in {d.closesIn}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              aria-label="Previous decision"
              className="text-[14px] w-9 h-9 rounded-full hairline flex items-center justify-center transition-colors hover:[border-color:var(--hairline-strong)]"
              style={{ color: 'var(--fg-muted)' }}
            >
              ←
            </button>
            <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
              {position + 1} / {total}
            </span>
            <button
              onClick={onNext}
              aria-label="Next decision"
              className="text-[14px] w-9 h-9 rounded-full hairline flex items-center justify-center transition-colors hover:[border-color:var(--hairline-strong)]"
              style={{ color: 'var(--fg-muted)' }}
            >
              →
            </button>
          </div>
        </div>

        {/* Flow timeline — where this decision is */}
        <FlowTimeline stage={d.stage} />

        {/* Title + body */}
        <h2 className="font-light text-[clamp(19px,3.6vw,36px)] tracking-tight leading-[1.22] mb-3 mt-7" style={{ color: 'var(--fg)', overflowWrap: 'break-word', wordBreak: 'normal', hyphens: 'auto' }}>
          {d.title}
        </h2>
        <p className="text-[14px] md:text-[15px] leading-relaxed mb-6 max-w-3xl" style={{ color: 'var(--fg-muted)', overflowWrap: 'break-word', hyphens: 'auto' }}>
          {d.body}
        </p>

        {/* The two takes */}
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          <Take side="pirate" t={d.pirateTake} />
          <Take side="refiner" t={d.refinerTake} />
        </div>

        {/* Whisper bar */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase mb-2">
            <span style={{ color: 'var(--fg-faint)' }}>Hold</span>
            <span style={{ color: 'var(--sync)' }}>· Avari Whisper · direction only</span>
            <span style={{ color: 'var(--fg-faint)' }}>Yes</span>
          </div>
          <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--hairline)' }}>
            <div
              className="absolute inset-y-0 left-0 transition-[width] duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)]"
              style={{
                width: `${whisper * 100}%`,
                background: 'linear-gradient(90deg, var(--sync), var(--pirate))',
                boxShadow: '0 0 12px color-mix(in oklab, var(--sync) 40%, transparent)',
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-px h-3 transition-[left] duration-[1200ms]"
              style={{ left: `${whisper * 100}%`, background: 'var(--fg)' }}
            />
          </div>
          <p className="mt-2 text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            tally hidden until duo closes the whisper
          </p>
        </div>

        {/* Stake bar — working interaction */}
        <div className="hairline-t pt-5 grid md:grid-cols-[1fr_auto] gap-4 items-end min-w-0">
          <div className="min-w-0">
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase mb-1.5">
              <span style={{ color: 'var(--fg-muted)' }}>{staked.toLocaleString()} VOTUS staked</span>
              <span style={{ color: 'var(--fg-faint)' }}>{d.contributors} contributors</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--hairline)' }}>
              <div
                className="forge-bar h-full transition-[width] duration-[1200ms]"
                style={{ width: `${Math.min(100, (staked / 300) * 100)}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1.5 relative flex-wrap">
            {[1, 8, 50].map((amt) => (
              <button
                key={amt}
                onClick={() => onStake(amt)}
                className="text-[10.5px] md:text-[11px] font-mono tracking-wider uppercase px-2.5 md:px-3 py-2 rounded-full hairline transition-all hover:scale-105 hover:[border-color:var(--forge)] whitespace-nowrap"
                style={{ color: 'var(--forge)', background: 'var(--surface)' }}
              >
                + {amt} VOTUS
              </button>
            ))}
            {/* Floating chips on stake */}
            {floatingChips.map((c) => (
              <span
                key={c.id}
                className="absolute right-0 -top-2 text-[11px] font-mono tracking-wider uppercase pointer-events-none"
                style={{
                  color: 'var(--forge)',
                  textShadow: '0 0 10px var(--forge)',
                  animation: 'cortexChipUp 2.2s cubic-bezier(.2,.7,.2,1) forwards',
                }}
              >
                {c.label}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes cortexChipUp {
            0%   { opacity: 0; transform: translate3d(0, 14px, 0) scale(.94); }
            18%  { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
            70%  { opacity: 1; }
            100% { opacity: 0; transform: translate3d(0, -38px, 0) scale(1); }
          }
        `}</style>
      </div>
    </article>
  );
}

/* ============================================================ */
/* Flow timeline (Propose → Whisper → Anvil → Shipped)          */
/* ============================================================ */
function FlowTimeline({ stage }: { stage: CortexDecision['stage'] }) {
  const cur = stageIndex(stage);
  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-2">
        {FLOW_STEPS.map((step, i) => {
          const active = i === cur;
          const done = i < cur;
          const accent =
            step.color === 'pirate' ? 'var(--pirate)' :
            step.color === 'refiner' ? 'var(--refiner)' :
            step.color === 'forge' ? 'var(--forge)' :
            'var(--sync)';
          return (
            <div key={step.id} className="flex-1 flex items-center" aria-current={active ? 'step' : undefined}>
              <div className="flex flex-col items-center w-full">
                <div
                  className="relative w-3 h-3 rounded-full"
                  style={{
                    background: done ? accent : active ? accent : 'var(--hairline-strong)',
                    boxShadow: active ? `0 0 16px ${accent}, 0 0 0 4px color-mix(in oklab, ${accent} 18%, transparent)` : 'none',
                    transition: 'background-color .6s, box-shadow .6s',
                  }}
                >
                  {active && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: accent,
                        animation: 'cortexPulse 1.6s ease-in-out infinite',
                      }}
                    />
                  )}
                </div>
                <p
                  className={`mt-2 text-[9px] md:text-[10px] font-mono tracking-[0.15em] md:tracking-[0.2em] uppercase whitespace-nowrap ${active ? '' : 'hidden md:block'}`}
                  style={{ color: active ? accent : done ? 'var(--fg-muted)' : 'var(--fg-faint)' }}
                >
                  {step.label}
                </p>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <div
                  className="flex-1 h-px mx-1 md:mx-2 -mt-5"
                  style={{
                    background: i < cur
                      ? 'linear-gradient(90deg, var(--pirate), var(--sync))'
                      : 'var(--hairline-strong)',
                    transition: 'background .6s',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes cortexPulse {
          0%, 100% { transform: scale(1);   opacity: 0.6; }
          50%      { transform: scale(2.2); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}

/* ============================================================ */
/* Take card                                                    */
/* ============================================================ */
function Take({ side, t }: { side: 'pirate' | 'refiner'; t: { who: string; dash: string; text: string } }) {
  const accent = side === 'pirate' ? 'var(--pirate)' : 'var(--refiner)';
  const label = side === 'pirate' ? 'The Pirate · take' : 'The Refiner · take';
  return (
    <div
      className="hairline rounded-2xl p-4 md:p-5 min-w-0"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--hairline)',
        borderTop: `2px solid color-mix(in oklab, ${accent} 60%, transparent)`,
        overflowWrap: 'break-word',
        hyphens: 'auto',
      }}
    >
      <div className="flex items-center gap-2.5 mb-2">
        <div
          className="w-7 h-7 rounded-full halo halo-rotating shrink-0"
          style={{ background: side === 'pirate' ? 'linear-gradient(135deg, var(--pirate), var(--sync))' : 'linear-gradient(135deg, var(--refiner), var(--sync))' }}
        />
        <div>
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: accent }}>
            {label}
          </p>
          <p className="text-[11px] font-mono" style={{ color: 'var(--fg-muted)' }}>
            @{t.who} · <span style={{ color: accent }}>{t.dash}</span>
          </p>
        </div>
      </div>
      <p className="text-[13.5px] md:text-[14px] leading-relaxed" style={{ color: 'var(--fg)' }}>
        {t.text}
      </p>
    </div>
  );
}

/* ============================================================ */
/* Browse tray — swipe through other decisions                   */
/* ============================================================ */
function BrowseTray({
  decisions, activeIdx, onSelect,
}: {
  decisions: CortexDecision[];
  activeIdx: number;
  onSelect: (i: number) => void;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <p
          className="chip inline-flex"
          style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}
        >
          Other open decisions
        </p>
        <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
          swipe → · {decisions.length} active
        </span>
      </div>
      <div className="flex gap-2.5 overflow-x-auto no-scrollbar snap-x px-1 md:mx-0 md:px-0 pb-1">
        {decisions.map((d, i) => {
          const active = i === activeIdx;
          const cls =
            d.category === 'tokenomics' ? 'var(--forge)' :
            d.category === 'partnership' ? 'var(--refiner)' :
            d.category === 'product' ? 'var(--pirate)' :
            'var(--sync)';
          return (
            <button
              key={d.id}
              onClick={() => onSelect(i)}
              className="shrink-0 snap-start hairline rounded-2xl glass p-4 text-left transition-all lift"
              style={{
                minWidth: '260px',
                maxWidth: '300px',
                boxShadow: active
                  ? `0 0 0 1px ${cls}, 0 0 30px color-mix(in oklab, ${cls} 22%, transparent)`
                  : 'var(--shadow-glass)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: cls }}>
                  {d.id}
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
                  {d.stage}
                </span>
              </div>
              <p className="text-[13px] font-medium leading-tight mb-2" style={{ color: 'var(--fg)' }}>
                {d.title}
              </p>
              <div className="flex items-center justify-between hairline-t pt-2 text-[10px] font-mono tracking-wider uppercase">
                <span style={{ color: 'var(--forge)' }}>↑ {d.staked}</span>
                <span style={{ color: 'var(--fg-faint)' }}>{d.contributors} cortex</span>
                <span style={{ color: 'var(--fg-faint)' }}>{d.closesIn}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================ */
/* Flow animation — self-running 4-step lifecycle preview         */
/* ============================================================ */
function FlowAnimation() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setStep((s) => (s + 1) % 4), 2400);
    return () => clearInterval(i);
  }, []);

  const FRAMES = [
    {
      label: 'Propose',
      body: 'Anyone in the Cortex drafts a question. The duo sees it first. The room sees it after.',
      accent: 'var(--pirate)',
    },
    {
      label: 'Whisper',
      body: 'The room stakes VOTUS. The Avari Signal shows direction only — never the tally.',
      accent: 'var(--sync)',
    },
    {
      label: 'Anvil',
      body: 'When the duo closes the whisper, the binding poll resolves. The duo can ship, defer, or fork.',
      accent: 'var(--refiner)',
    },
    {
      label: 'Shipped',
      body: 'The decision routes to the diff. VOTUS stake routes to contributors by logged work.',
      accent: 'var(--forge)',
    },
  ];

  return (
    <section className="hairline rounded-3xl glass p-6 md:p-8 relative overflow-hidden">
      <div className="flex items-end justify-between mb-5 flex-wrap gap-2">
        <div>
          <p
            className="chip mb-2 inline-flex"
            style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}
          >
            How a Cortex decision moves
          </p>
          <h3 className="font-light text-[clamp(20px,3vw,30px)] tracking-tight leading-tight">
            Four stages. <span className="twin-text">No theater.</span>
          </h3>
        </div>
        <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
          self-running preview · 2.4s/step
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {FRAMES.map((f, i) => {
          const active = i === step;
          const done = i < step;
          return (
            <div
              key={f.label}
              className="relative hairline rounded-2xl p-3 md:p-5 transition-all duration-700"
              style={{
                background: active ? `color-mix(in oklab, ${f.accent} 10%, var(--surface))` : 'var(--surface)',
                borderColor: active ? `color-mix(in oklab, ${f.accent} 50%, transparent)` : 'var(--hairline)',
                boxShadow: active ? `0 0 30px color-mix(in oklab, ${f.accent} 20%, transparent)` : 'var(--shadow-glass)',
              }}
            >
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: active || done ? f.accent : 'var(--hairline-strong)',
                    boxShadow: active ? `0 0 10px ${f.accent}` : 'none',
                  }}
                />
                <span
                  className="text-[9px] md:text-[10px] font-mono tracking-[0.2em] uppercase"
                  style={{ color: active ? f.accent : done ? 'var(--fg-muted)' : 'var(--fg-faint)' }}
                >
                  · 0{i + 1} {f.label}
                </span>
              </div>
              <p
                className="text-[11.5px] md:text-[12.5px] leading-relaxed"
                style={{ color: active ? 'var(--fg)' : 'var(--fg-muted)' }}
              >
                {f.body}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 hairline-t pt-4 flex items-center justify-center gap-1.5">
        {FRAMES.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            aria-label={`Step ${i + 1}`}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === step ? '28px' : '6px',
              background: i === step ? 'var(--sync)' : 'var(--hairline-strong)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
