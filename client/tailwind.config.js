module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        beige: '#ffecd1',
      },
      boxShadow: {
        even: '0 0 20px 4px rgb(0, 0, 0, 0.1)',
        neuphorism: '14px 14px 20px #cbced1, -14px -14px 20px white',
      },
      screens: {
        'ca': '80rem'
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '500': '500px',
        '3/4': '75%',
        'full': '100%',
       },
      minWidth: {
        '100': '100px',
        '200': '200px',
        '300': '300px',
        '400': '400px',
        '500': '500px',
        '3/4': '75%',
        'full': '100%',
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
