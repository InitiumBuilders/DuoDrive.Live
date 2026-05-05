'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './ThemeProvider';

const links = [
  { href: '/live/jordash-x-davara', label: 'Live' },
  { href: '/cortex', label: 'Cortex' },
  { href: '/initiums', label: 'Initiums' },
  { href: '/lexicon/jordash-x-davara', label: 'Lexicon' },
  { href: '/votus', label: 'VOTUS' },
  { href: '/manifesto', label: 'Manifesto' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className="hairline-b"
        style={{
          background: 'color-mix(in oklab, var(--bg) 75%, transparent)',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <DuoMark />
            <span className="font-medium tracking-tight text-[15px]">
              DuoDrive<span style={{ color: 'var(--pirate)' }}>.</span>Live
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-[13px]" style={{ color: 'var(--fg-muted)' }}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="relative group transition-colors hover:[color:var(--fg)]">
                {l.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg, var(--pirate), var(--sync), var(--refiner))' }}
                />
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/signup"
              className="text-[13px] font-medium px-4 py-1.5 rounded-full transition-opacity hover:opacity-90"
              style={{
                background: 'linear-gradient(110deg, var(--pirate), var(--sync), var(--refiner))',
                color: 'var(--void)',
              }}
            >
              Drive Live →
            </Link>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 -mr-2"
              style={{ color: 'var(--fg-muted)' }}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 17h16" /></>}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div
          className="md:hidden hairline-b px-5 py-4 space-y-3"
          style={{
            background: 'color-mix(in oklab, var(--bg) 92%, transparent)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-[15px] py-1.5 transition-colors hover:[color:var(--pirate)]"
              style={{ color: 'var(--fg)' }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="mt-2 block text-center text-[14px] font-medium px-4 py-2.5 rounded-full"
            style={{
              background: 'linear-gradient(110deg, var(--pirate), var(--sync), var(--refiner))',
              color: 'var(--void)',
            }}
          >
            Drive Live →
          </Link>
        </div>
      )}
    </nav>
  );
}

function DuoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="8" cy="12" r="5" stroke="url(#gp)" strokeWidth="1.4" />
      <circle cx="16" cy="12" r="5" stroke="url(#gr)" strokeWidth="1.4" />
      <defs>
        <linearGradient id="gp" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--pirate)" />
          <stop offset="100%" stopColor="var(--sync)" />
        </linearGradient>
        <linearGradient id="gr" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--refiner)" />
          <stop offset="100%" stopColor="var(--sync)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
