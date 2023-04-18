/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'hero-pattern': "url('https://i.ibb.co/Qn5BR8N/bg.png')",
      }),
      animation: {
        'ltr-linear-infinite': 'move-bg 5s linear infinite',
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
