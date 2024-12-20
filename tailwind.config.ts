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
      keyframes: {
        "fade-effect": {
          "0%": {
            // transform: "scale(0.9)",
            opacity: "0",
          },
          "100%": {
            // transform: "scale(1)",
            opacity: "1",
          },
        },

        "slide-up": {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        loader: {
          "0%": {
            opacity: "0.2",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in": "fade-effect 300ms linear",
        "slide-up": "slide-up 300ms linear forwards",
        "rotate-clockwise": "rotate-clockwise 1s infinite linear",
        "loader-opacity": "loader 1s ease-in-out alternate infinite",
      },
    },
  },
  plugins: [],
};
export default config;
