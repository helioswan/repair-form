/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF445F',
        primaryLight: '#FFF0F1',
        primaryDark: '#8F0C30',
        secondary: '#443D3C',
        validLight: '#DEFAE9',
        valid: '#008670',
        error: '#FF445F',
        link: '#0000EE',
        greyLight: '#F2F2F2',
        greyLighter: '#E5E5E5'
      },
      fonts: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  plugins: []
}
