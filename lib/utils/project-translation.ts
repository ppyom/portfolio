import type { Project, ProjectTranslation } from '@/types/project';

type TranslationFields = Pick<
  ProjectTranslation,
  | 'title'
  | 'description'
  | 'category'
  | 'overview'
  | 'features'
  | 'goals'
  | 'results'
  | 'member'
>;

const pickText = <T extends string | null>(
  translated: string | null | undefined,
  base: T,
): string | T => (translated?.trim() ? translated : base);

const pickList = <T, B extends T[] | null>(
  translated: T[] | null | undefined,
  base: B,
): T[] | B => (translated && translated.length > 0 ? translated : base);

/**
 * 한국어 프로젝트 위에 번역을 필드 단위로 덮어쓰는 함수
 * 번역이 비어 있는 필드(null, 빈 문자열, 빈 배열)는 한국어 값을 그대로 둔다.
 * @param project 한국어 원본 프로젝트
 * @param translation 덮어쓸 언어의 번역 (없으면 원본 그대로 반환)
 * @returns 번역이 적용된 프로젝트
 * @example
 * applyProjectTranslation(project, { ...translation, title: 'My App', overview: '' });
 * // title은 'My App', overview는 한국어 원본 유지
 */
export const applyProjectTranslation = (
  project: Project,
  translation?: TranslationFields | null,
): Project => {
  if (!translation) return project;

  return {
    ...project,
    title: pickText(translation.title, project.title),
    description: pickText(translation.description, project.description),
    category: pickText(translation.category, project.category),
    overview: pickText(translation.overview, project.overview),
    features: pickList(translation.features, project.features),
    goals: pickList(translation.goals, project.goals),
    results: pickList(translation.results, project.results),
    member: project.member && {
      ...project.member,
      role: pickText(translation.member?.role, project.member.role),
      responsibilities: pickList(
        translation.member?.responsibilities,
        project.member.responsibilities,
      ),
    },
  };
};
