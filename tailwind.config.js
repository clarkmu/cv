/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#fcfcee",
        primary: "#80a0ff",
        secondary: "#0041ff",
      },
    },
  },
  plugins: [],
};
