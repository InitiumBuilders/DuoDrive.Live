'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Two-Key Drive mini-demo. Two glass key slots; both glow green when both
 * partners "sign" (auto-cycles, can be tapped to retrigger). When both
 * align, the vault content reveals with a soft bloom. Half easter egg,
 * half north-star demo.
 */
export function TwoKeyDemo() {
  const [signed, setSigned] = useState({ pirate: false, refiner: false });
  const cycle = useRef<number>(0);

  useEffect(() => {
    let stage = 0;
    const i = setInterval(() => {
      stage = (stage + 1) % 4;
      if (stage === 0) setSigned({ pirate: false, refiner: false });
      else if (stage === 1) setSigned({ pirate: true, refiner: false });
      else if (stage === 2) setSigned({ pirate: true, refiner: true });
      // stage 3: hold the unlocked state for one beat
      cycle.current = stage;
    }, 2400);
    return () => clearInterval(i);
  }, []);

  const unlocked = signed.pirate && signed.refiner;

  return (
    <div className="hairline rounded-3xl p-6 md:p-10 glass-frosted relative overflow-hidden">
      <div className="absolute inset-0 iridescent opacity-30 pointer-events-none" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <p
              className="chip mb-2"
              style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 32%, transparent)' }}
            >
              Two-Key Drive — preview
            </p>
            <h3 className="font-light text-[clamp(20px,3vw,32px)] tracking-tight leading-tight">
              The vault opens <span className="twin-text font-medium">only when both sign.</span>
            </h3>
            <p className="text-[12px] md:text-[13px] mt-1.5 max-w-md leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Files in an Initium unlock with two Dash EVO ID signers + a ZK proof of identity. No solo kings, even at the storage layer.
            </p>
          </div>
          <span
            className="text-[10px] font-mono tracking-[0.2em] uppercase shrink-0"
            style={{ color: unlocked ? 'var(--pirate)' : 'var(--fg-faint)' }}
          >
            {unlocked ? '✓ unlocked' : 'awaiting both signers…'}
          </span>
        </div>

        {/* the two key slots + vault */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 md:gap-6 items-center">
          <KeySlot side="pirate" signed={signed.pirate} onClick={() => setSigned((s) => ({ ...s, pirate: !s.pirate }))} />
          <Connector unlocked={unlocked} />
          <KeySlot side="refiner" signed={signed.refiner} onClick={() => setSigned((s) => ({ ...s, refiner: !s.refiner }))} />
        </div>

        {/* vault contents */}
        <div className="mt-6">
          <Vault unlocked={unlocked} />
        </div>

        <p className="mt-5 text-[10px] font-mono tracking-wider uppercase text-center" style={{ color: 'var(--fg-faint)' }}>
          tap a key to toggle · auto-cycles every 2.4s
        </p>
      </div>
    </div>
  );
}

