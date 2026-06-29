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
        bg: {
          primary: "#0A0F0D",
          card: "#111A14",
          hover: "#172012",
          glass: "rgba(255,255,255,0.04)",
        },
        accent: {
          DEFAULT: "#F97316",
          hover: "#EA6C0A",
          glow: "rgba(249,115,22,0.15)",
        },
        border: {
          DEFAULT: "#1E2E20",
          light: "#2A3F2D",
        },
        text: {
          primary: "#F0F6FC",
          secondary: "#9DB4A1",
          muted: "#4A5C4D",
        },
        gold: "#F59E0B",
        success: "#22C55E",
        danger: "#EF4444",
      },
      fontFamily: {
        heading: ["var(--font-syne)", "sans-serif"],
        sub: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(to bottom, rgba(10,15,13,0.25) 0%, rgba(10,15,13,0.65) 55%, #0A0F0D 100%)",
        "card-gradient": "linear-gradient(135deg, #111A14 0%, #0A0F0D 100%)",
        "accent-gradient": "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
      },
      boxShadow: {
        "glow-accent": "0 0 20px rgba(249,115,22,0.25), 0 0 60px rgba(249,115,22,0.1)",
        "glow-card": "0 8px 32px rgba(0,0,0,0.6)",
        "glow-sm": "0 0 12px rgba(249,115,22,0.2)",
        "inner-border": "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "pulse-ring": "pulseRing 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "scroll-left": "scrollLeft 30s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        scrollLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(249,115,22,0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(249,115,22,0.4), 0 0 80px rgba(249,115,22,0.15)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
