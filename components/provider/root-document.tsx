import { getSkillMetadata } from '@/services/skills';
import { cn } from '@/lib/utils';
import { ToastProvider } from '@/components/ui/toast';
import { SkillMetadataProvider } from '@/components/provider/skill-metadata';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { suite } from '@/theme/fonts';

import '@/app/globals.css';

interface Props {
  lang: string;
  children: React.ReactNode;
}

// 방문자([locale])와 관리자(manage)가 각자 루트 레이아웃을 가지므로 <html>과 공용 Provider를 여기서 함께 쓴다
export async function RootDocument({ lang, children }: Props) {
  const skillMetadata = await getSkillMetadata();

  return (
    // globals.css의 scroll-smooth를 페이지 이동 때는 끄도록 Next에 알린다 (앵커 이동에만 부드러운 스크롤 적용)
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning>
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
