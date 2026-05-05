'use client';

const FOUNDERS = [
  {
    name: 'Jack Dorsey',
    title: 'Co-founder · Veros.IO · Block / Square / Twitter',
    quote: 'Payments should be a protocol, not a permission slip. Cards were a hack on top of trust we never built. Veros builds the trust first.',
    contribution: 'Champion of bitcoin-native commerce; brings two decades of payments infrastructure (Square, Cash App). Pushes Veros to default-permissionless and merchant-first.',
    accent: 'pirate',
    initials: 'JD',
  },
  {
    name: 'Jimmy Donaldson',
    title: 'Co-founder · Veros.IO · MrBeast / Beast Industries',
    quote: 'A creator with a million subscribers can\'t accept a recurring $5 from each one without giving 30% to a middleman. That is broken. Veros fixes it.',
    contribution: 'Creator-economy lens. Designs Veros from the perspective of audiences paying creators directly — fee-free, revocable, transparent. Insists every subscription be human-readable in 5 seconds.',
    accent: 'forge',
    initials: 'JM',
  },
  {
    name: 'Lukas Schor',
    title: 'Co-founder · Veros.IO · ex-Safe / Gnosis Safe co-founder',
    quote: 'Account abstraction without consumer-grade UX is theater. Subscriptions are the first payment primitive that gets normal people on-chain without them noticing.',
    contribution: 'Smart-account infrastructure expertise (Safe). Architects the Veros multi-sig + recovery flows. Designs Two-Key Subscriptions \u2014 spouses, business partners, civic groups can co-sign sub-contracts.',
    accent: 'sync',
    initials: 'LS',
  },
  {
    name: 'Nassim Nicholas Taleb',
    title: 'Co-founder · Veros.IO · Antifragile · Empirica Capital',
    quote: 'A payment system that breaks under stress is a payment system that hasn\'t been stressed. Veros must be antifragile by construction \u2014 every revocation, dispute, and hedge makes it stronger.',
    contribution: 'Risk + antifragility advisor. Stress-tests every Veros primitive against Black Swan failure modes. Designed the 24h-revocation-window rule and the FX-hedging buffer logic.',
    accent: 'refiner',
    initials: 'NT',
  },
];

const VALUES = [
  { t: 'Security from first principles', b: 'No payments tech inherited from the card era. Veros starts with the threat model and works outward. Every primitive is provably correct or it doesn\'t ship.' },
  { t: 'Privacy at the protocol layer', b: 'ZK proofs over subscription metadata. The chain validates the contract; the world doesn\'t see who pays whom for what. Privacy is default, not premium.' },
  { t: 'Human-readable contracts', b: 'A subscription should be one English sentence. "$5 to @jordash every Monday until I revoke." If you can\'t read it out loud, the contract isn\'t shipping.' },
  { t: 'Antifragile under stress', b: 'Every part of Veros gets stronger from edge cases — chargebacks, disputes, network forks, FX shocks. Designed to thrive on volatility, not survive despite it.' },
  { t: 'No protocol take-rate', b: 'The contract layer is free + open + forkable. Veros earns by hosting the pretty layer (UX, alerts, customer support, FX hedging). Aligned by design.' },
  { t: 'Dash + Cosmos, no chain religion', b: 'Dash Platform for L1 settlement. Cosmos IBC for cross-chain payouts. Roadmap to Bitcoin via Liquid + Noble for fiat rails. The user doesn\'t see the chain.' },
];

export function VerosFounders() {
  return (
    <section className="my-6 hairline rounded-2xl glass-frosted p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 iridescent opacity-30 pointer-events-none" />
      <div className="relative">
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <p
              className="chip mb-2 inline-flex"
              style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}
            >
              ✦ Veros.IO Founders
            </p>
            <h2 className="font-light text-[clamp(22px,3.4vw,38px)] tracking-tight leading-tight">
              Four builders. <span className="twin-text">One thesis.</span>
            </h2>
            <p className="text-[13px] mt-1.5 max-w-2xl leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              Veros.IO is built by four founders with one shared belief: payments should be a protocol, not a permission slip. Designed from first principles on Dash Platform + Cosmos Network, with security reimagined and privacy at the protocol layer.
            </p>
          </div>
          <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            preview · proposal data
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {FOUNDERS.map((f) => {
            const accent =
              f.accent === 'pirate' ? 'var(--pirate)' :
              f.accent === 'refiner' ? 'var(--refiner)' :
              f.accent === 'forge' ? 'var(--forge)' :
              'var(--sync)';
            return (
              <article
                key={f.name}
                className="hairline rounded-xl glass p-5 lift"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-[14px] shrink-0 halo halo-rotating"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, color-mix(in oklab, ${accent} 40%, var(--surface-solid)))`,
                      color: '#FFFFFF',
                      textShadow: '0 1px 2px rgba(0,0,0,0.25)',
                    }}
                  >
                    {f.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium leading-tight" style={{ color: 'var(--fg)' }}>{f.name}</p>
                    <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: accent }}>{f.title}</p>
                  </div>
                </div>
                <blockquote className="text-[13px] italic leading-relaxed mb-3 hairline-l-2 pl-3 border-l" style={{ color: 'var(--fg)', borderColor: `color-mix(in oklab, ${accent} 35%, transparent)` }}>
                  <span style={{ color: accent, opacity: 0.7 }}>“</span>{f.quote}<span style={{ color: accent, opacity: 0.7 }}>”</span>
                </blockquote>
                <p className="text-[12px] leading-relaxed hairline-t pt-3" style={{ color: 'var(--fg-muted)' }}>
                  <span className="font-mono text-[10px] tracking-wider uppercase mr-1" style={{ color: accent }}>contribution</span>
                  {f.contribution}
                </p>
              </article>
            );
          })}
        </div>

        <div className="hairline rounded-xl p-5" style={{ background: 'var(--surface)' }}>
          <p
            className="chip mb-3 inline-flex"
            style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 35%, transparent)' }}
          >
            Founding values · the six holds
          </p>
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
            {VALUES.map((v, i) => (
              <div key={v.t} className="flex gap-3">
                <span className="font-mono text-[10px] tracking-wider uppercase shrink-0 w-6 mt-1" style={{ color: 'var(--forge)' }}>0{i + 1}</span>
                <div>
                  <p className="text-[13px] font-medium" style={{ color: 'var(--fg)' }}>{v.t}</p>
                  <p className="text-[12px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{v.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
