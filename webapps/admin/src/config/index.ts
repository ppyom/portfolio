const getByENV = (
  key: string,
  defaultValue: string | undefined = undefined,
) => {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error(`${key}를 찾을 수 없습니다.`);
  }

  return value;
};

export const config = {
  db: {
    url: getByENV('NEXT_PUBLIC_DATABASE_URL'),
  },
  smtp: {
    service: getByENV('NEXT_PUBLIC_SMTP_SERVICE'),
    user: getByENV('NEXT_PUBLIC_SMTP_USER'),
    password: getByENV('NEXT_PUBLIC_SMTP_PASSWORD'),
  },
  jwt: {
    secret: {
      access: getByENV('NEXT_PUBLIC_JWT_SECRET'),
      refresh: getByENV('NEXT_PUBLIC_JWT_REFRESH_SECRET'),
    },
  },
};
