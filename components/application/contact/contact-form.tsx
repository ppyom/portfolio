'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { sendContactAction } from '@/app/(application)/contact/action';
import { errorMessages } from '@/lib/constants/error-messages';
import { notifyError } from '@/lib/utils/error';
import { FormDataType, schema } from '@/lib/validation/contact.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Field from '@/components/common/form/field';
import FieldGroup from '@/components/common/form/field-group';

export default function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  return (
    <form
      onSubmit={handleSubmit(
        async (data: FormDataType) => {
          try {
            const result = await sendContactAction(data);
            if (!result.success) {
              throw new Error(result.message);
            }
            toast.success('메시지 전달이 완료되었습니다.');
            reset();
          } catch (error) {
            notifyError(
              error,
              errorMessages.retry('메시지 전송에 실패했습니다.'),
            );
          }
        },
        (error) => notifyError(error),
      )}
    >
      <FieldGroup
        title="메시지 보내기"
        description="협업, 프로젝트 제안 등 궁금한 점이 있다면 언제든지 연락 주세요."
        className="grid gap-2 md:grid-cols-2"
      >
        <Field label="이름" required>
          <Input {...register('name')} />
        </Field>
        <Field label="회사명">
          <Input {...register('company')} />
        </Field>
        <Field label="이메일 주소" className="md:col-span-2" required>
          <Input {...register('email')} />
        </Field>
        <Field label="제목" className="md:col-span-2" required>
          <Input {...register('title')} />
        </Field>
        <Field label="내용" className="md:col-span-2" required>
          <Textarea className="resize-none min-h-28" {...register('content')} />
        </Field>
        <Button type="submit" className="w-full mt-4 md:col-span-2" size="lg">
          문의 남기기
        </Button>
      </FieldGroup>
    </form>
  );
}
