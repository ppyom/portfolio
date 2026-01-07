import { upload } from '@/lib/upload/file';
import { ImageFile } from '@/types/project';

/**
 * 이미지를 업로드하고 파일 테이블에 저장하는 함수
 * @param files 이미지 파일 목록
 */
export const uploadImage = async (
  files: File[],
): Promise<{ url: string }[] | undefined> => {
  if (files.length === 0) {
    return;
  }

  const urls = await Promise.all(files.map((file) => upload(file)));

  return urls.map((url) => ({ url }));
};

/**
 * 삭제된 이미지를 가져오는 함수
 * @param images 기존 이미지 목록
 */
export const getDeletedImages = (
  ...images: (ImageFile & { deleted: boolean })[]
) => {
  return images.filter((image) => image.deleted);
};
