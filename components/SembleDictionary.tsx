'use client';
import { useState } from 'react';

type Drift = 'newly coined' | 'growing' | 'stable' | 'fossilizing';
type Layer = 'personal-jr' | 'personal-dv' | 'duo' | 'public';

// 7-day usage spark per entry: 0–9 amplitude, today is the last value
const ENTRIES: { word: string; def: string; by: string; layer: Layer; votus: number; drift: Drift; example?: string; coined: string; lastUsed: string; spark: number[] }[] = [
  { word: 'Avari Sync', def: 'A vibe-coding partnership where the Pirate and the Refiner alternate, argue, and land. The duo is the unit, not the individual.', by: 'Davara × Jordash', layer: 'duo', votus: 412, drift: 'stable', example: '"They\'re in Avari Sync today — you can feel the cadence."', coined: '2026-04-12', lastUsed: '2m ago', spark: [3, 5, 4, 6, 7, 6, 8] },
  { word: 'Forge Meter', def: 'The daily momentum signal. Resets at 00:00 UTC. Streaks compound.', by: 'Davara', layer: 'duo', votus: 188, drift: 'growing', example: '"Forge is at 78%, we ship before reset."', coined: '2026-04-22', lastUsed: '14m ago', spark: [1, 2, 3, 4, 5, 7, 9] },
  { word: 'Whispering', def: 'Voting where bars show direction only — tallies reveal when the duo opens the box. Removes bandwagon bias.', by: 'Jordash', layer: 'duo', votus: 244, drift: 'growing', example: '"Let\'s whisper the revenue poll for an hour before reveal."', coined: '2026-05-04', lastUsed: 'just now', spark: [0, 0, 1, 2, 3, 5, 9] },
  { word: 'Pirate-Coding', def: 'Building from the prompt outward — the verb form of being the directional half of an Avari Sync.', by: 'Jordash', layer: 'personal-jr', votus: 98, drift: 'stable', example: '"I\'m pirate-coding the new poll spec right now."', coined: '2026-04-15', lastUsed: '1h ago', spark: [4, 4, 5, 4, 5, 4, 5] },
  { word: 'Refiner-Mode', def: 'Heads-down ship state. No Slack, no twitter, just the diff and the test runner.', by: 'Davara', layer: 'personal-dv', votus: 71, drift: 'stable', coined: '2026-04-18', lastUsed: '3h ago', spark: [3, 4, 3, 4, 3, 4, 3] },
  { word: 'Initium', def: 'A project-in-flight with at least two signers and a Two-Key Drive vault. The unit of building on DuoDrive.', by: 'The Cortex', layer: 'public', votus: 821, drift: 'stable', coined: '2026-03-30', lastUsed: 'just now', spark: [6, 7, 6, 8, 7, 8, 9] },
  { word: 'Cortex Drift', def: 'When the community starts inventing roles the duo never thought of. A high-leverage signal that the room is alive.', by: 'lily.eth', layer: 'public', votus: 156, drift: 'newly coined', example: '"Cortex drift hit today — three new roles claimed in an hour."', coined: '2026-05-04', lastUsed: '8m ago', spark: [0, 0, 0, 1, 4, 7, 9] },
  { word: 'Echo-Catch', def: 'When Avari Echo flags a stream moment as worth-keeping; the line lands in the Initium README.', by: 'Davara × Cortex', layer: 'duo', votus: 89, drift: 'growing', coined: '2026-05-03', lastUsed: '22m ago', spark: [1, 2, 1, 3, 4, 5, 7] },
  { word: 'Shadow Watching', def: 'Following the Shadow Stream — the third feed showing only the live diff. For watchers who want building, not talking.', by: 'pirate.0x', layer: 'public', votus: 134, drift: 'newly coined', coined: '2026-05-04', lastUsed: '4m ago', spark: [0, 0, 0, 0, 2, 5, 8] },
  { word: 'Two-Keyed', def: 'A file or decision that requires both signers + ZK proof to unlock. Used as a verb: "let\'s two-key the revenue split."', by: 'Davara × Jordash', layer: 'duo', votus: 201, drift: 'growing', example: '"That\'s a two-keyed call — can\'t ship it solo."', coined: '2026-04-28', lastUsed: '32m ago', spark: [2, 3, 4, 4, 5, 6, 8] },
  { word: 'Anvilling', def: 'Resolving a deadlocked Initium dispute through the binding poll step of governance. After Pause and Whisper.', by: 'The Manifesto', layer: 'public', votus: 67, drift: 'fossilizing', coined: '2026-04-10', lastUsed: '6d ago', spark: [4, 3, 2, 2, 1, 1, 0] },
  { word: 'Drive Brevity', def: 'The discipline of saying it short — because the room is watching, the diff is the truth, and the timer is running.', by: 'Davara', layer: 'personal-dv', votus: 44, drift: 'stable', example: '"Drive brevity, Jordash — three sentences max in the README."', coined: '2026-04-30', lastUsed: '5h ago', spark: [3, 4, 3, 4, 4, 3, 4] },
];

