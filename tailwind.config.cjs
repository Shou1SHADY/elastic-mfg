/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				elastic: {
					black: '#050505',
					darker: '#0a0a0a',
					panel: '#111111',
					border: '#1f1f1f',
					accent: '#00D9FF',
					secondary: '#7B61FF',
					highlight: '#00FFA3',
					surface: '#111111',
					text: '#ededed',
					dim: '#666666'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				mono: [
					'Space Mono',
					'Consolas',
					'Monaco',
					'monospace'
				],
				sans: [
					'Inter',
					'-apple-system',
					'BlinkMacSystemFont',
					'sans-serif'
				]
			},
			fontSize: {
				xs: [
					'0.75rem',
					{
						lineHeight: '1rem',
						letterSpacing: '0.05em'
					}
				],
				sm: [
					'0.875rem',
					{
						lineHeight: '1.25rem'
					}
				],
				base: [
					'1rem',
					{
						lineHeight: '1.5rem',
						letterSpacing: '-0.01em'
					}
				],
				lg: [
					'1.125rem',
					{
						lineHeight: '1.75rem',
						letterSpacing: '-0.01em'
					}
				],
				xl: [
					'1.25rem',
					{
						lineHeight: '1.75rem',
						letterSpacing: '-0.02em'
					}
				],
				'2xl': [
					'1.5rem',
					{
						lineHeight: '2rem',
						letterSpacing: '-0.02em'
					}
				],
				'3xl': [
					'1.875rem',
					{
						lineHeight: '2.25rem',
						letterSpacing: '-0.03em'
					}
				],
				'4xl': [
					'2.25rem',
					{
						lineHeight: '2.5rem',
						letterSpacing: '-0.03em'
					}
				],
				'5xl': [
					'3rem',
					{
						lineHeight: '1',
						letterSpacing: '-0.04em'
					}
				]
			},
			backgroundImage: {
				'grid-pattern': 'linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)',
				'radial-fade': 'radial-gradient(circle at center, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
				glass: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
			},
			boxShadow: {
				glow: '0 0 20px rgba(0, 217, 255, 0.3), 0 0 40px rgba(0, 217, 255, 0.1)',
				'glow-lg': '0 0 30px rgba(0, 217, 255, 0.4), 0 0 60px rgba(0, 217, 255, 0.2)',
				'glow-purple': '0 0 20px rgba(123, 97, 255, 0.3), 0 0 40px rgba(123, 97, 255, 0.1)',
				'glow-mint': '0 0 20px rgba(0, 255, 163, 0.3), 0 0 40px rgba(0, 255, 163, 0.1)'
			},
			animation: {
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				scan: 'scan 8s linear infinite',
				'spin-slow': 'spin 12s linear infinite',
				float: 'float 6s ease-in-out infinite',
				'fade-in': 'fadeIn 0.5s ease-out forwards',
				'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'glow-pulse': 'glowPulse 2s ease-in-out infinite',
				'slide-in-left': 'slideInLeft 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
				'slide-in-right': 'slideInRight 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
				'slide-in-up': 'slideInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
				'scale-in': 'scaleIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards',
				'rotate-in': 'rotateIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards',
				shimmer: 'shimmer 2.5s infinite',
				'gradient-shift': 'gradientShift 8s ease infinite'
			},
			keyframes: {
				scan: {
					'0%': {
						transform: 'translateY(-100%)'
					},
					'100%': {
						transform: 'translateY(100%)'
					}
				},
				float: {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				fadeIn: {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				slideUp: {
					'0%': {
						transform: 'translateY(40px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				glowPulse: {
					'0%, 100%': {
						opacity: '1',
						filter: 'brightness(1)'
					},
					'50%': {
						opacity: '0.8',
						filter: 'brightness(1.2)'
					}
				},
				slideInLeft: {
					'0%': {
						opacity: '0',
						transform: 'translateX(-30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				slideInRight: {
					'0%': {
						opacity: '0',
						transform: 'translateX(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				slideInUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				scaleIn: {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				rotateIn: {
					'0%': {
						opacity: '0',
						transform: 'rotate(-10deg) scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'rotate(0) scale(1)'
					}
				},
				shimmer: {
					'0%': {
						left: '-100%'
					},
					'100%': {
						left: '100%'
					}
				},
				gradientShift: {
					'0%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					},
					'100%': {
						backgroundPosition: '0% 50%'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.23, 1, 0.32, 1)',
				'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}