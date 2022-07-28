/** @type {import('tailwindcss').Config} */

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: ['./src/pages/*.{js,ts,jsx,tsx}', './src/components/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        theme: 'var(--font-theme)',
        text: 'var(--font-text)',
      },
      textColor: {
        primary: withOpacity('--color-primary'),
        text: withOpacity('--color-text'),
      },
      backgroundColor: {
        theme: withOpacity('--color-bg'),
      },
      ringColor: {
        primary: withOpacity('--color-primary'),
        text: withOpacity('--color-text'),
      },
      borderColor: {
        primary: withOpacity('--color-primary'),
        text: withOpacity('--color-text'),
      },
      backgroundImage: {
        prepage: 'var(--img-prepage)',
      },
    },
  },
  plugins: [],
};
