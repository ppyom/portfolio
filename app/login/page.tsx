import { Suspense } from 'react';

import LoginForm from '@/components/login/login-form';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
