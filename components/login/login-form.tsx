'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';

import { authErrorMessages } from '@/lib/constants/error-messages';
import { isValidEmail } from '@/lib/utils/email';
import { notifyError } from '@/lib/utils/error';
import { FormDataType, schema } from '@/lib/validation/login.schema';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/ui/error-message';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const form = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FormDataType) => {
    try {
      if (!isValidEmail(data.username)) {
        setError('root', {
          message: authErrorMessages.invalid,
        });
        return;
      }

      const response = await signIn('credentials', {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (!response) {
        setError('root', {
          message: authErrorMessages.unknown.login,
        });
        return;
      }

      if (response.error) {
        setError('root', {
          message: authErrorMessages.invalid,
        });
        return;
      }
      router.replace(callbackUrl);
      router.refresh();
    } catch (error) {
      notifyError(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field>
          <Label htmlFor="username">아이디</Label>
          <Input id="username" type="text" {...register('username')} />
        </Field>
        <Field>
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" type="password" {...register('password')} />
        </Field>
        {form.formState.errors.root && (
          <ErrorMessage>{form.formState.errors.root.message}</ErrorMessage>
        )}
        <Button
          type="submit"
          className="w-full font-semibold"
          isLoading={isSubmitting}
        >
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </FormProvider>
  );
}
