import { createStringItems, toStringArray } from '@/lib/utils/form';
import type { FormDataType } from '@/lib/validation/skill.schema';
import type { Skill } from '@/types/skill';

export function createSkillDefaultValues(skills?: Skill[]): FormDataType {
  return {
    skills:
      skills?.map((skill) => ({
        category: skill.category ?? '',
        items: createStringItems(skill.items),
      })) ?? [],
  };
}

export function createSkillPayload(data: FormDataType) {
  return {
    skills: data.skills.map((skill) => ({
      category: skill.category,
      items: toStringArray(skill.items),
    })),
  };
}
