import type { FieldItem } from '@/types/field-item';

export const experienceFields: FieldItem[] = [
  {
    name: 'name',
    label: '회사 이름',
    placeholder: '회사 이름',
  },
  {
    name: 'position',
    label: '직무',
    placeholder: '직무',
    required: true,
  },
  {
    name: 'startDate',
    label: '입사일',
    placeholder: '입사일',
    colSpan: 'half',
    required: true,
  },
  {
    name: 'endDate',
    label: '퇴사일',
    placeholder: '퇴사일',
    colSpan: 'half',
  },
  {
    name: 'description',
    label: '주요 성과',
    placeholder: '해당 회사에서 이룬 성과를 간단하게 작성',
  },
];

export const educationFields: FieldItem[] = [
  {
    name: 'name',
    label: '학교 이름',
    placeholder: '학교 이름',
    required: true,
  },
  {
    name: 'major',
    label: '전공',
    placeholder: '전공',
    required: true,
  },
  {
    name: 'startDate',
    label: '입학일',
    placeholder: '입학일',
    colSpan: 'half',
    required: true,
  },
  {
    name: 'endDate',
    label: '졸업일',
    placeholder: '졸업일',
    colSpan: 'half',
  },
];

export const historyFields: FieldItem[] = [
  {
    name: 'type',
    label: '유형',
    colSpan: 'half',
    type: 'select',
    placeholder: '활동 유형을 선택하세요.',
    options: [
      { label: '활동', value: 'activity' },
      { label: '학습', value: 'learning' },
      { label: '자격증', value: 'certification' },
    ],
    required: true,
  },
  {
    name: 'date',
    label: '날짜',
    colSpan: 'half',
    required: true,
  },
  { name: 'name', label: '제목', required: true },
  {
    name: 'description',
    label: '설명',
  },
];
