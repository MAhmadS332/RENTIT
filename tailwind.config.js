/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins"],
    },
    extend: {
      animation: {
        "spin-slow": "spin 2s linear infinite",
        "spin-fast": "spin 500ms linear infinite",
      },
    },
  },
  plugins: [],
};
