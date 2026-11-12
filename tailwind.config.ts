import type { Config } from "tailwindcss"

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "480px",
      },
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
        // Bảng màu SIPVY "trà cho người trẻ": matcha tươi + đào/cam làm điểm nhấn (xem docs/brand-guideline.md)
        green: {
          50: "#f6fbec",
          100: "#e6f6cc",
          200: "#cdeb9d",
          300: "#aedc66",
          400: "#8fcb3c",
          500: "#72b11f",
          600: "#588f15",
          700: "#447013",
          800: "#385a15",
          900: "#2f4b16",
          950: "#172a08",
        },
        emerald: {
          50: "#f6fbec",
          100: "#e6f6cc",
          200: "#cdeb9d",
          300: "#aedc66",
          400: "#8fcb3c",
          500: "#72b11f",
          600: "#588f15",
          700: "#447013",
          800: "#385a15",
          900: "#2f4b16",
          950: "#172a08",
        },
        teal: {
          50: "#f6fbec",
          100: "#e6f6cc",
          200: "#cdeb9d",
          300: "#aedc66",
          400: "#8fcb3c",
          500: "#72b11f",
          600: "#588f15",
          700: "#447013",
          800: "#385a15",
          900: "#2f4b16",
          950: "#172a08",
        },
        amber: {
          50: "#fff5ee",
          100: "#ffe5d4",
          200: "#ffcaa8",
          300: "#ffab76",
          400: "#ff8a4c",
          500: "#f56d2a",
          600: "#dd5415",
          700: "#b84010",
          800: "#933415",
          900: "#782e15",
          950: "#40160a",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

