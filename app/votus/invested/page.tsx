import Link from 'next/link';
import { VotusInvestments } from '@/components/VotusInvestments';

export const metadata = {
  title: 'VOTUS Invested · Jordash × Davara — DuoDrive.Live',
  description: 'How much the community has put behind this Initium. Live telemetry of crowdfunded conviction.',
};

export default function Invested() {
  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-10">
        <p className="chip chip-forge mx-auto mb-5 inline-flex">VOTUS Investments</p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          Community<br /><span className="twin-text">conviction, live.</span>
        </h1>
        <p className="text-white/55 mt-4 text-[15px] max-w-xl mx-auto">
          A real-time view of what the Cortex has staked behind <span className="text-pirate">Jordash</span> × <span className="text-refiner">Davara</span>'s Initium. Conviction with skin in it.
        </p>
      </header>

      <VotusInvestments />

      <hr className="my-16 border-hairline" />

      <section className="max-w-3xl mx-auto">
        <p className="chip chip-forge mb-4 inline-flex">How investments route</p>
        <h2 className="font-light text-[clamp(24px,3.6vw,40px)] tracking-tight mb-6">
          Stake amplifies. <span className="twin-text">Contribution earns.</span>
        </h2>
        <div className="space-y-3 text-[14px] leading-relaxed text-white/70">
          <p>
            VOTUS staked behind an Initium does <span className="text-forge">two things</span> — and only two.
          </p>
          <ol className="space-y-2 list-none">
            <li className="hairline rounded-xl p-4 bg-slab/30">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-pirate">01 · Amplify</span>
              <p className="text-[14px] mt-1">Stakes route the Initium up the DuoDrive feed. Direction-only — no number theater.</p>
            </li>
            <li className="hairline rounded-xl p-4 bg-slab/30">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-refiner">02 · Pool</span>
              <p className="text-[14px] mt-1">Stakes pool into a Two-Key vault held by the duo. When the Initium ships, rewards route to the Cortex by <span className="text-forge">logged contribution</span> — not by stake size.</p>
            </li>
          </ol>
          <p className="text-[12px] font-mono tracking-wider uppercase text-white/40 mt-4">
            Stakers don't get paid for staking. Builders get paid for building.
          </p>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link href="/live/jordash-x-davara" className="text-[12px] font-mono tracking-wider uppercase text-white/55 hover:text-forge transition-colors">
          ← Back to the Stream Room
        </Link>
      </div>
    </div>
  );
}
