import { BookIcon, HomeIcon, StarIcon, UserIcon } from 'lucide-react';

export const sidebarItems = [
  { label: '홈', href: '/manage', icon: HomeIcon },
  { label: '자기소개 관리', href: '#', icon: UserIcon },
  { label: '보유 스킬 관리', href: '#', icon: StarIcon },
  { label: '프로젝트 관리', href: '/manage/projects', icon: BookIcon },
];
