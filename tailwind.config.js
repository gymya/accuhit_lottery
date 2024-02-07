/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        primary: '#0F5AD6',
        secondary: '#ff9700'
      },
      fontFamily: {
        noto: ['Noto Sans TC', 'serif']
      }
    }
  },
  plugins: []
}
