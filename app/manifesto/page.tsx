export const metadata = { title: 'Manifesto — DuoDrive.Live' };

export default function Manifesto() {
  return (
    <div className="px-5 md:px-8 max-w-3xl mx-auto pt-28 pb-20">
      <p className="chip chip-sync mx-auto mb-6 inline-flex">Manifesto</p>
      <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.02] tracking-tight mb-8">
        We build <span className="twin-text">in pairs.</span><br />
        We build <span className="twin-text">in public.</span><br />
        We build <span className="twin-text">to last.</span>
      </h1>

      <div className="space-y-6 text-[16px] leading-[1.7] text-white/75">
        <p>
          DuoDrive.Live is for builders who refuse to be alone. Not because they cannot — because they shouldn't. The world is full of solo founders running themselves into the ground to ship things that nobody wanted. We propose a different shape.
        </p>
        <p>
          <span className="twin-text font-medium">Two builders.</span> One thinks in prompts and direction. The other thinks in code and ship. The Pirate sails. The Refiner harbors. They alternate. They argue. They land.
        </p>
        <p>
          <span className="twin-text font-medium">One Initium.</span> Every product on DuoDrive is born as an Initium — named, dated, with two signers. The screen forces honesty. The Two-Key Drive forces consent. No solo kings. No silent commits.
        </p>
        <p>
          <span className="twin-text font-medium">The community drives.</span> Watchers don't watch. They join. The Cortex routes them into roles the duo actually needs. VOTUS routes the reward. The Avari Signal hides the tally until the duo asks — direction over noise. Conviction over consensus.
        </p>
      </div>

      <hr className="my-12 border-hairline" />

      <h2 className="font-light text-[28px] md:text-[36px] tracking-tight mb-6">The Eight Holds</h2>
      <ol className="space-y-4 text-[15px] leading-relaxed text-white/75 list-none">
        {HOLDS.map((h, i) => (
          <li key={h.t} className="hairline rounded-xl p-5 bg-slab/30">
            <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-pirate mb-1.5">Hold {String(i + 1).padStart(2, '0')}</p>
            <p className="font-medium text-[16px] mb-1.5">{h.t}</p>
            <p className="text-white/55">{h.b}</p>
          </li>
        ))}
      </ol>

      <hr className="my-12 border-hairline" />

      <h2 className="font-light text-[28px] md:text-[36px] tracking-tight mb-6">Governance</h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-white/75">
        <p>The duo holds the keys. The Cortex holds the questions. VOTUS holds the weight. No central admin can unilaterally close an Initium, freeze a Drive, or censor a Cortex role.</p>
        <p>Disputes resolve in three steps: <span className="text-pirate">Pause</span> (either signer halts) → <span className="text-sync">Whisper</span> (Avari Signal opens to the Cortex) → <span className="text-refiner">Anvil</span> (binding poll resolves with VOTUS-weighted majority + duo's right to fork).</p>
        <p className="text-white/55 text-[13px] font-mono tracking-wider uppercase">Forking is honorable. Forking is in the spec.</p>
      </div>

      <p className="mt-16 text-center text-[10px] font-mono tracking-[0.25em] uppercase text-white/35">
        Acta Non Verba · Built And Envisioned By The Davara.DEV Community
      </p>
    </div>
  );
}

const HOLDS = [
  { t: 'No solo kings.', b: 'Every Initium has at least two signers. The Two-Key Drive enforces it.' },
  { t: 'No reasoning theater.', b: 'Polls resolve on the diff. Streams resolve on the ship. Contributions resolve on logged work.' },
  { t: 'Outliers welcome.', b: 'The Cortex protects the divergent voice. Consensus is a smell, not a goal.' },
  { t: 'Direction over numbers.', b: 'The Avari Signal shows direction; tallies reveal only when the duo opens the box.' },
  { t: 'Receipts > talk.', b: 'Every commit, every claim, every contribution leaves a trace.' },
  { t: 'Open source default.', b: 'MIT unless the duo and Cortex collectively choose otherwise. Then they document why.' },
  { t: 'Forking is in the spec.', b: 'If the duo splits, the Initium can fork with both lineages publicly visible.' },
  { t: 'Build with care.', b: 'Craft is how we love the user we will never meet. Refuse to ship dead things.' },
];
