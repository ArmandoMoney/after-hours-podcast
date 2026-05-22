/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#0A0A0A',
          input: '#141414',
          border: '#2A2A2A',
          body: '#E5E5E5',
          muted: '#ABABAB',
          amber: '#F5C45E',
        },
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};
