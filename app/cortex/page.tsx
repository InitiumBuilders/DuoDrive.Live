import Link from 'next/link';
import { CortexFocus } from '@/components/CortexFocus';

export const metadata = {
  title: 'The Cortex — DuoDrive.Live',
  description: 'A consensus tool for the room. One Cortex decision at a time, in motion. Direction over noise.',
};

const ROLES = [
  { name: 'Typographer', who: 'shoji.dash', tag: 'Claimed', votes: 24, cls: 'pirate', desc: 'Audit type rhythm. Inter only. Kill any ligature theater.' },
  { name: 'Stress Tester', who: '— need 1 —', tag: 'Open', votes: 19, cls: 'sync', desc: 'Hit /signup with 100 concurrent forms. Report what shudders.' },
  { name: 'Cortex Whisperer', who: 'lily.dash', tag: 'Claimed', votes: 41, cls: 'refiner', desc: 'Welcome new helpers. Surface lurkers with high-signal asks.' },
  { name: 'Initium Doc Editor', who: '— need 1 —', tag: 'Open', votes: 12, cls: 'sync', desc: 'Turn streams into 1-pager Initium briefs. Clarity over volume.' },
  { name: 'Audio Director', who: 'mr.refine', tag: 'Claimed', votes: 8, cls: 'refiner', desc: 'Voice-of-the-room mix. Who gets a mic and when.' },
  { name: 'Outlier Hunter', who: '— need 1 —', tag: 'Open', votes: 33, cls: 'forge', desc: 'Watch the cortex. Pull the surprising voice into the duo feed.' },
  { name: 'Cross-Initium Liaison', who: '— need 1 —', tag: 'Open', votes: 22, cls: 'sync', desc: 'Bridge Veros.IO ↔ DuoDrive Two-Key vault primitives.' },
  { name: 'Dash Platform Engineer', who: 'kato.dash', tag: 'Claimed', votes: 28, cls: 'forge', desc: 'Live in the Rust SDK. Ship the data contract bindings.' },
  { name: 'Civic-Tier Curator', who: '— need 1 —', tag: 'Open', votes: 14, cls: 'refiner', desc: 'Match nonprofits to masternode-funded subsidies on Veros.IO.' },
];

export default function Cortex() {
  return (
    <div className="px-4 md:px-8 max-w-5xl mx-auto pt-32 pb-20">
      <header className="text-center mb-10 reveal">
        <p
          className="chip mx-auto mb-5 inline-flex"
          style={{ color: 'var(--refiner)', borderColor: 'color-mix(in oklab, var(--refiner) 35%, transparent)' }}
        >
          The Cortex · consensus tool
        </p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          One question.<br /><span className="twin-text">One whisper at a time.</span>
        </h1>
        <p className="mt-4 text-[14px] md:text-[15px] max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          The Cortex is how the room helps the duo decide. Each open decision shows on its own — pirate take, refiner take, the room's whisper. Stake VOTUS to amplify direction. Tally hidden until the duo closes.
        </p>
      </header>

      <CortexFocus />

      {/* Roles strip — quieter than before */}
      <section className="mt-20">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-5 reveal">
          <div>
            <p
              className="chip mb-2 inline-flex"
              style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}
            >
              Open Cortex roles
            </p>
            <h2 className="font-light text-[clamp(20px,3.2vw,32px)] tracking-tight leading-tight">
              The room <span className="twin-text">self-organizes.</span>
            </h2>
          </div>
          <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            {ROLES.filter((r) => r.tag === 'Open').length} open · {ROLES.filter((r) => r.tag === 'Claimed').length} claimed
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ROLES.map((r, i) => {
            const accent =
              r.cls === 'pirate' ? 'var(--pirate)' :
              r.cls === 'refiner' ? 'var(--refiner)' :
              r.cls === 'forge' ? 'var(--forge)' :
              'var(--sync)';
            return (
              <div key={r.name} className="hairline rounded-xl glass p-5 lift reveal" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="chip" style={{ color: accent, borderColor: `color-mix(in oklab, ${accent} 35%, transparent)` }}>{r.name}</p>
                  <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: r.tag === 'Open' ? 'var(--pirate)' : 'var(--fg-faint)' }}>
                    {r.tag}
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>{r.desc}</p>
                <div className="hairline-t pt-3 flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-wider" style={{ color: 'var(--fg-faint)' }}>@{r.who}</span>
                  <span className="text-[11px] font-mono" style={{ color: r.tag === 'Open' ? 'var(--pirate)' : 'var(--fg-faint)' }}>↑ {r.votes} VOTUS</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 max-w-3xl mx-auto reveal text-center">
        <p
          className="chip mx-auto mb-3 inline-flex"
          style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}
        >
          Three rules
        </p>
        <h2 className="font-light text-[clamp(22px,3.4vw,38px)] tracking-tight leading-tight mb-6">
          Roles claimed, not assigned.<br /><span className="twin-text">Contribution logged. VOTUS routes the reward.</span>
        </h2>
        <div className="grid sm:grid-cols-3 gap-3 text-left">
          {[
            { t: 'Roles claimed, not assigned.', b: 'Anyone proposes. Anyone claims. Open until claimed.' },
            { t: 'Contribution is logged.', b: 'Every commit, edit, doc, test routed through your handle. No ghost work.' },
            { t: 'VOTUS routes the reward.', b: 'When the Initium earns, the cortex earns proportional to logged contribution.' },
          ].map((r, i) => (
            <div key={r.t} className="hairline rounded-xl glass p-4">
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase mb-1.5" style={{ color: 'var(--pirate)' }}>0{i + 1}</p>
              <p className="text-[13px] font-medium leading-tight mb-1" style={{ color: 'var(--fg)' }}>{r.t}</p>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{r.b}</p>
            </div>
          ))}
        </div>
        <Link
          href="/manifesto"
          className="inline-flex items-center gap-2 mt-8 text-[12px] font-mono tracking-wider uppercase transition-colors hover:[color:var(--sync)]"
          style={{ color: 'var(--fg-muted)' }}
        >
          Read the full manifesto →
        </Link>
      </section>
    </div>
  );
}
