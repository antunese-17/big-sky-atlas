import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bsa-papel": "#FAF8F4",
        "bsa-carvao": "#141414",
        "bsa-granito": "#A8ADA7",
        "bsa-pinheiro": "#2A3820",
        "bsa-musgo": "#4F6305",
        "bsa-noite-alpina": "#1A2638",
        "bsa-brasa": "#C02B0A",
        "bsa-lanterna": "#F6C67F",
        "bsa-alerta": "#B32025",
      },
      fontFamily: {
        display: ["Gambarino", "Fraunces Variable", "Georgia", "serif"],
        body: ['"Satoshi"', "system-ui", "-apple-system", "sans-serif"],
        technical: ["Khand", "Arial Narrow", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },
      letterSpacing: {
        "tight-display": "-0.035em",
        "tight-h1": "-0.02em",
      },
      lineHeight: {
        display: "0.92",
        hero: "0.88",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.75, 0, 0.25, 1)",
        natural: "cubic-bezier(0.165, 0.84, 0.44, 1)",
        precise: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        micro: "200ms",
        fast: "400ms",
        smooth: "600ms",
        hero: "1000ms",
        page: "1200ms",
      },
      spacing: {
        "bsa-sm": "75px",
        "bsa-md": "96px",
        "bsa-lg": "168px",
      },
      borderRadius: {
        "bsa-sm": "4px",
        "bsa-md": "8px",
        "bsa-lg": "16px",
        "bsa-xl": "32px",
      },
    },
  },
  plugins: [],
};

export default config;
