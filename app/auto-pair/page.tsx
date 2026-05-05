import Link from 'next/link';

export const metadata = {
  title: 'Auto-Pair Protocol — DuoDrive.Live',
  description: 'A matchmaking layer for Vibe Coders. Algorithmic pairing suggestions, voted by the community with VOTUS.',
};

const SAMPLE_PAIRS = [
  {
    pirate: { name: 'ThePrimeagen', stack: 'Neovim · Rust', vibe: 'visceral keystrokes', score: 0.92 },
    refiner: { name: 'rune.dash', stack: 'TypeScript · Schema', vibe: 'API as product', score: 0.92 },
    why: 'A high-velocity Pirate paired with a discipline-first Refiner. ThePrimeagen would prototype rapid, rune would land the contracts. The energy gap is the asset.',
    votus: 142,
    status: 'open',
  },
  {
    pirate: { name: 'Tsoding', stack: 'C · Compilers', vibe: 'low-level genius', score: 0.88 },
    refiner: { name: 'opal.dash', stack: 'Patterns · Templates', vibe: 'recursive curator', score: 0.88 },
    why: 'Tsoding builds compilers from scratch. Opal turns one-off masterpieces into reusable templates. A library of "Tsoding starter kits" would unlock generations of curious learners.',
    votus: 88,
    status: 'open',
  },
  {
    pirate: { name: 'midudev', stack: 'JS · React · Spanish', vibe: 'community velocity', score: 0.85 },
    refiner: { name: 'symble.dash', stack: 'Protocol · Story', vibe: 'spec-sketcher', score: 0.85 },
    why: 'midudev has 410K followers and a co-coding community. Symble has the protocol-language to turn that audience into Initium contributors. A Spanish-language Veros.IO showcase Initium would be magic.',
    votus: 64,
    status: 'open',
  },
  {
    pirate: { name: 'fasterthanlime', stack: 'Rust · Systems', vibe: 'surgical clarity', score: 0.81 },
    refiner: { name: 'kato.dash', stack: 'Dash Platform', vibe: 'data contract devotee', score: 0.81 },
    why: 'Both go deep. fasterthanlime debugs Rust packages live; kato.dash lives in the Dash data contract spec. Together they could ship the first reference Rust client for Veros.IO subscriptions.',
    votus: 51,
    status: 'paired',
  },
];

const FACTORS = [
  { label: 'Stack overlap', body: 'Languages and runtimes that complement (not duplicate). Looks for a 30-70% overlap — enough to collaborate, not so much that they\'re the same person.', weight: 0.22 },
  { label: 'Cadence fit', body: 'A high-velocity Pirate should pair with a steady Refiner. Both fast or both slow tends to burn out. Cadence is measured by commit frequency + stream length.', weight: 0.18 },
  { label: 'Role complement', body: 'Prompt-driven thinker × ship-driven shipper. The most reliable pairing pattern in the data.', weight: 0.20 },
  { label: 'Community resonance', body: 'Do their existing audiences already cross-pollinate? Cross-references in chat, mentioned together, similar VOTUS staking patterns.', weight: 0.14 },
  { label: 'Stated openness', body: 'Both opted in to auto-pair recommendations. Hard-set: no pairings without explicit consent.', weight: 0.16 },
  { label: 'Time-zone overlap', body: 'A pair needs at least 4 working hours of overlap. Pre-filter, not a soft factor.', weight: 0.10 },
];

