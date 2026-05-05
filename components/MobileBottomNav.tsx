'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/rn/jordash-x-davara', label: 'Live', icon: 'live' },
  { href: '/initiums', label: 'Initiums', icon: 'inf' },
  { href: '/roadmap', label: 'Road', icon: 'cortex' },
  { href: '/votus', label: 'VOTUS', icon: 'spark' },
];

export function MobileBottomNav() {
  const path = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 safe-bottom">
      <div
        className="hairline-t"
        style={{
          background: 'color-mix(in oklab, var(--bg) 88%, transparent)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        }}
      >
        <div className="grid grid-cols-4 gap-0">
          {items.map((it) => {
            const active = path === it.href || (it.href !== '/' && path?.startsWith(it.href));
            return (
              <Link
                key={it.href}
                href={it.href}
                className="flex flex-col items-center justify-center py-3 gap-1"
                style={{ color: active ? 'var(--fg)' : 'var(--fg-faint)' }}
              >
                <Icon kind={it.icon} active={!!active} />
                <span className="text-[10px] tracking-wider uppercase font-mono">{it.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function Icon({ kind, active }: { kind: string; active: boolean }) {
  const stroke = active ? 'var(--pirate)' : 'currentColor';
  if (kind === 'live') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--refiner)' : 'currentColor'} strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" fill={active ? 'var(--refiner)' : 'none'} />
      <path d="M5 12a7 7 0 0 1 14 0M3 12a9 9 0 0 1 18 0" />
    </svg>
  );
  if (kind === 'inf') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5">
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z"/>
    </svg>
  );
  if (kind === 'cortex') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="6" r="1.5" />
      <circle cx="19" cy="6" r="1.5" />
      <circle cx="5" cy="18" r="1.5" />
      <circle cx="19" cy="18" r="1.5" />
      <path d="M6.3 7l4.4 4M17.7 7l-4.4 4M6.3 17l4.4-4M17.7 17l-4.4-4" />
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--forge)' : 'currentColor'} strokeWidth="1.5">
      <path d="M12 2l2.4 6.6L21 11l-5.4 4.2L17 22l-5-3.6L7 22l1.4-6.8L3 11l6.6-2.4z" />
    </svg>
  );
}
