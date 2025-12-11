import { ExtractTablesWithRelations } from 'drizzle-orm';
import { PgTransaction } from 'drizzle-orm/pg-core';
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js';
import { fileTable } from '@/database/schema';
import { upload } from '@/lib/file-uploader';
import { ImageFile } from '@/types/project';

/**
 * 이미지를 업로드하고 파일 테이블에 저장하는 함수
 * @param files 이미지 파일 목록
 * @param tx PG 트렌젝션
 */
export const uploadImage = async (
  files: File[],
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >,
): Promise<ImageFile[] | undefined> => {
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
