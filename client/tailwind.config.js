module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: '#ffecd1',
      }
    },
    screens: {
      md: '850px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
