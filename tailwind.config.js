/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
          'gilroy': ['Gilroy-Bold', 'sans-serif'],
      },
      screens: {
        xsm: "500px",
        lsm: "700px",
        lmd: "900px",
        xxl: "1700px",
        xxxl: "1900px",
        xxxxl: "2300px",
      }
    },
  },

  plugins: [],
}