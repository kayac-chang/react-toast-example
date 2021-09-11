// const colors = require('tailwindcss/colors')

module.exports = {
  mode: "jit",
  purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          DEFAULT: `rgba(235, 87, 87, 1)`,
        },
        yellow: {
          DEFAULT: `rgba(242, 201, 76, 1)`,
          darkest: `rgba(110, 84, 4, 1)`,
        },
        green: `rgba(111, 207, 151, 1)`,
      },
    },
  },
  plugins: [],
};
