/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        // CHANGE PIC
        'hero-pattern': "url('~/public/background_test.png')"
      }),
      animation: {
        'ltr-linear-infinite': 'move-bg 20s linear infinite',
      },
      keyframes: {
        'move-bg': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '256px 0' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
