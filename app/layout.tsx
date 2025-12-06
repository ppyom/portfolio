import type { Metadata } from 'next';
import localFont from 'next/font/local';
import ThemeProvider from '@/components/theme/theme-provider';
import Navigation from '@/components/navigation';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';
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
    <html lang="ko" suppressHydrationWarning>
      <body className={cn(pretendard.variable, donggle.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
