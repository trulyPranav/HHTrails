/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        berlin: ['"Berlin Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};