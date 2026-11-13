import type { Project } from '@/types/project';

/**
 * 검색어로 프로젝트를 거르는 함수 (대소문자 무시)
 * 제목, 간단 설명, 카테고리, 기술 스택 중 하나라도 검색어를 포함하면 남긴다.
 * 번역이 적용된 프로젝트를 넘기면 현재 언어 내용으로 검색된다.
 * @param projects 거를 프로젝트 목록
 * @param keyword 검색어 (비어 있으면 전체 반환)
 * @returns 검색어에 맞는 프로젝트 목록
 * @example
 * filterProjects(projects, 'react'); // 기술 스택에 React가 있는 프로젝트 포함
 */
export const filterProjects = (
  projects: Project[],
  keyword: string | null | undefined,
): Project[] => {
  const q = keyword?.trim().toLowerCase();
  if (!q) return projects;

  return projects.filter((project) =>
    [
      project.title,
      project.description,
      project.category,
      ...project.techStacks.flatMap((t) => t.stacks ?? []),
    ].some((value) => value?.toLowerCase().includes(q)),
  );
};
