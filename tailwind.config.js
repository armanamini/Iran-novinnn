/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.js",
    "./pages/*.js",
    "./pages/**/**/*.js",
    "./Core/*.js",
    "./Core/**/*.js",
    "./Core/**/**/*.js",
    "./Data/*.js",
    "./component/**/*.js",
    "./component/*.js",
    "./component/**/**/*.js",
  ],
  theme: {
    fontFamily: {
      IRANYekan: ["IRANYekan"],
      Roboto: ["Roboto"],
    },
    screens: {
      "3xl": { max: "2560px" },
      // => @media (max-width: 2560px) { ... }
      "2xl": { max: "1735px" },
      // => @media (max-width: 1735px) { ... }
      "0xl": { max: "1440px" },
      xxxl: { max: "1366px" },
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
      lg: { max: "1023px" },
      "2md": { max: "940px" },
      // => @media (max-width: 1023px) { ... }
      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }
      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      xs: { max: "450px" },
      // => @media (max-width: 450px) { ... }
      xxs: { max: "400px" },
      // => @media (max-width: 400px) { ... }
      xxxs: { max: "350px" },
      // => @media (max-width: 400px) { ... }
    },
    extend: {
      maxWidth: {
        container: "90rem",
      },
      boxShadow: {
        xxl: "0px 7px 25px rgba(0, 0, 0, 0.11)",
        "3xl": "0px 7px 25px rgba(0, 0, 0, 0.11)",
      },
      colors: {
        primary: "#2DAB66",
        secondary: "#E20613",
        accent: "#CFE6D8",
        grayF7: "#F7F7F7",
        grayF5: "#F5F5F5",
        green33: "#007A33",
        greenCD: "#C3DDCD",
        greenB1: "#9FCAB1",
        black12: "#072112",
        green66: "#2DAB66",
        greenE9: "#E8F1E9",
        red3B: "#CB333B",
        redC7: "#F1C4C7",
        blueEF: "#C0DCEF",
        orange7D: "#FFB17D",
        black40: "#343A40",
        grayA5: "#8B90A5",
        yellow07: "#FFC107",
      },
      backgroundImage: {
        blue: "linear-gradient(180deg, #228CF5 0%, #0541AC 100%)",
        red: "linear-gradient(180deg, #D92D32 0%, #941D25 100%)",
        green: "linear-gradient(180deg, #8FC83E 0%, #177737 100%)",
      },
    },
  },
  plugins: [],
};
