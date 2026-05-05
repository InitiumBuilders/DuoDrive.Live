import Link from 'next/link';

export const metadata = { title: 'Initiums — DuoDrive.Live' };

const INITIUMS = [
  {
    id: 'INI-009',
    title: 'DuoDrive.Live (the platform)',
    duo: ['Jordash', 'Davara'],
    state: 'Live',
    forge: 78,
    votus: 312,
    desc: 'Building the live-streaming Vibe Coding platform on the platform itself.',
    href: '/live/jordash-x-davara',
    featured: true,
  },
  { id: 'INI-008', title: 'Avari Signal Spec', duo: ['Jordash', 'Davara'], state: 'Drafting', forge: 22, votus: 41, desc: 'Direction-only voting protocol. Borrowed from prediction markets.' },
  { id: 'INI-007', title: 'Two-Key Drive Vault', duo: ['Davara', 'Cortex'], state: 'Spec', forge: 8, votus: 88, desc: 'Files unlock with two Dash EVO ID signers + ZK proof of identity.' },
  { id: 'INI-006', title: 'Forge Meter v1', duo: ['Jordash', 'Davara'], state: 'Shipped', forge: 100, votus: 144, desc: 'Daily momentum signal. Resets at 00:00 UTC. Streaks compound.' },
  { id: 'INI-005', title: 'Cortex Roles Protocol', duo: ['Davara', 'Lily'], state: 'Open', forge: 51, votus: 92, desc: 'Self-organizing helper roles. Claim → log → earn.' },
  { id: 'INI-004', title: 'Open Source Manifesto', duo: ['Jordash', 'Davara'], state: 'Live', forge: 100, votus: 211, desc: 'MIT. Build in public. No solo kings. The values that hold.' },
];

export default function Initiums() {
  return (
    <div className="px-5 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-14">
        <p className="chip chip-sync mx-auto mb-5">Initiums</p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          Every project<br /><span className="twin-text">is a duo's drive.</span>
        </h1>
        <p className="text-white/55 mt-4 text-[15px] max-w-xl mx-auto">
          Initiums are products-in-flight. Each one has at least two signers, a Two-Key Drive vault, and a community Cortex.
        </p>
      </header>

      <div className="grid gap-3">
        {INITIUMS.map((i) => (
          <Link
            key={i.id}
            href={i.href || '#'}
            className={`hairline rounded-xl p-5 md:p-6 ${i.featured ? 'bg-gradient-to-br from-sync/15 via-slab/40 to-pirate/10' : 'bg-slab/40'} hover:border-sync/40 transition-colors group block`}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-white/40">{i.id}</span>
                  <span className={`text-[10px] font-mono tracking-wider uppercase ${i.state === 'Live' ? 'text-pirate' : i.state === 'Shipped' ? 'text-sync' : 'text-white/45'}`}>
                    {i.state === 'Live' && <span className="live-dot mr-1.5 inline-block" />}
                    {i.state}
                  </span>
                </div>
                <h2 className="text-[18px] md:text-[22px] font-medium tracking-tight group-hover:text-sync transition-colors">{i.title}</h2>
                <p className="text-[13px] text-white/55 mt-1.5 leading-relaxed">{i.desc}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono tracking-wider uppercase text-white/45">
                  <span className="text-pirate">{i.duo[0]}</span>
                  <span className="text-white/30 mx-1">×</span>
                  <span className="text-refiner">{i.duo[1]}</span>
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] font-mono tracking-wider uppercase">
              <div>
                <p className="text-white/40 mb-1">Forge</p>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="forge-bar h-full" style={{ width: `${i.forge}%` }} />
                </div>
              </div>
              <div>
                <p className="text-white/40 mb-1">VOTUS staked</p>
                <p className="text-forge">{i.votus}</p>
              </div>
              <div>
                <p className="text-white/40 mb-1">Vault</p>
                <p className="text-sync">2 / 2 keys</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link href="/signup" className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-pirate via-sync to-refiner text-void font-medium text-[14px] hover:shadow-[0_0_40px_rgba(159,124,255,0.45)] transition-shadow">
          Open Your First Initium →
        </Link>
      </div>
    </div>
  );
}
