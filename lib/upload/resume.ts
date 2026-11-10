import { upload } from '@/lib/upload/file';

/**
 * 이력서 PDF를 업로드하는 함수
 * 원본 파일명을 유지하고, 링크를 열면 바로 내려받도록 업로드한다.
 * @param file 이력서 PDF 파일
 * @returns 업로드된 이력서의 공개 URL
 */
export const uploadResume = (file: File) =>
  upload(file, { prefix: 'resumes', keepFileName: true, attachment: true });
