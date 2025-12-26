import { BookIcon, HomeIcon, StarIcon, UserIcon } from 'lucide-react';

export const sidebarItems = [
  { label: '홈', href: '/manage', icon: HomeIcon },
  { label: '프로필 관리', href: '/manage/profile', icon: UserIcon },
  { label: '보유 스킬 관리', href: '/manage/skills', icon: StarIcon },
  { label: '프로젝트 관리', href: '/manage/projects', icon: BookIcon },
];
