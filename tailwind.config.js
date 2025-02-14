/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainBlack: "#000000",
        subGray: "#333333",
      },
    },
  },
  plugins: [],
};
