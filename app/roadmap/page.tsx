'use client';
import { useState } from 'react';
import Link from 'next/link';

type RoadItem = {
  id: string;
  title: string;
  body: string;
  kind: 'shipping' | 'queued' | 'voting' | 'speculative';
  staked: number;
  target: number;
  whispers: number; // 0..1 direction toward "build"
  initium?: string;
  category: 'product' | 'governance' | 'tokenomics' | 'partnership';
};

const SEED: RoadItem[] = [
  { id: 'F-001', title: 'Avari Whispers v1', body: 'Direction-only voting bars on every poll. Tally hidden until the duo opens the box.', kind: 'shipping', staked: 144, target: 200, whispers: 0.86, initium: 'INI-009', category: 'product' },
  { id: 'F-002', title: 'Two-Key Drive vault (Dash EVO ID + ZK)', body: 'Files unlock with two signers + ZK proof of identity. The literal product behind the metaphor.', kind: 'voting', staked: 188, target: 300, whispers: 0.91, initium: 'INI-007', category: 'product' },
  { id: 'F-003', title: 'Forge Streak multiplier on VOTUS rewards', body: '30 consecutive ship-days unlocks a 1.5x routing bonus to the duo. Anti-burnout cap at 1.8x.', kind: 'voting', staked: 76, target: 150, whispers: 0.62, category: 'tokenomics' },
  { id: 'F-004', title: 'Cortex Reputation Bond', body: 'Helpers stake VOTUS on their own work. If they ghost, the bond pays the duo back. Skin-in-game for contributors.', kind: 'voting', staked: 51, target: 120, whispers: 0.71, category: 'governance' },
  { id: 'F-005', title: 'Veros.IO ↔ DuoDrive vault link', body: 'Cross-Initium primitive: a Veros subscription can pay into a DuoDrive Two-Key vault. Subscriptions become Initium funding.', kind: 'voting', staked: 92, target: 200, whispers: 0.78, initium: 'INI-014', category: 'partnership' },
  { id: 'F-006', title: 'Dual-Mint VOTUS', body: '70% to contribution-pool, 30% to a "watcher curiosity" pool earned by spending time without staking. Rewards lurkers becoming builders.', kind: 'voting', staked: 41, target: 200, whispers: 0.54, category: 'tokenomics' },
  { id: 'F-007', title: 'Initium-as-Thread navigation', body: 'Make the project (not the user) the unit. Profiles orbit Initiums. Search starts with what is being built, not who.', kind: 'queued', staked: 28, target: 150, whispers: 0.58, category: 'product' },
  { id: 'F-008', title: 'Wage-Subscriptions on Veros', body: 'One employer signature fans out to N employees as DASH-denominated payroll. Single contract, transparent ledger.', kind: 'queued', staked: 64, target: 250, whispers: 0.66, initium: 'INI-014', category: 'partnership' },
  { id: 'F-009', title: 'Subscription-as-NFT', body: 'Each Veros sub is a transferable position. Sell your gym membership for the remaining months — or hedge DASH exposure on a market.', kind: 'speculative', staked: 12, target: 100, whispers: 0.41, initium: 'INI-014', category: 'tokenomics' },
  { id: 'F-010', title: 'Civic-Tier Subscriptions', body: 'A Dash masternode operator offers free subscriptions to their community as a public good, paid from masternode rewards.', kind: 'speculative', staked: 18, target: 200, whispers: 0.48, initium: 'INI-014', category: 'partnership' },
  { id: 'F-011', title: 'Stream-as-deposition', body: 'Live recording becomes auditable trail for grant applications + investor diligence. Receipts > talk.', kind: 'speculative', staked: 22, target: 100, whispers: 0.51, category: 'governance' },
  { id: 'F-012', title: 'Forge Templates v1', body: 'Initium starter kits (SaaS, OSS, course, podcast). Ship with manifesto + governance + VOTUS routing pre-wired.', kind: 'queued', staked: 41, target: 120, whispers: 0.69, initium: 'INI-013', category: 'product' },
];

const NOW_TASKS = [
  { txt: 'Land /roadmap on duodrive.live', who: 'davara', state: 'live', etaMin: 0 },
  { txt: 'Wire stake-flow to all roadmap cards', who: 'davara', state: 'shipping', etaMin: 14 },
  { txt: 'Cross-link Veros.IO subscription contract to DuoDrive vault', who: 'kato.dash', state: 'next', etaMin: 90 },
  { txt: 'Open Avari Whisper poll: "votus transferable y1?"', who: 'jordash', state: 'next', etaMin: 30 },
  { txt: 'Echo-catch line of the day → README', who: 'system', state: 'queued', etaMin: 120 },
];

