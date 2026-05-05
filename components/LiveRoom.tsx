'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const SEED_PIRATE_CHAT = [
  { who: 'jordash_fan', txt: 'jordash going crazy on the prompts today 🔥', cls: 'text-pirate' },
  { who: 'lily.eth', txt: 'the avari signal idea is GENIUS', cls: 'text-pirate' },
  { who: 'pirate.0x', txt: 'this could replace github for vibe builds', cls: 'text-pirate' },
];
const SEED_REFINER_CHAT = [
  { who: 'davara_fam', txt: 'shipping at this speed is unreal', cls: 'text-refiner' },
  { who: 'shoji', txt: 'love the forge metaphor so much', cls: 'text-refiner' },
  { who: 'mr.refine', txt: 'is the code open source already?', cls: 'text-refiner' },
];
const SEED_DUO_CHAT = [
  { who: 'cortex', txt: '@jordash @davara — could the cortex donate testers for /signup ?', cls: 'text-sync' },
  { who: 'system', txt: 'Initium opened: building DuoDrive.Live · 32 watching', cls: 'text-white/35' },
  { who: 'davara', txt: 'taking the suggestion. cortex roles open in 5.', cls: 'text-sync' },
  { who: 'jordash', txt: 'let\'s ship the avari echo first. it\'s the soul.', cls: 'text-sync' },
];

export function LiveRoomClient() {
  return (
    <div className="px-5 md:px-8 max-w-[1500px] mx-auto pt-4">
      <Header />
      <Stage />
      <ForgeMeter />
      <Initium />
      <ThreeFeeds />
      <PollAndBets />
    </div>
  );
}

/* === HEADER (room title + status) === */
function Header() {
  return (
    <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <span className="live-dot" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/55">Live · 02:47:13</span>
        </div>
        <span className="text-white/20">·</span>
        <h1 className="text-[15px] md:text-[17px] font-medium truncate">
          <span className="text-pirate">Jordash</span> <span className="text-white/30">×</span> <span className="text-refiner">Davara</span>
          <span className="text-white/40 ml-2 hidden md:inline">— building DuoDrive.Live, on DuoDrive.Live</span>
        </h1>
      </div>
      <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-white/45">
        <span>4,210 watching</span>
        <span className="text-white/20">·</span>
        <span className="text-forge">312 VOTUS</span>
      </div>
    </div>
  );
}

/* === STAGE: the two streams + center HUD === */
function Stage() {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 rounded-2xl overflow-hidden">
      <StreamTile side="pirate" />
      <StreamTile side="refiner" />
      <CenterHud />
    </div>
  );
}

