import config from 'config/tailwind.config';

export default {
  content: ['../../packages/ui/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  ...config,
};
