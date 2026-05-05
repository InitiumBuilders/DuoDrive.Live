import Link from 'next/link';

export const metadata = {
  title: 'Dash × DuoDrive — DuoDrive.Live',
  description: 'A proposal for partnership between DuoDrive and the Dash community. Built on Dash Platform, paid in DASH, governed by VOTUS.',
};

const REVENUE_MODELS = [
  {
    name: 'Veros.IO subscriptions take rate',
    desc: 'A 0.4% fee on Veros.IO subscription volume routed to the DuoDrive treasury, then distributed to active Initiums by Forge contribution.',
    leverage: 'Aligned: more subscriptions = more Dash adoption = more DuoDrive treasury. The product\'s success funds the platform that birthed it.',
    order: '1',
    cls: 'pirate',
  },
  {
    name: 'Initium Royalties (opt-in)',
    desc: 'When an Initium ships a paid product, 1% of revenue (capped at $10k/mo) routes to DuoDrive\'s treasury for as long as the duo continues using the platform. Opt-in, not extractive.',
    leverage: 'Loyalty by reciprocity. Duos stay because the platform earns with them, not from them.',
    order: '2',
    cls: 'sync',
  },
  {
    name: 'Two-Key Vault premium',
    desc: 'Free vaults up to 100MB. Premium tier ($5/mo paid in DASH via Veros) gives unlimited storage, off-chain mirroring, and revoke-time-window extensions.',
    leverage: 'Only charges the duos who *need* the heavy primitive — the rest stay free. Storage scales with conviction, not with feature creep.',
    order: '3',
    cls: 'forge',
  },
  {
    name: 'Sponsored Cortex Roles (transparent ads)',
    desc: 'Dash Foundation or Dash-aligned tools can sponsor a specific Cortex helper role (e.g. "Solidity Pirate sponsored by Dash Platform"). VOTUS reward boost goes to the helper. Sponsor is logged + visible.',
    leverage: 'Honest sponsorship at the contribution layer, not the eyeball layer. No banner ads. No tracking. The room knows who paid.',
    order: '4',
    cls: 'refiner',
  },
  {
    name: 'Masternode Civic-Tier Unlock',
    desc: 'Dash masternode operators can stake their masternode rewards into a DuoDrive civic pool. Pool funds free Initiums + free Veros subscriptions for nonprofits + civic projects. Masternode operators get reputation badges visible across DuoDrive and Veros.',
    leverage: 'Turns Dash\'s own infrastructure into a civic patronage layer. Masternode operators become publicly-credited builders of public goods.',
    order: '5',
    cls: 'sync',
  },
  {
    name: 'VOTUS issuance + DASH reserve',
    desc: 'A fraction of each VOTUS issuance (5%) is matched by a DASH treasury allocation locked in a transparent reserve. VOTUS holders can redeem to DASH at the floor price, capped per epoch — a Dash-collateralized stability mechanism without a central peg.',
    leverage: 'VOTUS gets a credible floor without claiming to be a stablecoin. DASH gets a deeply-aligned token that can\'t collapse against it.',
    order: '6',
    cls: 'forge',
  },
];

