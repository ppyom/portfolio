'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { sendContactAction } from '@/app/(application)/contact/actions';
import { notifyError } from '@/lib/utils/error';
import { FormDataType, schema } from '@/lib/validation/contact.schema';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';

import { createContactDefaultValues } from './contact-form.utils';

export function ContactForm() {
  const form = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: createContactDefaultValues(),
  });
  const { register, handleSubmit, reset } = form;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(
          async (data: FormDataType) => {
            const result = await sendContactAction(data);
            if (result.success) {
              toast.success('메시지 전달이 완료되었습니다.');
              reset();
            } else {
              toast.error(result.message);
            }
          },
          (error) => notifyError(error),
        )}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Field required>
            <Label required>이름</Label>
            <Input {...register('name')} />
          </Field>
          <Field>
            <Label>회사명</Label>
            <Input {...register('company')} />
          </Field>
          <Field className="md:col-span-2" required>
            <Label required>이메일 주소</Label>
            <Input {...register('email')} />
          </Field>
          <Field className="md:col-span-2" required>
            <Label required>제목</Label>
            <Input {...register('title')} />
          </Field>
          <Field className="md:col-span-2" required>
            <Label required>내용</Label>
            <Textarea
              className="resize-none min-h-28"
              {...register('content')}
            />
          </Field>
        </div>
        <Button type="submit" className="w-full mt-4" size="lg">
          문의 남기기
        </Button>
      </form>
    </FormProvider>
  );
}
