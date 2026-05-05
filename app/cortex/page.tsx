import Link from 'next/link';

export const metadata = { title: 'The Cortex — DuoDrive.Live' };

const ROLES = [
  { name: 'Typographer', who: 'shoji', tag: 'Claimed', votes: 24, cls: 'pirate', desc: 'Audit type rhythm. Inter only. Kill any ligature theater.' },
  { name: 'Stress Tester', who: '— need 1 —', tag: 'Open', votes: 19, cls: 'sync', desc: 'Hit /signup with 100 concurrent forms. Report what shudders.' },
  { name: 'Cortex Whisperer', who: 'lily.eth', tag: 'Claimed', votes: 41, cls: 'refiner', desc: 'Welcome new helpers. Surface lurkers with high-signal asks.' },
  { name: 'Initium Doc Editor', who: '— need 1 —', tag: 'Open', votes: 12, cls: 'sync', desc: 'Turn streams into 1-pager Initium briefs. Clarity over volume.' },
  { name: 'Audio Director', who: 'mr.refine', tag: 'Claimed', votes: 8, cls: 'refiner', desc: 'Voice-of-the-room mix. Who gets a mic and when.' },
  { name: 'Outlier Hunter', who: '— need 1 —', tag: 'Open', votes: 33, cls: 'forge', desc: 'Watch the cortex. Pull the surprising voice into the duo feed.' },
  { name: 'Cross-Initium Liaison', who: '— need 1 —', tag: 'Open', votes: 22, cls: 'sync', desc: 'Bridge Veros.IO ↔ DuoDrive Two-Key vault primitives. Speak both data contracts.' },
  { name: 'Dash Platform Engineer', who: 'kato.dash', tag: 'Claimed', votes: 28, cls: 'forge', desc: 'Live in the Rust SDK. Ship the data contract bindings.' },
  { name: 'Civic-Tier Curator', who: '— need 1 —', tag: 'Open', votes: 14, cls: 'refiner', desc: 'Match nonprofits to masternode-funded subsidies on Veros.IO.' },
];

const DECISIONS = [
  {
    id: 'D-001',
    state: 'open',
    title: 'Should VOTUS be transferable in Y1, or earn-only?',
    body: 'Earn-only forces builders to actually build. Transferable accelerates liquidity but invites speculation farmers. Davara leans earn-only Y1 with a 90d vesting cliff before transferability in Y2.',
    pirateTake: 'Earn-only. Speculation kills culture before utility lands.',
    refinerTake: 'Earn-only Y1. Add a 90d cliff Y2. Cap initial transfer velocity at 10% of held balance per epoch.',
    cortex: 0.78,
    staked: 144,
    expires: '12h',
  },
  {
    id: 'D-002',
    state: 'open',
    title: 'Add subscription paywall on Two-Key Drive vaults > 100MB?',
    body: 'Free vaults up to 100MB; $5/mo paid in DASH for unlimited storage. Some Cortex members worry it gates the literal product behind a paywall.',
    pirateTake: 'Yes — only the duos who need the heavy primitive pay. Storage scales with conviction.',
    refinerTake: 'Yes if the free tier is generous (100MB, ~3000 files). Add a 30-day grace before lock.',
    cortex: 0.62,
    staked: 88,
    expires: '2d',
  },
  {
    id: 'D-003',
    state: 'open',
    title: 'Default Initium license: MIT or Apache-2.0?',
    body: 'MIT is the default for everything DuoDrive ships. Apache-2.0 adds patent grant — important for partnerships with Dash/enterprise. Should the platform default change, or stay MIT with Apache as a per-Initium opt-in?',
    pirateTake: 'MIT default. Apache opt-in. Defaults shape culture; MIT signals "take it and run."',
    refinerTake: 'MIT default + Apache opt-in surfaces the patent question only when it matters.',
    cortex: 0.84,
    staked: 64,
    expires: '5d',
  },
  {
    id: 'D-004',
    state: 'whispered',
    title: 'Should the Cortex be able to overrule the duo on a Pause?',
    body: 'Currently either signer halts an Initium. The Cortex can question but not overrule. Question: should a 75% Cortex VOTUS-weighted Whisper be able to force-resume a paused Initium?',
    pirateTake: 'No. The duo has the keys. If the Cortex disagrees, fork.',
    refinerTake: 'No. Forking is in the spec for exactly this case.',
    cortex: 0.18,
    staked: 211,
    expires: 'closed',
  },
];

