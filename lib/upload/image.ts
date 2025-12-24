import { ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';
import { fileTable } from '@/database/schema/file.schema';
import { upload } from '@/lib/upload/file';
import { ImageFile } from '@/types/project';

/**
 * 이미지를 업로드하고 파일 테이블에 저장하는 함수
 * @param files 이미지 파일 목록
 * @param tx PG 트랜젝션
 */
export const uploadImage = async (
  files: File[],
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >,
): Promise<ImageFile[] | undefined> => {
  if (files.length === 0) {
    return;
  }

  // 1. 이미지파일 업로드 (R2)
  const urls = await Promise.all(files.map((file) => upload(file)));

  // 2. 파일 테이블에 업로드
  return (
    tx
      .insert(fileTable)
      .values(urls.map((url) => ({ url })))
      .returning() || undefined
  );
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
