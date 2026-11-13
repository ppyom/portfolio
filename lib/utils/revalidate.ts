import { revalidatePath } from 'next/cache';

/**
 * 모든 언어의 방문자 페이지 캐시를 갱신하는 함수
 * 방문자 페이지는 첫 요청 때 생성해 캐시하므로 관리자에서 공개 콘텐츠를 바꾸면 호출해야 한다.
 * 언어·경로별로 나누지 않고 [locale] 레이아웃 단위로 한 번에 갱신한다 (페이지 수가 적어 비용보다 누락 방지가 중요).
 * Server Action·Route Handler에서만 호출할 수 있다.
 * @example
 * await updateProject(id, project);
 * revalidatePath('/manage/projects');
 * revalidateVisitorPages();
 */
export const revalidateVisitorPages = () => {
  revalidatePath('/[locale]', 'layout');
};
