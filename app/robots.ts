import type { MetadataRoute } from 'next';

import { config } from '@/lib/config';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export default function robots(): MetadataRoute.Robots {
  // 로그인은 언어별 경로(/login, /en/login)가 있으므로 지원 언어 목록에서 만든다
  const loginPaths = routing.locales.map((locale) =>
    getPathname({ href: '/login', locale }),
  );

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/manage', '/api', ...loginPaths],
    },
    sitemap: new URL('/sitemap.xml', config.siteUrl).toString(),
  };
}
