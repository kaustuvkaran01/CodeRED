module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      pink: {
        light: "#EBD4CB",
        DEFAULT: "#DA9F93",
        dark: "#B6465F",
      },
      red: {
        DEFAULT: "#890620",
        dark: "#2C0703",
      },
      white: {
        DEFAULT: "#ffffff",
      },
    },
    extend: {},
  },
  variants: {
    extend: { borderWidth: ["hover", "focus"], padding: ["hover", "focus"] },
  },
  plugins: [],
};
