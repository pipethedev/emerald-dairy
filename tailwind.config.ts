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
        "primary-3": "#E1BAAC",
        "primary-10": "#FDE9E2",
        "primary-12": "#FEF2EE",
        "primary-13": "#FEF6F4",
        "primary-14": "#FEF6F4",

        "couch-grey": "#666",
        body: "#FAFAFA",
      },
    },
  },
  plugins: [],
};
export default config;
