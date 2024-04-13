/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#009dab",
          secondary: "#ff6d00",
          accent: "#eb7900",
          neutral: "#262d2e",
          "base-100": "#ffffff",
          info: "#00d8ff",
          success: "#00f7b4",
          warning: "#b05300",
          error: "#e54b57",
        },
      },
    ],
  },
};
