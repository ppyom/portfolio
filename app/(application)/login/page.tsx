import { LoginForm } from '@/components/login/login-form';

export default function Page() {
  return (
    <div className="min-h-150 flex items-center justify-center px-4 pb-24">
      <div className="w-full max-w-sm space-y-8">
        <p className="text-2xl font-bold text-center">로그인</p>
        <LoginForm />
      </div>
    </div>
  );
}
