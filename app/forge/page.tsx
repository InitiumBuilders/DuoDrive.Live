import Link from 'next/link';

export const metadata = {
  title: 'A Day In The Forge — DuoDrive.Live',
  description: 'The 24h reel of an Initium. Every commit, poll, word coined, Cortex join, Avari Echo. Scrubbable.',
};

type Event = {
  hour: string;
  kind: 'commit' | 'poll' | 'word' | 'cortex' | 'echo' | 'votus' | 'forge';
  who: string;
  txt: string;
  meta?: string;
};

const TIMELINE: Event[] = [
  { hour: '06:12', kind: 'commit', who: 'davara', txt: '+ AvariSignal.tsx', meta: '142 lines' },
  { hour: '06:38', kind: 'commit', who: 'davara', txt: '+ Whisper.tsx', meta: '38 lines' },
  { hour: '07:04', kind: 'word', who: 'jordash', txt: '"whispering" coined', meta: 'pending Cortex vote' },
  { hour: '07:21', kind: 'votus', who: 'lily.eth', txt: 'staked 18 VOTUS on the cortex testers role', meta: '+18' },
  { hour: '07:45', kind: 'cortex', who: 'shoji', txt: 'claimed role · Typographer', meta: 'open → claimed' },
  { hour: '08:02', kind: 'echo', who: 'system', txt: '"the screen is the forge" — flagged worth-keeping', meta: 'README updated' },
  { hour: '08:30', kind: 'forge', who: 'system', txt: 'Forge meter ticked 70% → 78%', meta: '+8%' },
  { hour: '09:14', kind: 'poll', who: 'jordash', txt: 'opened revenue model whisper poll', meta: '4 options · direction-only' },
  { hour: '09:51', kind: 'commit', who: 'davara', txt: '~ ForgeMeter.tsx · refactor', meta: '−54 lines' },
  { hour: '10:22', kind: 'word', who: 'lily.eth', txt: '"cortex drift" coined', meta: 'voted into Public Lexicon' },
  { hour: '10:55', kind: 'votus', who: 'pirate.0x', txt: 'staked 12 VOTUS on /signup ships tonight', meta: '+12' },
  { hour: '11:18', kind: 'commit', who: 'davara', txt: '+ Cortex/RoleCard.tsx', meta: '64 lines' },
  { hour: '11:46', kind: 'cortex', who: 'mr.refine', txt: 'claimed role · Audio Director', meta: 'open → claimed' },
  { hour: '12:30', kind: 'echo', who: 'system', txt: '"every prompt is a thesis" — flagged', meta: 'README updated' },
  { hour: '13:08', kind: 'commit', who: 'davara', txt: '+ tests/avariSignal.spec.ts', meta: '24 lines' },
  { hour: '13:42', kind: 'forge', who: 'system', txt: 'Forge meter ticked 78% → 80%', meta: '+2%' },
  { hour: '14:15', kind: 'poll', who: 'davara', txt: 'closed: revenue model — community-owned wins', meta: 'tally revealed' },
  { hour: '14:50', kind: 'word', who: 'pirate.0x', txt: '"shadow watching" coined', meta: 'pending Cortex vote' },
  { hour: '15:24', kind: 'votus', who: 'opal', txt: 'staked 8 VOTUS', meta: '+8' },
  { hour: '15:55', kind: 'commit', who: 'davara', txt: '~ globals.css · light mode tokens', meta: '+72 lines' },
  { hour: '16:30', kind: 'echo', who: 'system', txt: '"build with care" — flagged', meta: 'Manifesto pinned' },
  { hour: '17:12', kind: 'cortex', who: 'kai.dev', txt: 'proposed role · Stress Tester', meta: 'awaiting claim' },
];

const KIND_META: Record<Event['kind'], { label: string; cls: string; icon: string }> = {
  commit: { label: 'Ship', cls: 'pirate', icon: '+' },
  poll: { label: 'Poll', cls: 'sync', icon: '?' },
  word: { label: 'Word', cls: 'sync', icon: '⌶' },
  cortex: { label: 'Cortex', cls: 'refiner', icon: '·' },
  echo: { label: 'Echo', cls: 'sync', icon: '✦' },
  votus: { label: 'VOTUS', cls: 'forge', icon: '↑' },
  forge: { label: 'Forge', cls: 'forge', icon: '◐' },
};

