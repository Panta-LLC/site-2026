import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  // include the app sources and workspace packages (UI, lib, etc.)
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "../../packages/ui/src/**/*.{ts,tsx,js,jsx}",
    "../../packages/lib/src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#002642",
          dark: "#02040f",
          accent: "#840032",
          highlight: "#FFA90A",
          light: "#e5dada",
        },
        // New color palette from Coolors
        primary: {
          DEFAULT: "#002642",
          dark: "#02040f",
        },
        accent: {
          DEFAULT: "#840032",
        },
        highlight: {
          DEFAULT: "#e59500",
        },
        light: {
          DEFAULT: "#e5dada",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Ubuntu",
          "Cantarell",
          "Noto Sans",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["caecilia", "Georgia", "Times New Roman", "Times", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