function StreamTile({ side }: { side: 'pirate' | 'refiner' }) {
  const isPirate = side === 'pirate';
  const name = isPirate ? 'Jordash' : 'Davara';
  const role = isPirate ? 'The Pirate · Prompts & Direction' : 'The Refiner · Code & Ship';
  const txt = isPirate ? 'text-pirate' : 'text-refiner';
  const drive = isPirate ? 'JR-001' : 'DV-001';
  const grad = isPirate
    ? 'from-pirate/40 via-pirate/8 to-void'
    : 'from-refiner/40 via-refiner/8 to-void';
  return (
    <div className={`relative rounded-2xl overflow-hidden hairline aspect-video bg-gradient-to-br ${grad}`}>
      {/* ambient glow */}
      <div className="absolute inset-0 opacity-70 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl breathe"
          style={{ background: isPirate ? 'rgba(92,255,210,0.18)' : 'rgba(255,79,163,0.18)' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl breathe"
          style={{ background: isPirate ? 'rgba(159,124,255,0.14)' : 'rgba(159,124,255,0.14)', animationDelay: '2s' }} />
      </div>

      {/* texture layer — prompt feed (pirate) or code feed (refiner) */}
      {isPirate ? <PiratePromptTexture /> : <RefinerCodeTexture />}

      {/* avatar dot */}
      <div className="absolute top-4 left-4 flex items-center gap-2.5 z-10">
        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full halo halo-rotating bg-gradient-to-br ${isPirate ? 'from-pirate to-sync' : 'from-refiner to-sync'}`} />
        <div>
          <p className={`text-[14px] font-medium ${txt}`}>{name}</p>
          <p className="text-[10px] font-mono tracking-wider uppercase text-white/40">{role}</p>
        </div>
      </div>
      {/* chip */}
      <div className="absolute top-4 right-4 chip text-[10px] z-10">
        <span className="live-dot" /> Drive {drive}
      </div>
      {/* mic/cam status */}
      <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2">
        <span className="chip text-[10px] gap-1"><span className="live-dot" />Mic</span>
        <span className="chip text-[10px] gap-1"><span className={`w-1.5 h-1.5 rounded-full ${isPirate ? 'bg-pirate' : 'bg-refiner'}`} />Cam</span>
      </div>
      <div className="absolute bottom-3 right-4 z-10">
        <span className="chip text-[10px] font-mono">{isPirate ? '02:47:13' : '02:47:13'}</span>
      </div>
    </div>
  );
}

function PiratePromptTexture() {
  // Looks like an open prompt window with text being typed
  return (
    <div className="absolute inset-0 z-[1] p-4 md:p-6 flex items-end pointer-events-none">
      <div className="w-full hairline rounded-lg bg-void/55 backdrop-blur-md p-3 md:p-4 mt-12">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className="w-2 h-2 rounded-full bg-pirate/70" />
          <span className="w-2 h-2 rounded-full bg-sync/60" />
          <span className="w-2 h-2 rounded-full bg-refiner/60" />
          <span className="ml-2 text-[9px] font-mono tracking-wider uppercase text-white/35">prompt.md · unsaved</span>
        </div>
        <p className="text-[11px] md:text-[12px] text-white/85 leading-relaxed font-mono">
          <span className="text-pirate">{`>`}</span> Make the Avari Signal show <span className="text-pirate">direction only</span>.<br />
          Hide the tally until both partners close the poll.<br />
          Borrow from <span className="text-sync">prediction-market</span> design.<br />
          <span className="text-white/45">// the soul of the product is in this restraint</span><span className="animate-pulse text-pirate">_</span>
        </p>
      </div>
    </div>
  );
}

function RefinerCodeTexture() {
  // Looks like an editor window showing live commits
  const lines = [
    { n: 138, t: 'function ', k: 'AvariSignal', sym: '({ poll }: { poll: Poll }) {' },
    { n: 139, t: '  const ', k: 'direction', sym: ' = useDirectionOnly(poll);' },
    { n: 140, t: '  return (' },
    { n: 141, t: '    <div ', k: 'className', sym: '="avari-gauge">' },
    { n: 142, t: '      <Needle bias=', k: '{direction}', sym: ' />' },
  ];
  return (
    <div className="absolute inset-0 z-[1] p-4 md:p-6 flex items-end pointer-events-none">
      <div className="w-full hairline rounded-lg bg-void/55 backdrop-blur-md p-3 md:p-4 mt-12 font-mono">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-refiner/70" />
            <span className="w-2 h-2 rounded-full bg-sync/60" />
            <span className="w-2 h-2 rounded-full bg-pirate/60" />
            <span className="ml-2 text-[9px] tracking-wider uppercase text-white/35">AvariSignal.tsx</span>
          </div>
          <span className="text-[9px] tracking-wider uppercase text-pirate">+12 −5</span>
        </div>
        <div className="text-[11px] md:text-[12px] leading-[1.55] text-white/80">
          {lines.map((l) => (
            <div key={l.n} className="flex gap-3">
              <span className="text-white/25 w-6 text-right shrink-0">{l.n}</span>
              <span>
                <span className="text-white/55">{l.t}</span>
                {l.k && <span className="text-refiner">{l.k}</span>}
                <span className="text-white/55">{l.sym}</span>
              </span>
            </div>
          ))}
          <div className="flex gap-3">
            <span className="text-pirate w-6 text-right shrink-0">+</span>
            <span className="text-pirate">      {`<Whisper open={duoClosedPoll} />`}<span className="animate-pulse">_</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CenterHud() {
  // Sits on top of the two stream tiles, centered. Hidden on mobile (stacks under).
  return (
    <div className="absolute hidden md:flex top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2 pointer-events-none">
      <div className="halo halo-rotating rounded-full p-[2px] bg-void shadow-[0_0_40px_rgba(159,124,255,0.35)]">
        <div className="rounded-full bg-void px-5 py-3 text-center min-w-[200px]">
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/55 mb-0.5">· Avari Sync ·</p>
          <p className="text-[18px] font-light tracking-tight twin-text">In Phase</p>
          <p className="text-[9px] font-mono tracking-wider uppercase text-white/40 mt-0.5">+12 commits · 3 polls · 47 cortex</p>
        </div>
      </div>
    </div>
  );
}

/* === FORGE METER === */
function ForgeMeter() {
  const segs = [
    { label: 'Commits', val: 12, cls: 'text-pirate', bar: 'from-pirate to-pirate/40' },
    { label: 'Polls Closed', val: 3, cls: 'text-sync', bar: 'from-sync to-sync/40' },
    { label: 'Cortex Joins', val: 7, cls: 'text-refiner', bar: 'from-refiner to-refiner/40' },
    { label: 'VOTUS Staked', val: 312, cls: 'text-forge', bar: 'from-forge to-forge/40' },
  ];
  return (
    <div className="my-4 hairline rounded-xl p-4 md:p-5 bg-slab/40">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/45">Forge Meter</span>
          <span className="text-[10px] font-mono text-forge">78%</span>
        </div>
        <span className="text-[10px] font-mono tracking-wider uppercase text-white/35">Day 1 · resets at 00:00 UTC</span>
      </div>
      <div className="h-1 rounded-full bg-white/5 overflow-hidden mb-4">
        <div className="forge-bar h-full" style={{ width: '78%' }} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {segs.map((s) => (
          <div key={s.label} className="hairline rounded-lg p-3 bg-void/40">
            <p className="text-[10px] font-mono tracking-wider uppercase text-white/40 mb-1">{s.label}</p>
            <p className={`text-2xl font-light ${s.cls}`}>{s.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* === INITIUM CARD === */
function Initium() {
  return (
    <div className="my-4 hairline rounded-xl p-5 bg-gradient-to-br from-sync/10 via-slab/40 to-void">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="chip chip-sync mb-2">Initium · INI-009</p>
          <h3 className="font-light text-[20px] md:text-[26px] tracking-tight">
            Build DuoDrive.Live <span className="text-white/40">— the platform — on the platform.</span>
          </h3>
          <p className="text-[13px] text-white/55 mt-1">
            Two-Key Drive: <span className="font-mono text-pirate">jordash.duo</span> + <span className="font-mono text-refiner">davara.duo</span> · MIT · Open in public.
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-mono tracking-wider uppercase text-white/40">Avari Signal</span>
          <AvariSignalGauge />
        </div>
      </div>
    </div>
  );
}

function AvariSignalGauge() {
  // Direction-only gauge — bias to "Build it" without showing exact tally
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-white/40 font-mono">Hold</span>
      <div className="relative w-32 h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-sync to-pirate" style={{ width: '74%' }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-white/40" style={{ left: '74%' }} />
      </div>
      <span className="text-[10px] text-pirate font-mono">Build</span>
    </div>
  );
}

/* === THREE-FEED CHAT === */
function ThreeFeeds() {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3">
      <Feed title="Jordash's Community" tone="pirate" seed={SEED_PIRATE_CHAT} placeholder="say something to the pirate fleet..." />
      <Feed title="DuoDrive Live Chat" tone="sync" seed={SEED_DUO_CHAT} placeholder="speak to the duo and the cortex..." featured />
      <Feed title="Davara's Community" tone="refiner" seed={SEED_REFINER_CHAT} placeholder="ping the refinery..." />
    </div>
  );
}

function Feed({
  title, tone, seed, placeholder, featured,
}: {
  title: string;
  tone: 'pirate' | 'refiner' | 'sync';
  seed: { who: string; txt: string; cls: string }[];
  placeholder: string;
  featured?: boolean;
}) {
  const [msgs, setMsgs] = useState(seed);
  const [val, setVal] = useState('');
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [msgs]);
  const chip = tone === 'pirate' ? 'chip-pirate' : tone === 'refiner' ? 'chip-refiner' : 'chip-sync';
  return (
    <div className={`hairline rounded-xl bg-slab/40 flex flex-col ${featured ? 'md:row-span-1' : ''}`}>
      <div className="px-4 py-3 hairline-b flex items-center justify-between">
        <span className={`chip ${chip}`}>{title}</span>
        {featured && <span className="text-[9px] font-mono tracking-wider uppercase text-white/35">3rd Feed · The Duo & Cortex</span>}
      </div>
      <div ref={ref} className="flex-1 px-4 py-3 space-y-2.5 max-h-[320px] overflow-y-auto no-scrollbar text-[13px]">
        {msgs.map((m, i) => (
          <div key={i} className="leading-snug">
            <span className={`font-mono text-[11px] tracking-wider uppercase ${m.cls}`}>{m.who}</span>
            <span className="text-white/70 ml-2">{m.txt}</span>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!val.trim()) return;
          setMsgs([...msgs, { who: 'you', txt: val.trim(), cls: 'text-white/85' }]);
          setVal('');
        }}
        className="hairline-t px-3 py-2 flex items-center gap-2"
      >
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[13px] text-white/85 placeholder:text-white/30 focus:outline-none px-2"
        />
        <button type="submit" className={`text-[11px] font-mono tracking-wider uppercase px-3 py-1.5 rounded-full hairline ${tone === 'pirate' ? 'text-pirate hover:bg-pirate/10' : tone === 'refiner' ? 'text-refiner hover:bg-refiner/10' : 'text-sync hover:bg-sync/10'} transition-colors`}>
          Send
        </button>
      </form>
    </div>
  );
}

/* === POLL + BETS STRIP === */
function PollAndBets() {
  return (
    <div className="my-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* Poll */}
      <div className="lg:col-span-2 hairline rounded-xl p-5 bg-slab/40">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <span className="chip chip-sync">First Votus Poll · revealed when both close</span>
          <span className="text-[10px] font-mono tracking-wider uppercase text-white/40">312 staked</span>
        </div>
        <p className="text-[18px] md:text-[22px] font-light tracking-tight mb-4">
          What should DuoDrive's <span className="twin-text font-medium">revenue model</span> be?
        </p>
        <div className="space-y-2.5">
          {[
            { label: 'Free + VOTUS staking (community-owned)', dir: 0.62, cls: 'from-pirate to-sync', accent: 'text-pirate' },
            { label: 'Open core + paid Two-Key Drive (premium vault)', dir: 0.51, cls: 'from-sync to-refiner', accent: 'text-sync' },
            { label: 'Subscription for verified Vibe Coders ($11/mo)', dir: 0.31, cls: 'from-refiner to-refiner/40', accent: 'text-refiner' },
            { label: 'Take rate on Initium revenue + community royalties', dir: 0.45, cls: 'from-forge to-forge/40', accent: 'text-forge' },
          ].map((o) => (
            <div key={o.label} className="group">
              <div className="flex items-center justify-between text-[12px] mb-1.5">
                <span className="text-white/75">{o.label}</span>
                <span className={`font-mono text-[10px] tracking-wider uppercase ${o.accent}`}>·  Avari Signal</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${o.cls}`} style={{ width: `${o.dir * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] font-mono tracking-wider uppercase text-white/35">
          ⓘ Avari Whispers — bars show direction only. Tally reveals when Jordash + Davara close the poll.
        </p>
      </div>
      {/* Bets */}
      <div className="hairline rounded-xl p-5 bg-slab/40">
        <div className="flex items-center justify-between mb-3">
          <span className="chip chip-forge">VOTUS Bets</span>
          <span className="text-[10px] font-mono tracking-wider uppercase text-white/40">Live</span>
        </div>
        <ul className="space-y-3 text-[12px]">
          {[
            { kpi: 'Ships /signup tonight', odds: '0.78', delta: '↑' },
            { kpi: '1,000 Initiums by Q3', odds: '0.42', delta: '↑' },
            { kpi: 'VOTUS launches before Q4', odds: '0.56', delta: '·' },
            { kpi: 'Cortex flags first contributor', odds: '0.91', delta: '↑' },
          ].map((b) => (
            <li key={b.kpi} className="hairline-b pb-2.5 last:border-b-0 last:pb-0 flex items-center justify-between gap-2">
              <span className="text-white/75">{b.kpi}</span>
              <span className="font-mono text-forge text-[11px] flex items-center gap-1">
                {b.odds}<span className="text-white/40">{b.delta}</span>
              </span>
            </li>
          ))}
        </ul>
        <Link href="/votus" className="mt-4 block text-center text-[11px] font-mono tracking-wider uppercase text-white/45 hover:text-forge transition-colors hairline-t pt-3">
          Stake on a KPI →
        </Link>
      </div>
    </div>
  );
}
