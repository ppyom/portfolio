export const resumeErrorMessages = {
  required: {
    file: '업로드할 이력서 파일을 선택해주세요.',
  },
  invalid: {
    type: '이력서는 PDF 파일만 업로드할 수 있습니다.',
    size: (maxSizeMb: number) =>
      `이력서 파일은 ${maxSizeMb}MB 이하만 업로드할 수 있습니다.`,
  },
  notFound: '삭제할 이력서가 없습니다.',
} as const;
