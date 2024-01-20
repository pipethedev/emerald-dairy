import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        aeonik: ["Aeonik", "sans-serif"],
        matter: ["Matter", "sans-serif"],
        "matter-semibold": ["MatterSemibold", "sans-serif"],
        aeonikBold: ["AeonikBold", "sans-serif"],
      },
      colors: {
        "lg-heart": "rgba(254, 246, 244, 0.12)",
        primary: "#956E60",
        body: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
export default config;
