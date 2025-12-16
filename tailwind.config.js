const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#fe3d56'
      },
      fontFamily: {
        sans: ['Arial', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};