function KeySlot({ side, signed, onClick }: { side: 'pirate' | 'refiner'; signed: boolean; onClick: () => void }) {
  const isPirate = side === 'pirate';
  const c = isPirate ? 'var(--pirate)' : 'var(--refiner)';
  const name = isPirate ? 'jordash.duo' : 'davara.duo';
  return (
    <button
      onClick={onClick}
      className="hairline rounded-2xl glass p-4 md:p-5 text-left transition-all duration-500 group hover:scale-[1.02]"
      style={{
        boxShadow: signed ? `0 0 0 1px ${c}, 0 0 60px color-mix(in oklab, ${c} 30%, transparent)` : 'var(--shadow-glass)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[9px] font-mono tracking-[0.2em] uppercase"
          style={{ color: signed ? c : 'var(--fg-faint)' }}
        >
          {isPirate ? 'Pirate · Key 1' : 'Refiner · Key 2'}
        </span>
        <span
          className="text-[10px] font-mono"
          style={{ color: signed ? c : 'var(--fg-faint)', transition: 'color .35s' }}
        >
          {signed ? '✓ signed' : '○ unsigned'}
        </span>
      </div>

      {/* fingerprint / key visualization */}
      <div className="relative h-20 md:h-24 rounded-xl overflow-hidden mb-3" style={{ background: 'color-mix(in oklab, var(--bg) 70%, transparent)' }}>
        <KeyVisual color={c} signed={signed} />
      </div>

      <p className="font-mono text-[12px] truncate" style={{ color: 'var(--fg)' }}>
        {name}
      </p>
      <p
        className="text-[10px] font-mono tracking-wider uppercase mt-0.5 truncate transition-colors duration-500"
        style={{ color: signed ? c : 'var(--fg-faint)' }}
      >
        {signed ? 'evo id verified · zk ✓' : 'pending zk proof…'}
      </p>
    </button>
  );
}

function KeyVisual({ color, signed }: { color: string; signed: boolean }) {
  // Concentric arcs that align into a key when signed
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx="100"
          cy="50"
          r={6 + i * 7}
          fill="none"
          stroke={color}
          strokeWidth={signed ? 0.8 : 0.5}
          strokeOpacity={signed ? 0.45 - i * 0.05 : 0.18 - i * 0.02}
          style={{ transition: 'stroke-opacity .6s, stroke-width .6s' }}
        />
      ))}
      {/* key center */}
      <circle
        cx="100"
        cy="50"
        r={signed ? 4 : 2}
        fill={color}
        style={{ filter: signed ? `drop-shadow(0 0 8px ${color})` : 'none', transition: 'r .6s, filter .6s' }}
      />
      {/* signing scan line */}
      {signed && (
        <line
          x1="20"
          y1="50"
          x2="180"
          y2="50"
          stroke={color}
          strokeWidth="0.6"
          strokeOpacity="0.4"
          strokeDasharray="2 4"
        >
          <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.4s" repeatCount="indefinite" />
        </line>
      )}
    </svg>
  );
}

function Connector({ unlocked }: { unlocked: boolean }) {
  return (
    <div className="relative h-1 w-12 md:w-20 rounded-full overflow-hidden" style={{ background: 'var(--hairline)' }}>
      <div
        className="absolute inset-y-0 left-0 transition-all duration-700"
        style={{
          width: unlocked ? '100%' : '50%',
          background: unlocked ? 'linear-gradient(90deg, var(--pirate), var(--sync), var(--refiner))' : 'color-mix(in oklab, var(--fg-faint) 80%, transparent)',
        }}
      />
      {unlocked && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full breathe"
          style={{ background: 'var(--sync)', boxShadow: '0 0 16px var(--sync)' }}
        />
      )}
    </div>
  );
}

function Vault({ unlocked }: { unlocked: boolean }) {
  return (
    <div
      className="hairline rounded-2xl p-5 md:p-6 transition-all duration-700 relative overflow-hidden"
      style={{
        background: unlocked
          ? 'color-mix(in oklab, var(--sync) 8%, var(--surface))'
          : 'var(--surface)',
        boxShadow: unlocked
          ? '0 0 0 1px var(--sync), 0 0 80px color-mix(in oklab, var(--sync) 18%, transparent)'
          : 'var(--shadow-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-mono tracking-[0.2em] uppercase"
          style={{ color: unlocked ? 'var(--pirate)' : 'var(--fg-faint)' }}
        >
          INI-009 / vault.locked
        </span>
        <span className="text-[10px] font-mono" style={{ color: 'var(--fg-faint)' }}>
          {unlocked ? '4 files revealed' : 'contents hidden'}
        </span>
      </div>
      <div className="space-y-1.5 font-mono text-[12px] transition-opacity duration-500" style={{ opacity: unlocked ? 1 : 0.18, filter: unlocked ? 'none' : 'blur(4px)' }}>
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--fg)' }}>~/INI-009/revenue-model.md</span>
          <span style={{ color: 'var(--fg-faint)' }}>2.1 KB</span>
        </div>
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--fg)' }}>~/INI-009/votus-allocation.json</span>
          <span style={{ color: 'var(--fg-faint)' }}>4.4 KB</span>
        </div>
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--fg)' }}>~/INI-009/dash-multisig.toml</span>
          <span style={{ color: 'var(--fg-faint)' }}>0.8 KB</span>
        </div>
        <div className="flex items-center justify-between">
          <span style={{ color: 'var(--fg)' }}>~/INI-009/initium-charter.md</span>
          <span style={{ color: 'var(--fg-faint)' }}>3.7 KB</span>
        </div>
      </div>
    </div>
  );
}
