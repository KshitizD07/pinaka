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
          void: '#0A0A0F',
          surface: '#12121A',
          panel: '#1A1A28',
          border: '#2A2A40',
          accent: '#6C63FF',
          'accent-dim': '#4A45B0',
          gold: '#F5A623',
          ember: '#FF6B6B',
          jade: '#4ECDC4',
          ink: '#E8E8F0',
          'ink-muted': '#8888AA',
          'ink-faint': '#44445A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
