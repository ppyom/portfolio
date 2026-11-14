import { defineRouting } from 'next-intl/routing';

// 지원 언어는 이 파일에서만 정의한다. 언어 추가 시 locales + messages/<locale>.json만 추가하면 된다.
export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  // 한국어는 접두어 없이 기존 URL을 유지하고, 그 외 언어만 /en 처럼 접두어를 붙인다
  localePrefix: 'as-needed',
  // 브라우저 언어로 자동 이동하지 않는다. 링크 그대로 열려야 공유한 URL과 같은 화면이 보인다
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
