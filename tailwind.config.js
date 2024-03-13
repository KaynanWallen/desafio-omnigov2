/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#0000CC',
        'secondary' : '#F0F3FF',
        'text' : '#94A3B8',

      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
      screens: { 
        'sm' : '500px',
        'md' : '950px'
      },
      borderRadius: {
        'left': '10px 0px 0px 10px',
        'right': '0px 10px 10px 0px'
      }
    },
  },
  plugins: [],
}