const PROPOSAL = [
  {
    n: '01',
    title: 'Build VOTUS as a native Dash Platform token',
    body: 'Use Dash Evolution data contracts to mint VOTUS. Subscriptions paid via Veros.IO. Identity rooted in Dash EVO ID. DuoDrive does not run its own chain — it runs on Dash.',
    color: 'var(--pirate)',
  },
  {
    n: '02',
    title: 'Co-launch Veros.IO as a flagship Initium',
    body: 'The Veros.IO Initium (Symble × Kato) becomes the first non-DuoDrive product fully built on the platform. It serves as the Dash Subscriptions reference implementation — opensource, MIT, governed by VOTUS.',
    color: 'var(--sync)',
  },
  {
    n: '03',
    title: 'A Dash community Cortex',
    body: 'A persistent Cortex role pool funded by the Dash community + masternodes. Dash-aligned helpers (Rust devs, Platform engineers, Dash native designers) get matched to Initiums building on Dash. Reputation portable across DuoDrive.',
    color: 'var(--refiner)',
  },
  {
    n: '04',
    title: 'Dash-funded grant track',
    body: 'A monthly $5K-$25K USD-equivalent (paid in DASH) grant pool, vote-allocated by Dash holders + DuoDrive Cortex, funding Initiums that build on Dash. Pirate-Refiner duos can pre-apply with one paragraph + a stream date.',
    color: 'var(--forge)',
  },
  {
    n: '05',
    title: 'Quarterly co-broadcast',
    body: 'A live "State of Dash × DuoDrive" stream every quarter — Jordash + Davara + a Dash core dev — reviewing what shipped, what staked, what got funded. Public, archived, opensource.',
    color: 'var(--sync)',
  },
];

