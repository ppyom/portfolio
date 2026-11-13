import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { config } from '@/lib/config';
import { RootDocument } from '@/components/provider/root-document';
import { routing } from '@/i18n/routing';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: requested } = await params;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const title = { default: t('siteTitle'), template: t('titleTemplate') };
  const description = t('description');

  return {
    metadataBase: new URL(config.siteUrl),
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

// 방문자 페이지의 루트 레이아웃. <html lang>을 요청 헤더 없이 URL의 locale로 정해야 정적 렌더링이 가능하다
// 언어를 바꾸면 루트 레이아웃이 달라져 전체 새로고침이 일어나므로 next-themes <script> 재렌더링 경고도 생기지 않는다
export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <RootDocument lang={locale}>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
    </RootDocument>
  );
}
