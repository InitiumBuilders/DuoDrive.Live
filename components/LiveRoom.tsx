'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SembleDictionary } from './SembleDictionary';
import { VotusInvestments } from './VotusInvestments';
import { GoodVibeStream } from './GoodVibeStream';
import { VerosFounders } from './VerosFounders';
import { VotusUnits } from './VotusUnits';
import { useLiveSim, type Feed, type ChatMessage } from '@/lib/liveSim';
import type { Stream } from '@/lib/streams';
import { STREAMS } from '@/lib/streams';

export function LiveRoomClient({ stream }: { stream?: Stream }) {
  const s = stream || STREAMS[0];
  const sim = useLiveSim();
  // Patch sim with stream-specific seed numbers if stream isn't INI-009
  const liveSim = stream && stream.initiumId !== 'INI-009'
    ? { ...sim, watching: stream.watching, motusViews: stream.motusViews, votusStaked: stream.votusStaked, forge: stream.forge }
    : sim;

  return (
    <div className="px-4 md:px-8 max-w-[1500px] mx-auto pt-4 pb-32 md:pb-8">
      <Header sim={liveSim} stream={s} />
      {s.goodVibeRelay ? (
        <div className="my-3">
          <GoodVibeStream />
        </div>
      ) : (
        <Stage sim={liveSim} stream={s} />
      )}
      <ForgeMeter sim={liveSim} />
      {!s.goodVibeRelay && <StreamProfiles stream={s} />}
      <InitiumDetail stream={s} />
      {s.slug === 'symble-x-kato' && <VerosFounders />}
      {!s.goodVibeRelay && <ThreeFeeds sim={liveSim} stream={s} />}
      {!s.goodVibeRelay && <PollAndBets />}
      <VotusUnits initiumId={s.initiumId} compact />
      <OtherStreams currentSlug={s.slug} />
      <VotusInvestments compact sim={liveSim} />
      <SembleDictionary compact />
    </div>
  );
}

/* === HEADER (room title + status with live counters) === */
function Header({ sim, stream }: { sim: ReturnType<typeof useLiveSim>; stream: Stream }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
      <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="live-dot" />
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.18em] md:tracking-[0.2em] uppercase" style={{ color: 'var(--fg-muted)' }}>
            <span className="hidden sm:inline">Live · from </span>{stream.startedAt}
          </span>
        </div>
        <span className="shrink-0 hidden md:inline" style={{ color: 'var(--fg-faint)' }}>·</span>
        <h1 className="text-[14px] md:text-[17px] font-medium truncate min-w-0">
          <span style={{ color: 'var(--pirate)' }}>{cap(stream.pirate.handle)}</span><span style={{ color: 'var(--fg-faint)' }}> × </span><span style={{ color: 'var(--refiner)' }}>{cap(stream.refiner.handle)}</span>
          <span className="ml-2 hidden md:inline" style={{ color: 'var(--fg-muted)' }}>— {stream.title}</span>
        </h1>
      </div>
      <div className="hairline rounded-full px-3.5 py-1.5 glass flex items-center gap-3 text-[11px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg)' }}>
        <LiveCounter label="watching" value={sim.watching} />
        <span style={{ color: 'var(--fg-faint)' }}>·</span>
        <LiveCounter label="motus views" value={sim.motusViews} accent="sync" />
        <span style={{ color: 'var(--fg-faint)' }}>·</span>
        <LiveCounter label="votus" value={sim.votusStaked} accent="forge" />
      </div>
    </div>
  );
}

