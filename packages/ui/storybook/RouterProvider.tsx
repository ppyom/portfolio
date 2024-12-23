import { FC } from 'react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5';

export const RouterProvider = (Story: FC) => {
  return (
    <MemoryRouterProvider>
      <Story />
    </MemoryRouterProvider>
  );
};
