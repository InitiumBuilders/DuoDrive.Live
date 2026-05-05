import Link from 'next/link';
import { LiveRoomClient } from '@/components/LiveRoom';

export const metadata = {
  title: 'Jordash × Davara — DuoDrive.Live',
  description: 'Live now: building DuoDrive.Live on DuoDrive.Live. The first Initium.',
};

export default function StreamRoom() {
  return (
    <div className="min-h-screen pt-14 bg-void">
      <LiveRoomClient />
      <div className="px-5 md:px-8 max-w-7xl mx-auto py-10">
        <Link href="/initiums" className="text-[12px] text-white/40 hover:text-white/70 font-mono tracking-wider uppercase">
          ← All Initiums
        </Link>
      </div>
    </div>
  );
}
