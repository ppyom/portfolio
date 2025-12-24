/**
 * 환경 변수를 가져오는 헬퍼 함수
 * @param key 가져올 환경 변수 키
 * @param defaultValue 기본값 (optional)
 * @throws Error 환경 변수가 존재하지 않고 defaultValue도 없을 때 발생
 * @returns 환경 변수 값 `string`
 */
const getEnv = (key: string, defaultValue: string | undefined = undefined) => {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error(`${key}가 undefined 입니다.`);
  }

  return value;
};

export const config = {
  bcrypt: {
    round: parseInt(getEnv('BCRYPT_ROUND', '10')),
  },
  nextauth: {
    secret: getEnv('NEXTAUTH_SECRET'),
  },
  db: {
    url: getEnv('DATABASE_URL'),
    sessionUrl: getEnv('DATABASE_SESSION_URL'),
  },
  cloudflare: {
    region: getEnv('CLOUDFLARE_REGION', 'auto'),
    accessKey: getEnv('CLOUDFLARE_ACCESS_KEY'),
    secretKey: getEnv('CLOUDFLARE_SECRET_KEY'),
    endpoint: getEnv('CLOUDFLARE_ENDPOINT'),
    bucket: getEnv('CLOUDFLARE_BUCKET'),
    publicUrl: getEnv('CLOUDFLARE_PUBLIC_URL'),
  },
};
