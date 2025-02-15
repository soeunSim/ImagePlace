/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainBlack: "#000000",
        subGray: "#333333",
      },
      keyframes: {
        fadein: {
          "0%": {
            opacity: "0",
            transform: "translateY(-25px)",
          },         
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },   
      },
      animation: {
        fadein: "fadein 1.2s",
      },         
    },
  },
  plugins: [],
};
