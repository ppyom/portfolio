import type { Project } from '@/lib/types/project';

export const projects: Project[] = [
  {
    id: 1,
    title: '퀴즈뱅크(Quizbank)',
    description:
      '누구나 문제를 만들고 풀 수 있는 AI 검증 기반 퀴즈 학습 플랫폼',
    tags: [
      'Next.js',
      'Nest.js',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'ReactQuery',
    ],
    image: '/quizbank.png',
    body: '',
  },
  {
    id: 2,
    title: '미어켓',
    description:
      '중고 거래에 경매 시스템을 도입한 중고 거래 블라인드 경매 플랫폼',
    tags: [
      'React',
      'TypeScript',
      'Storybook',
      'Emotion',
      'Zustand',
      'ReactQuery',
    ],
    image: '/meerket.png',
    body: '',
  },
  {
    id: 3,
    title: '핸들이 고장난 푸드트럭',
    description:
      '푸드트럭 사장님이 직접 영업 정보를 실시간으로 업데이트 할 수 있는 플랫폼',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'ReactQuery'],
    image: '/broken-handle-truck.png',
    body: '',
  },
];
