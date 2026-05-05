import Link from 'next/link';

export const metadata = { title: 'Community Cortex — DuoDrive.Live' };

const ROLES = [
  { name: 'Typographer', who: 'shoji', tag: 'Open', votes: 24, cls: 'pirate', desc: 'Audit type rhythm. Inter only. Kill any ligature theater.' },
  { name: 'Stress Tester', who: '— need 1 —', tag: 'Open', votes: 19, cls: 'sync', desc: 'Hit /signup with 100 concurrent forms. Report what shudders.' },
  { name: 'Cortex Whisperer', who: 'lily.eth', tag: 'Claimed', votes: 41, cls: 'refiner', desc: 'Welcome new helpers. Surface lurkers with high-signal asks.' },
  { name: 'Initium Doc Editor', who: '— need 1 —', tag: 'Open', votes: 12, cls: 'sync', desc: 'Turn streams into 1-pager Initium briefs. Clarity over volume.' },
  { name: 'Audio Director', who: 'mr.refine', tag: 'Claimed', votes: 8, cls: 'refiner', desc: 'Voice-of-the-room mix. Who gets a mic and when.' },
  { name: 'Outlier Hunter', who: '— need 1 —', tag: 'Open', votes: 33, cls: 'forge', desc: 'Watch the cortex. Pull the surprising voice into the duo feed.' },
];

export default function Cortex() {
  return (
    <div className="px-5 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-14">
        <p className="chip chip-refiner mx-auto mb-5">Community Cortex</p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          The room <span className="twin-text">self-organizes.</span>
        </h1>
        <p className="text-white/55 mt-4 text-[15px] max-w-xl mx-auto">
          Watchers don't watch. They contribute. Pick a role. Make it your own. Earn VOTUS by helping the duo ship.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ROLES.map((r) => (
          <div key={r.name} className={`hairline rounded-xl p-5 bg-slab/40 hover:border-${r.cls}/40 transition-colors`}>
            <div className="flex items-center justify-between mb-3">
              <p className={`chip chip-${r.cls}`}>{r.name}</p>
              <span className={`text-[10px] font-mono tracking-wider uppercase ${r.tag === 'Open' ? 'text-pirate' : 'text-white/40'}`}>{r.tag}</span>
            </div>
            <p className="text-[13px] text-white/65 leading-relaxed mb-4">{r.desc}</p>
            <div className="hairline-t pt-3 flex items-center justify-between">
              <span className="text-[11px] font-mono tracking-wider text-white/45">@{r.who}</span>
              <span className={`text-[11px] font-mono ${r.tag === 'Open' ? 'text-pirate' : 'text-white/40'}`}>↑ {r.votes} VOTUS</span>
            </div>
          </div>
        ))}
        {/* propose your own */}
        <div className="hairline rounded-xl p-5 bg-gradient-to-br from-sync/10 to-slab/40 border-dashed">
          <p className="chip chip-sync mb-3">+ Propose A Role</p>
          <p className="text-[13px] text-white/65 leading-relaxed mb-4">
            See a gap? Name it. Define it. Claim it. The Cortex routes upvotes to roles the duo actually needs.
          </p>
          <Link href="/signup" className="inline-block text-[12px] font-mono tracking-wider uppercase text-sync hover:text-white transition-colors">
            Open The Form →
          </Link>
        </div>
      </div>

      <section className="mt-20 text-center">
        <p className="chip chip-sync mx-auto mb-4">Self-Organization Protocol</p>
        <h2 className="font-light text-[clamp(24px,3.6vw,40px)] tracking-tight mb-8">
          Three rules. <span className="twin-text">No bosses.</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-3 max-w-4xl mx-auto text-left">
          {[
            { t: '01 · Roles are claimed, not assigned.', b: 'Anyone can propose. Anyone can claim. Open until claimed.' },
            { t: '02 · Contribution is logged.', b: 'Every commit, edit, doc, test routed through your handle. No ghost work.' },
            { t: '03 · VOTUS routes the reward.', b: 'When the Initium earns, the cortex earns proportional to logged contribution.' },
          ].map((r) => (
            <div key={r.t} className="hairline rounded-xl p-5 bg-slab/30">
              <p className="text-[13px] font-mono tracking-wider uppercase text-pirate mb-2">{r.t}</p>
              <p className="text-[13px] text-white/65 leading-relaxed">{r.b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
