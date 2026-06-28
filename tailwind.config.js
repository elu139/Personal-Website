/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Calm nature palette
        sage: { light: '#a8c5a0', DEFAULT: '#7a9e7e', deep: '#5e7d62' },
        dusk: { light: '#b8a9d4', DEFAULT: '#7b6fa0', deep: '#5d5380' },
        blush: { DEFAULT: '#f4a7b9', soft: '#fcd5b5', lilac: '#e8c4e0' },
        cream: { DEFAULT: '#f5f1e8', deep: '#ece5d8' },
        // Dusk (dark) mode
        night: { DEFAULT: '#1d1b2e', soft: '#26243a', deep: '#15131f' },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', '"DM Sans"', 'system-ui', 'sans-serif'],
        ethan: ['EthanSans', 'cursive'],
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.02)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(12px, -10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        bobScroll: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.7' },
          '50%': { transform: 'translateY(10px)', opacity: '1' },
        },
      },
      animation: {
        breathe: 'breathe 7s ease-in-out infinite',
        drift: 'drift 14s ease-in-out infinite',
        sway: 'sway 6s ease-in-out infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
        bobScroll: 'bobScroll 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
