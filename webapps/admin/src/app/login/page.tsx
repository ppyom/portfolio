'use client';

import { CodeGeneratorForm, LoginForm } from '@components/feature';
import { useInput } from '@hooks';
import { checkEmailPattern } from '@utils/validate';
import { useState } from 'react';

const LoginPage = () => {
  const {
    value: email,
    onChange,
    error,
    isEmpty,
  } = useInput({ check: checkEmailPattern });
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <CodeGeneratorForm
        value={email}
        onChange={onChange}
        error={error}
        isEmpty={isEmpty}
        isGenerated={isGenerated}
        ok={() => setIsGenerated(true)}
      />
      <LoginForm email={email} isGenerated={isGenerated} />
    </div>
  );
};

export default LoginPage;
