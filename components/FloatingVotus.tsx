'use client';
import { useEffect, useState } from 'react';

type Drop = { id: number; amount: number; x: number; from: 'pirate' | 'refiner' | 'sync' | 'forge' };
let nextId = 0;

/**
 * Floats VOTUS amounts up from random spots on the page every few seconds.
 * Subtle, paint-only, autoplays on mount. Pure ambience.
 */
export function FloatingVotus() {
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    const tick = () => {
      const amounts = [1, 2, 3, 4, 5, 8, 12, 18];
      const colors: Drop['from'][] = ['pirate', 'refiner', 'sync', 'forge'];
      const d: Drop = {
        id: nextId++,
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        x: 5 + Math.random() * 90,
        from: colors[Math.floor(Math.random() * colors.length)],
      };
      setDrops((cur) => [...cur, d].slice(-8));
      // remove after animation
      setTimeout(() => setDrops((cur) => cur.filter((x) => x.id !== d.id)), 5500);
    };
    const id = setInterval(tick, 2200 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 h-[40vh] pointer-events-none z-30 overflow-hidden hidden md:block">
      {drops.map((d) => {
        const color =
          d.from === 'pirate' ? 'var(--pirate)' :
          d.from === 'refiner' ? 'var(--refiner)' :
          d.from === 'forge' ? 'var(--forge)' :
          'var(--sync)';
        return (
          <div
            key={d.id}
            className="absolute bottom-20 font-mono text-[11px] tracking-wider uppercase"
            style={{
              left: `${d.x}%`,
              color,
              textShadow: `0 0 12px ${color}`,
              opacity: 0,
              animation: 'votusFloat 5s cubic-bezier(.2,.7,.2,1) forwards',
            }}
          >
            +{d.amount} VOTUS
          </div>
        );
      })}
      <style>{`
        @keyframes votusFloat {
          0% { opacity: 0; transform: translate3d(0, 30px, 0) scale(0.92); }
          15% { opacity: 0.85; transform: translate3d(0, 0, 0) scale(1); }
          70% { opacity: 0.85; }
          100% { opacity: 0; transform: translate3d(0, -260px, 0) scale(1); }
        }
      `}</style>
    </div>
  );
}
