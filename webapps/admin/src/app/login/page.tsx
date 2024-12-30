import Link from 'next/link';
import { Button, Input, Typography } from '@packages/ui/atoms';
import { paths } from '@constants';

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Link className="self-end" href="/login/code">
      <Link className="self-end" href={paths.login.code.path}>
        <Typography
          type="caption"
          className="text-brand-primary-dark duration-200 hover:text-brand-secondary-dark"
        >
          로그인 코드가 없으신가요?
        </Typography>
      </Link>
    </div>
  );
};

export default LoginPage;
