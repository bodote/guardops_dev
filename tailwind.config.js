/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: "Roboto, sans-serif",
        Poppins: "Poppins, sans-serif",
        SFdisplay: "Noto Sans Display, sans-serif",
        Archivo: "Archivo, sans-serif",
        Inter: "Inter, sans-serif",
        Rubik: "Rubik, sans-serif",
        Exo: "Exo, sans-serif",
      },
      colors: {
        'coai-green': '#D4DB33',
        'coai-blue': '#0D859A'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      
    },
  },
  plugins: [require("flowbite/plugin")],
};
