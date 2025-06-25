/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx}'],
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        solarYellow: '#F5DF4D',
        skyBlue: '#2D68C4',
        neonPink: '#FF2CD0',
        darkBg: '#111111'
      },
      fontFamily: {
        header: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};
