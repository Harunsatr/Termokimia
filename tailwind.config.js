/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(251, 146, 60, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(251, 146, 60, 0.8), 0 0 30px rgba(251, 146, 60, 0.6)' },
        }
      },
      colors: {
        'thermo': {
          50: '#fef7ee',
          100: '#fdecd7',
          200: '#f9d5ae',
          300: '#f5b87a',
          400: '#f09244',
          500: '#ec751f',
          600: '#dd5a15',
          700: '#b74314',
          800: '#923618',
          900: '#762f17',
        }
      }
    },
  },
  plugins: [],
}
