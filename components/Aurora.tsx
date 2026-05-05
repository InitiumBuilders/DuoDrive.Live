'use client';
import { useEffect, useRef } from 'react';

/**
 * Twin-ribbon aurora. Two flowing sine waves — one cyan-mint (pirate),
 * one magenta-rose (refiner) — that weave but only cross at choreographed
 * moments, where they bloom into violet (sync). Plus drifting bloom orbs.
 */
export function Aurora({ intensity = 1 }: { intensity?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let raf = 0;
    let t0 = performance.now();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }
    resize();
    window.addEventListener('resize', resize);

    function ribbon(
      time: number,
      offset: number,
      color: string,
      amplitude: number,
      thickness: number,
      bloom: number,
    ) {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.beginPath();
      const N = 80;
      for (let i = 0; i <= N; i++) {
        const x = (i / N) * w;
        const phase = (i / N) * Math.PI * 4 + time * 0.0004 + offset;
        const wobble = Math.sin(phase * 1.5 + time * 0.0007) * 0.35;
        const y = h / 2 + Math.sin(phase) * amplitude + wobble * amplitude * 0.4;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness * dpr;
      ctx.shadowBlur = bloom * dpr;
      ctx.shadowColor = color;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    function orb(x: number, y: number, r: number, color: string, alpha: number) {
      if (!ctx || !canvas) return;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, color.replace('ALPHA', String(alpha)));
      grad.addColorStop(1, color.replace('ALPHA', '0'));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    function frame() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const time = performance.now() - t0;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      // 3 bloom orbs (cyan, violet, magenta) drifting
      const ox1 = w * (0.2 + 0.05 * Math.sin(time * 0.0003));
      const oy1 = h * (0.4 + 0.1 * Math.cos(time * 0.0004));
      orb(ox1, oy1, h * 0.6, 'rgba(92, 255, 210, ALPHA)', 0.18 * intensity);

      const ox2 = w * (0.7 + 0.05 * Math.sin(time * 0.0004 + 1));
      const oy2 = h * (0.55 + 0.08 * Math.cos(time * 0.0005 + 1));
      orb(ox2, oy2, h * 0.7, 'rgba(255, 79, 163, ALPHA)', 0.16 * intensity);

      const ox3 = w * 0.5;
      const oy3 = h * (0.5 + 0.03 * Math.sin(time * 0.0006));
      orb(ox3, oy3, h * 0.85, 'rgba(159, 124, 255, ALPHA)', 0.12 * intensity);

      // Twin ribbons
      const amp = h * 0.18 * intensity;
      ribbon(time, 0, 'rgba(92, 255, 210, 0.85)', amp, 1.5, 18);
      ribbon(time, Math.PI, 'rgba(255, 79, 163, 0.85)', amp, 1.5, 18);
      // Sync ribbon (where they cross)
      ribbon(time, Math.PI / 2, 'rgba(159, 124, 255, 0.45)', amp * 0.6, 1, 12);

      ctx.globalCompositeOperation = 'source-over';

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return <canvas ref={ref} className="aurora-canvas" aria-hidden="true" />;
}
