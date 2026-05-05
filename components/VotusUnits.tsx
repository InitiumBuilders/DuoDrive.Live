'use client';
import { useState } from 'react';

type Member = { handle: string; dash?: string; role?: string };

type Unit = {
  id: string;
  name: string;
  task: string;
  description: string;
  status: 'forming' | 'active' | 'review' | 'shipped';
  members: Member[];
  capacity: number;
  votusPool: number;
  consensus: number; // 0..1 — Avari Whisper toward "approve task delivery"
  parentInitium?: string;
  cls: 'pirate' | 'refiner' | 'sync' | 'forge';
};

const SEED_UNITS: Unit[] = [
  {
    id: 'U-009-A',
    name: 'Whisper Spec Unit',
    task: 'Formalize Avari Whisper voting rules into a typed contract',
    description: 'Three-person unit drafting the formal Avari Whisper specification — direction-only voting, tally hidden until duo opens, cortex weighting, time-decay model.',
    status: 'active',
    members: [
      { handle: 'shoji', dash: 'shoji.dash', role: 'Schema lead' },
      { handle: 'rune', dash: 'rune.dash', role: 'Tests' },
      { handle: 'lily.eth', dash: 'lily.dash', role: 'Cortex liaison' },
    ],
    capacity: 4,
    votusPool: 64,
    consensus: 0.78,
    parentInitium: 'INI-009',
    cls: 'sync',
  },
  {
    id: 'U-014-B',
    name: 'Cosmos IBC Bridge Unit',
    task: 'Wire Veros subscriptions to Osmosis + Noble rails',
    description: 'Two-person unit building the IBC packet flow: a DASH subscription event triggers a payout on Osmosis. Noble for USDC fiat rails. Ships with a working Osmosis testnet demo.',
    status: 'active',
    members: [
      { handle: 'kato', dash: 'kato.dash', role: 'IBC implementation' },
      { handle: 'haze', dash: 'haze.dash', role: 'Osmosis SDK' },
    ],
    capacity: 3,
    votusPool: 92,
    consensus: 0.84,
    parentInitium: 'INI-014',
    cls: 'refiner',
  },
  {
    id: 'U-014-C',
    name: 'ZK Privacy Unit',
    task: 'Groth16 proofs over subscription metadata',
    description: 'Three-person unit implementing the ZK proof layer: prove a subscription is valid (active, paid, not revoked) without revealing the payer, payee, or amount on-chain.',
    status: 'forming',
    members: [
      { handle: 'cipher', dash: 'cipher.dash', role: 'circuit author' },
    ],
    capacity: 4,
    votusPool: 41,
    consensus: 0.61,
    parentInitium: 'INI-014',
    cls: 'sync',
  },
  {
    id: 'U-009-D',
    name: 'Mobile Polish Unit',
    task: 'Refine the mobile experience for /rn/<slug> pages',
    description: 'Two-person unit hunting layout issues on phones: bottom-nav clearance, hero-pill overflow, profile-card expansion, swipe-cycling between Initiums.',
    status: 'review',
    members: [
      { handle: 'opal', dash: 'opal.dash', role: 'IA + layout' },
      { handle: 'pip', dash: 'pip.dash', role: 'CSS pass' },
    ],
    capacity: 3,
    votusPool: 38,
    consensus: 0.91,
    parentInitium: 'INI-009',
    cls: 'pirate',
  },
  {
    id: 'U-022-E',
    name: 'Auto-Pair Heuristic Unit',
    task: 'Score the v0.1 pairing algorithm against 50 sample pairs',
    description: 'Open call for cortex helpers. Code the 6-factor scoring function, run it against the sample dataset, publish results + adjustments.',
    status: 'forming',
    members: [],
    capacity: 4,
    votusPool: 22,
    consensus: 0.48,
    parentInitium: 'INI-022',
    cls: 'forge',
  },
];

