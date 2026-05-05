'use client';
import { useEffect, useRef } from 'react';
import type { useLiveSim } from '@/lib/liveSim';

const TOP_INVESTORS = [
  { handle: 'lily.eth', votus: 88, dash: 0.31, role: 'Cortex Whisperer', cls: 'pirate' },
  { handle: 'pirate.0x', votus: 64, dash: 0.22, role: 'Solidity Pirate', cls: 'forge' },
  { handle: 'shoji', votus: 41, dash: 0.14, role: 'Typographer', cls: 'pirate' },
  { handle: 'mr.refine', votus: 38, dash: 0.13, role: 'Audio Director', cls: 'refiner' },
  { handle: 'jordash_fan', votus: 22, dash: 0.07, role: 'Watcher', cls: 'pirate' },
  { handle: 'davara_fam', votus: 19, dash: 0.06, role: 'Watcher', cls: 'refiner' },
];

const RAISED = 312;
const TARGET = 500;
const CONTRIBUTORS = 47;
const DASH_TOTAL = 1.12;
// last 24h spark — synthetic build curve
const SPARK = [4, 6, 5, 8, 12, 10, 14, 18, 22, 19, 28, 35, 31, 44, 51, 47, 58, 72, 88, 102, 138, 184, 246, 312];

type SimSlice = ReturnType<typeof useLiveSim>;

