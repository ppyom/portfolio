import Link from 'next/link';
import { Typography } from '@packages/ui/commons';
import { paths } from '@constants';
import { LoginForm } from '@components/feature';

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <LoginForm />
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
