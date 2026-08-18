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
          light: '#2a4d94',
          DEFAULT: '#0F2B5E',
          dark: '#081836'
        },
        secondary: {
          light: '#4fbfdb',
          DEFAULT: '#149bb8',
          dark: '#0c738a'
        },
        surface: '#ffffff',
        background: '#f8fafc',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 40px -10px rgba(15, 43, 94, 0.3)',
      }
    },
  },
  plugins: [],
}
