/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'movies-background': "url('~/public/background.png')",
        'missing-image': "url('~/public/missing_image.svg')",
      }),
      animation: {
        'ltr-linear-infinite': 'move-bg 360s linear infinite',
      },
      keyframes: {
        'move-bg': {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '8948px 0' },
        },
      },
      colors:{
        'deep-purple': '#180454',
        'vibrant-purple': "#4d07b4"
      },
    },
  },
  variants: {},
  plugins: [],
}
