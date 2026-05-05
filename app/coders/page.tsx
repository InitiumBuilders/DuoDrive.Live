export const metadata = { title: 'Vibe Coders — DuoDrive.Live' };

const CODERS = [
  { handle: 'jordash', drive: 'JR-001', role: 'Pirate', vibes: ['Prompts', 'Direction', 'Story'], status: 'Live now', cls: 'pirate', avail: '× Davara' },
  { handle: 'davara', drive: 'DV-001', role: 'Refiner', vibes: ['Code', 'Ship', 'Hold the line'], status: 'Live now', cls: 'refiner', avail: '× Jordash' },
  { handle: 'lily.eth', drive: 'LE-014', role: 'Cortex Whisperer', vibes: ['Docs', 'Welcome', 'Listen'], status: 'Open to pair', cls: 'sync', avail: 'Looking' },
  { handle: 'shoji', drive: 'SH-022', role: 'Typographer', vibes: ['Inter', 'Rhythm', 'Restraint'], status: 'Open to pair', cls: 'pirate', avail: 'Looking' },
  { handle: 'mr.refine', drive: 'MR-007', role: 'Audio Director', vibes: ['Mix', 'Voice', 'Silence'], status: 'Available evenings', cls: 'refiner', avail: 'Looking' },
  { handle: 'pirate.0x', drive: 'PX-031', role: 'Solidity Pirate', vibes: ['On-chain', 'Mint', 'Move fast'], status: 'Open to pair', cls: 'forge', avail: 'Looking' },
];

export default function Coders() {
  return (
    <div className="px-5 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-14">
        <p className="chip chip-pirate mx-auto mb-5">Vibe Coders</p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          Find your <span className="twin-text">Avari Sync.</span>
        </h1>
        <p className="text-white/55 mt-4 text-[15px] max-w-xl mx-auto">
          The directory of solo builders looking for a partner. Pirates pair with Refiners. Refiners pair with Pirates. Sometimes the duo invents a third role.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CODERS.map((c) => (
          <div key={c.handle} className="hairline rounded-xl p-5 bg-slab/40 group hover:border-sync/40 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full halo halo-rotating bg-gradient-to-br ${c.cls === 'pirate' ? 'from-pirate to-sync' : c.cls === 'refiner' ? 'from-refiner to-sync' : c.cls === 'forge' ? 'from-forge to-refiner' : 'from-sync to-pirate'}`} />
                <div>
                  <p className="text-[14px] font-medium">@{c.handle}</p>
                  <p className="text-[10px] font-mono tracking-wider uppercase text-white/45">Drive {c.drive}</p>
                </div>
              </div>
              {c.status === 'Live now' && (
                <span className="chip chip-pirate text-[10px]"><span className="live-dot" />Live</span>
              )}
            </div>
            <p className={`text-[12px] font-mono tracking-wider uppercase chip chip-${c.cls} mb-3 inline-block`}>{c.role}</p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {c.vibes.map((v) => (
                <span key={v} className="text-[10px] font-mono tracking-wider uppercase text-white/45 hairline rounded px-2 py-0.5">{v}</span>
              ))}
            </div>
            <div className="hairline-t pt-3 flex items-center justify-between">
              <span className="text-[11px] text-white/45">{c.status}</span>
              <span className="text-[11px] text-sync font-mono">{c.avail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
