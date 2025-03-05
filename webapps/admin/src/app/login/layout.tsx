import type { ChildrenProps } from '@packages/types/components';
import { cn } from '@packages/ui/utils';
import { Logo } from '@packages/ui/admin';
import { LoginGuard } from '@components/guard/LoginGuard';

const LoginLayout = ({ children }: ChildrenProps) => {
  return (
    <LoginGuard hasLogin={false}>
      <div
        className={cn(
          'w-full h-screen',
          'flex items-center justify-center',
          'bg-neutral-700',
        )}
      >
        <div
          className={cn(
            'max-w-80 w-full',
            'px-4 pt-8 pb-4 rounded-lg',
            'flex flex-col gap-4',
            'bg-neutral-50/90',
          )}
        >
          <Logo className="self-center" />
          {children}
        </div>
      </div>
    </LoginGuard>
  );
};

export default LoginLayout;
