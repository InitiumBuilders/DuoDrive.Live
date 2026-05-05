'use client';
import { useState } from 'react';
import Link from 'next/link';
import { STREAMS, type Stream } from '@/lib/streams';

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
          Initiums are products-in-flight. Tap any card to expand — see the core files, the auto-generated next steps, and the Avari Sync state.
        </p>
      </header>

      <div className="grid gap-3">
        {STREAMS.map((s, i) => (
          <InitiumCard key={s.slug} s={s} delay={i * 0.05} />
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

function InitiumCard({ s, delay }: { s: Stream; delay: number }) {
  const [open, setOpen] = useState(false);
  const langColor = (lang?: string) =>
    lang === 'tsx' || lang === 'ts' ? 'var(--pirate)' :
    lang === 'json' || lang === 'toml' || lang === 'yaml' ? 'var(--forge)' :
    lang === 'md' ? 'var(--sync)' :
    'var(--fg-muted)';

  return (
    <article
      className="hairline rounded-2xl glass overflow-hidden lift reveal"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* head — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 md:p-6 group"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>{s.initiumId}</span>
              <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: s.state === 'live' || s.state === 'relay' ? 'var(--pirate)' : 'var(--sync)' }}>
                {(s.state === 'live' || s.state === 'relay') && <span className="live-dot mr-1.5 inline-block" />}
                {s.state === 'live' ? 'live now' : s.state === 'relay' ? 'relaying live' : s.state === 'shipping' ? 'shipping' : 'paused'}
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>· from {s.startedAt}</span>
            </div>
            <h2 className="text-[19px] md:text-[24px] font-medium tracking-tight leading-tight" style={{ color: 'var(--fg)', hyphens: 'manual', WebkitHyphens: 'manual' }}>
              {s.title}
            </h2>
            <p className="md:hidden text-[11px] font-mono tracking-wider uppercase mt-1.5" style={{ color: 'var(--fg-faint)' }}>
              <span style={{ color: 'var(--pirate)' }}>{s.pirate.handle}</span>
              <span style={{ color: 'var(--fg-faint)' }}> × </span>
              <span style={{ color: 'var(--refiner)' }}>{s.refiner.handle}</span>
            </p>
            <p className="text-[13px] mt-2 max-w-2xl leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              {s.premise}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden md:inline text-[11px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
              <span style={{ color: 'var(--pirate)' }}>{s.pirate.handle}</span>
              <span style={{ color: 'var(--fg-faint)' }}> × </span>
              <span style={{ color: 'var(--refiner)' }}>{s.refiner.handle}</span>
            </span>
            <span
              className="text-[10px] font-mono tracking-wider uppercase chip"
              style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}
            >
              {open ? '↑' : '↓'}
            </span>
          </div>
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
      </button>

      {/* expanded body */}
      {open && (
        <div className="px-5 md:px-6 pb-5 md:pb-6 space-y-5 hairline-t pt-5">
          {/* Avari Sync visualization */}
          <section>
            <p className="chip mb-3 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
              Avari Sync
            </p>
            <div className="hairline rounded-xl p-4 flex items-center gap-4" style={{ background: 'color-mix(in oklab, var(--sync) 4%, var(--surface))' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--pirate)', boxShadow: '0 0 8px var(--pirate)' }} />
                <span className="text-[11px] font-mono tracking-wider uppercase" style={{ color: 'var(--pirate)' }}>{s.pirate.handle}</span>
              </div>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--pirate), var(--sync), var(--refiner))' }} />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase twin-text font-medium">in phase</span>
              <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, var(--refiner), var(--sync), var(--pirate))' }} />
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-wider uppercase" style={{ color: 'var(--refiner)' }}>{s.refiner.handle}</span>
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--refiner)', boxShadow: '0 0 8px var(--refiner)' }} />
              </div>
            </div>
          </section>

          {/* High-leverage moves */}
          <section>
            <p className="chip mb-3 inline-flex" style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 35%, transparent)' }}>
              High-leverage moves — Davara's read
            </p>
            <ul className="space-y-2">
              {s.highLeverage.map((m, idx) => (
                <li key={idx} className="flex gap-3 text-[13px] hairline rounded-lg p-3" style={{ background: 'var(--surface)' }}>
                  <span className="font-mono text-[10px] tracking-wider shrink-0 w-7 mt-0.5" style={{ color: 'var(--forge)' }}>0{idx + 1}</span>
                  <span style={{ color: 'var(--fg)' }}>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Core files */}
          {s.coreFiles && s.coreFiles.length > 0 && (
            <section>
              <p className="chip mb-3 inline-flex" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 35%, transparent)' }}>
                Core files · code preview
              </p>
              <div className="hairline rounded-lg overflow-hidden font-mono text-[12px]" style={{ background: 'color-mix(in oklab, var(--bg) 50%, var(--surface))' }}>
                {s.coreFiles.map((f, idx) => (
                  <div key={idx} className="grid grid-cols-[24px_1fr_auto_60px] items-center gap-2 px-3 py-2 hairline-b last:border-b-0">
                    <span className="text-[10px]" style={{ color: 'var(--fg-faint)' }}>{String(idx + 1).padStart(2, '0')}</span>
                    <span className="truncate" style={{ color: 'var(--fg)' }}>{f.path}</span>
                    <span className="text-[10px]" style={{ color: langColor(f.lang) }}>{f.lang || ''}</span>
                    <span className="text-[10px] text-right" style={{ color: 'var(--fg-faint)' }}>{f.lines ? `${f.lines} lines` : ''}</span>
                  </div>
                ))}
              </div>
              {s.coreFiles.some((f) => f.note) && (
                <div className="mt-2 space-y-1 text-[11px]" style={{ color: 'var(--fg-muted)' }}>
                  {s.coreFiles.filter((f) => f.note).map((f, idx) => (
                    <p key={idx}><span className="font-mono mr-2" style={{ color: langColor(f.lang) }}>{f.path}</span>— {f.note}</p>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Next steps */}
          {s.nextSteps && s.nextSteps.length > 0 && (
            <section>
              <p className="chip mb-3 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
                Next steps · auto-generated
              </p>
              <ol className="space-y-2">
                {s.nextSteps.map((step, idx) => {
                  const tagColor =
                    step.tag === 'ship' ? 'var(--pirate)' :
                    step.tag === 'spec' ? 'var(--sync)' :
                    step.tag === 'cortex' ? 'var(--refiner)' :
                    step.tag === 'votus' ? 'var(--forge)' :
                    'var(--fg-muted)';
                  return (
                    <li key={idx} className="hairline rounded-lg p-3 grid grid-cols-[60px_1fr_auto] gap-3 items-center" style={{ background: 'var(--surface)' }}>
                      <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: tagColor }}>
                        {step.tag || 'task'}
                      </span>
                      <span className="text-[13px]" style={{ color: 'var(--fg)' }}>{step.txt}</span>
                      <span className="text-[10px] font-mono tracking-wider uppercase text-right" style={{ color: 'var(--fg-faint)' }}>
                        {step.who && `@${step.who}`}{step.eta && ` · ${step.eta}`}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          {/* Outlier ideas */}
          {s.outlierIdeas && s.outlierIdeas.length > 0 && (
            <section>
              <p className="chip mb-3 inline-flex" style={{ color: 'var(--refiner)', borderColor: 'color-mix(in oklab, var(--refiner) 35%, transparent)' }}>
                Outlier ideas · not yet on roadmap
              </p>
              <ul className="space-y-2">
                {s.outlierIdeas.map((m, idx) => (
                  <li key={idx} className="flex gap-3 text-[13px] hairline rounded-lg p-3 italic" style={{ background: 'var(--surface)' }}>
                    <span className="font-mono text-[10px] not-italic shrink-0 mt-1" style={{ color: 'var(--refiner)' }}>·</span>
                    <span style={{ color: 'var(--fg)' }}>{m}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="hairline-t pt-4 flex items-center justify-between gap-3 flex-wrap">
            <Link
              href={`/live/${s.slug}`}
              className="text-[12px] font-mono tracking-wider uppercase px-4 py-2 rounded-full transition-colors"
              style={{
                background: 'linear-gradient(110deg, var(--pirate), var(--sync), var(--refiner))',
                color: 'var(--void)',
              }}
            >
              Enter the Stream →
            </Link>
            <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
              MIT · two-key · {s.coreFiles?.length || 0} core files
            </span>
          </div>
        </div>
      )}
    </article>
  );
}