function cap(s: string) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function LiveCounter({ label, value, accent }: { label: string; value: number; accent?: string }) {
  const [pop, setPop] = useState(false);
  const lastRef = useRef(value);
  useEffect(() => {
    if (value !== lastRef.current) {
      setPop(true);
      const t = setTimeout(() => setPop(false), 600);
      lastRef.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);
  const color = accent === 'sync' ? 'var(--sync)' : accent === 'forge' ? 'var(--forge)' : 'var(--fg)';
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className={pop ? 'counter-pop' : ''} style={{ color, transition: 'color .3s' }}>{value.toLocaleString()}</span>
      <span style={{ color: 'var(--fg-faint)' }}>{label}</span>
    </span>
  );
}

/* === STAGE === */
function Stage({ sim, stream }: { sim: ReturnType<typeof useLiveSim>; stream: Stream }) {
  return (
    <div className="relative">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <StreamTile side="pirate" sim={sim} stream={stream} />
        <StreamTile side="refiner" sim={sim} stream={stream} />
      </div>
      <SyncBar sim={sim} />
    </div>
  );
}

function StreamTile({ side, sim, stream }: { side: 'pirate' | 'refiner'; sim: ReturnType<typeof useLiveSim>; stream: Stream }) {
  const isPirate = side === 'pirate';
  const member = isPirate ? stream.pirate : stream.refiner;
  const name = cap(member.handle);
  const role = member.role;
  const drive = `${member.handle.slice(0, 2).toUpperCase()}-${stream.initiumId.slice(-3)}`;
  return (
    <div
      className="relative rounded-2xl overflow-hidden hairline aspect-video glass-frosted"
      style={{
        background: isPirate
          ? 'radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--pirate) 22%, transparent), transparent 60%), var(--surface)'
          : 'radial-gradient(circle at 70% 20%, color-mix(in oklab, var(--refiner) 22%, transparent), transparent 60%), var(--surface)',
      }}
    >
      {/* ambient glow */}
      <div className="absolute inset-0 opacity-90 pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl breathe"
          style={{ background: isPirate ? 'color-mix(in oklab, var(--pirate) 40%, transparent)' : 'color-mix(in oklab, var(--refiner) 40%, transparent)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl breathe"
          style={{ background: 'color-mix(in oklab, var(--sync) 28%, transparent)', animationDelay: '2s' }}
        />
      </div>

      {/* face bloom */}
      <div
        className="absolute top-[14%] md:top-[18%] left-1/2 -translate-x-1/2 z-[0] w-24 h-24 md:w-40 md:h-40 rounded-full opacity-50 md:opacity-70 pointer-events-none breathe"
        style={{
          background: isPirate
            ? 'radial-gradient(circle, color-mix(in oklab, var(--pirate) 60%, transparent) 0%, color-mix(in oklab, var(--sync) 30%, transparent) 40%, transparent 70%)'
            : 'radial-gradient(circle, color-mix(in oklab, var(--refiner) 60%, transparent) 0%, color-mix(in oklab, var(--sync) 30%, transparent) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* waveform — below prompt panel on mobile so they never overlap */}
      <div className="absolute top-[36%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-2 z-[0] w-24 md:w-36 h-5 md:h-6 flex items-center gap-0.5 pointer-events-none opacity-50 md:opacity-100">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 rounded-full breathe"
            style={{
              height: `${20 + Math.abs(Math.sin(i * 0.7 + (isPirate ? 0 : 1.5))) * 80}%`,
              background: isPirate ? 'color-mix(in oklab, var(--pirate) 80%, transparent)' : 'color-mix(in oklab, var(--refiner) 80%, transparent)',
              animationDelay: `${i * 80}ms`,
            }}
          />
        ))}
      </div>

      {isPirate ? <PiratePromptTexture /> : <RefinerCodeTexture sim={sim} />}

      {/* avatar */}
      <div className="absolute top-4 left-4 flex items-center gap-2.5 z-10">
        <div
          className={`w-9 h-9 md:w-10 md:h-10 rounded-full halo halo-rotating bg-gradient-to-br`}
          style={{
            backgroundImage: isPirate
              ? 'linear-gradient(135deg, var(--pirate), var(--sync))'
              : 'linear-gradient(135deg, var(--refiner), var(--sync))',
          }}
        />
        <div>
          <p className="text-[14px] font-medium" style={{ color: isPirate ? 'var(--pirate)' : 'var(--refiner)' }}>{name}</p>
          <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>{role}</p>
        </div>
      </div>
      <div className="absolute top-4 right-4 chip text-[10px] z-10">
        <span className="live-dot" /> Drive {drive}
      </div>
      <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2">
        <span className="chip text-[10px] gap-1"><span className="live-dot" />Mic</span>
        <span className="chip text-[10px] gap-1">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: isPirate ? 'var(--pirate)' : 'var(--refiner)' }} />
          Cam
        </span>
      </div>
      <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5">
        <span className="chip text-[10px] font-mono" style={{ color: isPirate ? 'var(--pirate)' : 'var(--refiner)' }}>
          {member.dash}
        </span>
      </div>
    </div>
  );
}

