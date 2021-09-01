const { spacing, fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./layouts/**/*.{ts,tsx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Merriweather", fontFamily.serif],
        handwriting: ["Sacramento", fontFamily.serif],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
