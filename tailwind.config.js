/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f3ede1',
        mist: '#b8b3c7',
        dusk: '#f0b37e',
        sage: '#a8c5a0',
        ink: '#0a0d1a',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
        hand: ['EthanSans', 'cursive'],
      },
    },
  },
  plugins: [],
}
