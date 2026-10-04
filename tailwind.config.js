/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces (slightly-dark, blue-tinted)
        ink: {
          950: '#05090F',
          900: '#070D16',
          850: '#0A121D',
          800: '#0E1825',
          700: '#152233',
          600: '#1E2F44',
        },
        // Brand teal, sampled from the VIN logo
        brand: {
          50: '#EAF6FA',
          100: '#CDEAF3',
          200: '#A3D7E8',
          300: '#7CC4DA',
          400: '#5AAFC8',
          500: '#4588A0',
          600: '#2D7385',
          700: '#1A4F62',
          800: '#12394A',
          900: '#0E2E3C',
        },
        glow: '#67E8F9',   // electric cyan highlight
        ai: '#A78BFA',     // violet used for AI touches
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-faint': 'linear-gradient(rgba(124,196,218,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,196,218,0.06) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124,196,218,0.15), 0 10px 40px -10px rgba(69,136,160,0.45)',
        'glow-lg': '0 0 0 1px rgba(124,196,218,0.25), 0 20px 80px -20px rgba(103,232,249,0.35)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
}
