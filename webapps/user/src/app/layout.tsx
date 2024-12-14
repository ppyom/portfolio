import type { Metadata } from 'next';
import type { ChildrenProps } from '@packages/types/components';
import '@packages/ui/styles.css';

export const metadata: Metadata = {
  title: 'PPYOM',
};

const RootLayout = ({ children }: Readonly<ChildrenProps>) => {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
