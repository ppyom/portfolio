export const errorMessages = {
  retry: (prefix?: string) =>
    [prefix, '잠시 후 다시 시도해주세요.'].filter(Boolean).join(' '),
  required: {
    name: '이름은 필수 입력 항목입니다.',
    email: '이메일은 필수 입력 항목입니다.',
    title: '제목은 필수 입력 항목입니다.',
    content: '내용은 필수 입력 항목입니다.',
    profile: {
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
  },
  invalid: {
    email: '이메일 주소 형식이 올바르지 않습니다.',
  },
} as const;
