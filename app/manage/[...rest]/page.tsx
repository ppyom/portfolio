import { notFound } from 'next/navigation';

// 루트 레이아웃이 방문자·관리자로 나뉘어 app/not-found.tsx를 둘 수 없으므로, 관리자 아래 없는 주소는 manage/not-found.tsx로 보낸다
export default function Page() {
  notFound();
}
