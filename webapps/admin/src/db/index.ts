import {
  type HTTPQueryOptions,
  neon,
  type NeonDbError,
} from '@neondatabase/serverless';
import { config } from '@config';
import { messages } from '@constants';

/**
 * 발생한 오류가 NeonDbError인지 확인을 위한 타입 가드 함수
 * @param error
 */
const isNeonDbError = (error: any): error is NeonDbError =>
  typeof error === 'object' && error.name === 'NeonDbError';

/**
 * Neon에서 sql을 실행하는 함수
 * @param query
 * @param args
 * @param options
 * @returns 쿼리 실행 결과 또는 오류메시지
 * @example
 * const result = await sql('SELECT * FROM user WHERE id = $1', [userId]);
 */
export const sql = async <O extends boolean = false, T extends boolean = false>(
  query: string,
  args?: (string | number)[],
  options?: HTTPQueryOptions<O, T>,
) => {
  try {
    const _sql = neon<O, T>(config.db.url);
    return await _sql(query, args, options);
  } catch (error) {
    if (isNeonDbError(error)) {
      const { message } = error;
      console.error(message);
      return messages.error.db;
    } else {
      return messages.error.unknown;
    }
  }
};
