export const profileErrorMessages = {
  required: {
    experience: {
      position: '직무는 필수 입력 항목입니다.',
      startDate: '입사일은 필수 입력 항목입니다.',
    },
    education: {
      name: '학교 이름은 필수 입력 항목입니다.',
      major: '전공은 필수 입력 항목입니다.',
      startDate: '입학일은 필수 입력 항목입니다.',
    },
    history: {
      type: '유형은 필수 선택 항목입니다.',
      name: '제목은 필수 입력 항목입니다.',
      date: '날짜는 필수 입력 항목입니다.',
    },
  },
} as const;