export function VotusUnits({ initiumId, compact = false }: { initiumId?: string; compact?: boolean }) {
  // Filter by parent Initium if requested; otherwise show all.
  const initial = initiumId ? SEED_UNITS.filter((u) => u.parentInitium === initiumId) : SEED_UNITS;
  const [units, setUnits] = useState<Unit[]>(initial);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTask, setNewTask] = useState('');
  const [newCapacity, setNewCapacity] = useState(3);

  const join = (id: string) => {
    setUnits((prev) =>
      prev.map((u) =>
        u.id === id && u.members.length < u.capacity
          ? { ...u, members: [...u.members, { handle: 'you', role: 'cortex helper' }] }
          : u,
      ),
    );
  };

  const createUnit = () => {
    if (!newName.trim() || !newTask.trim()) return;
    const u: Unit = {
      id: `U-${(initiumId || 'NEW').slice(-3)}-${Math.random().toString(36).slice(2, 4).toUpperCase()}`,
      name: newName.trim(),
      task: newTask.trim(),
      description: 'Newly proposed by you. Awaiting consensus from cortex + duo.',
      status: 'forming',
      members: [{ handle: 'you', role: 'founder' }],
      capacity: newCapacity,
      votusPool: 0,
      consensus: 0.1,
      parentInitium: initiumId,
      cls: 'sync',
    };
    setUnits([u, ...units]);
    setNewName('');
    setNewTask('');
    setCreating(false);
  };

  return (
    <section className={compact ? 'my-6' : 'my-10'}>
      <div className="flex items-end justify-between gap-3 flex-wrap mb-5">
        <div>
          <p
            className="chip mb-2 inline-flex"
            style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}
          >
            ✦ VOTUS Units · build-teams
          </p>
          <h2 className="font-light text-[clamp(20px,3.2vw,32px)] tracking-tight leading-tight">
            Sub-teams that <span className="twin-text">break the work down.</span>
          </h2>
          <p className="text-[12px] md:text-[13px] mt-1.5 max-w-2xl leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            A consensus-driven block-team system. Anyone in the cortex can propose a Unit — a small 2-5 person team with a single task, a VOTUS pool, and an Avari Whisper consensus bar. Units form, ship, dissolve. The Initium stays whole; the work distributes safely.
          </p>
        </div>
        <button
          onClick={() => setCreating(!creating)}
          className="text-[11px] font-mono tracking-wider uppercase px-4 py-2 rounded-full hairline transition-colors hover:[color:var(--sync)]"
          style={{ color: 'var(--fg-muted)' }}
        >
          + Propose a Unit
        </button>
      </div>

      {creating && (
        <div className="hairline rounded-xl glass p-5 mb-4">
          <div className="grid md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[10px] font-mono tracking-wider uppercase block mb-1" style={{ color: 'var(--fg-faint)' }}>
                Unit name
              </label>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Whisper Spec Unit"
                className="w-full hairline rounded-lg px-3 py-2 text-[14px]"
                style={{ background: 'var(--surface)', color: 'var(--fg)' }}
              />
            </div>
            <div>
              <label className="text-[10px] font-mono tracking-wider uppercase block mb-1" style={{ color: 'var(--fg-faint)' }}>
                Capacity
              </label>
              <select
                value={newCapacity}
                onChange={(e) => setNewCapacity(parseInt(e.target.value))}
                className="w-full hairline rounded-lg px-3 py-2 text-[14px]"
                style={{ background: 'var(--surface)', color: 'var(--fg)' }}
              >
                <option value={2}>2 builders</option>
                <option value={3}>3 builders</option>
                <option value={4}>4 builders</option>
                <option value={5}>5 builders</option>
              </select>
            </div>
          </div>
          <label className="text-[10px] font-mono tracking-wider uppercase block mb-1" style={{ color: 'var(--fg-faint)' }}>
            Task — one sentence
          </label>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="e.g. Formalize Avari Whisper voting rules into a typed contract"
            className="w-full hairline rounded-lg px-3 py-2 text-[14px] mb-3"
            style={{ background: 'var(--surface)', color: 'var(--fg)' }}
          />
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => setCreating(false)}
              className="text-[11px] font-mono tracking-wider uppercase px-4 py-2 rounded-full hairline"
              style={{ color: 'var(--fg-muted)' }}
            >
              Cancel
            </button>
            <button
              onClick={createUnit}
              disabled={!newName.trim() || !newTask.trim()}
              className="gradient-cta text-[11px] font-mono tracking-wider uppercase px-4 py-2 rounded-full bg-gradient-to-r from-pirate via-sync to-refiner text-void disabled:opacity-30"
            >
              Propose Unit →
            </button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3">
        {units.map((u) => (
          <UnitCard key={u.id} u={u} onJoin={() => join(u.id)} />
        ))}
        {units.length === 0 && (
          <div className="hairline rounded-xl glass p-6 text-center text-[13px]" style={{ color: 'var(--fg-muted)' }}>
            No Units yet. <button onClick={() => setCreating(true)} className="underline" style={{ color: 'var(--sync)' }}>Propose the first one →</button>
          </div>
        )}
      </div>

      <div className="mt-6 hairline rounded-xl glass p-4">
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--forge)' }}>
          How VOTUS Units stay safe
        </p>
        <ul className="grid md:grid-cols-3 gap-3 text-[12px]" style={{ color: 'var(--fg-muted)' }}>
          <li><span className="font-mono tracking-wider uppercase mr-1" style={{ color: 'var(--pirate)' }}>· Consent</span> Members must opt in. The duo signs off. No conscription.</li>
          <li><span className="font-mono tracking-wider uppercase mr-1" style={{ color: 'var(--sync)' }}>· Consensus</span> Avari Whisper bar must reach 70% before a Unit can ship its task to the Initium.</li>
          <li><span className="font-mono tracking-wider uppercase mr-1" style={{ color: 'var(--forge)' }}>· Cap</span> Max 5 builders. Beyond that, fork into two Units. Small is safe.</li>
        </ul>
      </div>
    </section>
  );
}

