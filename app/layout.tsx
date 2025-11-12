import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '이예진 | Portfolio',
  description: '이예진의 포트폴리오입니다.',
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
