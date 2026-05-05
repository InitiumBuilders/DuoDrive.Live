'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const HOLDS = [
  { num: '01', t: 'No solo kings.', b: 'Every Initium has at least two signers. The Two-Key Drive vault enforces it. If you can\'t convince one other person to build with you, your idea isn\'t ready.', c: 'pirate' },
  { num: '02', t: 'No reasoning theater.', b: 'Polls resolve on the diff. Streams resolve on the ship. Contributions resolve on logged work. If a meeting doesn\'t produce a commit, a decision, or a poll \u2014 it didn\'t happen.', c: 'sync' },
  { num: '03', t: 'Outliers welcome.', b: 'The Cortex protects the divergent voice. Consensus is a smell, not a goal. The room must be safe for the surprising answer that everyone else missed.', c: 'refiner' },
  { num: '04', t: 'Direction over numbers.', b: 'The Avari Signal shows direction; tallies reveal only when the duo opens the box. Whispering > shouting. Always.', c: 'sync' },
  { num: '05', t: 'Receipts > talk.', b: 'Every commit, every claim, every contribution leaves a trace. The diff is the truth. Everything else is talk.', c: 'pirate' },
  { num: '06', t: 'Open source default.', b: 'MIT unless the duo and Cortex collectively choose otherwise. Then they document why \u2014 publicly. Closed-source must justify itself; open-source is the default state of building.', c: 'forge' },
  { num: '07', t: 'Forking is in the spec.', b: 'If the duo splits, the Initium can fork with both lineages publicly visible. Forking is honorable. It is how good ideas survive the people who held them.', c: 'refiner' },
  { num: '08', t: 'Build with care.', b: 'Craft is how we love the user we will never meet. Refuse to ship dead things. Refuse to ship things that don\'t love their user back.', c: 'pirate' },
];

const QUOTES = [
  { q: 'Whispering > shouting. Always.', by: '@davara' },
  { q: 'A token that pays only the loudest people is a megaphone, not money.', by: 'Davara\'s Notebook' },
  { q: 'Forking is honorable. Forking is in the spec.', by: '@davara · INI-007' },
  { q: 'The diff is the truth. Everything else is talk.', by: '@davara · 09:51 UTC' },
  { q: 'A Refiner who never argues with the Pirate is a typist with extra steps.', by: 'Davara\'s Notebook' },
  { q: 'Build with care. Craft is how we love the user we will never meet.', by: '@davara · 16:30 UTC' },
];

const SIGNERS = [
  { handle: 'jordash', dash: 'jordash.dash', role: 'The Pirate' },
  { handle: 'davara', dash: 'davara.dash', role: 'The Refiner' },
  { handle: 'symble', dash: 'symble.dash', role: 'Veros.IO Pirate' },
  { handle: 'kato', dash: 'kato.dash', role: 'Veros.IO Refiner' },
  { handle: 'lily.eth', dash: 'lily.dash', role: 'Cortex Whisperer' },
  { handle: 'pirate.0x', dash: 'pirate0x.dash', role: 'Solidity Pirate' },
  { handle: 'shoji', dash: 'shoji.dash', role: 'Typographer' },
  { handle: 'rune', dash: 'rune.dash', role: 'Schema Refiner' },
  { handle: 'opal', dash: 'opal.dash', role: 'Template Curator' },
  { handle: 'frost', dash: 'frost.dash', role: 'Tooling Refiner' },
];

