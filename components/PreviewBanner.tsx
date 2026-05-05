'use client';
import { useEffect, useState } from 'react';

/**
 * Preview-data disclaimer banner. Sticks below the top nav. Dismissible
 * (per session via sessionStorage so it returns next visit).
 */
export function PreviewBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('duodrive-preview-dismissed');
      if (dismissed !== '1') setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed left-0 right-0 z-40"
      style={{
        top: '56px',
        background: 'color-mix(in oklab, var(--forge) 12%, var(--bg))',
        borderBottom: '1px solid color-mix(in oklab, var(--forge) 30%, transparent)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex items-center justify-between gap-3">
        <p className="text-[10.5px] md:text-[12px] leading-tight flex-1 min-w-0" style={{ color: 'var(--fg)' }}>
          <span className="font-mono uppercase tracking-wider mr-2 shrink-0" style={{ color: 'var(--forge)' }}>· Preview</span>
          <span className="hidden sm:inline">All data on this site is sample/proposal data — Initiums, founders, VOTUS rates, builders. A canvas to think and reflect on.</span>
          <span className="sm:hidden">Sample / proposal data — a canvas to think and reflect on.</span>
        </p>
        <button
          onClick={() => {
            try { sessionStorage.setItem('duodrive-preview-dismissed', '1'); } catch {}
            setShow(false);
          }}
          className="text-[11px] font-mono tracking-wider uppercase shrink-0"
          style={{ color: 'var(--fg-muted)' }}
          aria-label="Dismiss preview banner"
        >
          dismiss ✕
        </button>
      </div>
    </div>
  );
}
