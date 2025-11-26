/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Font bersih ala modern web
      },
      colors: {
        // Google Blue & Material Colors
        primary: '#1a73e8', 
        'primary-dark': '#1557b0',
        'surface-100': '#F3F6FC', // Background kebiruan sangat muda
        'surface-200': '#E1E3E1',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // Bayangan halus "mahal"
      }
    },
  },
  plugins: [],
}