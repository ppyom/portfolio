import config from '@packages/config/tailwind.config';

export default {
  content: {
    files: ['./**/*.{ts,tsx}'],
    exclude: ['node_modules', '.storybook'],
  },
  ...config,
};
