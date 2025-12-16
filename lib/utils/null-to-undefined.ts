export const nullToUndefined = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v === null ? undefined : v]),
  ) as {
    [K in keyof T]: NonNullable<T[K]> | undefined;
  };
