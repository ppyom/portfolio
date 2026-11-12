import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import { HtmlLang } from '@/components/provider/html-lang';
import { routing } from '@/i18n/routing';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 루트 layout의 기본 메타데이터는 관리자용 한국어라, 방문자 페이지는 여기서 언어별로 덮어쓴다
export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations('Metadata'),
  ]);
  const title = { default: t('siteTitle'), template: t('titleTemplate') };
  const description = t('description');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale,
      images: ['/images/og.png'],
    },
  };
}

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // 언어가 바뀌면 이 레이아웃이 다시 렌더링되므로, 번역 Provider는 루트가 아니라 여기에 둔다
  return (
    <NextIntlClientProvider>
      <HtmlLang lang={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
