module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: '#ffecd1',
      },
      boxShadow: {
        even: '0 0 20px 4px rgb(0, 0, 0, 0.1)'
      },
      screens: {
        'ca': '80rem'
      },
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