function UnitCard({ u, onJoin }: { u: Unit; onJoin: () => void }) {
  const accent =
    u.cls === 'pirate' ? 'var(--pirate)' :
    u.cls === 'refiner' ? 'var(--refiner)' :
    u.cls === 'forge' ? 'var(--forge)' :
    'var(--sync)';
  const stateLabel =
    u.status === 'forming' ? 'forming' :
    u.status === 'active' ? '· active' :
    u.status === 'review' ? 'in review' :
    'shipped';
  const stateColor =
    u.status === 'forming' ? 'var(--fg-faint)' :
    u.status === 'active' ? 'var(--pirate)' :
    u.status === 'review' ? 'var(--sync)' :
    'var(--forge)';
  const seatsLeft = u.capacity - u.members.length;
  return (
    <article className="hairline rounded-xl glass p-5 lift flex flex-col">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: accent }}>
          {u.id}
        </span>
        <span className="text-[10px] font-mono tracking-wider uppercase flex items-center gap-1" style={{ color: stateColor }}>
          {u.status === 'active' && <span className="live-dot" />}
          {stateLabel}
        </span>
      </div>

      <h3 className="text-[16px] font-medium leading-tight mb-1" style={{ color: 'var(--fg)' }}>
        {u.name}
      </h3>
      <p className="text-[12.5px] font-mono leading-relaxed mb-2" style={{ color: 'var(--sync)' }}>
        {u.task}
      </p>
      <p className="text-[12px] leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
        {u.description}
      </p>

      {/* Consensus bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[10px] font-mono tracking-wider uppercase mb-1.5">
          <span style={{ color: 'var(--fg-faint)' }}>Hold</span>
          <span style={{ color: accent }}>Avari Whisper</span>
          <span style={{ color: 'var(--fg-faint)' }}>Approve</span>
        </div>
        <div className="relative h-1 rounded-full overflow-hidden" style={{ background: 'var(--hairline)' }}>
          <div
            className="absolute inset-y-0 left-0 transition-[width] duration-700"
            style={{ width: `${u.consensus * 100}%`, background: 'linear-gradient(90deg, var(--sync), var(--pirate))' }}
          />
        </div>
      </div>

      {/* Members */}
      <div className="hairline-t pt-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            Members ({u.members.length} / {u.capacity})
          </p>
          <p className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--forge)' }}>
            ↑ {u.votusPool} VOTUS pool
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {u.members.map((m, i) => (
            <span
              key={i}
              className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full hairline"
              style={{ color: 'var(--fg)', background: 'var(--surface)' }}
              title={m.role || ''}
            >
              @{m.handle}
            </span>
          ))}
          {seatsLeft > 0 && (
            <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5" style={{ color: 'var(--fg-faint)' }}>
              {seatsLeft} seat{seatsLeft > 1 ? 's' : ''} open
            </span>
          )}
        </div>
      </div>

      <div className="hairline-t pt-3 flex items-center justify-between gap-2 mt-auto">
        <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
          {u.parentInitium}
        </span>
        {seatsLeft > 0 && u.status !== 'shipped' ? (
          <button
            onClick={onJoin}
            className="text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full hairline transition-colors hover:[color:var(--pirate)]"
            style={{ color: 'var(--fg-muted)' }}
          >
            Join unit →
          </button>
        ) : (
          <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
            {u.status === 'shipped' ? 'shipped' : 'full'}
          </span>
        )}
      </div>
    </article>
  );
}
