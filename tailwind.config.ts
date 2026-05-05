import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // === Theme-bound tokens — swap on [data-theme="light"] === //
        // Surfaces
        void: 'var(--bg)',
        ink: 'var(--ink)',
        slab: 'var(--surface-solid)',
        // Foreground tokens (text-fg, bg-fg, etc.)
        fg: 'var(--fg)',
        'fg-muted': 'var(--fg-muted)',
        'fg-faint': 'var(--fg-faint)',
        // Twin signals
        pirate: 'var(--pirate)',
        refiner: 'var(--refiner)',
        sync: 'var(--sync)',
        forge: 'var(--forge)',
        // Hairline
        hairline: 'var(--hairline)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'breathe': 'breathe 6s ease-in-out infinite',
        'orbit': 'orbit 24s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
