/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#001F3F',    // Deep Navy (main brand)
          700: '#0047AB',    // Ocean Blue (secondary)
          500: '#1E90FF',    // Sky Blue (accents)
          100: '#E0F0FF',    // Light Blue (backgrounds)
        },
        slate: {
          50: '#F5F7FA',     // Light Gray (section bg)
          800: '#2C3E50',    // Dark Slate (alt text)
          900: '#1A202C',    // Very Dark (footer)
        },
        accent: '#FFB700',   // Gold/Amber (highlights)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
