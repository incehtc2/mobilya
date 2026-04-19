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
        cream: {
          DEFAULT: "#F5F0E8",
          dark: "#EDE7D9",
          darker: "#DDD6C8",
        },
        obsidian: "#0D0D0D",
        charcoal: "#1A1A1A",
        mist: "#8A8A8A",
        gold: {
          DEFAULT: "#C9A96E",
          light: "#E2C99A",
          dark: "#A8854A",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-satoshi)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "1" }],
        "display-xl": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "1.05" }],
        "display-lg": ["clamp(2rem, 4vw, 4rem)", { lineHeight: "1.1" }],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: { xs: "2px" },
      aspectRatio: { "3/4": "3 / 4", "4/5": "4 / 5" },
    },
  },
  plugins: [],
};

export default config;
