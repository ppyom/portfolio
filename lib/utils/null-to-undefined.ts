/**
 * Database 조회 결과 객체에서 `null`을 `undefined`로 변환하는 함수
 * @param obj
 */
export const nullToUndefined = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v === null ? undefined : v]),
  ) as {
    [K in keyof T]: NonNullable<T[K]> | undefined;
  };