export function VotusInvestments({ compact = false, sim }: { compact?: boolean; sim?: SimSlice }) {
  const raised = sim?.votusStaked ?? RAISED;
  const spark = sim?.spark ?? SPARK;
  const contributors = CONTRIBUTORS + Math.floor((raised - RAISED) / 8);
  return (
    <section className={compact ? 'my-6' : 'my-10'}>
      <div className="flex items-end justify-between gap-4 flex-wrap mb-5">
        <div>
          <p className="chip chip-forge mb-2.5">VOTUS Investments</p>
          <h2 className="font-light text-[clamp(22px,3.4vw,38px)] tracking-tight leading-[1.1]">
            What the community has <span className="twin-text">put behind them.</span>
          </h2>
          <p className="text-[12px] md:text-[13px] text-fg-muted mt-1.5 max-w-xl leading-relaxed">
            Conviction with skin in it. Routed back to the Cortex by contribution.
          </p>
        </div>
        <a href="/votus" className="text-[12px] font-mono tracking-wider uppercase px-4 py-2 rounded-full hairline hover:border-forge/60 hover:text-forge transition-colors">
          Stake →
        </a>
      </div>

      {/* top strip: goal ring + headline stats */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-4 mb-4">
        <GoalRing raised={raised} target={TARGET} />
        <div className="hairline rounded-xl p-5 glass grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="Raised" value={`${raised}`} suffix="VOTUS" tone="forge" />
          <Stat label="DASH equiv." value={(raised / 280).toFixed(2)} suffix="DASH" tone="sync" />
          <Stat label="Contributors" value={`${contributors}`} suffix="cortex" tone="pirate" />
          <Stat label="Goal" value={`${Math.round((raised / TARGET) * 100)}%`} suffix="of 500" tone="refiner" />
          <div className="col-span-2 md:col-span-4 hairline-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--fg-faint)' }}>Last 24h · stake events</p>
              <p className="text-[10px] font-mono" style={{ color: 'var(--pirate)' }}>↑ +{raised - SPARK[0]} today</p>
            </div>
            <Sparkline data={spark} />
          </div>
        </div>
      </div>

      {/* leaderboard */}
      <div className="hairline rounded-xl p-5 glass">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <p className="text-[11px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--fg-muted)' }}>Top stakers · this Initium</p>
          <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            ⓘ rewards route to Cortex by logged contribution, not stake size
          </p>
        </div>
        <ul className="space-y-2.5">
          {TOP_INVESTORS.map((i, idx) => {
            const pct = (i.votus / raised) * 100;
            return (
              <li key={i.handle} className="flex items-center gap-2.5 sm:gap-3">
                <span className="font-mono text-[11px] text-fg-faint w-5 sm:w-6 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br ${i.cls === 'pirate' ? 'from-pirate to-sync' : i.cls === 'refiner' ? 'from-refiner to-sync' : 'from-forge to-refiner'} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[12.5px] sm:text-[13px] font-medium truncate min-w-0">@{i.handle}</span>
                    <span className="text-[11px] font-mono text-forge shrink-0 whitespace-nowrap">↑ {i.votus}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${i.cls === 'pirate' ? 'from-pirate to-sync' : i.cls === 'refiner' ? 'from-refiner to-sync' : 'from-forge to-refiner'}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[9px] font-mono tracking-wider uppercase text-fg-faint shrink-0 truncate max-w-[80px] sm:max-w-none">{i.role}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="hairline-t mt-4 pt-4 flex items-center justify-between flex-wrap gap-2">
          <p className="text-[11px] text-fg-faint font-mono tracking-wider uppercase">+ 41 other contributors</p>
          <a href="/votus/invested" className="text-[11px] text-forge hover:text-fg transition-colors">See full leaderboard →</a>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, suffix, tone }: { label: string; value: string; suffix: string; tone: string }) {
  const color = tone === 'forge' ? 'var(--forge)' : tone === 'pirate' ? 'var(--pirate)' : tone === 'sync' ? 'var(--sync)' : 'var(--refiner)';
  return (
    <div>
      <p className="text-[10px] font-mono tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--fg-faint)' }}>{label}</p>
      <p className="text-[24px] font-light leading-none counter-pop" key={value} style={{ color }}>{value}</p>
      <p className="text-[10px] font-mono tracking-wider uppercase mt-1" style={{ color: 'var(--fg-faint)' }}>{suffix}</p>
    </div>
  );
}

function GoalRing({ raised, target }: { raised: number; target: number }) {
  const pct = Math.min(1, raised / target);
  const r = 90;
  const c = 2 * Math.PI * r;
  return (
    <div className="hairline rounded-xl p-5 glass-frosted iridescent flex items-center justify-center">
      <div className="relative">
        <svg width="220" height="220" viewBox="0 0 220 220" className="block">
          <defs>
            <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--pirate)" />
              <stop offset="50%" stopColor="var(--sync)" />
              <stop offset="100%" stopColor="var(--forge)" />
            </linearGradient>
          </defs>
          <circle cx="110" cy="110" r={r} fill="none" stroke="var(--hairline)" strokeWidth="2" />
          <circle
            cx="110" cy="110" r={r}
            fill="none"
            stroke="url(#ringg)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${pct * c} ${c}`}
            transform="rotate(-90 110 110)"
            className="breathe"
            style={{ filter: 'drop-shadow(0 0 12px color-mix(in oklab, var(--sync) 50%, transparent))', transition: 'stroke-dasharray .8s' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase mb-1" style={{ color: 'var(--fg-faint)' }}>Raised</p>
          <p className="text-[40px] font-light leading-none counter-pop" key={raised} style={{ color: 'var(--forge)', textShadow: '0 0 20px color-mix(in oklab, var(--forge) 40%, transparent)' }}>
            {raised}
          </p>
          <p className="text-[10px] font-mono tracking-wider uppercase mt-2" style={{ color: 'var(--fg-faint)' }}>
            of {target} VOTUS goal
          </p>
        </div>
      </div>
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const ref = useRef<SVGSVGElement | null>(null);
  const max = Math.max(...data);
  const W = 600;
  const H = 60;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - (v / max) * H;
    return `${x},${y}`;
  }).join(' ');
  const fillPts = `0,${H} ${pts} ${W},${H}`;
  // Latest point pulse position
  const last = data[data.length - 1];
  const lx = W;
  const ly = H - (last / max) * H;
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-12 block">
      <defs>
        <linearGradient id="sparkg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--forge)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--forge)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sparkl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--pirate)" />
          <stop offset="60%" stopColor="var(--sync)" />
          <stop offset="100%" stopColor="var(--forge)" />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill="url(#sparkg)" />
      <polyline points={pts} fill="none" stroke="url(#sparkl)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={lx} cy={ly} r="2" fill="var(--forge)">
        <animate attributeName="r" values="2;5;2" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
