import type { Metadata } from 'next';

import { getSkillMetadata } from '@/services/skills';
import { config } from '@/lib/config';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import SkillMetadataProvider from '@/components/common/skill-metadata-provider';
import ThemeProvider from '@/components/common/theme/theme-provider';
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
          <SkillMetadataProvider metadata={skillMetadata}>
            {children}
            <Toaster position="top-right" richColors={true} duration={5000} />
          </SkillMetadataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
