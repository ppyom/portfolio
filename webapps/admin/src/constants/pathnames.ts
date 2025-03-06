export const paths = {
  dashboard: {
    path: '/',
    title: '대시보드',
  },
  notice: {
    path: '/notice',
    title: '공지사항',
  },
  my: {
    path: '/my',
    title: '내 정보',
  },
  skills: {
    path: '/skills',
    title: '기술스택',
  },
  projects: {
    path: '/projects',
    title: '프로젝트',
  },
  login: {
    path: '/login',
    title: '로그인',
    code: { path: '/login/code', title: '로그인 코드 발급' },
  },
} as const;
