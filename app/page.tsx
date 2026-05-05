import Link from 'next/link';
import { Aurora } from '@/components/Aurora';
import { LiveNowRail } from '@/components/LiveNowRail';
import { TwoKeyDemo } from '@/components/TwoKeyDemo';
import { HowItWorks } from '@/components/HowItWorks';

export default function Home() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative min-h-[88svh] md:min-h-[100svh] flex items-center justify-center px-4 md:px-8 pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Aurora />
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, color-mix(in oklab, var(--bg) 30%, transparent), color-mix(in oklab, var(--bg) 40%, transparent), var(--bg))' }} />

        <div className="relative z-10 max-w-5xl w-full mx-auto text-center">
          {/* tag */}
          <div className="inline-flex items-center justify-center gap-2 mb-8 fadeUp px-3 py-1.5 rounded-full hairline glass max-w-[calc(100vw-32px)]" style={{ animationDelay: '.05s' }}>
            <span className="live-dot shrink-0" />
            <span className="text-[9px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.2em] uppercase font-mono whitespace-nowrap" style={{ color: 'var(--fg)' }}>
              <span className="sm:hidden">Open Source · Built In Public</span>
              <span className="hidden sm:inline">Open Source · Live Streaming · Built In Public</span>
            </span>
          </div>

          {/* the equation */}
          <div className="mb-7 fadeUp" style={{ animationDelay: '.15s' }}>
            <div className="font-light text-[clamp(56px,12vw,148px)] leading-[0.95] tracking-tight">
              <span style={{ color: 'var(--pirate)', textShadow: '0 0 60px color-mix(in oklab, var(--pirate) 40%, transparent)' }}>1</span>
              <span className="mx-3 md:mx-5" style={{ color: 'var(--fg-faint)' }}>+</span>
              <span style={{ color: 'var(--refiner)', textShadow: '0 0 60px color-mix(in oklab, var(--refiner) 40%, transparent)' }}>1</span>
              <span className="mx-3 md:mx-5" style={{ color: 'var(--fg-faint)' }}>=</span>
              <span className="twin-text">∞</span>
            </div>
          </div>

          {/* big claim */}
          <h1 className="fadeUp font-light text-[clamp(36px,7vw,84px)] leading-[1.02] tracking-tight max-w-4xl mx-auto mb-5" style={{ animationDelay: '.25s' }}>
            Code <em className="not-italic twin-text font-medium">and</em> Vibe.
          </h1>
          <p className="fadeUp text-[15px] sm:text-[17px] md:text-xl max-w-2xl mx-auto leading-snug sm:leading-relaxed mb-2 px-1" style={{ animationDelay: '.35s', color: 'var(--fg-muted)' }}>
            Where <span style={{ color: 'var(--pirate)' }}>two builders</span> vibe-code <span style={{ color: 'var(--refiner)' }}>together</span>, live.
          </p>
          <p className="fadeUp text-[12.5px] sm:text-[14px] md:text-[15px] max-w-xl mx-auto leading-snug sm:leading-relaxed px-1" style={{ animationDelay: '.42s', color: 'var(--fg-faint)' }}>
            One streams prompts. One streams code.<br className="sm:hidden" /> The community drives.
          </p>

          {/* CTAs */}
          <div className="fadeUp flex flex-col sm:flex-row items-center justify-center gap-3 mt-10" style={{ animationDelay: '.5s' }}>
            <Link
              href="/rn/jordash-x-davara"
              data-cta-gradient
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[14px] transition-shadow"
              style={{
                background: 'linear-gradient(110deg, var(--pirate), var(--sync), var(--refiner))',
                color: 'var(--void)',
                boxShadow: '0 0 0 1px var(--hairline-strong), 0 12px 32px color-mix(in oklab, var(--sync) 30%, transparent)',
              }}
            >
              <span className="live-dot" />
              Watch Jordash × Davara — Live
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full hairline glass text-[14px] transition-colors"
              style={{ color: 'var(--fg)' }}
            >
              Open Your Drive — Anon
            </Link>
          </div>

          {/* sub-row: anchor sentence (no jargon, just the shape) */}
          <p className="fadeUp mt-14 text-[10px] sm:text-[12px] md:text-[13px] font-mono tracking-[0.15em] sm:tracking-wider uppercase max-w-2xl mx-auto leading-relaxed px-2" style={{ animationDelay: '.6s', color: 'var(--fg-muted)' }}>
            Two streams · One shared chat<br className="sm:hidden" /> · A community Cortex<br className="sm:hidden" /> · Live polls with skin in them
          </p>

          <div className="fadeUp mt-12" style={{ animationDelay: '.75s' }}>
            <p className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--fg-faint)' }}>Scroll</p>
            <div className="mx-auto mt-2 w-px h-10" style={{ background: 'linear-gradient(to bottom, var(--fg-faint), transparent)' }} />
          </div>
        </div>

        {/* Live Now rail — desktop only, anchored bottom-right of hero */}
        <div className="hidden xl:block fixed bottom-8 right-8 z-30 fadeUp" style={{ animationDelay: '1.2s' }}>
          <LiveNowRail />
        </div>
      </section>

      {/* === DUO QUOTE === */}
      <section className="px-5 md:px-8 py-24 md:py-32 max-w-5xl mx-auto">
        <blockquote className="text-center font-light text-[clamp(22px,3.4vw,42px)] leading-[1.3] tracking-tight text-fg">
          “If you wish to go fast, go alone.<br />
          If you wish to go far, go together.<br />
          <span className="twin-text font-medium">If you wish to build something that lasts — go in pairs, in public.</span>”
        </blockquote>
        <p className="text-center mt-6 text-[11px] tracking-[0.25em] uppercase font-mono text-fg-faint">
          — The DuoDrive Mantra
        </p>
      </section>

      {/* === HOW IT WORKS — interactive auto-advancing === */}
      <HowItWorks />

      {/* === TWO-KEY DRIVE DEMO === */}
      <section className="relative px-5 md:px-8 py-12 max-w-5xl mx-auto">
        <TwoKeyDemo />
      </section>

      {/* === DAVARA INSIGHT === */}
      <section className="relative px-5 md:px-8 py-24 md:py-32 max-w-4xl mx-auto">
        <div className="text-center">
          <p className="chip mx-auto mb-6 inline-flex" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 32%, transparent)' }}>
            Davara distinct
          </p>
          <p className="font-light text-[clamp(22px,3.6vw,42px)] leading-[1.25] tracking-tight mb-6" style={{ color: 'var(--fg)' }}>
            <span style={{ color: 'var(--fg-muted)' }}>The world doesn't need</span> another solo founder<br className="hidden md:block" />
            <span style={{ color: 'var(--fg-muted)' }}>running themselves into the ground.</span>
            <br /><br />
            It needs <span className="twin-text font-medium">duos that ship</span> — and a room<br className="hidden md:block" /> that holds them while they do.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="h-px w-10" style={{ background: 'var(--hairline-strong)' }} />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase" style={{ color: 'var(--fg-faint)' }}>
              The DuoDrive premise
            </span>
            <span className="h-px w-10" style={{ background: 'var(--hairline-strong)' }} />
          </div>
        </div>
      </section>

      {/* === EXPLORE GRID === */}
      <section className="relative px-5 md:px-8 py-12 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
          <div>
            <p className="chip mb-2 inline-flex" style={{ color: 'var(--pirate)', borderColor: 'color-mix(in oklab, var(--pirate) 32%, transparent)' }}>
              Explore the room
            </p>
            <h3 className="font-light text-[clamp(22px,3.4vw,38px)] tracking-tight leading-tight">
              Six surfaces. <span className="twin-text">One Initium.</span>
            </h3>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXPLORE.map((c) => (
            <Link key={c.href} href={c.href} className="hairline rounded-2xl glass p-5 group hover:border-[color:color-mix(in_oklab,var(--sync)_40%,transparent)] transition-colors flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="chip" style={{ color: c.color, borderColor: `color-mix(in oklab, ${c.color} 32%, transparent)` }}>
                  {c.tag}
                </span>
                <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.color }}>
                  open →
                </span>
              </div>
              <p className="font-medium text-[16px] mb-1" style={{ color: 'var(--fg)' }}>{c.title}</p>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{c.body}</p>
            </Link>
          ))}
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
          <Link href="/rn/jordash-x-davara" className="text-[13px] text-fg-muted hover:text-fg">
            Open the room →
          </Link>
        </div>
        <Link
          href="/rn/jordash-x-davara"
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
                  <p className="text-[11px] font-mono tracking-wider uppercase text-fg-faint mb-1">Now</p>
                  <p className="text-[14px] text-fg">"What if VOTUS used the Avari Signal — votes show direction, not numbers, until the duo asks?"</p>
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
                  <p className="text-[11px] font-mono tracking-wider uppercase text-fg-faint mb-1">Just shipped</p>
                  <p className="text-[14px] text-fg font-mono">+ <span className="text-pirate">components/AvariSignal.tsx</span> · 142 lines</p>
                </div>
              </div>
              <div className="absolute top-4 right-4 chip chip-refiner text-[10px]">Live</div>
            </div>
          </div>
          {/* Forge meter */}
          <div className="hairline-t px-5 md:px-7 py-3 flex items-center gap-4 glass">
            <span className="text-[10px] font-mono tracking-wider uppercase text-fg-muted">Forge Meter</span>
            <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
              <div className="forge-bar h-full" style={{ width: '78%' }} />
            </div>
            <span className="text-[11px] font-mono text-forge">78%</span>
            <span className="hidden md:inline-block text-[11px] text-fg-muted">·  4,210 watching · 312 VOTUS staked</span>
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
            <div key={v.t} className="hairline rounded-xl p-5 md:p-6 glass">
              <p className="font-medium text-[15px] mb-1.5">{v.t}</p>
              <p className="text-[13px] text-fg-muted leading-relaxed">{v.b}</p>
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
            <li key={r.title} className="hairline rounded-xl p-5 md:p-6 glass grid md:grid-cols-[100px_1fr_auto] gap-4 items-start">
              <span className="font-mono text-[11px] tracking-wider uppercase text-fg-faint">M{i + 1} · {r.when}</span>
              <div>
                <p className="font-medium text-[15px] mb-1">{r.title}</p>
                <p className="text-[13px] text-fg-muted leading-relaxed">{r.body}</p>
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
        <p className="text-fg-muted mb-8 text-[15px]">
          Anonymous sign-up. One link. You're broadcasting in 90 seconds.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full gradient-cta bg-gradient-to-r from-pirate via-sync to-refiner text-void font-medium text-[14px] hover:shadow-[0_0_50px_rgba(159,124,255,0.5)] transition-shadow"
        >
          Open Your Initium →
        </Link>
        <p className="mt-6 text-[10px] font-mono tracking-[0.25em] uppercase text-fg-faint">
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

