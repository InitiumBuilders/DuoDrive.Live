import Link from 'next/link';
import { Aurora } from '@/components/Aurora';

export default function Home() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-4 md:px-8 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Aurora />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-void/30 via-void/40 to-void pointer-events-none" />

        <div className="relative z-10 max-w-5xl w-full mx-auto text-center">
          {/* tag */}
          <div className="flex items-center justify-center gap-2 mb-8 fadeUp" style={{ animationDelay: '.05s' }}>
            <span className="live-dot" />
            <span className="text-[11px] tracking-[0.2em] uppercase font-mono text-white/55">
              Open Source · Live Streaming · Built In Public
            </span>
          </div>

          {/* the equation */}
          <div className="mb-7 fadeUp" style={{ animationDelay: '.15s' }}>
            <div className="font-light text-[clamp(56px,12vw,148px)] leading-[0.95] tracking-tight">
              <span className="text-pirate" style={{ textShadow: '0 0 60px rgba(92,255,210,0.4)' }}>1</span>
              <span className="text-white/30 mx-3 md:mx-5">+</span>
              <span className="text-refiner" style={{ textShadow: '0 0 60px rgba(255,79,163,0.4)' }}>1</span>
              <span className="text-white/30 mx-3 md:mx-5">=</span>
              <span className="twin-text">∞</span>
            </div>
          </div>

          {/* big claim */}
          <h1 className="fadeUp font-light text-[clamp(36px,7vw,84px)] leading-[1.02] tracking-tight max-w-4xl mx-auto mb-5" style={{ animationDelay: '.25s' }}>
            Code <em className="not-italic twin-text font-medium">and</em> Vibe.
          </h1>
          <p className="fadeUp text-[15px] sm:text-[17px] md:text-xl text-white/65 max-w-2xl mx-auto leading-snug sm:leading-relaxed mb-2 px-1" style={{ animationDelay: '.35s' }}>
            Where <span className="text-pirate">two builders</span> vibe-code <span className="text-refiner">together</span>, live.
          </p>
          <p className="fadeUp text-[12.5px] sm:text-[14px] md:text-[15px] text-white/45 max-w-xl mx-auto leading-snug sm:leading-relaxed px-1" style={{ animationDelay: '.42s' }}>
            One streams prompts. One streams code.<br className="sm:hidden" /> The community drives.
          </p>

          {/* CTAs */}
          <div className="fadeUp flex flex-col sm:flex-row items-center justify-center gap-3 mt-10" style={{ animationDelay: '.5s' }}>
            <Link
              href="/live/jordash-x-davara"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pirate via-sync to-refiner text-void font-medium text-[14px] hover:shadow-[0_0_40px_rgba(159,124,255,0.45)] transition-shadow"
            >
              <span className="live-dot" />
              Watch Jordash × Davara — Live
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full hairline bg-slab/50 backdrop-blur text-white/85 hover:text-white hover:bg-slab text-[14px] transition-colors"
            >
              Open Your Drive — Anon
            </Link>
          </div>

          {/* sub-row: anchor sentence (no jargon, just the shape) */}
          <p className="fadeUp mt-14 text-[12px] md:text-[13px] font-mono tracking-wider uppercase text-white/40 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '.6s' }}>
            Two streams · One shared chat · A community Cortex · Live polls with skin in them
          </p>

          <div className="fadeUp mt-12" style={{ animationDelay: '.75s' }}>
            <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30">Scroll</p>
            <div className="mx-auto mt-2 w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* === DUO QUOTE === */}
      <section className="px-5 md:px-8 py-24 md:py-32 max-w-5xl mx-auto">
        <blockquote className="text-center font-light text-[clamp(22px,3.4vw,42px)] leading-[1.3] tracking-tight text-white/85">
          “If you wish to go fast, go alone.<br />
          If you wish to go far, go together.<br />
          <span className="twin-text font-medium">If you wish to build something that lasts — go in pairs, in public.</span>”
        </blockquote>
        <p className="text-center mt-6 text-[11px] tracking-[0.25em] uppercase font-mono text-white/35">
          — The DuoDrive Mantra
        </p>
      </section>

      {/* === HOW IT WORKS === */}
      <section className="relative px-5 md:px-8 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="chip chip-sync mx-auto mb-5">How It Works</p>
          <h2 className="font-light text-[clamp(28px,4.5vw,52px)] leading-tight tracking-tight">
            Two flames. One anvil.<br />
            <span className="twin-text">The screen is the forge.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <Step
            kind="pirate"
            num="01"
            title="Find your Avari Sync"
            body="Browse the Vibe Coder directory or post your role. The Pirate writes prompts, dreams, and steers. The Refiner ships, edits, and lands."
          />
          <Step
            kind="sync"
            num="02"
            title="Open an Initium"
            body="Name the project. Set the goal. Both partners sign. The Two-Key Drive vault opens. You're now driving live, together."
          />
          <Step
            kind="refiner"
            num="03"
            title="The community drives"
            body="Watchers stake VOTUS to amplify what matters. The Cortex self-organizes. The Avari Signal shows consensus, not noise."
          />
        </div>
      </section>

      {/* === LIVE PREVIEW STRIP === */}
      <section className="relative px-5 md:px-8 py-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <p className="chip chip-pirate mb-3">
              <span className="live-dot" />
              Live Right Now
            </p>
            <h3 className="font-light text-[clamp(24px,3vw,38px)] tracking-tight">
              Jordash × Davara — building DuoDrive.Live
            </h3>
          </div>
          <Link href="/live/jordash-x-davara" className="text-[13px] text-white/55 hover:text-white">
            Open the room →
          </Link>
        </div>
        <Link
          href="/live/jordash-x-davara"
          className="block relative rounded-2xl overflow-hidden hairline group hover:border-sync/40 transition-colors"
        >
          <div className="grid md:grid-cols-2 aspect-[16/9] md:aspect-auto md:h-[420px]">
            {/* Pirate tile */}
            <div className="relative bg-gradient-to-br from-pirate/25 via-pirate/5 to-transparent border-r-0 md:border-r border-hairline">
              <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pirate to-sync halo halo-rotating" />
                  <div>
                    <p className="text-[14px] font-medium">Jordash</p>
                    <p className="text-[10px] font-mono tracking-wider uppercase text-pirate/80">Pirate · Prompts</p>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-mono tracking-wider uppercase text-white/40 mb-1">Now</p>
                  <p className="text-[14px] text-white/85">"What if VOTUS used the Avari Signal — votes show direction, not numbers, until the duo asks?"</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 chip chip-pirate text-[10px]">Live</div>
            </div>
            {/* Refiner tile */}
            <div className="relative bg-gradient-to-bl from-refiner/25 via-refiner/5 to-transparent">
              <div className="absolute inset-0 p-5 md:p-7 flex flex-col justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-refiner to-sync halo halo-rotating" />
                  <div>
                    <p className="text-[14px] font-medium">Davara</p>
                    <p className="text-[10px] font-mono tracking-wider uppercase text-refiner/80">Refiner · Code</p>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-mono tracking-wider uppercase text-white/40 mb-1">Just shipped</p>
                  <p className="text-[14px] text-white/85 font-mono">+ <span className="text-pirate">components/AvariSignal.tsx</span> · 142 lines</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 chip chip-refiner text-[10px]">Live</div>
            </div>
          </div>
          {/* Forge meter */}
          <div className="hairline-t px-5 md:px-7 py-3 flex items-center gap-4 bg-void/60">
            <span className="text-[10px] font-mono tracking-wider uppercase text-white/45">Forge Meter</span>
            <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
              <div className="forge-bar h-full" style={{ width: '78%' }} />
            </div>
            <span className="text-[11px] font-mono text-forge">78%</span>
            <span className="hidden md:inline-block text-[11px] text-white/45">·  4,210 watching · 312 VOTUS staked</span>
          </div>
        </Link>
      </section>

      {/* === VALUES === */}
      <section className="relative px-5 md:px-8 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="chip chip-refiner mx-auto mb-5">Values</p>
          <h2 className="font-light text-[clamp(28px,4.5vw,52px)] leading-tight tracking-tight">
            Build in public. <span className="twin-text">Build with care.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { t: 'No solo kings.', b: 'Every Initium has at least two signers. The screen forces honesty.' },
            { t: 'No reasoning theater.', b: 'Every commit, every poll, every contribution earns its place.' },
            { t: 'Outliers welcome.', b: 'Divergent thought beats consensus. The Cortex protects the surprising voice.' },
            { t: 'Receipts > talk.', b: 'Acta Non Verba. The diff is the truth. The Forge Meter is the timeline.' },
          ].map((v) => (
            <div key={v.t} className="hairline rounded-xl p-5 md:p-6 bg-slab/40">
              <p className="font-medium text-[15px] mb-1.5">{v.t}</p>
              <p className="text-[13px] text-white/55 leading-relaxed">{v.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === ROADMAP === */}
      <section className="relative px-5 md:px-8 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="chip chip-forge mx-auto mb-5">The Road</p>
          <h2 className="font-light text-[clamp(28px,4.5vw,52px)] leading-tight tracking-tight">
            Six moves. <span className="twin-text">One forge.</span>
          </h2>
        </div>
        <ol className="space-y-4">
          {ROADMAP.map((r, i) => (
            <li key={r.title} className="hairline rounded-xl p-5 md:p-6 bg-slab/30 grid md:grid-cols-[100px_1fr_auto] gap-4 items-start">
              <span className="font-mono text-[11px] tracking-wider uppercase text-white/40">M{i + 1} · {r.when}</span>
              <div>
                <p className="font-medium text-[15px] mb-1">{r.title}</p>
                <p className="text-[13px] text-white/55 leading-relaxed">{r.body}</p>
              </div>
              <span className={`chip ${r.cls} self-center md:self-auto`}>{r.tag}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* === CTA TAIL === */}
      <section className="relative px-5 md:px-8 py-24 max-w-3xl mx-auto text-center">
        <h2 className="font-light text-[clamp(30px,5vw,60px)] leading-[1.05] tracking-tight mb-5">
          Pair up. <span className="twin-text">Drive live.</span>
        </h2>
        <p className="text-white/55 mb-8 text-[15px]">
          Anonymous sign-up. One link. You're broadcasting in 90 seconds.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-pirate via-sync to-refiner text-void font-medium text-[14px] hover:shadow-[0_0_50px_rgba(159,124,255,0.5)] transition-shadow"
        >
          Open Your Initium →
        </Link>
        <p className="mt-6 text-[10px] font-mono tracking-[0.25em] uppercase text-white/30">
          Acta Non Verba
        </p>
      </section>

      {/* keyframe — animation runs from initial paint, no opacity-0 stutter */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translate3d(0, 14px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .fadeUp { animation: fadeUp .9s cubic-bezier(.2,.7,.2,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .fadeUp { animation: none !important; opacity: 1 !important; }
        }
      `}</style>
    </>
  );
}

const ROADMAP = [
  { when: 'Now', title: 'Scaffold + open source MIT', body: 'Public repo. Twin-stream prototype. Manifesto. The first Initium: DuoDrive itself, built on DuoDrive.', tag: 'Shipping', cls: 'chip-pirate' },
  { when: 'Week 2', title: 'Anonymous duo signup + relay link', body: 'Drive Name. Role. One stream URL. The room renders. The community can join.', tag: 'Next', cls: 'chip-sync' },
  { when: 'Month 2', title: 'Three-feed live chat', body: 'Pirate community feed · Refiner community feed · DuoDrive Live shared chat. Avari Echo flags worth-keeping moments.', tag: 'Soon', cls: 'chip-sync' },
  { when: 'Month 3', title: 'VOTUS on Dash Platform', body: 'On-chain momentum. Stake to amplify. Bet on KPIs. The Avari Signal hides numbers until the duo opens the box.', tag: 'Future', cls: 'chip-forge' },
  { when: 'Month 4', title: 'Two-Key Drive (Dash EVO ID + ZK)', body: 'Files unlock only when both signers + ZK proof of identity. The literal product behind the metaphor.', tag: 'Future', cls: 'chip-refiner' },
  { when: 'Month 6', title: 'Community Cortex governance', body: 'Self-organized helper roles. Initium DAOs. Revenue share routed by contribution.', tag: 'Vision', cls: 'chip-refiner' },
];

function Step({ kind, num, title, body }: { kind: 'pirate' | 'sync' | 'refiner'; num: string; title: string; body: string }) {
  const cls = kind === 'pirate' ? 'from-pirate/40 to-pirate/0' : kind === 'refiner' ? 'from-refiner/40 to-refiner/0' : 'from-sync/40 to-sync/0';
  const t = kind === 'pirate' ? 'text-pirate' : kind === 'refiner' ? 'text-refiner' : 'text-sync';
  return (
    <div className="relative hairline rounded-2xl p-6 bg-slab/40 overflow-hidden group">
      <div className={`absolute -top-20 -right-20 w-44 h-44 rounded-full bg-gradient-to-br ${cls} blur-3xl opacity-60 group-hover:opacity-100 transition-opacity`} />
      <p className={`relative font-mono text-[11px] tracking-wider uppercase ${t} mb-2`}>· {num}</p>
      <p className="relative font-medium text-[17px] mb-2">{title}</p>
      <p className="relative text-[13px] text-white/55 leading-relaxed">{body}</p>
    </div>
  );
}
