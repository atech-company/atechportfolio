import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        neon: {
          blue: "#00d9ff",
          green: "#00ff88",
          cyan: "#00f0ff",
        },
        accent: {
          blue: "#3b82f6",
          cyan: "#06b6d4",
          green: "#10b981",
          purple: "#8b5cf6",
        },
        dark: {
          50: "#f8f9fa",
          100: "#e9ecef",
          200: "#dee2e6",
          300: "#ced4da",
          400: "#adb5bd",
          500: "#6c757d",
          600: "#495057",
          700: "#343a40",
          800: "#212529",
          900: "#0d1117",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
        "spin-slow": "spin 8s linear infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "shimmer": "shimmer 3s infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00d9ff, 0 0 10px #3b82f6" },
          "100%": { boxShadow: "0 0 20px #00d9ff, 0 0 30px #3b82f6, 0 0 40px #00ff88" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-position": "50% 0%",
          },
          "50%": {
            "background-position": "50% 100%",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "25%": {
            "background-position": "100% 50%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
          "75%": {
            "background-position": "0% 100%",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        glowPulse: {
          "0%": {
            "box-shadow": "0 0 5px rgba(0, 217, 255, 0.6), 0 0 10px rgba(59, 130, 246, 0.4)",
          },
          "100%": {
            "box-shadow": "0 0 20px rgba(0, 217, 255, 0.9), 0 0 30px rgba(59, 130, 246, 0.7), 0 0 40px rgba(0, 255, 136, 0.5)",
          },
        },
      },
      boxShadow: {
        "neon-blue": "0 0 10px rgba(0, 217, 255, 0.6), 0 0 20px rgba(59, 130, 246, 0.4)",
        "neon-green": "0 0 10px rgba(0, 255, 136, 0.6), 0 0 20px rgba(16, 185, 129, 0.4)",
        "neon-glow": "0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(59, 130, 246, 0.4), 0 0 60px rgba(0, 255, 136, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;

