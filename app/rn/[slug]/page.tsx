import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LiveRoomClient } from '@/components/LiveRoom';
import { STREAMS, getStream } from '@/lib/streams';

export async function generateStaticParams() {
  return STREAMS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStream(slug);
  if (!s) return { title: 'Initium — DuoDrive.Live' };
  return {
    title: `${s.pirate.handle} × ${s.refiner.handle} — ${s.title}`,
    description: s.premise,
  };
}

export default async function InitiumPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stream = getStream(slug);
  if (!stream) notFound();

  return (
    <div className="min-h-screen pt-28" style={{ background: 'var(--bg)' }}>
      <LiveRoomClient stream={stream} />
      <div className="px-4 md:px-8 max-w-[1500px] mx-auto py-10 flex items-center justify-between flex-wrap gap-3">
        <Link href="/initiums" className="text-[12px] font-mono tracking-wider uppercase transition-colors hover:[color:var(--sync)]" style={{ color: 'var(--fg-muted)' }}>
          ← All Initiums
        </Link>
        <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-faint)' }}>
          duodrive.live/rn/{stream.slug}
        </span>
      </div>
    </div>
  );
}
