import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4E342E", // Chocolate Brown
        secondary: "#FFF1DC", // Cream
        accent: "#F7E3BA", // Highlights
      },
    },
  },
  plugins: [],
};
export default config;
