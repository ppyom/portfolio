import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import { getSkillMetadata } from '@/services/skills';
import { config } from '@/lib/config';
import { cn } from '@/lib/utils';
import { ToastProvider } from '@/components/ui/toast';
import { SkillMetadataProvider } from '@/components/provider/skill-metadata';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { suite } from '@/theme/fonts';

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

// 이 레이아웃은 언어를 바꿔도 다시 렌더링되지 않는다 (ThemeProvider의 <script>를 다시 그리지 않기 위해 여기 둔다).
// 언어에 따라 바뀌는 번역 Provider와 lang 갱신은 app/[locale]/layout.tsx가 맡는다.
export default async function RootLayout({ children }: Readonly<Props>) {
  const [skillMetadata, locale] = await Promise.all([
    getSkillMetadata(),
    getLocale(),
  ]);

  return (
    // globals.css의 scroll-smooth를 페이지 이동 때는 끄도록 Next에 알린다 (앵커 이동에만 부드러운 스크롤 적용)
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={cn(suite.variable)}>
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
