module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind scans Chakra components
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        "white": "#E7ECEF",
        "light-blue": "#274C77",
        "mid-blue": "#6096BA",
        "dark-blue": "#A3CEF1",
        "gray": "#8B8C89",
      },
    },
  },
  plugins: [],
};
