import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stitch-screens/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#678DC6", // Stitch glauco blue (used by stitch-screens)
        secondary: "hsl(var(--secondary))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        // Stitch design tokens (used in stitch-screens HTML)
        "background-light": "#F8F9FA",
        "background-login": "#F2F4F7",
        "background-dark": "#121212",
        graphite: "#323432",
        porcelain: "#F8F7F2",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        "display-outfit": ["Outfit", "sans-serif"],
        body: ["Inter", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
