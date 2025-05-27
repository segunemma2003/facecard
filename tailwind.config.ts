
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: '#87CEEB',
				input: '#87CEEB',
				ring: '#87CEEB',
				background: '#FFFFFF',
				foreground: '#333333',
				primary: {
					DEFAULT: '#87CEEB',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#FFFFFF',
					foreground: '#333333'
				},
				destructive: {
					DEFAULT: '#333333',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#87CEEB',
					foreground: '#333333'
				},
				accent: {
					DEFAULT: '#333333',
					foreground: '#FFFFFF'
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#333333'
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#333333'
				},
				sidebar: {
					DEFAULT: '#FFFFFF',
					foreground: '#333333',
					primary: '#87CEEB',
					'primary-foreground': '#FFFFFF',
					accent: '#87CEEB',
					'accent-foreground': '#333333',
					border: '#87CEEB',
					ring: '#87CEEB'
				},
				// FACE Brand Colors - ONLY THESE
				brand: {
					blue: '#87CEEB',      // Sky blue - primary standout color
					white: '#FFFFFF',     // White - primary color
					grey: '#333333',      // Grey - primary color
					'blue-light': '#E0F6FF', // Very light blue for backgrounds
					'blue-dark': '#4682B4',   // Darker blue for depth
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				serif: ['Clash Display', 'serif'],
				sans: ['Manrope', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				'shine': {
					'0%': { backgroundPosition: '200% 0' },
					'100%': { backgroundPosition: '-200% 0' },
				},
				'bounce-slow': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'scale-up': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out',
				'slide-in': 'slide-in 0.7s ease-out',
				'shine': 'shine 8s ease-in-out infinite',
				'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
				'scale-up': 'scale-up 0.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
