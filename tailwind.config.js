
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubikRegular: ["Rubik_400Regular"],
        rubikBold: ["Rubik_700Bold"],
      }
    },
    colors: {
      "main": "#0C632E",
      "background": "#E5E5E5",
      "error": "#FF0000",
    }
  },
  plugins: [],
}

