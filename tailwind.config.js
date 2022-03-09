const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./dashboard/views/**/*.{html,js,ejs}"],
  theme: {
    fontFamily: {
      sans: ['"Source Sans Pro"', "sans-serif"],
      colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      }
    },
    extend: {},
  },
  plugins: [],
};
