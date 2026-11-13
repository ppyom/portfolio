import type { MetadataRoute } from 'next';

import { getProjects } from '@/services/project';
import { config } from '@/lib/config';
import { toIsoDateString } from '@/lib/utils/date';
import { getPathname } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';

// 기본값(빌드 시 생성)이면 빌드 중 DB를 조회하므로 요청 시 생성한다. 크롤러만 읽어 비용은 작다
export const dynamic = 'force-dynamic';

const STATIC_PATHS = ['/', '/about', '/projects', '/contact'];

const toUrl = (href: string, locale: Locale) =>
  new URL(getPathname({ href, locale }), config.siteUrl).toString();

// 같은 페이지의 언어별 URL을 각각 항목으로 두고, 서로를 hreflang(alternates.languages)으로 묶는다
const createEntries = (
  href: string,
  lastModified?: string,
): MetadataRoute.Sitemap => {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, toUrl(href, locale)]),
  );

  return routing.locales.map((locale) => ({
    url: toUrl(href, locale),
    lastModified,
    alternates: {
      languages: {
        ...languages,
        'x-default': toUrl(href, routing.defaultLocale),
      },
    },
  }));
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects({ isPublic: true });

  return [
    ...STATIC_PATHS.flatMap((href) => createEntries(href)),
    ...projects.flatMap((project) =>
      createEntries(
        `/projects/${project.id}`,
        toIsoDateString(project.updatedAt ?? project.createdAt),
      ),
    ),
  ];
}
