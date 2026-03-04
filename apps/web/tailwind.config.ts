import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          base: "#121b20",
          surface: "#242e34",
          surfaceHover: "#2a363d",
          border: "#2f3a42",
          borderLight: "#3a4a54",
          accent: "#75b5d4",
          accentHover: "#8ac4df",
          accentMuted: "#2f657a",
          text: "#e8f1f5",
          textSecondary: "#8ba3b0",
          textMuted: "#5a7585",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