const FILTERS: { id: Layer | 'all' | 'new'; label: string; cls: string }[] = [
  { id: 'all', label: 'All', cls: 'chip-sync' },
  { id: 'duo', label: 'Duo', cls: 'chip-sync' },
  { id: 'personal-jr', label: 'Jordash', cls: 'chip-pirate' },
  { id: 'personal-dv', label: 'Davara', cls: 'chip-refiner' },
  { id: 'public', label: 'Public', cls: 'chip-forge' },
  { id: 'new', label: '· New', cls: 'chip-pirate' },
];

export function SembleDictionary({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState<Layer | 'all' | 'new'>('all');
  const [proposing, setProposing] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newDef, setNewDef] = useState('');

  const filtered = ENTRIES.filter((e) => {
    if (filter === 'all') return true;
    if (filter === 'new') return e.drift === 'newly coined';
    return e.layer === filter;
  });

  return (
    <section className={compact ? 'my-6' : 'my-10'}>
      {/* header */}
      <div className="flex items-end justify-between gap-4 flex-wrap mb-5">
        <div>
          <p className="chip chip-sync mb-2.5">Semble Dictionary</p>
          <h2 className="font-light text-[clamp(22px,3.4vw,38px)] tracking-tight leading-[1.1]">
            The <span className="twin-text">shared language</span> they're growing.
          </h2>
          <p className="text-[12px] md:text-[13px] text-white/45 mt-1.5 max-w-xl leading-relaxed">
            A living glossary. Words get coined live, voted by the Cortex, drift in and out of usage.
          </p>
        </div>
        <button
          onClick={() => setProposing(!proposing)}
          className="text-[12px] font-mono tracking-wider uppercase px-4 py-2 rounded-full hairline hover:border-sync/60 hover:text-sync transition-colors"
        >
          + Coin a Word
        </button>
      </div>

      {/* filter chips — swipeable on mobile */}
      <div className="flex gap-1.5 mb-4 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          const count = f.id === 'all' ? ENTRIES.length : f.id === 'new' ? ENTRIES.filter(e => e.drift === 'newly coined').length : ENTRIES.filter(e => e.layer === f.id).length;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 chip ${active ? f.cls : ''} ${active ? 'border-current text-current' : 'opacity-60 hover:opacity-100'} transition-all`}
            >
              {f.label}
              <span className={`font-mono text-[9px] ${active ? 'opacity-70' : 'opacity-50'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* propose drawer */}
      {proposing && (
        <div className="hairline rounded-xl p-5 bg-gradient-to-br from-sync/10 to-slab/40 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-sync">Propose a Word</p>
            <button onClick={() => setProposing(false)} className="text-white/40 hover:text-white text-[12px]">close</button>
          </div>
          <input
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="The word"
            className="w-full bg-void/40 hairline rounded-lg px-4 py-2.5 text-[14px] mb-2 focus:outline-none focus:border-sync/60"
          />
          <textarea
            value={newDef}
            onChange={(e) => setNewDef(e.target.value)}
            placeholder="What does it mean? Be precise. The Cortex will vote."
            rows={3}
            className="w-full bg-void/40 hairline rounded-lg px-4 py-2.5 text-[14px] mb-3 focus:outline-none focus:border-sync/60 resize-none"
          />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-[11px] text-white/40 font-mono tracking-wider uppercase">Threshold to enter Duo: 50 VOTUS</p>
            <button
              onClick={() => { alert('Preview prototype — your word would enter the proposal queue.'); setNewWord(''); setNewDef(''); setProposing(false); }}
              disabled={!newWord || !newDef}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-pirate via-sync to-refiner text-void font-medium text-[12px] disabled:opacity-30"
            >
              Submit to Cortex →
            </button>
          </div>
        </div>
      )}

      {/* entries */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((e) => (
          <Entry key={e.word} e={e} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="hairline rounded-xl p-8 text-center text-white/40 text-[13px]">
          No words in this layer yet. <button onClick={() => setProposing(true)} className="text-sync hover:underline">Coin one →</button>
        </div>
      )}
    </section>
  );
}

function MicroSpark({ data, drift }: { data: number[]; drift: Drift }) {
  const max = Math.max(...data, 1);
  const W = 84;
  const H = 22;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - (v / max) * H;
    return `${x},${y}`;
  }).join(' ');
  const stroke = drift === 'growing' || drift === 'newly coined' ? '#5CFFD2' : drift === 'fossilizing' ? '#9F7CFF66' : '#FFFFFF55';
  return (
    <div>
      <p className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/35 mb-0.5">7d usage</p>
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block">
        <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * W;
          const y = H - (v / max) * H;
          return <circle key={i} cx={x} cy={y} r={i === data.length - 1 ? 1.6 : 0.8} fill={stroke} />;
        })}
      </svg>
    </div>
  );
}

function Entry({ e }: { e: typeof ENTRIES[0] }) {
  const layerCls =
    e.layer === 'duo' ? 'chip-sync' :
    e.layer === 'personal-jr' ? 'chip-pirate' :
    e.layer === 'personal-dv' ? 'chip-refiner' :
    'chip-forge';
  const layerLabel =
    e.layer === 'duo' ? 'Duo' :
    e.layer === 'personal-jr' ? 'Jordash · Personal' :
    e.layer === 'personal-dv' ? 'Davara · Personal' :
    'Public Lexicon';
  const driftCls =
    e.drift === 'growing' ? 'text-pirate' :
    e.drift === 'newly coined' ? 'text-sync' :
    e.drift === 'fossilizing' ? 'text-white/35' :
    'text-white/55';
  const driftIcon =
    e.drift === 'growing' ? '↑' :
    e.drift === 'newly coined' ? '✦' :
    e.drift === 'fossilizing' ? '↓' :
    '·';
  return (
    <article className="hairline rounded-xl p-5 bg-slab/40 hover:border-sync/40 transition-colors flex flex-col">
      <div className="flex items-center justify-between mb-2.5">
        <span className={`chip ${layerCls} text-[9px]`}>{layerLabel}</span>
        <span className={`text-[10px] font-mono tracking-wider uppercase ${driftCls}`}>
          {driftIcon} {e.drift}
        </span>
      </div>
      <h3 className="font-medium text-[18px] tracking-tight mb-1.5">{e.word}</h3>
      <p className="text-[13px] text-white/65 leading-relaxed mb-3 flex-1">{e.def}</p>
      {e.example && (
        <p className="text-[11px] italic text-white/45 leading-relaxed mb-3 hairline-t pt-3">
          {e.example}
        </p>
      )}
      <div className="hairline-t pt-3 mt-auto">
        <div className="flex items-center justify-between gap-3">
          <MicroSpark data={e.spark} drift={e.drift} />
          <div className="text-right">
            <p className="text-[10px] font-mono tracking-wider uppercase text-white/45">used {e.lastUsed}</p>
            <p className="text-[10px] font-mono tracking-wider uppercase text-forge">↑ {e.votus} votus</p>
          </div>
        </div>
        <p className="text-[10px] font-mono tracking-wider uppercase text-white/30 mt-2">
          @{e.by} · coined {e.coined}
        </p>
      </div>
    </article>
  );
}
