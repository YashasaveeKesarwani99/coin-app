/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "layout-primary": "#424242",
        "layout-secondary": "#252525",
        primary: "#363636",
      },
      colors: {
        "table-head": "#848484",
        primary: "#252525",
      },
    },
  },
  plugins: [],
};
