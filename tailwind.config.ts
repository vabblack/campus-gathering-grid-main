import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'gradient-xy': {
					'0%, 100%': {
						'background-size': '400% 400%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				},
				'blob': {
					'0%': {
						transform: 'translate(0px, 0px) scale(1)',
					},
					'33%': {
						transform: 'translate(30px, -50px) scale(1.1)',
					},
					'66%': {
						transform: 'translate(-20px, 20px) scale(0.9)',
					},
					'100%': {
						transform: 'translate(0px, 0px) scale(1)',
					},
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'particle': {
					'0%': {
						transform: 'translateY(100vh) translateX(0)',
						opacity: '0',
					},
					'100%': {
						transform: 'translateY(-100vh) translateX(100px)',
						opacity: '1',
					},
				},
				typing: {
					"0%": {
						width: "0%",
						visibility: "hidden"
					},
					"100%": {
						width: "100%"
					}
				},
				blink: {
					"50%": {
						borderColor: "transparent"
					},
					"100%": {
						borderColor: "white"
					}
				},
				dimlight: {
					'0%, 18%, 20%, 50.1%, 60%, 65.1%, 80%, 90.1%, 92%': {
						color: '#0e3742',
						boxShadow: 'none',
					},
					'18.1%, 20.1%, 30%, 50%, 60.1%, 65%, 80.1%, 90%, 92.1%, 100%': {
						color: '#fff',
						textShadow: '0 0 10px #03bcf4',
					},
				},
			},
			animation: {
				'gradient-xy': 'gradient-xy 15s ease infinite',
				'blob': 'blob 7s infinite',
				'float': 'float 6s ease-in-out infinite',
				'float-slow': 'float 8s ease-in-out infinite',
				'float-delay': 'float 6s ease-in-out infinite 1s',
				'fade-in': 'fadeIn 1s ease-out',
				'fade-in-delayed': 'fadeIn 1s ease-out 0.5s',
				'fade-in-up': 'fadeInUp 1s ease-out 0.8s',
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'particle': 'particle 20s linear infinite',
				typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
				dimlight: 'dimlight 5s infinite',
			}
		}
	},
	plugins: [animate],
} satisfies Config;

export default config;