export default function Forge() {
  // Compute hourly histogram by event type
  const hourBuckets: Record<string, Partial<Record<Event['kind'], number>>> = {};
  for (const e of TIMELINE) {
    const h = e.hour.slice(0, 2);
    if (!hourBuckets[h]) hourBuckets[h] = {};
    hourBuckets[h][e.kind] = (hourBuckets[h][e.kind] || 0) + 1;
  }

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-12">
        <p
          className="chip mx-auto mb-5 inline-flex"
          style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 32%, transparent)' }}
        >
          A Day In The Forge
        </p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          24 hours of <span className="twin-text">Jordash × Davara.</span>
        </h1>
        <p className="mt-4 text-[15px] max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          Every commit, every poll, every word coined, every Cortex move. The unedited reel of an Initium in motion.
        </p>
      </header>

      {/* Scrubber: stacked hourly histogram with kind colors + legend + hour labels */}
      <div className="hairline rounded-2xl glass p-4 md:p-5 mb-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <p className="text-[11px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--fg-muted)' }}>
            Activity · UTC · stacked by kind
          </p>
          <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            {TIMELINE.length} events · 06:12 → 17:12
          </p>
        </div>
        <div className="flex items-end gap-1 h-16 mb-2">
          {Array.from({ length: 24 }).map((_, h) => {
            const hh = String(h).padStart(2, '0');
            const buckets = hourBuckets[hh] || {};
            const total = Object.values(buckets).reduce((a, b) => a + (b || 0), 0);
            return (
              <div key={h} className="flex-1 relative group flex flex-col justify-end" style={{ height: '100%' }}>
                {total > 0 && (
                  <div className="flex flex-col rounded-sm overflow-hidden" style={{ height: `${20 + total * 14}%`, transition: 'height .4s' }}>
                    {(['commit', 'word', 'echo', 'cortex', 'votus', 'forge', 'poll'] as Event['kind'][]).map((k) => {
                      const c = buckets[k] || 0;
                      if (!c) return null;
                      const meta = KIND_META[k];
                      const color =
                        meta.cls === 'pirate' ? 'var(--pirate)' :
                        meta.cls === 'refiner' ? 'var(--refiner)' :
                        meta.cls === 'forge' ? 'var(--forge)' :
                        'var(--sync)';
                      return <div key={k} style={{ flex: c, background: color, opacity: 0.85 }} />;
                    })}
                  </div>
                )}
                {total === 0 && <div className="rounded-sm" style={{ height: '8%', background: 'var(--hairline)' }} />}
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap glass px-1.5 py-0.5 rounded pointer-events-none" style={{ color: 'var(--fg)' }}>
                  {hh}:00 · {total}
                </span>
              </div>
            );
          })}
        </div>
        {/* hour axis labels */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: 24 }).map((_, h) => (
            <span key={h} className="flex-1 text-center text-[8px] font-mono tracking-wider uppercase" style={{ color: h % 3 === 0 ? 'var(--fg-faint)' : 'transparent' }}>
              {h % 3 === 0 ? String(h).padStart(2, '0') : '·'}
            </span>
          ))}
        </div>
        {/* legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 hairline-t pt-3">
          {(Object.keys(KIND_META) as Event['kind'][]).map((k) => {
            const meta = KIND_META[k];
            const color =
              meta.cls === 'pirate' ? 'var(--pirate)' :
              meta.cls === 'refiner' ? 'var(--refiner)' :
              meta.cls === 'forge' ? 'var(--forge)' :
              'var(--sync)';
            const count = TIMELINE.filter((e) => e.kind === k).length;
            return (
              <span key={k} className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-muted)' }}>
                <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                {meta.label}
                <span style={{ color: 'var(--fg-faint)' }}>{count}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Timeline */}
      <ol className="relative space-y-3">
        {/* vertical spine */}
        <span
          className="absolute left-[34px] md:left-[58px] top-2 bottom-2 w-px"
          style={{ background: 'linear-gradient(to bottom, var(--hairline-strong), transparent)' }}
        />
        {TIMELINE.map((e, i) => {
          const meta = KIND_META[e.kind];
          const accent =
            meta.cls === 'pirate' ? 'var(--pirate)' :
            meta.cls === 'refiner' ? 'var(--refiner)' :
            meta.cls === 'forge' ? 'var(--forge)' :
            'var(--sync)';
          return (
            <li
              key={i}
              className="hairline rounded-xl glass p-4 grid grid-cols-[60px_24px_1fr] md:grid-cols-[80px_36px_1fr_auto] gap-3 md:gap-4 items-center hover:border-[color:color-mix(in_oklab,var(--sync)_30%,transparent)] transition-colors"
            >
              <span className="font-mono text-[11px] tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
                {e.hour}
              </span>
              <span
                className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[11px] font-mono shrink-0 relative z-10"
                style={{ background: 'var(--surface-solid)', border: `1px solid ${accent}`, color: accent }}
              >
                {meta.icon}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: accent }}>
                    {meta.label}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
                    @{e.who}
                  </span>
                </div>
                <p className="text-[13px] md:text-[14px] mt-0.5" style={{ color: 'var(--fg)' }}>
                  {e.txt}
                </p>
              </div>
              {e.meta && (
                <span className="hidden md:block text-[10px] font-mono tracking-wider uppercase text-right" style={{ color: 'var(--fg-faint)' }}>
                  {e.meta}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-12 grid sm:grid-cols-3 gap-3">
        {[
          { l: 'Commits', v: TIMELINE.filter((e) => e.kind === 'commit').length, c: 'var(--pirate)' },
          { l: 'Words coined', v: TIMELINE.filter((e) => e.kind === 'word').length, c: 'var(--sync)' },
          { l: 'Echoes flagged', v: TIMELINE.filter((e) => e.kind === 'echo').length, c: 'var(--sync)' },
        ].map((s) => (
          <div key={s.l} className="hairline rounded-xl glass p-5">
            <p className="text-[10px] font-mono tracking-wider uppercase mb-1" style={{ color: 'var(--fg-faint)' }}>
              {s.l}
            </p>
            <p className="text-[28px] font-light" style={{ color: s.c }}>{s.v}</p>
          </div>
        ))}
      </div>

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
