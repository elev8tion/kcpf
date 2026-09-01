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
        // Traevu-derived token system — mapped to the CSS vars defined in app/globals.css (C-001).
        // Palette constraint: keep the existing black/dark surfaces and indigo accent.
        brand: {
          accent: "var(--accent)",
          page: "var(--page)",
          wall: "var(--wall)",
          surface: "var(--surface)",
          content: "var(--content-bg)",
          muted: "var(--foreground-muted)",
        },
      },
      borderRadius: {
        xs: "4px",
        sm: "5px",
        md: "7px",
        lg: "9px",
        xl: "14px",
      },
    },
  },
  plugins: [],
};
export default config;
