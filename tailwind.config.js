/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainBackcolor: "#F7FCFF",
        pointLogo: "#2659EA",
        pointGray: "#313131",
        pointLightGray: "#393939",
        pointBlue: "#6200EE",
        hoverBlue: "#1F2257",
        inputColor: "#EDEDED",
        subBlue: "#99A8FF",
        inFodanger: "#be123c",
        clipCopyBtn: "#00A6ED",
      },
      boxShadow: {
        opacity9:
          "0 1px 15px -3px rgb(0 0 0 / 0.9), 0 4px 6px -4px rgb(0 0 0 / 0.6)",
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
        changeBg: {
          "0%": { backgroundColor: "#313131" },
          "20%": { backgroundColor: "#6200EE" },
          "80%": { backgroundColor: "#6200EE" },
          "100%": { backgroundColor: "#313131" },
        },
        opacity: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        fadein: "fadein 1.2s",
        upAndDown_one: "upAndDown_one 1.5s",
        changeBg: "changeBg 3s infinite",
        opacity: "opacity 0.4s",
      },
    },
  },
  plugins: [],
};