const EXPLORE = [
  { href: '/live/jordash-x-davara', tag: 'Live now', title: 'The Stream Room', body: 'Two streams, one shared chat, the Cortex around them.', color: 'var(--pirate)' },
  { href: '/forge', tag: 'Timeline', title: 'A Day In The Forge', body: '24 hours of an Initium — every commit, poll, word coined.', color: 'var(--forge)' },
  { href: '/echoes', tag: 'Quotes', title: 'Avari Echoes', body: 'Stream moments worth keeping. Pinnable to the README.', color: 'var(--sync)' },
  { href: '/lexicon/jordash-x-davara', tag: 'Language', title: 'Semble Dictionary', body: 'The shared vocabulary a duo grows over time.', color: 'var(--sync)' },
  { href: '/votus/invested', tag: 'Conviction', title: 'VOTUS Investments', body: 'Community staking, routed back by contribution.', color: 'var(--forge)' },
  { href: '/cortex', tag: 'Helpers', title: 'The Cortex', body: 'Self-organizing roles. Watchers become builders.', color: 'var(--refiner)' },
];

const ROADMAP = [
  { when: 'Now', title: 'Scaffold + open source MIT', body: 'Public repo. Twin-stream prototype. Manifesto. The first Initium: DuoDrive itself, built on DuoDrive.', tag: 'Shipping', cls: 'chip-pirate' },
  { when: 'Week 2', title: 'Anonymous duo signup + relay link', body: 'Drive Name. Role. One stream URL. The room renders. The community can join.', tag: 'Next', cls: 'chip-sync' },
  { when: 'Month 2', title: 'Three-feed live chat', body: 'Pirate community feed · Refiner community feed · DuoDrive Live shared chat. Avari Echo flags worth-keeping moments.', tag: 'Soon', cls: 'chip-sync' },
  { when: 'Month 3', title: 'VOTUS on Dash Platform', body: 'On-chain momentum. Stake to amplify. Bet on KPIs. The Avari Signal hides numbers until the duo opens the box.', tag: 'Future', cls: 'chip-forge' },
  { when: 'Month 4', title: 'Two-Key Drive (Dash EVO ID + ZK)', body: 'Files unlock only when both signers + ZK proof of identity. The literal product behind the metaphor.', tag: 'Future', cls: 'chip-refiner' },
  { when: 'Month 6', title: 'Community Cortex governance', body: 'Self-organized helper roles. Initium DAOs. Revenue share routed by contribution.', tag: 'Vision', cls: 'chip-refiner' },
];


