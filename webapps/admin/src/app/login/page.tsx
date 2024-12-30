import Link from 'next/link';
import { Button, Input, Typography } from '@packages/ui/atoms';

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Input placeholder="로그인 코드 입력" />
      <Button bg="secondary">로그인</Button>
      <Link className="self-end" href="/login/code">
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
