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
            DEFAULT: '#ebd19d',
            light: '#f7e6c5',
            dark: '#baa271',
          },
          secondary: {
            DEFAULT: '#3f97af',
            light: '#8fdbef',
            dark: '#0D687E',
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
