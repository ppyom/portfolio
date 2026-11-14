/**
 * 이력서 공개 URL에서 원본 파일명을 추출하는 함수
 * 업로드 시 키 마지막 경로에 인코딩된 원본 파일명을 붙여 두므로 이를 디코딩한다.
 * @param url 이력서 공개 URL
 * @returns 원본 파일명
 * @example
 * getResumeFileName('https://cdn.example.com/resumes/uuid/%EC%9D%B4%EB%A0%A5%EC%84%9C.pdf'); // '이력서.pdf'
 */
export const getResumeFileName = (url: string) => {
  const lastSegment = url.split('/').pop() ?? '';

  try {
    return decodeURIComponent(lastSegment);
  } catch {
    return lastSegment;
  }
};
