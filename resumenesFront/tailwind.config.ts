import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primaryLight: 'var(--color-primary-light)',
        secondary: 'var(--color-secondary)',
        warning: 'var(--color-warning)',
        textMain: 'var(--color-text-main)',
        textSecondary: 'var(--color-text-secondary)',
        bgBase: 'var(--color-bg-base)',
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        star: 'var(--color-star)',
      },
      fontFamily: {
        main: ['var(--font-main)'],
      },
      borderRadius: {
        button: 'var(--button-radius)',
        card: 'var(--card-radius)',
      },
      boxShadow: {
        card: 'var(--card-shadow)',
      },
      transitionProperty: {
        default: 'var(--transition-default)',
      },
    },
  },
  plugins: [],
};

export default config;
