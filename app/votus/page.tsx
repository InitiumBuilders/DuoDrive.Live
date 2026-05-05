import Link from 'next/link';

export const metadata = { title: 'VOTUS — DuoDrive.Live' };

const PACKS = [
  { name: 'Spark', votus: 100, dash: '0.4', cls: 'pirate' },
  { name: 'Forge', votus: 500, dash: '1.8', cls: 'sync', best: true },
  { name: 'Anvil', votus: 2500, dash: '8', cls: 'refiner' },
  { name: 'Smith', votus: 10000, dash: '30', cls: 'forge' },
];

const BETS = [
  { kpi: 'DuoDrive ships /signup tonight', odds: 0.78, vol: 412, dir: 'up' },
  { kpi: '1,000 Initiums by end of Q3 2026', odds: 0.42, vol: 1208, dir: 'up' },
  { kpi: 'VOTUS launches on Dash by Q4', odds: 0.56, vol: 882, dir: 'flat' },
  { kpi: 'First Cortex contributor flagged', odds: 0.91, vol: 240, dir: 'up' },
  { kpi: 'Two-Key Drive demo working', odds: 0.31, vol: 511, dir: 'up' },
  { kpi: '10K total streamers by Q1 2027', odds: 0.27, vol: 1801, dir: 'flat' },
];

export default function Votus() {
  return (
    <div className="px-5 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-14">
        <p className="chip chip-forge mx-auto mb-5">VOTUS</p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          The signal <span className="twin-text">with skin in it.</span>
        </h1>
        <p className="text-white/55 mt-4 text-[15px] max-w-2xl mx-auto leading-relaxed">
          VOTUS is the building-and-voting token for DuoDrive. Stake it on streams to amplify. Bet it on KPIs to declare conviction. Earn it by contributing to Initiums. Built on Dash Platform.
        </p>
      </header>

      {/* economy strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-14">
        {[
          { l: 'Earn', t: 'Contribute', d: 'Roles in the Cortex pay VOTUS proportional to logged work.' },
          { l: 'Stake', t: 'Amplify', d: 'Direction-only signal — push streams up the DuoDrive feed.' },
          { l: 'Bet', t: 'Conviction', d: 'KPI markets. Win VOTUS when the duo hits the goal.' },
          { l: 'Burn', t: 'Settle', d: 'Two-Key Drive unlocks burn VOTUS to mint a ZK access proof.' },
        ].map((c) => (
          <div key={c.l} className="hairline rounded-xl p-4 bg-slab/40">
            <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-forge mb-1.5">{c.l}</p>
            <p className="font-medium text-[14px] mb-1">{c.t}</p>
            <p className="text-[12px] text-white/55 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </section>

      {/* bets feed */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="font-light text-[clamp(22px,3vw,32px)] tracking-tight">VOTUS Bets — <span className="twin-text">live KPI markets</span></h2>
          <span className="text-[10px] font-mono tracking-wider uppercase text-white/40">Avari Whispers · direction only</span>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {BETS.map((b) => (
            <div key={b.kpi} className="hairline rounded-xl p-4 bg-slab/40 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-white/80 mb-2 truncate">{b.kpi}</p>
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pirate via-sync to-forge" style={{ width: `${b.odds * 100}%` }} />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-forge text-[13px]">{b.odds.toFixed(2)}</p>
                <p className="text-[10px] font-mono tracking-wider uppercase text-white/40">{b.vol} vol</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* packs */}
      <section>
        <h2 className="font-light text-[clamp(22px,3vw,32px)] tracking-tight mb-4">Credit Packs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PACKS.map((p) => (
            <div key={p.name} className={`hairline rounded-xl p-5 bg-slab/40 ${p.best ? 'halo halo-rotating' : ''}`}>
              <p className={`chip chip-${p.cls} mb-3`}>{p.name}{p.best && ' · most loved'}</p>
              <p className="text-[28px] font-light mb-1">{p.votus.toLocaleString()}</p>
              <p className="text-[11px] font-mono tracking-wider uppercase text-white/40 mb-4">VOTUS credits</p>
              <p className="text-[14px] text-white/70 mb-4">~ <span className="text-forge">{p.dash}</span> DASH</p>
              <button className="w-full text-[12px] font-mono tracking-wider uppercase hairline rounded-full py-2 hover:bg-forge/10 hover:text-forge transition-colors">
                Stake →
              </button>
            </div>
          ))}
        </div>
      </section>

      <p className="mt-14 text-center text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">
        VOTUS is preview-only. Built on Dash Platform · settle in DASH · public ledger · ZK access proofs.
      </p>
    </div>
  );
}
