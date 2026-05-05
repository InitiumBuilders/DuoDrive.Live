import Link from 'next/link';
import { STREAMS } from '@/lib/streams';

export const metadata = { title: 'Initiums — DuoDrive.Live' };

export default function Initiums() {
  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-12 reveal">
        <p className="chip mx-auto mb-5 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
          Initiums
        </p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          Every project<br /><span className="twin-text">is a duo's drive.</span>
        </h1>
        <p className="mt-4 text-[15px] max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          Initiums are products-in-flight. Each one has at least two signers, a Two-Key Drive vault, and a community Cortex.
        </p>
      </header>

      <div className="grid gap-3">
        {STREAMS.map((s, i) => (
          <Link
            key={s.slug}
            href={`/live/${s.slug}`}
            className="hairline rounded-2xl glass p-5 md:p-6 lift block group reveal"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>{s.initiumId}</span>
                  <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: s.state === 'live' ? 'var(--pirate)' : 'var(--sync)' }}>
                    {s.state === 'live' && <span className="live-dot mr-1.5 inline-block" />}
                    {s.state === 'live' ? 'live now' : s.state === 'shipping' ? 'shipping' : 'paused'}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>· from {s.startedAt}</span>
                </div>
                <h2 className="text-[20px] md:text-[24px] font-medium tracking-tight leading-tight group-hover:[color:var(--sync)] transition-colors" style={{ color: 'var(--fg)' }}>{s.title}</h2>
                <p className="text-[13px] mt-2 max-w-2xl leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{s.premise}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
                  <span style={{ color: 'var(--pirate)' }}>{s.pirate.handle}</span>
                  <span style={{ color: 'var(--fg-faint)' }}> × </span>
                  <span style={{ color: 'var(--refiner)' }}>{s.refiner.handle}</span>
                </span>
              </div>
            </div>

            {/* High-leverage preview */}
            <div className="hairline-t pt-4 mb-3">
              <p className="chip mb-2 inline-flex" style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 35%, transparent)' }}>
                High-leverage moves
              </p>
              <ul className="space-y-1.5">
                {s.highLeverage.slice(0, 2).map((m, idx) => (
                  <li key={idx} className="text-[12.5px] leading-relaxed flex gap-2" style={{ color: 'var(--fg)' }}>
                    <span className="font-mono text-[10px] tracking-wider shrink-0 mt-0.5" style={{ color: 'var(--forge)' }}>0{idx + 1}</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] font-mono tracking-wider uppercase">
              <div>
                <p className="mb-1" style={{ color: 'var(--fg-faint)' }}>Forge</p>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--hairline)' }}>
                  <div className="forge-bar h-full" style={{ width: `${s.forge * 100}%` }} />
                </div>
              </div>
              <div>
                <p className="mb-1" style={{ color: 'var(--fg-faint)' }}>VOTUS staked</p>
                <p style={{ color: 'var(--forge)' }}>{s.votusStaked}</p>
              </div>
              <div>
                <p className="mb-1" style={{ color: 'var(--fg-faint)' }}>Watching</p>
                <p style={{ color: 'var(--pirate)' }}>{s.watching.toLocaleString()}</p>
              </div>
              <div>
                <p className="mb-1" style={{ color: 'var(--fg-faint)' }}>Vault</p>
                <p style={{ color: 'var(--sync)' }}>2 / 2 keys</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 text-center">
        <Link
          href="/signup"
          className="inline-block px-6 py-3 rounded-full font-medium text-[14px] transition-shadow hover:shadow-[0_0_40px_color-mix(in_oklab,var(--sync)_45%,transparent)]"
          style={{
            background: 'linear-gradient(110deg, var(--pirate), var(--sync), var(--refiner))',
            color: 'var(--void)',
          }}
        >
          Open Your First Initium →
        </Link>
      </div>
    </div>
  );
}
