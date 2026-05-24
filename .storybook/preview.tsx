import type { Preview } from '@storybook/nextjs-vite';

import { ToastProvider } from '../components/ui/toast';
import { suite } from '../theme/fonts';

import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    nextjs: {
      appDirectory: true,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },

  decorators: [
    (Story) => (
      <ToastProvider>
        <div className={suite.variable}>
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
};

export default preview;
