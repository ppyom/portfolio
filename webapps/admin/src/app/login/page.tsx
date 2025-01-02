'use client';

import { CodeGeneratorForm, LoginForm } from '@components/feature';
import { useInput } from '@hooks';
import { checkEmailPattern } from '@utils/validate';

const LoginPage = () => {
  const {
    value: email,
    onChange,
    error,
    isEmpty,
  } = useInput({ check: checkEmailPattern });

  return (
    <div className="flex flex-col gap-2">
      <CodeGeneratorForm
        value={email}
        onChange={onChange}
        error={error}
        isEmpty={isEmpty}
      />
      <LoginForm email={email} isEmailEmpty={isEmpty} />
    </div>
  );
};

export default LoginPage;
