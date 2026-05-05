import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // DuoDrive Forge Palette
        void: '#06070D',
        ink: '#0B0D17',
        slab: '#11141F',
        hairline: 'rgba(255,255,255,0.08)',
        // Twin signals
        pirate: '#5CFFD2',     // cyan-mint, left builder
        refiner: '#FF4FA3',    // magenta-rose, right builder
        sync: '#9F7CFF',       // violet, the duo's shared field
        forge: '#FFB454',      // amber, VOTUS energy / momentum / bets
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
