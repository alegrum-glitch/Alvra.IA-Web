/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#050505',
          900: '#050505',
          800: '#0a0a0b',
          700: '#111114',
          600: '#17171c',
        },
        electric: {
          DEFAULT: '#0070f3',
          600: '#0062d8',
          400: '#3b8bff',
          300: '#66a6ff',
          200: '#a3c8ff',
        },
        mist: 'rgba(255,255,255,0.06)',
        line: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['"DM Serif Display"', 'serif'],
      },
      backgroundImage: {
        'shimmer-gradient':
          'linear-gradient(110deg, #ffffff 0%, #a3c8ff 20%, #0070f3 40%, #ffffff 60%, #a3c8ff 80%, #0070f3 100%)',
        'radial-blue':
          'radial-gradient(closest-side, rgba(0,112,243,0.35), rgba(0,112,243,0) 70%)',
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'shimmer-size': '300% 100%',
        'grid-cell': '48px 48px',
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.4s ease-out infinite',
        'spin-slow': 'spin 22s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '-300% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-10px) translateX(4px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.9' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      boxShadow: {
        glass:
          '0 1px 0 rgba(255,255,255,0.06) inset, 0 20px 50px -20px rgba(0,0,0,0.6)',
        glow: '0 0 40px -5px rgba(0,112,243,0.55)',
      },
    },
  },
  plugins: [],
}
