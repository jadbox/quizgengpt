/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pulseGreen: {
          "0%": { transform: "scale(1)", color: "rgb(34, 197, 94)" }, // Initial color (green-400)
          "50%": { transform: "scale(1.2)", color: "rgb(74, 222, 128)" }, // Changed color
          "100%": { transform: "scale(1)", color: "rgb(34, 197, 94)" }, // Back to initial color
        },
        pulseRed: {
          "0%": { transform: "scale(1)", color: "rgb(239, 68, 68)" }, // Initial color (red-500)
          "50%": { transform: "scale(1.2)", color: "rgb(252, 165, 165)" }, // Changed color
          "100%": { transform: "scale(1)", color: "rgb(239, 68, 68)" }, // Back to initial color
        },
        pulseYellow: {
          "0%": { transform: "scale(1)", color: "rgb(255, 255, 0)" }, // Initial color (yellow)
          "50%": { transform: "scale(1.2)", color: "rgb(255, 255, 153)" }, // Changed color
          "100%": { transform: "scale(1)", color: "rgb(255, 255, 0)" }, // Back to initial color
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulseGreen: "pulseGreen 0.5s ease-in-out",
        pulseRed: "pulseRed 0.5s ease-in-out",
        pulseYellow: "pulseYellow 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