function PiratePromptTexture() {
  return (
    <div className="absolute inset-0 z-[2] p-3 md:p-6 flex items-end pointer-events-none">
      <div
        className="w-full rounded-lg p-3 md:p-4 mt-12 overflow-hidden"
        style={{
          background: 'color-mix(in oklab, var(--bg) 88%, transparent)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--hairline)',
        }}
      >
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="w-2 h-2 rounded-full" style={{ background: 'color-mix(in oklab, var(--pirate) 70%, transparent)' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: 'color-mix(in oklab, var(--sync) 60%, transparent)' }} />
          <span className="w-2 h-2 rounded-full" style={{ background: 'color-mix(in oklab, var(--refiner) 60%, transparent)' }} />
          <span className="ml-2 text-[9px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>prompt.md · unsaved</span>
        </div>
        <p className="text-[11px] md:text-[12px] leading-relaxed font-mono" style={{ color: 'var(--fg)', overflowWrap: 'break-word' }}>
          <span style={{ color: 'var(--pirate)' }}>{`>`}</span> Make the Avari Signal show <span style={{ color: 'var(--pirate)' }}>direction only</span>.<br />
          Hide the tally until both partners close the poll.<br />
          Borrow from <span style={{ color: 'var(--sync)' }}>prediction-market</span> design.<br />
          <span style={{ color: 'var(--fg-faint)' }}>// the soul of the product is in this restraint</span>
          <span className="animate-pulse" style={{ color: 'var(--pirate)' }}>_</span>
        </p>
      </div>
    </div>
  );
}

