/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
      },
      keyframes: {
        flip: {
          "0%": {
            transform: "rotateY(0.0deg)",
            "transform-style": "preserve-3d",
          },
          "10%": {
            transform: "rotateY(18deg)",
            "transform-style": "preserve-3d",
          },
          "20%": {
            transform: "rotateY(36deg)",
            "transform-style": "preserve-3d",
          },
          "30%": {
            transform: "rotateY(54deg)",
            "transform-style": "preserve-3d",
          },
          "40%": {
            transform: "rotateY(72deg)",
            "transform-style": "preserve-3d",
          },
          "50%": {
            transform: "rotateY(90deg)",
            "transform-style": "preserve-3d",
          },
          "60%": {
            transform: "rotateY(108deg)",
            "transform-style": "preserve-3d",
          },
          "70%": {
            transform: "rotateY(126deg)",
            "transform-style": "preserve-3d",
          },
          "80%": {
            transform: "rotateY(144deg)",
            "transform-style": "preserve-3d",
          },
          "90%": {
            transform: "rotateY(162deg)",
            "transform-style": "preserve-3d",
          },
          "100%": {
            transform: "rotateY(180deg)",
            "transform-style": "preserve-3d",
          },
        },
      },
      animation: {
        "card-flip": "flip .1s linear",
        "card-flip-back": "flip .1s reverse linear",
      },
    },
  },
  plugins: [require("tailwindcss-inner-border")],
};
