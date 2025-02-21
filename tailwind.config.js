/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainBackcolor: "#F7FCFF",
        pointLogo: "#2659EA",
        pointGray: "#313131",
        pointBlue: "#6200EE",
        hoverBlue: "#1F2257",
        inputColor: "#EDEDED",
        subBlue: "#99A8FF",
        inFodanger: "#D70200",
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
        upAndDown_one: {
          "0%": {
            top: "-10px",
          },
          "100%": {
            top: "0",
          },
        },
      },
      animation: {
        fadein: "fadein 1.2s",
        upAndDown_one: "upAndDown_one 1.5s",
      },
    },
  },
  plugins: [],
};
