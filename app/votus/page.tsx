import Link from 'next/link';

export const metadata = {
  title: 'VOTUS — DuoDrive.Live',
  description: 'The building-and-voting token for DuoDrive. Built on Dash Platform. Earn by contributing. Stake to amplify. Bet on KPIs.',
};

export default function Votus() {
  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-12 reveal">
        <p className="chip mx-auto mb-5 inline-flex" style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 35%, transparent)' }}>
          VOTUS · The building-and-voting token
        </p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          Coding values<br /><span className="twin-text">into money.</span>
        </h1>
        <p className="mt-5 text-[15px] max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          VOTUS is the token that makes "build in public" pay rent. Built on Dash Platform. Earned by contributing. Staked to amplify. Bet on KPIs. Routed back to builders by logged work — never to stakers.
        </p>
      </header>

      {/* Live rate strip */}
      <section className="hairline rounded-2xl glass-frosted p-5 md:p-6 mb-10 relative overflow-hidden reveal">
        <div className="absolute inset-0 iridescent opacity-30 pointer-events-none" />
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="VOTUS / DASH" value="0.00386" suffix="DASH per VOTUS" tone="forge" sub="≈ $0.11 USD" />
          <Stat label="Y1 target" value="0.0085" suffix="DASH per VOTUS" tone="sync" sub="2.2x · contribution-driven" />
          <Stat label="Y3 model" value="0.024" suffix="DASH per VOTUS" tone="pirate" sub="6.2x · scale + utility" />
          <Stat label="Treasury floor" value="22%" suffix="DASH-collateralized" tone="refiner" sub="redeemable per epoch" />
        </div>
      </section>

      {/* What VOTUS means */}
      <section className="mb-12 grid md:grid-cols-2 gap-3 reveal">
        <div className="hairline rounded-xl glass p-6 lift">
          <p className="chip mb-3 inline-flex" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}>
            What VOTUS actually means
          </p>
          <ul className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'var(--fg)' }}>
            <li><strong style={{ color: 'var(--pirate)' }}>VOTUS is conviction with a receipt.</strong> Every staked VOTUS is a public, on-chain bet that an Initium will land.</li>
            <li><strong style={{ color: 'var(--sync)' }}>VOTUS is voice with skin.</strong> Avari Whispers + roadmap staking = the room\'s direction without majority-rules theater.</li>
            <li><strong style={{ color: 'var(--refiner)' }}>VOTUS is a wage for builders.</strong> When an Initium ships, the VOTUS staked behind it routes to the contributors by logged work.</li>
            <li><strong style={{ color: 'var(--forge)' }}>VOTUS is access.</strong> Burn VOTUS to mint Two-Key Drive vault unlocks, sponsor Cortex roles, fund grants.</li>
          </ul>
        </div>

        <div className="hairline rounded-xl glass p-6 lift">
          <p className="chip mb-3 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
            Built on Dash Platform — why
          </p>
          <ul className="space-y-3 text-[14px] leading-relaxed" style={{ color: 'var(--fg)' }}>
            <li><strong style={{ color: 'var(--pirate)' }}>Native data contracts.</strong> VOTUS supply, balances, vesting, and routing all live in a Dash data contract — no separate chain.</li>
            <li><strong style={{ color: 'var(--sync)' }}>Identity at L1.</strong> Dash EVO ID is the account. Two-Key Drive vaults sign with the same key.</li>
            <li><strong style={{ color: 'var(--refiner)' }}>Instant settlement.</strong> InstantSend means a stake-and-amplify action lands in &lt; 2s. The room feels live.</li>
            <li><strong style={{ color: 'var(--forge)' }}>Masternode governance.</strong> A path to civic-tier subsidies and grant pools without inventing new infrastructure.</li>
          </ul>
        </div>
      </section>

      {/* Tokenomics — emission */}
      <section className="hairline rounded-2xl glass p-6 md:p-8 mb-12 reveal">
        <div className="flex items-end justify-between mb-5 flex-wrap gap-2">
          <div>
            <p className="chip mb-2 inline-flex" style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 35%, transparent)' }}>
              Emission model · 100M VOTUS lifetime cap
            </p>
            <h2 className="font-light text-[clamp(22px,3.4vw,36px)] tracking-tight leading-tight">
              Earn-first. <span className="twin-text">No allocation drama.</span>
            </h2>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { pct: 50, label: 'Contribution pool', body: 'Earned by builders & Cortex helpers via logged work. Auto-routed when Initiums ship.', color: 'var(--pirate)' },
            { pct: 18, label: 'Watcher curiosity pool', body: 'Earned by spending time in the room without staking. Rewards lurkers becoming builders. Caps at 30 VOTUS / month.', color: 'var(--sync)' },
            { pct: 14, label: 'Initium grant treasury', body: 'Funds outlier Initiums voted up by Cortex. Distributed quarterly.', color: 'var(--refiner)' },
            { pct: 10, label: 'Dash community treasury', body: 'Routed back to Dash via masternode-funded grants and civic-tier subsidies.', color: 'var(--forge)' },
            { pct: 5, label: 'Founders & core team', body: 'Jordash + Davara + early Cortex. 4-year vesting, 1-year cliff.', color: 'var(--sync)' },
            { pct: 3, label: 'DASH stability reserve', body: 'Locked in transparent reserve, collateralizes the redemption floor.', color: 'var(--forge)' },
          ].map((s, i) => (
            <div key={s.label} className="hairline-b last:border-b-0 pb-3 last:pb-0">
              <div className="flex items-center justify-between mb-1.5 text-[13px]">
                <span style={{ color: 'var(--fg)' }}>{s.label}</span>
                <span className="font-mono text-[12px]" style={{ color: s.color }}>{s.pct}%</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden mb-1.5" style={{ background: 'var(--hairline)' }}>
                <div className="h-full" style={{ width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}, color-mix(in oklab, ${s.color} 40%, transparent))` }} />
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Outlier mechanisms */}
      <section className="mb-12 reveal">
        <p className="chip mb-3 inline-flex" style={{ color: 'var(--refiner)', borderColor: 'color-mix(in oklab, var(--refiner) 35%, transparent)' }}>
          Outlier mechanisms · the Davara-distinct moves
        </p>
        <h2 className="font-light text-[clamp(22px,3.4vw,36px)] tracking-tight leading-tight mb-6">
          Six unfair advantages <span className="twin-text">baked into the token.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { t: 'Direction-only voting (Avari Whispers)', b: 'Every poll shows direction, not numbers, until the duo opens the box. Removes bandwagon bias by construction. No chain has shipped this.' },
            { t: 'Contribution-routed rewards (Goodhart-resistant)', b: 'Stakers don\'t get paid for staking. Builders get paid for building. The token can\'t be farmed by adding numbers — only by adding work.' },
            { t: 'Dual-mint (70% builders / 30% lurker-curiosity)', b: 'Watchers who spend time without staking earn a passive curiosity yield. The lurker pipeline becomes the contributor pipeline.' },
            { t: 'Forge Streak multiplier', b: '30 consecutive ship-days gives the duo a 1.5x routing bonus on VOTUS earned. Hard cap at 1.8x at 60 days. Streaks compound; burnout is capped.' },
            { t: 'Cortex Reputation Bond', b: 'Helpers stake VOTUS on their own work. If they ghost, the bond pays the duo back. Skin-in-game for contributors, not just stakers.' },
            { t: 'DASH-collateralized floor', b: '5% of issuance is matched by a DASH treasury allocation locked in a transparent reserve. VOTUS holders can redeem to DASH at the floor price, capped per epoch.' },
          ].map((m, i) => (
            <div key={m.t} className="hairline rounded-xl glass p-5 lift" style={{ animationDelay: `${i * 0.05}s` }}>
              <p className="font-medium text-[14px] mb-1.5" style={{ color: 'var(--fg)' }}>{m.t}</p>
              <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{m.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Growth curve */}
      <section className="hairline rounded-2xl glass p-6 md:p-8 mb-12 reveal">
        <p className="chip mb-3 inline-flex" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}>
          Growth & scale model
        </p>
        <h2 className="font-light text-[clamp(22px,3.4vw,36px)] tracking-tight leading-tight mb-6">
          The S-curve that doesn't lie. <span className="twin-text">Conviction-driven, not speculation-driven.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-3 text-[13px]">
          {[
            { stage: 'Y0 — Seed', users: '~200 builders', votus: '0.0039 DASH', bullets: ['Bootstrapped Cortex roles', 'First 50 Initiums', 'Dash community Cortex pilot'] },
            { stage: 'Y1 — Land', users: '~3,000 builders', votus: '0.0085 DASH', bullets: ['Veros.IO subscription rev. routing', 'First grant cohort', 'Forge Streak multiplier launch'] },
            { stage: 'Y3 — Scale', users: '~25,000 builders', votus: '0.024 DASH', bullets: ['100M VOTUS cap reached', 'Multi-Initium portfolio Cortexes', 'Civic-tier subsidies global'] },
          ].map((s) => (
            <div key={s.stage} className="hairline rounded-xl p-4" style={{ background: 'var(--surface)' }}>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase mb-2" style={{ color: 'var(--forge)' }}>{s.stage}</p>
              <p className="text-[15px] font-medium mb-1" style={{ color: 'var(--fg)' }}>{s.users}</p>
              <p className="text-[11px] font-mono" style={{ color: 'var(--sync)' }}>{s.votus}</p>
              <ul className="mt-3 space-y-1 text-[12px]" style={{ color: 'var(--fg-muted)' }}>
                {s.bullets.map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/votus/invested"
          className="text-[12px] font-mono tracking-wider uppercase px-5 py-2.5 rounded-full hairline glass transition-colors"
          style={{ color: 'var(--fg)' }}
        >
          See live investments →
        </Link>
        <Link
          href="/dash-partnership"
          className="text-[12px] font-mono tracking-wider uppercase px-5 py-2.5 rounded-full transition-colors"
          style={{
            background: 'linear-gradient(110deg, var(--pirate), var(--sync), var(--refiner))',
            color: 'var(--void)',
          }}
        >
          Read the Dash partnership →
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value, suffix, tone, sub }: { label: string; value: string; suffix: string; tone: string; sub?: string }) {
  const color = tone === 'forge' ? 'var(--forge)' : tone === 'pirate' ? 'var(--pirate)' : tone === 'sync' ? 'var(--sync)' : 'var(--refiner)';
  return (
    <div>
      <p className="text-[10px] font-mono tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--fg-faint)' }}>{label}</p>
      <p className="text-[26px] md:text-[28px] font-light leading-none" style={{ color }}>{value}</p>
      <p className="text-[10px] font-mono tracking-wider uppercase mt-1" style={{ color: 'var(--fg-faint)' }}>{suffix}</p>
      {sub && <p className="text-[11px] mt-1" style={{ color: 'var(--fg-muted)' }}>{sub}</p>}
    </div>
  );
}
