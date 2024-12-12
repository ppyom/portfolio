import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        base: {
          white: '#ffffff',
          black: '#111111',
        },
      },
    },
  },
  plugins: [],
};

export default config;
