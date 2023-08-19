/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        'lighterBlue': '#F5F5F8',
        'bgWhite': '#FAFAFA',
        'ratingBg': '#FFC850',
        'lightBlack': '#797979',
        'lighterOrange': '#FBF4EE',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

