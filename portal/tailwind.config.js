/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pinaka: {
          // Saffron spectrum
          saffron: '#D85A20',
          'saffron-glow': '#E67E22',
          'saffron-wash': '#FDF6EE',
          'saffron-subtle': '#FAECE0',
          'saffron-deep': '#9C3D10',
          
          // Blue-white & Kailash spectrum
          kailash: '#F8FAFC',
          ice: '#EDF3F8',
          'ice-blue': '#E0EAF3',
          chalk: '#FFFFFF',
          
          // Slate stone spectrum
          charcoal: '#0F1722',
          stone: '#1E293B',
          slate: '#475569',
          ash: '#64748B',
          mist: '#94A3B8',
          hairline: '#E2E8F0',
          'hairline-dark': '#1E2B3D',
          
          // Accents & Indicators
          gold: '#B47806',
          jade: '#0F766E',
          crimson: '#B91C1C',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'Cambria', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        widest: '0.2em',
        mega: '0.3em',
      },
      boxShadow: {
        'saffron-sm': '0 2px 10px -2px rgba(216, 90, 32, 0.15)',
        'saffron-glow': '0 8px 30px -4px rgba(216, 90, 32, 0.25)',
        'editorial': '0 10px 40px -10px rgba(15, 23, 34, 0.08)',
      },
    },
  },
  plugins: [],
};
