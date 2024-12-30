import { Button, Input, Typography } from '@packages/ui/commons';
import Link from 'next/link';

const CodePage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Input placeholder="이메일 주소 입력" />
      <Button bg="secondary">로그인 코드 발급</Button>
      <Link className="self-end" href="/login" replace>
        <Typography
          type="caption"
          className="text-brand-primary-dark duration-200 hover:text-brand-secondary-dark"
        >
          이미 코드가 있으신가요?
        </Typography>
      </Link>
    </div>
  );
};

export default CodePage;
