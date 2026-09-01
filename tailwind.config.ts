import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // elev8tion brand colors (we'll extract from logos)
        brand: {
          primary: "#6366F1",   // Indigo from logo
          secondary: "#4650E",  // Deep blue
          accent: "#B5B8D0",    // Light purple-gray
          dark: "#1a1a2e",      // Dark background
        },
      },
      borderRadius: {
        DEFAULT: "24px",  // Your 24px standard
        glass: "24px",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [],
};
export default config;