const CATEGORIES: { id: RoadItem['category'] | 'all'; label: string; cls: string }[] = [
  { id: 'all', label: 'All', cls: 'sync' },
  { id: 'product', label: 'Product', cls: 'pirate' },
  { id: 'tokenomics', label: 'Tokenomics', cls: 'forge' },
  { id: 'governance', label: 'Governance', cls: 'sync' },
  { id: 'partnership', label: 'Partnership', cls: 'refiner' },
];

export default function Roadmap() {
  const [filter, setFilter] = useState<RoadItem['category'] | 'all'>('all');
  const [items, setItems] = useState(SEED);
  const filtered = filter === 'all' ? items : items.filter((i) => i.category === filter);

  const stake = (id: string, amount: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, staked: it.staked + amount, whispers: Math.min(0.99, it.whispers + 0.01) } : it))
    );
  };

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-10 reveal">
        <p className="chip mx-auto mb-5 inline-flex" style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 35%, transparent)' }}>
          Roadmap · Whisper-staked
        </p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          The next moves<br /><span className="twin-text">are voted with skin.</span>
        </h1>
        <p className="mt-4 text-[15px] max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          Every feature on this roadmap is open for VOTUS staking. The Avari Whisper bar shows direction; the tally reveals when the duo closes the proposal. Stake = conviction with skin in it.
        </p>
      </header>

      {/* Live now / shipping list */}
      <section className="hairline rounded-2xl glass p-5 mb-8 reveal">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <p className="text-[11px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--fg-muted)' }}>
            <span className="live-dot mr-2 inline-block" />
            Stream task list — Jordash × Davara · INI-009
          </p>
          <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            cadence: ~30 min increments
          </span>
        </div>
        <ol className="space-y-2">
          {NOW_TASKS.map((t, i) => {
            const tone = t.state === 'live' ? 'var(--pirate)' : t.state === 'shipping' ? 'var(--sync)' : t.state === 'next' ? 'var(--forge)' : 'var(--fg-faint)';
            return (
              <li key={i} className="flex items-center gap-3 text-[13px] hairline-b last:border-b-0 pb-2 last:pb-0">
                <span className="font-mono text-[10px] tracking-wider uppercase w-16 shrink-0" style={{ color: tone }}>
                  {t.state}
                </span>
                <span className="flex-1" style={{ color: 'var(--fg)' }}>{t.txt}</span>
                <span className="text-[10px] font-mono tracking-wider uppercase shrink-0" style={{ color: 'var(--fg-faint)' }}>
                  @{t.who} · {t.etaMin === 0 ? 'now' : `+${t.etaMin}m`}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* category filters */}
      <div className="flex gap-1.5 mb-5 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        {CATEGORIES.map((c) => {
          const active = filter === c.id;
          const color =
            c.cls === 'pirate' ? 'var(--pirate)' :
            c.cls === 'refiner' ? 'var(--refiner)' :
            c.cls === 'forge' ? 'var(--forge)' :
            'var(--sync)';
          const count = c.id === 'all' ? items.length : items.filter((i) => i.category === c.id).length;
          return (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className="shrink-0 chip transition-all"
              style={{
                color: active ? color : 'var(--fg-muted)',
                borderColor: active ? `color-mix(in oklab, ${color} 40%, transparent)` : 'var(--hairline)',
                background: active ? `color-mix(in oklab, ${color} 8%, var(--surface))` : 'var(--surface)',
              }}
            >
              {c.label}
              <span className="font-mono text-[9px]" style={{ opacity: 0.6 }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* roadmap items */}
      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((it, i) => (
          <RoadCard key={it.id} item={it} onStake={(amt) => stake(it.id, amt)} delay={i * 0.04} />
        ))}
      </div>

      <section className="mt-16 max-w-3xl mx-auto reveal">
        <p className="chip mx-auto mb-4 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
          How VOTUS staking on roadmap works
        </p>
        <h2 className="font-light text-[clamp(24px,3.6vw,40px)] tracking-tight mb-6 text-center">
          Stake to amplify. <span className="twin-text">Build to earn.</span>
        </h2>
        <ol className="space-y-3 list-none">
          {[
            { t: '01 · Stake = direction', b: 'When you stake VOTUS on a roadmap item, you push the Avari Whisper bar toward "build." You don\'t pick the winner, the duo does — but the duo can\'t ignore the room.' },
            { t: '02 · Threshold = greenlight', b: 'When an item crosses its target VOTUS, the duo opens the Whisper. They can ship, defer, or fork. Either way, the room sees the call.' },
            { t: '03 · Ship = route', b: 'When the item ships, staked VOTUS routes back to the contributors who logged work — not to the stakers. Stakers don\'t get paid for staking. Builders get paid for building.' },
            { t: '04 · Speculative items earn slowly', b: 'Outlier ideas without an obvious champion sit in the speculative pool. They earn a passive 0.5%/mo conviction-yield until adopted, forking into a real Initium.' },
          ].map((r) => (
            <li key={r.t} className="hairline rounded-xl glass p-5">
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase mb-1.5" style={{ color: 'var(--pirate)' }}>{r.t}</p>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{r.b}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/votus"
          className="text-[12px] font-mono tracking-wider uppercase transition-colors hover:[color:var(--forge)]"
          style={{ color: 'var(--fg-muted)' }}
        >
          → How VOTUS works
        </Link>
      </div>
    </div>
  );
}

function RoadCard({ item, onStake, delay }: { item: RoadItem; onStake: (amount: number) => void; delay: number }) {
  const [popped, setPopped] = useState(false);
  const pct = Math.min(1, item.staked / item.target);
  const accent =
    item.category === 'pirate' as any ? 'var(--pirate)' :
    item.category === 'product' ? 'var(--pirate)' :
    item.category === 'tokenomics' ? 'var(--forge)' :
    item.category === 'partnership' ? 'var(--refiner)' :
    'var(--sync)';
  const stateLabel = item.kind === 'shipping' ? 'Shipping' : item.kind === 'voting' ? 'Open · Whisper' : item.kind === 'queued' ? 'Queued' : 'Speculative';
  const stateColor = item.kind === 'shipping' ? 'var(--pirate)' : item.kind === 'voting' ? 'var(--sync)' : item.kind === 'speculative' ? 'var(--fg-faint)' : 'var(--forge)';
  return (
    <article
      className="hairline rounded-xl glass p-5 lift reveal flex flex-col"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: accent }}>
          {item.id}
        </span>
        <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: stateColor }}>
          {stateLabel}
        </span>
      </div>
      <h3 className="font-medium text-[16px] mb-1.5 leading-tight" style={{ color: 'var(--fg)' }}>
        {item.title}
      </h3>
      <p className="text-[13px] leading-relaxed mb-4 flex-1" style={{ color: 'var(--fg-muted)' }}>
        {item.body}
      </p>

      {/* whisper bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[10px] font-mono tracking-wider uppercase mb-1.5">
          <span style={{ color: 'var(--fg-faint)' }}>Hold</span>
          <span style={{ color: accent }}>Avari Whisper</span>
          <span style={{ color: 'var(--fg-faint)' }}>Build</span>
        </div>
        <div className="relative h-1 rounded-full overflow-hidden" style={{ background: 'var(--hairline)' }}>
          <div
            className="absolute inset-y-0 left-0 transition-[width] duration-700"
            style={{ width: `${item.whispers * 100}%`, background: 'linear-gradient(90deg, var(--sync), var(--pirate))' }}
          />
          <div className="absolute top-1/2 -translate-y-1/2 w-px h-2" style={{ left: `${item.whispers * 100}%`, background: 'var(--fg-muted)' }} />
        </div>
      </div>

      {/* stake bar */}
      <div className="hairline-t pt-3">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase mb-1.5">
          <span style={{ color: 'var(--fg-muted)' }}>{item.staked} of {item.target} VOTUS</span>
          <span style={{ color: 'var(--forge)' }}>{Math.round(pct * 100)}%</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden mb-3" style={{ background: 'var(--hairline)' }}>
          <div className="forge-bar h-full transition-[width] duration-700" style={{ width: `${pct * 100}%` }} />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {[1, 8, 50].map((amt) => (
            <button
              key={amt}
              onClick={() => { onStake(amt); setPopped(true); setTimeout(() => setPopped(false), 600); }}
              className="text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full hairline transition-all hover:scale-105"
              style={{ color: 'var(--forge)', background: popped ? 'color-mix(in oklab, var(--forge) 12%, var(--surface))' : 'var(--surface)' }}
            >
              + {amt} votus
            </button>
          ))}
          {item.initium && (
            <span className="ml-auto text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
              {item.initium}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
