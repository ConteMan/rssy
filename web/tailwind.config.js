/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdfcfb',
          100: '#f5f3f0',
          200: '#e8e4de',
          300: '#d4cdc3',
          400: '#b8ada0',
          500: '#9a8c7c',
          600: '#7d6e5e',
          700: '#655849',
          800: '#54493d',
          900: '#473f36',
        },
        ink: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#262626',
        },
        accent: {
          50: '#fef7ee',
          100: '#fdedd7',
          200: '#f9d7ae',
          300: '#f5ba7a',
          400: '#f09444',
          500: '#ec7620',
          600: '#dd5c16',
          700: '#b74514',
          800: '#923818',
          900: '#763016',
        }
      }
    },
  },
  plugins: [],
}
