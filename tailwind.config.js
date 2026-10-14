/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cinema-black': '#090909',
        'soft-black': '#151515',
        'warm-ivory': '#F4F1EA',
        'pure-white': '#FFFFFF',
        'signature-red': '#D20100',
        'signature-red-bright': '#E21C2A',
        'muted-grey': '#777777',
        'light-grey': '#9E9F9F',
        'hairline-light': '#D8D5CE',
        'hairline-dark': '#222222',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0.98' },
          '20%': { opacity: '0.88' },
          '40%': { opacity: '1' },
          '60%': { opacity: '0.92' },
          '80%': { opacity: '0.97' },
        },
        pulseSlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
      },
      animation: {
        flicker: 'flicker 4s infinite ease-in-out',
        'pulse-slow': 'pulseSlow 6s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
