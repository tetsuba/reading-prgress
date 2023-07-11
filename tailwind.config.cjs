/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/**/*.tsx",
    "./src/**/**/*.ts"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@tailwindcss/forms'),
  ],
}
