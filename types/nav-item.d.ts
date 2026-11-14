import type messages from '@/messages/ko.json';

export interface NavItem {
  href: string;
  type: 'page' | 'anchor';
  // 화면 문구는 언어마다 달라서 Nav 메시지 키로 둔다
  labelKey: keyof (typeof messages)['Nav'];
}