export default function DashPartnership() {
  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-12 reveal">
        <p className="chip mx-auto mb-5 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
          Dash × DuoDrive · Proposal
        </p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          Two flames.<br /><span className="twin-text">One masternode network.</span>
        </h1>
        <p className="mt-5 text-[16px] max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          A formal proposal for collaboration between DuoDrive.Live and the Dash community. We are not building on top of Dash. We are building <em className="not-italic" style={{ color: 'var(--fg)' }}>with</em> Dash — at the data contract, identity, and treasury layer.
        </p>
      </header>

      {/* Premise */}
      <section className="hairline rounded-2xl glass-frosted p-6 md:p-8 mb-10 relative overflow-hidden reveal">
        <div className="absolute inset-0 iridescent opacity-40 pointer-events-none" />
        <div className="relative">
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--sync)' }}>The premise</p>
          <p className="font-light text-[clamp(18px,2.6vw,28px)] leading-[1.35] tracking-tight" style={{ color: 'var(--fg)' }}>
            Dash has the rails most chains pretend to. <span className="twin-text font-medium">Instant settlement, masternode governance, on-chain identity, and a working data contract layer.</span> What it lacks is a high-velocity public showcase of what those rails can do. DuoDrive becomes that showcase.
          </p>
          <p className="mt-4 text-[14px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            Every Initium broadcast on DuoDrive that uses Dash primitives is a public proof-of-concept for the network. Every duo paid in DASH (via Veros.IO subscriptions) is a real wage paid in Dash. Every VOTUS minted on Dash Platform is a vote that lives on a chain Dash already owns.
          </p>
        </div>
      </section>

      {/* The 5-point proposal */}
      <section className="mb-12">
        <p className="chip mb-5 inline-flex" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}>
          The five-point proposal
        </p>
        <ol className="space-y-3">
          {PROPOSAL.map((p, i) => (
            <li key={p.n} className="hairline rounded-xl glass p-5 md:p-6 lift reveal" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-start gap-4 md:gap-5">
                <span className="text-[11px] font-mono tracking-wider uppercase shrink-0 w-8" style={{ color: p.color }}>· {p.n}</span>
                <div className="flex-1">
                  <p className="font-medium text-[16px] md:text-[17px] mb-1.5" style={{ color: 'var(--fg)' }}>{p.title}</p>
                  <p className="text-[13px] md:text-[14px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{p.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Revenue brainstorm */}
      <section className="mb-12">
        <div className="flex items-end justify-between mb-5 flex-wrap gap-2">
          <div>
            <p className="chip mb-2 inline-flex" style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 35%, transparent)' }}>
              Revenue brainstorm — six leverage models
            </p>
            <h2 className="font-light text-[clamp(24px,3.6vw,40px)] tracking-tight leading-tight">
              How DuoDrive × Dash <span className="twin-text">earns together.</span>
            </h2>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {REVENUE_MODELS.map((m, i) => (
            <article key={m.name} className="hairline rounded-xl glass p-5 lift reveal flex flex-col" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-[10px] font-mono tracking-wider uppercase rounded-full px-2 py-0.5"
                  style={{
                    color:
                      m.cls === 'pirate' ? 'var(--pirate)' :
                      m.cls === 'refiner' ? 'var(--refiner)' :
                      m.cls === 'forge' ? 'var(--forge)' : 'var(--sync)',
                    background: 'var(--surface)',
                    border: `1px solid color-mix(in oklab, ${
                      m.cls === 'pirate' ? 'var(--pirate)' :
                      m.cls === 'refiner' ? 'var(--refiner)' :
                      m.cls === 'forge' ? 'var(--forge)' : 'var(--sync)'
                    } 35%, transparent)`,
                  }}
                >
                  Model {m.order}
                </span>
              </div>
              <h3 className="font-medium text-[16px] mb-2 leading-tight" style={{ color: 'var(--fg)' }}>
                {m.name}
              </h3>
              <p className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--fg-muted)' }}>
                {m.desc}
              </p>
              <p className="text-[11px] leading-relaxed mt-auto hairline-t pt-3 italic" style={{ color: 'var(--fg-faint)' }}>
                <span className="font-mono not-italic tracking-wider uppercase mr-1" style={{ color: 'var(--forge)' }}>Leverage</span> {m.leverage}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* The contract */}
      <section className="hairline rounded-2xl glass p-6 md:p-8 mb-12 reveal">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
          <p className="chip" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
            The contract — short version
          </p>
          <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            draft v0.1 · open to whisper
          </span>
        </div>
        <ul className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          {[
            ['DuoDrive commits to', 'building VOTUS, Two-Key Drive, and Veros.IO on Dash Platform; broadcasting partner moments quarterly; opensource MIT.'],
            ['Dash community commits to', 'a $5K-$25K/mo grant pool for Dash-native Initiums; a Cortex role pool funded by masternodes; co-promotion of Veros.IO subscription standard.'],
            ['Joint primitive', 'Dash EVO ID becomes the default identity for DuoDrive accounts. Two-Key Drive uses Dash data contracts as the storage layer.'],
            ['Revenue split', 'DuoDrive collects fees on Veros volume; routes 30% back to a Dash community treasury for masternode + grant funding. Auditable on-chain.'],
            ['Exit clause', 'Either party may exit the partnership with 60 days notice. All Dash-native code remains opensource and MIT licensed regardless.'],
          ].map(([k, v]) => (
            <li key={k} className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-4 hairline-b pb-3 last:border-b-0">
              <span className="text-[11px] font-mono tracking-wider uppercase" style={{ color: 'var(--pirate)' }}>{k}</span>
              <span style={{ color: 'var(--fg)' }}>{v}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Veros.IO call-out */}
      <Link
        href="/rn/symble-x-kato"
        className="block hairline rounded-2xl glass-frosted p-6 md:p-8 lift relative overflow-hidden reveal group"
      >
        <div className="absolute inset-0 iridescent opacity-30 pointer-events-none" />
        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="chip mb-3 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
              <span className="live-dot mr-1.5" />
              Live now · INI-014
            </p>
            <h3 className="font-light text-[clamp(20px,3vw,32px)] tracking-tight leading-tight" style={{ color: 'var(--fg)' }}>
              Watch <span className="twin-text font-medium">Symble × Kato</span> build Veros.IO live.
            </h3>
            <p className="mt-2 text-[14px] max-w-xl leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Dash Subscriptions, the safe way. Subscribe-once, pay on schedule in DASH, with revoke + escrow primitives. The reference implementation Dash has been waiting for.
            </p>
          </div>
          <span className="text-[12px] font-mono tracking-wider uppercase opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--sync)' }}>
            enter the room →
          </span>
        </div>
      </Link>

      <div className="mt-10 text-center text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--fg-faint)' }}>
        Acta Non Verba · Built And Envisioned By The Davara.DEV Community
      </div>
    </div>
  );
}
