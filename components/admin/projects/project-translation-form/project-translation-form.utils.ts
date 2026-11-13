import { createStringItems } from '@/lib/utils/form';
import type { StringItem } from '@/lib/validation/common.schema';
import type { FormDataType } from '@/lib/validation/project-translation.schema';
import type {
  ProjectTranslation,
  ProjectTranslationData,
} from '@/types/project';

// 빈 칸은 저장하지 않아야 조회 시 한국어 원본으로 대체된다
const toText = (value: string) => value.trim() || null;
const toList = (items: StringItem[]) => {
  const values = items.map((item) => item.value.trim()).filter(Boolean);
  return values.length > 0 ? values : null;
};

/**
 * 번역 폼 입력값을 저장용 데이터로 변환하는 함수
 * 비어 있는 필드는 null로 바꿔 한국어 원본이 표시되게 한다.
 * @param data 번역 폼 입력값
 * @returns 번역 저장 데이터
 */
export function createProjectTranslationPayload(
  data: FormDataType,
): ProjectTranslationData {
  const role = toText(data.member.role);
  const responsibilities = toList(data.member.responsibilities);

  return {
    title: toText(data.title),
    description: toText(data.description),
    category: toText(data.category),
    overview: toText(data.overview),
    features: toList(data.features),
    goals: toList(data.goals),
    results: toList(data.results),
    member:
      role || responsibilities
        ? { role: role ?? '', responsibilities: responsibilities ?? [] }
        : null,
  };
}

/**
 * 저장된 번역을 번역 폼 기본값으로 변환하는 함수
 * @param translation 저장된 번역 (없으면 빈 폼)
 * @returns 번역 폼 기본값
 */
export function createProjectTranslationDefaultValues(
  translation?: ProjectTranslation | null,
): FormDataType {
  return {
    title: translation?.title ?? '',
    description: translation?.description ?? '',
    category: translation?.category ?? '',
    overview: translation?.overview ?? '',
    features: createStringItems(translation?.features),
    goals: createStringItems(translation?.goals),
    results: createStringItems(translation?.results),
    member: {
      role: translation?.member?.role ?? '',
      responsibilities: createStringItems(
        translation?.member?.responsibilities,
      ),
    },
  };
}
