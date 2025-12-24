import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import ThemeProvider from '@/components/common/theme/theme-provider';

import './globals.css';

export const metadata: Metadata = {
  title: '이예진 | Portfolio',
  description: '이예진의 포트폴리오입니다.',
};

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const donggle = localFont({
  src: '../public/fonts/Cafe24Dongdong-v2.0.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-dongle',
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="ko" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={cn(pretendard.variable, donggle.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors={true} duration={5000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
