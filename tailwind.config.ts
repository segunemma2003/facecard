
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
        // FACE Brand Colors - No Purple or Yellow
        'face-white': '#FFFFFF',
        'face-grey': {
          DEFAULT: '#333333',
          'light': '#4A4A4A',
          'dark': '#1A1A1A'
        },
        'face-sky-blue': {
          DEFAULT: '#87CEEB',  // Sky Blue
          'light': '#B0E0E6',  // Powder Blue
          'dark': '#5BA3CC'    // Darker Sky Blue
        },
        // Completely remove purple and yellow from brand colors
        'brand-blue': '#87CEEB',
        'brand-grey': '#333333',
        'brand-white': '#FFFFFF',
        // Override any existing purple/yellow references
        'face-blue': '#87CEEB',
        'face-gold': '#87CEEB', // Changed from gold/yellow to sky blue
      },
      fontFamily: {
        'clash': ['Clash Display', 'serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'serif': ['Clash Display', 'serif'],
        'sans': ['Manrope', 'sans-serif'],
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(135, 206, 235, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(135, 206, 235, 0.6)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.6s ease-out",
        "scale-up": "scale-up 0.6s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  // Safelist to prevent purging of custom classes
  safelist: [
    'face-sky-blue',
    'face-grey',
    'face-white',
    'brand-blue',
    'brand-grey',
    'brand-white',
    // Explicitly exclude purple and yellow classes
    '!bg-purple-50',
    '!bg-purple-100', 
    '!bg-purple-500',
    '!bg-yellow-50',
    '!bg-yellow-100',
    '!bg-yellow-500',
    '!text-purple-600',
    '!text-yellow-600',
    '!border-purple-500',
    '!border-yellow-500',
  ],
} satisfies Config;
