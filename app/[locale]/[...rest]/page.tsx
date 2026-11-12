import { notFound } from 'next/navigation';

// 언어 경로 아래의 없는 주소도 [locale]/not-found.tsx(번역된 화면)로 보내기 위한 catch-all
export default function Page() {
  notFound();
}
