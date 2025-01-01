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
  smtp: {
    service: getByENV('SMTP_SERVICE'),
    user: getByENV('SMTP_USER'),
    password: getByENV('SMTP_PASSWORD'),
  },
};
