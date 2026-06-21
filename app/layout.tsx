import type { Metadata } from 'next';

import { getSkillMetadata } from '@/services/skills';
import { config } from '@/lib/config';
import { cn } from '@/lib/utils';
import { ToastProvider } from '@/components/ui/toast';
import { SkillMetadataProvider } from '@/components/provider/skill-metadata';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { donggle, pretendard, suite } from '@/theme/fonts';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: {
    default: '이예진 | Portfolio',
    template: '%s | 이예진 포트폴리오',
  },
  description: '이예진의 포트폴리오입니다.',
  openGraph: {
    title: {
      default: '이예진 | Portfolio',
      template: '%s | 이예진 포트폴리오',
    },
    description: '이예진의 포트폴리오입니다.',
    images: ['/images/og.png'],
  },
};

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<Props>) {
  const skillMetadata = await getSkillMetadata();
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(pretendard.variable, donggle.variable, suite.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            <SkillMetadataProvider metadata={skillMetadata}>
              {children}
            </SkillMetadataProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