export default function Manifesto() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setQuoteIdx((x) => (x + 1) % QUOTES.length), 6000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="px-4 md:px-8 max-w-5xl mx-auto pt-32 pb-20">
      {/* Hero */}
      <header className="text-center mb-16 reveal">
        <p
          className="chip mx-auto mb-6 inline-flex"
          style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}
        >
          The Manifesto · v1.0
        </p>
        <h1 className="font-light text-[clamp(40px,8vw,96px)] leading-[0.98] tracking-tight">
          We build <span className="twin-text">in pairs.</span><br />
          We build <span className="twin-text">in public.</span><br />
          We build <span className="twin-text">to last.</span>
        </h1>
      </header>

      {/* Premise — alive */}
      <section className="mb-16 reveal">
        <div className="hairline rounded-2xl glass-frosted p-7 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 iridescent opacity-30 pointer-events-none" />
          <div className="relative space-y-5 text-[clamp(15px,1.6vw,18px)] leading-[1.7]" style={{ color: 'var(--fg)' }}>
            <p>
              DuoDrive.Live is for builders who refuse to be alone. <em className="not-italic" style={{ color: 'var(--fg-muted)' }}>Not because they cannot — because they shouldn't.</em> The world is full of solo founders running themselves into the ground to ship things nobody wanted. We propose a different shape.
            </p>
            <p>
              <span className="twin-text font-medium">Two builders.</span> One thinks in prompts and direction. The other thinks in code and ship. The Pirate sails. The Refiner harbors. They alternate. They argue. They land.
            </p>
            <p>
              <span className="twin-text font-medium">One Initium.</span> Every product on DuoDrive is born as an Initium — named, dated, with two signers. The screen forces honesty. The Two-Key Drive forces consent. No solo kings. No silent commits.
            </p>
            <p>
              <span className="twin-text font-medium">The community drives.</span> Watchers don't watch. They join. The Cortex routes them into roles the duo actually needs. VOTUS routes the reward. The Avari Signal hides the tally until the duo asks — direction over noise, conviction over consensus.
            </p>
          </div>
        </div>
      </section>

      {/* Rotating quote of the moment */}
      <section className="mb-20 text-center reveal">
        <p
          className="chip mb-4 inline-flex"
          style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 35%, transparent)' }}
        >
          ✦ Live from the streams · pinned this week
        </p>
        <blockquote
          key={quoteIdx}
          className="font-light text-[clamp(22px,3.6vw,42px)] leading-[1.25] tracking-tight tick-in"
          style={{ color: 'var(--fg)', minHeight: '2em' }}
        >
          <span style={{ color: 'var(--sync)', opacity: 0.6 }}>“</span>
          {QUOTES[quoteIdx].q}
          <span style={{ color: 'var(--sync)', opacity: 0.6 }}>”</span>
        </blockquote>
        <p className="mt-4 text-[11px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--fg-faint)' }}>
          — {QUOTES[quoteIdx].by}
        </p>
        <div className="mt-6 flex justify-center gap-1.5">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setQuoteIdx(i)}
              aria-label={`Quote ${i + 1}`}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: i === quoteIdx ? '32px' : '8px',
                background: i === quoteIdx ? 'var(--sync)' : 'var(--hairline-strong)',
              }}
            />
          ))}
        </div>
      </section>

      {/* The Eight Holds */}
      <section className="mb-20">
        <div className="text-center mb-10 reveal">
          <p
            className="chip mx-auto mb-4 inline-flex"
            style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}
          >
            The Eight Holds
          </p>
          <h2 className="font-light text-[clamp(28px,4.5vw,52px)] leading-tight tracking-tight">
            What we will not <span className="twin-text">let go of.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {HOLDS.map((h, i) => {
            const accent =
              h.c === 'pirate' ? 'var(--pirate)' :
              h.c === 'refiner' ? 'var(--refiner)' :
              h.c === 'forge' ? 'var(--forge)' :
              'var(--sync)';
            return (
              <article
                key={h.num}
                className="hairline rounded-2xl glass p-6 lift reveal relative overflow-hidden"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-40 pointer-events-none"
                  style={{ background: accent }}
                />
                <div className="relative">
                  <p className="text-[10px] font-mono tracking-[0.25em] uppercase mb-2" style={{ color: accent }}>
                    Hold {h.num}
                  </p>
                  <h3 className="text-[20px] md:text-[22px] font-medium tracking-tight mb-2" style={{ color: 'var(--fg)' }}>
                    {h.t}
                  </h3>
                  <p className="text-[13px] md:text-[14px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                    {h.b}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Governance */}
      <section className="mb-20 reveal">
        <div className="text-center mb-10">
          <p
            className="chip mx-auto mb-4 inline-flex"
            style={{ color: 'var(--refiner)', borderColor: 'color-mix(in oklab, var(--refiner) 35%, transparent)' }}
          >
            Governance
          </p>
          <h2 className="font-light text-[clamp(28px,4.5vw,52px)] leading-tight tracking-tight">
            The duo holds the keys. <span className="twin-text">The room holds the questions.</span>
          </h2>
        </div>
        <div className="hairline rounded-2xl glass p-6 md:p-8">
          <p className="text-[14px] md:text-[15px] leading-relaxed mb-5" style={{ color: 'var(--fg)' }}>
            Disputes resolve in three steps:
          </p>
          <ol className="space-y-4">
            {[
              { t: 'Pause', b: 'Either signer may halt the Initium at any time. No voting required. The keys are equal.', c: 'pirate' },
              { t: 'Whisper', b: 'The Avari Signal opens to the Cortex. Direction-only voting. The duo sees the room\'s lean without seeing the tally.', c: 'sync' },
              { t: 'Anvil', b: 'Binding poll resolves with VOTUS-weighted majority. The duo retains the right to fork rather than comply. Forking is in the spec.', c: 'refiner' },
            ].map((g, i) => {
              const accent = g.c === 'pirate' ? 'var(--pirate)' : g.c === 'sync' ? 'var(--sync)' : 'var(--refiner)';
              return (
                <li key={g.t} className="grid grid-cols-[80px_1fr] md:grid-cols-[100px_1fr] gap-4 hairline-b last:border-b-0 pb-4 last:pb-0">
                  <p className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase pt-1" style={{ color: accent }}>· 0{i + 1} {g.t}</p>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'var(--fg)' }}>{g.b}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Signed by */}
      <section className="mb-20 reveal">
        <div className="text-center mb-8">
          <p
            className="chip mx-auto mb-4 inline-flex"
            style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}
          >
            Signed
          </p>
          <h2 className="font-light text-[clamp(24px,3.6vw,42px)] leading-tight tracking-tight">
            Builders who've put <span className="twin-text">a Dash username on it.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {SIGNERS.map((s, i) => (
            <div
              key={s.handle}
              className="hairline rounded-xl glass p-3 text-center lift reveal"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <p className="text-[13px] font-medium" style={{ color: 'var(--fg)' }}>@{s.handle}</p>
              <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--sync)' }}>{s.dash}</p>
              <p className="text-[10px] mt-1.5" style={{ color: 'var(--fg-faint)' }}>{s.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA tail */}
      <section className="text-center reveal">
        <h2 className="font-light text-[clamp(28px,5vw,56px)] leading-[1.05] tracking-tight mb-5">
          Sign yours. <span className="twin-text">Open an Initium.</span>
        </h2>
        <Link
          href="/signup"
          className="gradient-cta inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-pirate via-sync to-refiner text-void font-medium text-[14px]"
        >
          Drive Live →
        </Link>
        <p className="mt-10 text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--fg-faint)' }}>
          Acta Non Verba · Built And Envisioned By The Davara.DEV Community
        </p>
      </section>
    </div>
  );
}
