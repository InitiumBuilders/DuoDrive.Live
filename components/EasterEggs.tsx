'use client';
import { useEffect, useState } from 'react';

const NOTEBOOK_LINES = [
  'If your collaboration only works when both of you agree, it isn\'t collaboration. It\'s a duet.',
  'The Pirate is not the visionary. The Pirate is the one willing to be wrong out loud.',
  'A Refiner who never argues with the Pirate is a typist with extra steps.',
  'Speed without rhythm is just fast burnout.',
  'The Cortex is healthiest when it surprises you with a role you didn\'t know you needed.',
  'A token that pays only the loudest people is a megaphone, not money.',
  'If you can\'t describe your Initium in one paragraph, your Avari Sync is doing the work for you.',
  'Whispering > shouting. Always.',
];

export function EasterEggs() {
  const [konami, setKonami] = useState('');
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [notebookIdx, setNotebookIdx] = useState(0);
  const [hint, setHint] = useState<string | null>(null);

  // Type "davara" anywhere → opens insight
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // ignore when user is typing in an input
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const c = e.key.toLowerCase();
      if (!/^[a-z]$/.test(c)) return;
      setKonami((prev) => {
        const next = (prev + c).slice(-7);
        if (next.endsWith('davara')) {
          setHint('davara');
          setNotebookOpen(true);
          return '';
        }
        if (next.endsWith('forge')) {
          setHint('forge');
          setNotebookOpen(true);
          return '';
        }
        if (next.endsWith('whisper')) {
          setHint('whisper');
          setNotebookOpen(true);
          return '';
        }
        return next;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Mobile: long-press anywhere for 1s opens notebook
  useEffect(() => {
    let timer: number | null = null;
    const start = (e: TouchEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.closest('button') || t.closest('a'))) return;
      timer = window.setTimeout(() => {
        setHint('long-press');
        setNotebookOpen(true);
      }, 1100);
    };
    const cancel = () => { if (timer) { clearTimeout(timer); timer = null; } };
    window.addEventListener('touchstart', start);
    window.addEventListener('touchend', cancel);
    window.addEventListener('touchmove', cancel);
    return () => {
      window.removeEventListener('touchstart', start);
      window.removeEventListener('touchend', cancel);
      window.removeEventListener('touchmove', cancel);
    };
  }, []);

  // Rotate notebook lines while open
  useEffect(() => {
    if (!notebookOpen) return;
    const i = setInterval(() => setNotebookIdx((x) => (x + 1) % NOTEBOOK_LINES.length), 5000);
    return () => clearInterval(i);
  }, [notebookOpen]);

  if (!notebookOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-8"
      style={{ background: 'color-mix(in oklab, var(--bg) 80%, transparent)', backdropFilter: 'blur(8px)' }}
      onClick={() => setNotebookOpen(false)}
    >
      <div
        className="hairline rounded-2xl glass-frosted p-6 md:p-8 max-w-xl w-full relative overflow-hidden tick-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 iridescent opacity-30 pointer-events-none" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <p className="chip" style={{ color: 'var(--sync)', borderColor: 'color-mix(in oklab, var(--sync) 35%, transparent)' }}>
              ✦ Davara's Notebook
            </p>
            <button
              onClick={() => setNotebookOpen(false)}
              className="text-[14px]"
              style={{ color: 'var(--fg-faint)' }}
              aria-label="close"
            >
              close
            </button>
          </div>
          <p
            key={notebookIdx}
            className="font-light text-[clamp(20px,3vw,28px)] leading-[1.3] tracking-tight tick-in"
            style={{ color: 'var(--fg)' }}
          >
            <span style={{ color: 'var(--sync)', opacity: 0.6 }}>“</span>
            {NOTEBOOK_LINES[notebookIdx]}
            <span style={{ color: 'var(--sync)', opacity: 0.6 }}>”</span>
          </p>
          <div className="hairline-t mt-5 pt-3 flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--fg-faint)' }}>
              {hint === 'davara' ? 'unlocked: type "davara"' :
                hint === 'forge' ? 'unlocked: type "forge"' :
                hint === 'whisper' ? 'unlocked: type "whisper"' :
                'unlocked: long-press'}
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase" style={{ color: 'var(--fg-muted)' }}>
              {notebookIdx + 1} / {NOTEBOOK_LINES.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Live Dot — when long-pressed for 3s, triggers Davara's Notebook.
 * Used on the home page hero and the live-room headers.
 */
export function LiveDotLongPress({ onTrigger }: { onTrigger: () => void }) {
  const [holding, setHolding] = useState(false);
  useEffect(() => {
    if (!holding) return;
    const t = setTimeout(() => { onTrigger(); setHolding(false); }, 3000);
    return () => clearTimeout(t);
  }, [holding, onTrigger]);
  return (
    <span
      className="live-dot"
      onMouseDown={() => setHolding(true)}
      onMouseUp={() => setHolding(false)}
      onMouseLeave={() => setHolding(false)}
      onTouchStart={() => setHolding(true)}
      onTouchEnd={() => setHolding(false)}
      style={{ cursor: 'default' }}
    />
  );
}