function RefinerCodeTexture({ sim }: { sim: ReturnType<typeof useLiveSim> }) {
  const lastShip = sim.shipped[sim.shipped.length - 1];
  const lines = [
    { n: 138, t: 'function ', k: 'AvariSignal', sym: '({ poll }: { poll: Poll }) {' },
    { n: 139, t: '  const ', k: 'direction', sym: ' = useDirectionOnly(poll);' },
    { n: 140, t: '  return (' },
    { n: 141, t: '    <div ', k: 'className', sym: '="avari-gauge">' },
    { n: 142, t: '      <Needle bias=', k: '{direction}', sym: ' />' },
  ];
  return (
    <div className="absolute inset-0 z-[2] p-3 md:p-6 flex items-end pointer-events-none">
      <div
        className="w-full rounded-lg p-3 md:p-4 mt-12 font-mono overflow-hidden"
        style={{
          background: 'color-mix(in oklab, var(--bg) 88%, transparent)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--hairline)',
        }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: 'color-mix(in oklab, var(--refiner) 70%, transparent)' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: 'color-mix(in oklab, var(--sync) 60%, transparent)' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: 'color-mix(in oklab, var(--pirate) 60%, transparent)' }} />
            <span className="ml-2 text-[9px] tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>AvariSignal.tsx</span>
          </div>
          <span className="text-[9px] tracking-wider uppercase" style={{ color: 'var(--pirate)' }}>+12 −5</span>
        </div>
        <div className="text-[11px] md:text-[12px] leading-[1.55]" style={{ color: 'var(--fg-muted)' }}>
          {lines.map((l) => (
            <div key={l.n} className="flex gap-3 min-w-0">
              <span className="w-6 text-right shrink-0" style={{ color: 'var(--fg-faint)' }}>{l.n}</span>
              <span className="truncate min-w-0">
                <span style={{ color: 'var(--fg-muted)' }}>{l.t}</span>
                {l.k && <span style={{ color: 'var(--refiner)' }}>{l.k}</span>}
                <span style={{ color: 'var(--fg-muted)' }}>{l.sym}</span>
              </span>
            </div>
          ))}
          {lastShip && (
            <div className="flex gap-3 tick-in min-w-0" key={lastShip}>
              <span className="w-6 text-right shrink-0" style={{ color: 'var(--pirate)' }}>+</span>
              <span className="truncate min-w-0" style={{ color: 'var(--pirate)' }}>{lastShip}<span className="animate-pulse">_</span></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SyncBar({ sim }: { sim: ReturnType<typeof useLiveSim> }) {
  const commits = sim.shipped.length + 12;
  return (
    <div className="mt-3 hairline rounded-xl px-4 py-2.5 glass flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--pirate)', boxShadow: '0 0 8px var(--pirate)' }} />
          <div className="w-px h-4" style={{ background: 'var(--hairline-strong)' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--refiner)', boxShadow: '0 0 8px var(--refiner)' }} />
        </div>
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--fg-muted)' }}>Avari Sync</span>
        <span className="text-[14px] font-light tracking-tight twin-text">In Phase</span>
      </div>
      <div className="flex items-center gap-3 text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
        <span><span style={{ color: 'var(--pirate)' }}>+{commits}</span> commits</span>
        <span style={{ color: 'var(--fg-faint)' }}>·</span>
        <span><span style={{ color: 'var(--sync)' }}>3</span> polls</span>
        <span style={{ color: 'var(--fg-faint)' }}>·</span>
        <span><span style={{ color: 'var(--refiner)' }}>47</span> cortex joins</span>
      </div>
    </div>
  );
}

/* === FORGE METER === */
function ForgeMeter({ sim }: { sim: ReturnType<typeof useLiveSim> }) {
  const pct = Math.round(sim.forge * 100);
  const segs = [
    { label: 'Commits', val: 12 + sim.shipped.length, accent: 'var(--pirate)' },
    { label: 'Polls Closed', val: 3, accent: 'var(--sync)' },
    { label: 'Cortex Joins', val: 47, accent: 'var(--refiner)' },
    { label: 'VOTUS Staked', val: sim.votusStaked, accent: 'var(--forge)' },
  ];
  return (
    <div className="my-4 hairline rounded-xl p-4 md:p-5 glass">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--fg-muted)' }}>Forge Meter</span>
          <span className="text-[10px] font-mono" style={{ color: 'var(--forge)' }}>{pct}%</span>
        </div>
        <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>Day 1 · resets at 00:00 UTC</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden mb-4" style={{ background: 'var(--hairline)' }}>
        <div className="forge-bar h-full transition-[width] duration-700" style={{ width: `${pct}%` }} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {segs.map((s) => (
          <div key={s.label} className="hairline rounded-lg p-3" style={{ background: 'color-mix(in oklab, var(--bg) 50%, transparent)' }}>
            <p className="text-[10px] font-mono tracking-wider uppercase mb-1" style={{ color: 'var(--fg-faint)' }}>{s.label}</p>
            <p className="text-2xl font-light" style={{ color: s.accent }}>{s.val.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* === STREAM PROFILES === */
function StreamProfiles({ stream }: { stream: Stream }) {
  const [open, setOpen] = useState<'pirate' | 'refiner' | null>(null);
  return (
    <div className="my-4 grid md:grid-cols-2 gap-3">
      {(['pirate', 'refiner'] as const).map((side) => {
        const m = side === 'pirate' ? stream.pirate : stream.refiner;
        const accent = side === 'pirate' ? 'var(--pirate)' : 'var(--refiner)';
        const isOpen = open === side;
        return (
          <button
            key={side}
            onClick={() => setOpen(isOpen ? null : side)}
            className="hairline rounded-xl glass p-4 lift text-left"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full halo halo-rotating shrink-0"
                style={{
                  background: side === 'pirate' ? 'linear-gradient(135deg, var(--pirate), var(--sync))' : 'linear-gradient(135deg, var(--refiner), var(--sync))',
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium" style={{ color: 'var(--fg)' }}>
                  @{m.handle}
                </p>
                <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: accent }}>
                  {m.role}
                </p>
              </div>
              <span
                className="chip text-[10px] shrink-0"
                style={{ color: accent, borderColor: `color-mix(in oklab, ${accent} 30%, transparent)` }}
              >
                {m.dash}
              </span>
            </div>
            <p
              className="text-[12px] mt-3 leading-relaxed"
              style={{
                color: 'var(--fg-muted)',
                maxHeight: isOpen ? '500px' : '40px',
                overflow: 'hidden',
                transition: 'max-height .5s cubic-bezier(.2,.7,.2,1)',
              }}
            >
              {m.bio}
              {isOpen && (
                <>
                  <br /><br />
                  <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: accent }}>Drive ID</span> <span className="font-mono">{m.handle.slice(0, 2).toUpperCase()}-{stream.initiumId.slice(-3)}</span>
                  <br />
                  <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: accent }}>Dash username</span> <span className="font-mono">{m.dash}</span>
                  <br />
                  <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: accent }}>Streaming since</span> {stream.startedAt}
                </>
              )}
            </p>
            <p className="mt-2 text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
              {isOpen ? 'tap to collapse ↑' : 'tap to expand profile ↓'}
            </p>
          </button>
        );
      })}
    </div>
  );
}

/* === INITIUM DETAIL === */
function InitiumDetail({ stream }: { stream: Stream }) {
  return (
    <div className="my-4 hairline rounded-xl glass-frosted relative overflow-hidden">
      <div className="absolute inset-0 iridescent opacity-50 pointer-events-none" />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
          <div>
            <p className="chip mb-2" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 32%, transparent)' }}>
              Initium · {stream.initiumId}
            </p>
            <h3 className="font-light text-[20px] md:text-[26px] tracking-tight" style={{ color: 'var(--fg)' }}>
              {stream.title}
            </h3>
            <p className="text-[13px] mt-1.5 max-w-2xl leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
              {stream.premise}
            </p>
            <p className="text-[12px] mt-2" style={{ color: 'var(--fg-faint)' }}>
              Two-Key Drive: <span className="font-mono" style={{ color: 'var(--pirate)' }}>{stream.pirate.dash}</span> + <span className="font-mono" style={{ color: 'var(--refiner)' }}>{stream.refiner.dash}</span> · MIT · Open in public
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>Avari Signal</span>
            <AvariSignalGauge />
          </div>
        </div>

        {/* High-leverage moves */}
        <div className="hairline-t pt-4">
          <p className="chip mb-3 inline-flex" style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 30%, transparent)' }}>
            High-leverage moves — Davara's read
          </p>
          <ul className="space-y-2">
            {stream.highLeverage.map((m, i) => (
              <li key={i} className="flex gap-3 text-[13px]" style={{ color: 'var(--fg)' }}>
                <span className="font-mono text-[10px] tracking-wider uppercase shrink-0 w-8 mt-1" style={{ color: 'var(--forge)' }}>0{i + 1}</span>
                <span className="leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Outlier ideas */}
        <div className="hairline-t pt-4 mt-4">
          <p className="chip mb-3 inline-flex" style={{ color: 'var(--refiner)', borderColor: 'color-mix(in oklab, var(--refiner) 30%, transparent)' }}>
            Outlier ideas — not yet on the roadmap
          </p>
          <ul className="space-y-2">
            {stream.outlierIdeas.map((m, i) => (
              <li key={i} className="flex gap-3 text-[13px]" style={{ color: 'var(--fg)' }}>
                <span className="font-mono text-[10px] tracking-wider uppercase shrink-0 w-8 mt-1" style={{ color: 'var(--refiner)' }}>·</span>
                <span className="leading-relaxed italic">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* === OTHER STREAMS RAIL === */
function OtherStreams({ currentSlug }: { currentSlug: string }) {
  const others = STREAMS.filter((s) => s.slug !== currentSlug);
  if (others.length === 0) return null;
  return (
    <div className="my-6">
      <p className="chip mb-3 inline-flex" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 30%, transparent)' }}>
        <span className="live-dot mr-1.5" />
        Other streams in the room
      </p>
      <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x -mx-4 px-4 md:mx-0 md:px-0 pb-2">
        {others.map((s) => (
          <Link
            key={s.slug}
            href={`/rn/${s.slug}`}
            className="shrink-0 snap-start hairline rounded-xl glass p-4 lift"
            style={{ minWidth: '280px', maxWidth: '320px' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="live-dot" />
              <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
                {s.initiumId} · from {s.startedAt}
              </span>
            </div>
            <p className="text-[14px] font-medium leading-tight mb-1.5" style={{ color: 'var(--fg)' }}>
              <span style={{ color: 'var(--pirate)' }}>{cap(s.pirate.handle)}</span>
              <span style={{ color: 'var(--fg-faint)' }}> × </span>
              <span style={{ color: 'var(--refiner)' }}>{cap(s.refiner.handle)}</span>
            </p>
            <p className="text-[12px] mb-3 leading-snug" style={{ color: 'var(--fg-muted)' }}>
              {s.title}
            </p>
            <div className="hairline-t pt-2 flex items-center justify-between text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
              <span>{s.watching.toLocaleString()} watching</span>
              <span style={{ color: 'var(--forge)' }}>{s.votusStaked} VOTUS</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function AvariSignalGauge() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono" style={{ color: 'var(--fg-faint)' }}>Hold</span>
      <div className="relative w-32 h-1 rounded-full overflow-hidden" style={{ background: 'var(--hairline)' }}>
        <div className="absolute inset-y-0 left-0" style={{ width: '74%', background: 'linear-gradient(90deg, var(--sync), var(--pirate))' }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-px h-2" style={{ left: '74%', background: 'var(--fg-muted)' }} />
      </div>
      <span className="text-[10px] font-mono" style={{ color: 'var(--pirate)' }}>Build</span>
    </div>
  );
}

/* === THREE-FEED CHAT (live) === */
function ThreeFeeds({ sim, stream }: { sim: ReturnType<typeof useLiveSim>; stream: Stream }) {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3">
      <Feed title={`${cap(stream.pirate.handle)}'s Community`} tone="pirate" feed="pirate" placeholder={`say something to @${stream.pirate.handle}...`} messages={sim.messages.filter(m => m.feed === 'pirate')} />
      <Feed title="DuoDrive Live Chat" tone="sync" feed="duo" placeholder="speak to the duo and the cortex..." messages={sim.messages.filter(m => m.feed === 'duo')} featured />
      <Feed title={`${cap(stream.refiner.handle)}'s Community`} tone="refiner" feed="refiner" placeholder={`ping @${stream.refiner.handle}...`} messages={sim.messages.filter(m => m.feed === 'refiner')} />
    </div>
  );
}

function Feed({
  title, tone, feed, placeholder, messages, featured,
}: {
  title: string;
  tone: 'pirate' | 'refiner' | 'sync';
  feed: Feed;
  placeholder: string;
  messages: ChatMessage[];
  featured?: boolean;
}) {
  const [extra, setExtra] = useState<ChatMessage[]>([]);
  const [val, setVal] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);
  const all = [...messages, ...extra];
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [all.length]);
  const accent = tone === 'pirate' ? 'var(--pirate)' : tone === 'refiner' ? 'var(--refiner)' : 'var(--sync)';
  return (
    <div className={`hairline rounded-xl glass flex flex-col ${featured ? 'ring-1 ring-[color-mix(in_oklab,var(--sync)_30%,transparent)]' : ''}`}>
      <div className="px-4 py-3 hairline-b flex items-center justify-between">
        <span className="chip" style={{ color: accent, borderColor: `color-mix(in oklab, ${accent} 32%, transparent)` }}>{title}</span>
        {featured && <span className="text-[9px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>Duo + Cortex</span>}
      </div>
      <div ref={ref} className="flex-1 px-4 py-3 max-h-[320px] overflow-y-auto no-scrollbar text-[13px]">
        {all.map((m, i) => (
          <div
            key={m.id}
            className={`msg-row leading-snug ${i >= messages.length - 3 || extra.find(x => x.id === m.id) ? 'tick-in' : ''}`}
          >
            <span
              className="font-mono text-[11px] tracking-wider uppercase"
              style={{ color: m.who === 'system' ? 'var(--fg-faint)' : accent }}
            >
              {m.who}
            </span>
            <span className="ml-2" style={{ color: 'var(--fg)' }}>
              {m.txt}
              {m.votus && <span className="ml-2 text-[10px] font-mono" style={{ color: 'var(--forge)' }}>+{m.votus} VOTUS</span>}
            </span>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!val.trim()) return;
          setExtra([...extra, { id: `me-${Date.now()}`, feed, who: 'you', txt: val.trim() }]);
          setVal('');
        }}
        className="hairline-t px-3 py-2 flex items-center gap-2"
      >
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[13px] focus:outline-none px-2"
          style={{ color: 'var(--fg)' }}
        />
        <button
          type="submit"
          className="text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full hairline transition-colors"
          style={{ color: accent }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

/* === POLL + BETS === */
function PollAndBets() {
  const options = [
    { label: 'Free + VOTUS staking (community-owned)', dir: 0.62, gradient: 'linear-gradient(90deg, var(--pirate), var(--sync))', accent: 'var(--pirate)' },
    { label: 'Open core + paid Two-Key Drive (premium vault)', dir: 0.51, gradient: 'linear-gradient(90deg, var(--sync), var(--refiner))', accent: 'var(--sync)' },
    { label: 'Subscription for verified Vibe Coders ($11/mo)', dir: 0.31, gradient: 'linear-gradient(90deg, var(--refiner), color-mix(in oklab, var(--refiner) 40%, transparent))', accent: 'var(--refiner)' },
    { label: 'Take rate on Initium revenue + community royalties', dir: 0.45, gradient: 'linear-gradient(90deg, var(--forge), color-mix(in oklab, var(--forge) 40%, transparent))', accent: 'var(--forge)' },
  ];
  return (
    <div className="my-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
      <div className="lg:col-span-2 hairline rounded-xl p-5 glass">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <span className="chip" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 32%, transparent)' }}>First Votus Poll · revealed when both close</span>
          <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>312 staked</span>
        </div>
        <p className="text-[18px] md:text-[22px] font-light tracking-tight mb-4">
          What should DuoDrive's <span className="twin-text font-medium">revenue model</span> be?
        </p>
        <div className="space-y-2.5">
          {options.map((o) => (
            <div key={o.label}>
              <div className="flex items-center justify-between text-[12px] mb-1.5">
                <span style={{ color: 'var(--fg)' }}>{o.label}</span>
                <span className="font-mono text-[10px] tracking-wider uppercase" style={{ color: o.accent }}>· Avari Signal</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--hairline)' }}>
                <div className="h-full transition-[width] duration-700" style={{ width: `${o.dir * 100}%`, background: o.gradient }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
          ⓘ Avari Whispers — bars show direction only. Tally reveals when Jordash + Davara close the poll.
        </p>
      </div>
      <div className="hairline rounded-xl p-5 glass">
        <div className="flex items-center justify-between mb-3">
          <span className="chip" style={{ color: 'var(--forge)', borderColor: 'color-mix(in oklab, var(--forge) 32%, transparent)' }}>VOTUS Bets</span>
          <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>Live</span>
        </div>
        <ul className="space-y-3 text-[12px]">
          {[
            { kpi: 'Ships /signup tonight', odds: '0.78', delta: '↑' },
            { kpi: '1,000 Initiums by Q3', odds: '0.42', delta: '↑' },
            { kpi: 'VOTUS launches before Q4', odds: '0.56', delta: '·' },
            { kpi: 'Cortex flags first contributor', odds: '0.91', delta: '↑' },
          ].map((b) => (
            <li key={b.kpi} className="hairline-b pb-2.5 last:border-b-0 last:pb-0 flex items-center justify-between gap-2">
              <span style={{ color: 'var(--fg)' }}>{b.kpi}</span>
              <span className="font-mono text-[11px] flex items-center gap-1" style={{ color: 'var(--forge)' }}>
                {b.odds}<span style={{ color: 'var(--fg-faint)' }}>{b.delta}</span>
              </span>
            </li>
          ))}
        </ul>
        <Link href="/votus" className="mt-4 block text-center text-[11px] font-mono tracking-wider uppercase hairline-t pt-3 transition-colors" style={{ color: 'var(--fg-muted)' }}>
          Stake on a KPI →
        </Link>
      </div>
    </div>
  );
}
