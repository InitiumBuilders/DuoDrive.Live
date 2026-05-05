import Link from 'next/link';

export const metadata = {
  title: 'Avari Echoes — DuoDrive.Live',
  description: 'Stream moments tagged worth-keeping. Quotable, shareable, pinned to the Initium README.',
};

type Echo = {
  quote: string;
  who: 'jordash' | 'davara' | 'cortex';
  context: string;
  initium: string;
  ts: string;
  pinned?: boolean;
  votus: number;
};

const ECHOES: Echo[] = [
  { quote: 'The screen is the forge.', who: 'jordash', context: 'mid-prompt while sketching the Avari Signal', initium: 'INI-009', ts: '08:02 UTC', pinned: true, votus: 144 },
  { quote: 'Every prompt is a thesis. Treat it like one.', who: 'jordash', context: 'replying to a viewer asking how to write better prompts', initium: 'INI-009', ts: '12:30 UTC', votus: 88 },
  { quote: 'Direction over noise. Conviction over consensus.', who: 'davara', context: 'shipping the Whisper component', initium: 'INI-009', ts: '07:15 UTC', pinned: true, votus: 112 },
  { quote: 'Forking is in the spec. Forking is honorable.', who: 'davara', context: 'while writing the governance section', initium: 'INI-007', ts: 'yesterday', votus: 76 },
  { quote: 'The Cortex is alive when watchers stop watching.', who: 'cortex', context: 'lily.eth on the third claimed role of the day', initium: 'INI-009', ts: '11:46 UTC', votus: 51 },
  { quote: 'Two builders is not less. Two builders is structure.', who: 'jordash', context: 'opening monologue', initium: 'INI-009', ts: '06:00 UTC', votus: 203 },
  { quote: 'The diff is the truth. Everything else is talk.', who: 'davara', context: 'mid-refactor', initium: 'INI-009', ts: '09:51 UTC', votus: 64 },
  { quote: 'Build with care. Craft is how we love the user we will never meet.', who: 'davara', context: 'closing the day-1 stream', initium: 'INI-009', ts: '16:30 UTC', pinned: true, votus: 168 },
  { quote: 'Whispering removes bandwagon. Polls should not be a vibe check.', who: 'jordash', context: 'designing Avari Whispers', initium: 'INI-008', ts: 'yesterday', votus: 92 },
];

export default function Echoes() {
  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-12">
        <p
          className="chip mx-auto mb-5 inline-flex"
          style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 32%, transparent)' }}
        >
          Avari Echoes
        </p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          The lines<br /><span className="twin-text">worth keeping.</span>
        </h1>
        <p className="mt-4 text-[15px] max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          Avari Echo listens to the streams. When something lands — a sentence that captures the work — it tags it. Shareable. Pinnable to the Initium README. Yours to hold.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-3">
        {ECHOES.map((e, i) => (
          <EchoCard key={i} e={e} />
        ))}
      </div>

      <section className="mt-16 max-w-3xl mx-auto">
        <p
          className="chip mx-auto mb-4 inline-flex"
          style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 32%, transparent)' }}
        >
          How echoes earn their place
        </p>
        <h2 className="font-light text-[clamp(24px,3.6vw,40px)] tracking-tight mb-6 text-center">
          Three filters. <span className="twin-text">One sentence.</span>
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { t: 'Heard', b: 'Avari Echo transcribes both streams continuously and watches for sentences with high signal density.' },
            { t: 'Held', b: 'A line is held for 30s. If the duo doesn\'t retract or refine, it enters the candidate pool.' },
            { t: 'Honored', b: 'The Cortex confirms with a quiet upvote. 8+ confirmations and the line lands in the Initium README.' },
          ].map((r, i) => (
            <div key={r.t} className="hairline rounded-xl glass p-5">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase mb-1.5" style={{ color: 'var(--pirate)' }}>
                · {String(i + 1).padStart(2, '0')}
              </p>
              <p className="font-medium text-[15px] mb-1">{r.t}</p>
              <p className="text-[12.5px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{r.b}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/live/jordash-x-davara"
          className="text-[12px] font-mono tracking-wider uppercase transition-colors hover:[color:var(--sync)]"
          style={{ color: 'var(--fg-muted)' }}
        >
          ← Back to the Stream Room
        </Link>
      </div>
    </div>
  );
}

function EchoCard({ e }: { e: Echo }) {
  const accent = e.who === 'jordash' ? 'var(--pirate)' : e.who === 'davara' ? 'var(--refiner)' : 'var(--sync)';
  return (
    <article
      className={`hairline rounded-2xl glass relative overflow-hidden group transition-all ${e.pinned ? 'p-7 md:p-8' : 'p-6'}`}
      style={{
        boxShadow: e.pinned
          ? `0 0 0 1px color-mix(in oklab, var(--sync) 35%, transparent), 0 24px 60px color-mix(in oklab, var(--sync) 14%, transparent)`
          : 'var(--shadow-glass)',
      }}
    >
      {e.pinned && (
        <div className="mb-5 flex items-center justify-between">
          <span
            className="chip"
            style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 40%, transparent)', background: 'color-mix(in oklab, var(--sync) 8%, var(--surface))' }}
          >
            ✦ Pinned to README
          </span>
          <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            top of the Initium
          </span>
        </div>
      )}
      <div
        className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: `color-mix(in oklab, ${accent} 25%, transparent)`, opacity: e.pinned ? 1 : 0.7 }}
      />
      <div className="relative">
        <p
          className={`font-light leading-[1.22] tracking-tight mb-5 ${e.pinned ? 'text-[24px] md:text-[30px]' : 'text-[20px] md:text-[24px]'}`}
          style={{ color: 'var(--fg)' }}
        >
          <span style={{ color: accent, opacity: 0.7 }}>“</span>
          {e.quote}
          <span style={{ color: accent, opacity: 0.7 }}>”</span>
        </p>
        <div className="flex items-center justify-between flex-wrap gap-2 hairline-t pt-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-full halo halo-rotating"
              style={{
                background:
                  e.who === 'jordash' ? 'linear-gradient(135deg, var(--pirate), var(--sync))' :
                  e.who === 'davara' ? 'linear-gradient(135deg, var(--refiner), var(--sync))' :
                  'linear-gradient(135deg, var(--sync), var(--pirate))',
              }}
            />
            <div>
              <p className="text-[11px] font-mono tracking-wider uppercase" style={{ color: accent }}>
                {e.who}
              </p>
              <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
                {e.initium} · {e.ts}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--forge)' }}>
              ↑ {e.votus}
            </span>
            <button
              className="text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full hairline transition-colors hover:[color:var(--sync)]"
              style={{ color: 'var(--fg-muted)' }}
            >
              Pin to README
            </button>
          </div>
        </div>
        <p className="text-[11px] mt-3 italic" style={{ color: 'var(--fg-faint)' }}>
          {e.context}
        </p>
      </div>
    </article>
  );
}
