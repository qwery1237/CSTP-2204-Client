/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightMode: {
          transparentBg: '#0f172abf',
          button: 'rgb(14,165,233)',
          buttonHover: '#38bdf8',
          header: 'rgb(255,255,255)',
          border: '#e2e8f033',
          bg: '#0e1726',
          sbg: '#182335',
          tbg: '#141d2c',
          fbg: '#33415580',
          p: '#747c88',
          valid: '#B6F09C',
          error: '#d32f2f',
        },
        darkMode: {
          transparentBg: '#0f172abf',
          button: 'rgb(14,165,233)',
          buttonHover: '#38bdf8',
          header: 'rgb(255,255,255)',
          border: '#e2e8f033',
          bg: '#0e1726',
          sbg: '#182335',
          tbg: '#141d2c',
          fbg: '#33415580',
          p: '#747c88',
          valid: '#B6F09C',
          error: '#d32f2f',
          // primaryPurple: '#6a1b9a',
          // accentPurple: '#7c43bd',
          // background: '#2c3e50',
          // text: '#ecf0f1',
          // secondaryBackground: '#34495e',
        },
      },
    },
  },
  plugins: [],
};
