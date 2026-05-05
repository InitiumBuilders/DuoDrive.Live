import Link from 'next/link';
import { SembleDictionary } from '@/components/SembleDictionary';

export const metadata = {
  title: 'Semble Dictionary · Jordash × Davara — DuoDrive.Live',
  description: 'The shared language a duo grows together. A living glossary, voted by the Cortex.',
};

export default function Lexicon() {
  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto pt-28 pb-20">
      <header className="text-center mb-10">
        <p className="chip chip-sync mx-auto mb-5 inline-flex">Semble Dictionary</p>
        <h1 className="font-light text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tight">
          A duo grows<br /><span className="twin-text">a language.</span>
        </h1>
        <p className="text-fg-muted mt-4 text-[15px] max-w-xl mx-auto">
          Words get coined live. The Cortex votes them in. They drift over time — growing, stabilizing, fossilizing. The Vibe Coding language of <span className="text-pirate">Jordash</span> × <span className="text-refiner">Davara</span> lives here.
        </p>
      </header>

      <SembleDictionary />

      <hr className="my-16 border-hairline" />

      <section className="max-w-3xl mx-auto">
        <p className="chip chip-sync mb-4 inline-flex">How it works</p>
        <h2 className="font-light text-[clamp(24px,3.6vw,40px)] tracking-tight mb-6">
          Three layers. <span className="twin-text">One drift.</span>
        </h2>
        <div className="space-y-3">
          {[
            { t: 'Personal', b: 'Every Vibe Coder has their own. Words you use that the world hasn\'t adopted yet.' },
            { t: 'Duo', b: 'The shared dictionary you build with your Avari Sync. Words enter when both partners + 50 VOTUS approve.' },
            { t: 'Public Lexicon', b: 'Words the entire DuoDrive community has voted into shared usage. The vocabulary of building in public.' },
          ].map((l, i) => (
            <div key={l.t} className="hairline rounded-xl p-5 glass">
              <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-pirate mb-1.5">Layer {String(i + 1).padStart(2, '0')}</p>
              <p className="font-medium text-[16px] mb-1">{l.t}</p>
              <p className="text-[13px] text-fg-muted leading-relaxed">{l.b}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link href="/live/jordash-x-davara" className="text-[12px] font-mono tracking-wider uppercase text-fg-muted hover:text-sync transition-colors">
          ← Back to the Stream Room
        </Link>
      </div>
    </div>
  );
}
