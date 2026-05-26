export const tokens = {
  colors: {
    papel: "#FAF8F4",
    carvao: "#141414",
    granito: "#A8ADA7",
    pinheiro: "#2A3820",
    musgo: "#4F6305",
    noiteAlpina: "#1A2638",
    brasa: "#C02B0A",
    lanterna: "#F6C67F",
    alerta: "#B32025",
  },
  motion: {
    ease: {
      cinematic: "cubic-bezier(0.75, 0, 0.25, 1)",
      natural: "cubic-bezier(0.165, 0.84, 0.44, 1)",
      precise: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    duration: {
      micro: 200,
      fast: 400,
      smooth: 600,
      hero: 1000,
      page: 1200,
    },
  },
  spacing: {
    sm: "75px",
    md: "96px",
    lg: "168px",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "32px",
    pill: "9999px",
    asymmetric: "24px 0 24px 0",
  },
} as const;

export type Tokens = typeof tokens;
