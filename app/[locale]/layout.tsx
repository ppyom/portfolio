import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { HtmlLang } from '@/components/provider/html-lang';
import { routing } from '@/i18n/routing';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
