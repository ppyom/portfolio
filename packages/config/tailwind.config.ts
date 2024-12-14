import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        base: {
          white: '#ffffff',
          black: '#111111',
        },
        brand: {
          primary: {
            DEFAULT: '#ffdd61',
            light: '#fff1be',
            dark: '#ffc800',
          },
          secondary: {
            DEFAULT: '#617BFF',
            light: '#BEC9FF',
            dark: '#002BFF',
          },
        },
        service: {
          info: {
            DEFAULT: '#0d92f4',
            light: '#77cdff',
          },
          success: {
            DEFAULT: '#8fd14f',
            light: '#c1e2a4',
          },
          error: {
            DEFAULT: '#c62e2e',
            light: '#f87474',
          },
          warning: {
            DEFAULT: '#feb941',
            light: '#ffdc7f',
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
