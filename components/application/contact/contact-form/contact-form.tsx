'use client';

import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';

import { sendContactAction } from '@/app/[locale]/(application)/contact/actions';
import { notifyError } from '@/lib/utils/error';
import {
  createSchema,
  type FormDataType,
} from '@/lib/validation/contact.schema';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';

import { createContactDefaultValues } from './contact-form.utils';

export function ContactForm() {
  const t = useTranslations('ContactForm');
  const tErrors = useTranslations('ContactForm.errors');
  const schema = useMemo(() => createSchema(tErrors), [tErrors]);
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
              toast.success(t('success'));
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
            <Label required>{t('name')}</Label>
            <Input {...register('name')} />
          </Field>
          <Field>
            <Label>{t('company')}</Label>
            <Input {...register('company')} />
          </Field>
          <Field className="md:col-span-2" required>
            <Label required>{t('email')}</Label>
            <Input {...register('email')} />
          </Field>
          <Field className="md:col-span-2" required>
            <Label required>{t('subject')}</Label>
            <Input {...register('title')} />
          </Field>
          <Field className="md:col-span-2" required>
            <Label required>{t('content')}</Label>
            <Textarea
              className="resize-none min-h-28"
              {...register('content')}
            />
          </Field>
        </div>
        <Button type="submit" className="w-full mt-4" size="lg">
          {t('submit')}
        </Button>
      </form>
    </FormProvider>
  );
}
