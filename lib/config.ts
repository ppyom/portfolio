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
