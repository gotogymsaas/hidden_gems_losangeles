/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        solarYellow: '#F5DF4D',
        skyBlue: '#2D68C4'
      },
      fontFamily: {
        header: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};
