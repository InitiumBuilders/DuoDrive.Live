'use client';
import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/live/jordash-x-davara', label: 'Live Now' },
  { href: '/cortex', label: 'Cortex' },
  { href: '/initiums', label: 'Initiums' },
  { href: '/coders', label: 'Coders' },
  { href: '/votus', label: 'VOTUS' },
  { href: '/manifesto', label: 'Manifesto' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="hairline-b backdrop-blur-2xl bg-void/70">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <DuoMark />
            <span className="font-medium tracking-tight text-[15px]">
              DuoDrive<span className="text-pirate">.</span>Live
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[13px] text-white/55">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-pirate via-sync to-refiner group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/signup" className="text-[13px] text-white/55 hover:text-white transition-colors px-3 py-1.5">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-[13px] font-medium px-4 py-1.5 rounded-full bg-gradient-to-r from-pirate/90 via-sync/90 to-refiner/90 text-void hover:opacity-90 transition-opacity"
            >
              Drive Live →
            </Link>
          </div>
          <button
            className="md:hidden text-white/70 p-2 -mr-2"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 17h16" /></>}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden hairline-b backdrop-blur-2xl bg-void/95 px-5 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-[15px] text-white/80 hover:text-pirate transition-colors py-1.5"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/signup"
            onClick={() => setOpen(false)}
            className="mt-2 block text-center text-[14px] font-medium px-4 py-2.5 rounded-full bg-gradient-to-r from-pirate/90 via-sync/90 to-refiner/90 text-void"
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
          <stop offset="0%" stopColor="#5CFFD2" />
          <stop offset="100%" stopColor="#9F7CFF" />
        </linearGradient>
        <linearGradient id="gr" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF4FA3" />
          <stop offset="100%" stopColor="#9F7CFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