export default function AutoPair() {
  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-12 reveal">
        <p className="chip mx-auto mb-5 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
          Auto-Pair Protocol · v0.1
        </p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          Find the duo<br /><span className="twin-text">you didn't know you needed.</span>
        </h1>
        <p className="mt-4 text-[15px] max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          A matchmaking layer for Vibe Coders. The algorithm watches who's building what — across DuoDrive Initiums and the relayed live coders on GoodVibeStream — and proposes Avari Sync pairings. The community votes the suggestions up with VOTUS.
        </p>
      </header>

      {/* Sample pair recommendations */}
      <section className="mb-14 reveal">
        <p className="chip mb-3 inline-flex" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}>
          ✦ Pair recommendations · this week
        </p>
        <h2 className="font-light text-[clamp(22px,3.4vw,36px)] tracking-tight leading-tight mb-6">
          Algorithm proposes. <span className="twin-text">Community votes.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {SAMPLE_PAIRS.map((p, i) => (
            <article key={i} className="hairline rounded-2xl glass p-5 lift reveal" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: p.status === 'open' ? 'var(--pirate)' : 'var(--sync)' }}>
                  {p.status === 'open' ? '· suggested' : '✓ paired'}
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--forge)' }}>
                  match {Math.round(p.pirate.score * 100)}%
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center mb-4">
                <Member m={p.pirate} side="pirate" />
                <span className="text-[20px]" style={{ color: 'var(--sync)' }}>×</span>
                <Member m={p.refiner} side="refiner" />
              </div>

              <p className="text-[13px] leading-relaxed mb-4 hairline-t pt-3" style={{ color: 'var(--fg-muted)' }}>
                <span className="font-mono text-[10px] tracking-wider uppercase mr-2" style={{ color: 'var(--sync)' }}>why</span>
                {p.why}
              </p>

              <div className="hairline-t pt-3 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider uppercase" style={{ color: 'var(--forge)' }}>
                  ↑ {p.votus} VOTUS staked
                </span>
                <button
                  className="text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full hairline transition-colors hover:[color:var(--forge)]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  Stake to amplify
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How the algorithm works */}
      <section className="mb-14 reveal">
        <p className="chip mb-3 inline-flex" style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 35%, transparent)' }}>
          The factors
        </p>
        <h2 className="font-light text-[clamp(22px,3.4vw,36px)] tracking-tight leading-tight mb-6">
          Six signals. <span className="twin-text">Weighted, transparent.</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {FACTORS.map((f, i) => (
            <div key={f.label} className="hairline rounded-xl glass p-5 reveal" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-mono tracking-wider uppercase" style={{ color: 'var(--pirate)' }}>{f.label}</p>
                <p className="text-[11px] font-mono" style={{ color: 'var(--forge)' }}>weight {Math.round(f.weight * 100)}%</p>
              </div>
              <div className="h-1 rounded-full overflow-hidden mb-2.5" style={{ background: 'var(--hairline)' }}>
                <div className="h-full" style={{ width: `${f.weight * 100 / 0.22 * 100}%`, background: 'linear-gradient(90deg, var(--pirate), var(--forge))', maxWidth: '100%' }} />
              </div>
              <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The pipeline */}
      <section className="mb-14 reveal">
        <p className="chip mb-3 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
          The pipeline
        </p>
        <h2 className="font-light text-[clamp(22px,3.4vw,36px)] tracking-tight leading-tight mb-6">
          Four steps. <span className="twin-text">Always opt-in.</span>
        </h2>
        <ol className="space-y-3">
          {[
            { t: 'Observe', b: 'Watch building patterns across DuoDrive Initiums + relayed GoodVibeStream channels. No tracking outside opt-in.' },
            { t: 'Score', b: 'Compute the 6-factor compatibility score for every pirate ↔ refiner candidate. Only suggest pairs above 0.7.' },
            { t: 'Whisper', b: 'Surface the suggestion in Davara\'s Notebook (no public ranking yet). The two builders see it before anyone else.' },
            { t: 'Open', b: 'If both builders thumbs-up, the suggestion enters the public feed. Community stakes VOTUS to amplify the most resonant pairings.' },
          ].map((s, i) => (
            <li key={s.t} className="hairline rounded-xl glass p-5 lift reveal" style={{ animationDelay: `${i * 0.05}s` }}>
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase mb-1" style={{ color: 'var(--pirate)' }}>· 0{i + 1}</p>
              <p className="font-medium text-[16px] mb-1" style={{ color: 'var(--fg)' }}>{s.t}</p>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{s.b}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="text-center reveal">
        <Link
          href="/rn/goodvibestream"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full hairline glass text-[12px] font-mono tracking-wider uppercase transition-colors hover:[color:var(--sync)]"
          style={{ color: 'var(--fg)' }}
        >
          <span className="live-dot" />
          See it running on GoodVibeStream →
        </Link>
      </div>
    </div>
  );
}

function Member({ m, side }: { m: { name: string; stack: string; vibe: string }; side: 'pirate' | 'refiner' }) {
  const color = side === 'pirate' ? 'var(--pirate)' : 'var(--refiner)';
  return (
    <div className="text-center">
      <div
        className="w-12 h-12 rounded-full halo halo-rotating mx-auto mb-2"
        style={{ background: side === 'pirate' ? 'linear-gradient(135deg, var(--pirate), var(--sync))' : 'linear-gradient(135deg, var(--refiner), var(--sync))' }}
      />
      <p className="text-[13px] font-medium leading-tight" style={{ color: 'var(--fg)' }}>{m.name}</p>
      <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color }}>{m.stack}</p>
      <p className="text-[11px] italic mt-0.5" style={{ color: 'var(--fg-faint)' }}>{m.vibe}</p>
    </div>
  );
}