export default function Cortex() {
  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-12 reveal">
        <p className="chip mx-auto mb-5 inline-flex" style={{ color: 'var(--refiner)', borderColor: 'color-mix(in oklab, var(--refiner) 35%, transparent)' }}>
          The Cortex
        </p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          The room <span className="twin-text">self-organizes.</span>
        </h1>
        <p className="mt-4 text-[15px] max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          Watchers don't watch. They contribute. Pick a role. Make it your own. Earn VOTUS by helping the duo ship.
        </p>
      </header>

      {/* Critical decisions */}
      <section className="mb-12 reveal">
        <p className="chip mb-3 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
          ✦ Critical decisions — open to whisper
        </p>
        <h2 className="font-light text-[clamp(24px,3.6vw,40px)] tracking-tight leading-tight mb-6">
          The hard calls. <span className="twin-text">In the open.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {DECISIONS.map((d, i) => (
            <article key={d.id} className="hairline rounded-xl glass p-5 lift reveal" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--sync)' }}>
                  {d.id}
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase" style={{
                  color: d.state === 'open' ? 'var(--pirate)' : 'var(--fg-faint)',
                }}>
                  {d.state === 'open' ? 'open · whisper' : 'whispered · closed'}
                </span>
              </div>
              <h3 className="font-medium text-[16px] mb-2 leading-tight" style={{ color: 'var(--fg)' }}>
                {d.title}
              </h3>
              <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
                {d.body}
              </p>

              <div className="hairline rounded-lg p-3 mb-3" style={{ background: 'color-mix(in oklab, var(--pirate) 6%, var(--surface))' }}>
                <p className="text-[10px] font-mono tracking-wider uppercase mb-1" style={{ color: 'var(--pirate)' }}>
                  @jordash · pirate take
                </p>
                <p className="text-[12px]" style={{ color: 'var(--fg)' }}>{d.pirateTake}</p>
              </div>
              <div className="hairline rounded-lg p-3 mb-3" style={{ background: 'color-mix(in oklab, var(--refiner) 6%, var(--surface))' }}>
                <p className="text-[10px] font-mono tracking-wider uppercase mb-1" style={{ color: 'var(--refiner)' }}>
                  @davara · refiner take
                </p>
                <p className="text-[12px]" style={{ color: 'var(--fg)' }}>{d.refinerTake}</p>
              </div>

              <div className="hairline-t pt-3">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-wider uppercase mb-1.5">
                  <span style={{ color: 'var(--fg-faint)' }}>No</span>
                  <span style={{ color: 'var(--sync)' }}>Cortex Whisper</span>
                  <span style={{ color: 'var(--fg-faint)' }}>Yes</span>
                </div>
                <div className="relative h-1 rounded-full overflow-hidden mb-2" style={{ background: 'var(--hairline)' }}>
                  <div
                    className="absolute inset-y-0 left-0 transition-[width] duration-700"
                    style={{ width: `${d.cortex * 100}%`, background: 'linear-gradient(90deg, var(--sync), var(--pirate))' }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono tracking-wider uppercase">
                  <span style={{ color: 'var(--forge)' }}>{d.staked} VOTUS staked</span>
                  <span style={{ color: 'var(--fg-faint)' }}>closes in {d.expires}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12 reveal">
        <p className="chip mb-3 inline-flex" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}>
          Cortex roles
        </p>
        <h2 className="font-light text-[clamp(22px,3.4vw,38px)] tracking-tight leading-tight mb-6">
          Roles claimed. <span className="twin-text">Roles open.</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ROLES.map((r, i) => (
            <div key={r.name} className="hairline rounded-xl glass p-5 lift reveal" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-center justify-between mb-3">
                <p className="chip" style={{ color: r.cls === 'pirate' ? 'var(--pirate)' : r.cls === 'refiner' ? 'var(--refiner)' : r.cls === 'forge' ? 'var(--forge)' : 'var(--sync)', borderColor: `color-mix(in oklab, ${r.cls === 'pirate' ? 'var(--pirate)' : r.cls === 'refiner' ? 'var(--refiner)' : r.cls === 'forge' ? 'var(--forge)' : 'var(--sync)'} 35%, transparent)` }}>{r.name}</p>
                <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: r.tag === 'Open' ? 'var(--pirate)' : 'var(--fg-faint)' }}>{r.tag}</span>
              </div>
              <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>{r.desc}</p>
              <div className="hairline-t pt-3 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider" style={{ color: 'var(--fg-faint)' }}>@{r.who}</span>
                <span className="text-[11px] font-mono" style={{ color: r.tag === 'Open' ? 'var(--pirate)' : 'var(--fg-faint)' }}>↑ {r.votes} VOTUS</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
