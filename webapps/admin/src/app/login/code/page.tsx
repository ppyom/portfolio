import Link from 'next/link';
import { Typography } from '@packages/ui/commons';
import { CodeGeneratorForm } from '@components/feature';

const CodePage = () => {
  return (
    <div className="flex flex-col gap-2">
      <CodeGeneratorForm />
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
