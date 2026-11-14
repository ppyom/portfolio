import type { Locale } from '@/i18n/routing';
import type messages from '@/messages/ko.json';

// 한국어 메시지를 기준 타입으로 삼아, 없는 키를 쓰면 타입 에러가 나게 한다
declare module 'next-intl' {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
