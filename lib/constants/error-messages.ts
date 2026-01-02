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
    skills: {
      category: '카테고리는 필수 입력 항목입니다.',
      items: '스킬을 하나 이상 추가해주세요.',
      metadata: '스킬 이름은 필수 입력 항목입니다.',
    },
    project: {
      title: '프로젝트 제목은 필수 입력 항목입니다.',
      member: {
        size: '전체 인원은 필수 입력 항목입니다.',
      },
    },
    auth: '아이디와 비밀번호를 입력해주세요.',
  },
  invalid: {
    email: '이메일 주소 형식이 올바르지 않습니다.',
    auth: '아이디 또는 비밀번호를 확인해주세요.',
  },
  length: {
    project: {
      member: {
        size: '전체 인원은 최소 1명 이상 입력해야 합니다.',
      },
    },
  },
  unknown: {
    default: '알 수 없는 오류가 발생했습니다.',
    login: '로그인 처리 중 오류가 발생했습니다.',
  },
} as const;
