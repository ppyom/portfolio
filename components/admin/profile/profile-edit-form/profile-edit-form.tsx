'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { updateProfileAction } from '@/app/manage/profile/actions';
import {
  educationFields,
  experienceFields,
  historyFields,
} from '@/lib/form/profile.fields';
import { notifyError } from '@/lib/utils/error';
import { nullToUndefined } from '@/lib/utils/null-to-undefined';
import { FormDataType, schema } from '@/lib/validation/profile.schema';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/ui/form-section';
import ArrayField from '@/components/common/form/array-field';
import ObjectArrayField from '@/components/common/form/object-array-field';
import type { Profile } from '@/types/profile';

interface Props {
  defaultProfile?: Profile;
}

export function ProfileEditForm({ defaultProfile }: Props) {
  const form = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      introduce: defaultProfile?.introduce ?? [],
      experience:
        defaultProfile?.experience?.map((item) => nullToUndefined(item)) ?? [],
      education:
        defaultProfile?.education?.map((item) => nullToUndefined(item)) ?? [],
      history:
        defaultProfile?.history?.map((item) => nullToUndefined(item)) ?? [],
    },
  });
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          async (data: FormDataType) => {
            const result = await updateProfileAction(data);
            if (result.success) {
              toast.success('저장되었습니다.');
            } else {
              toast.error(result.message);
            }
          },
          (error) => notifyError(error),
        )}
      >
        <FormSection title="자기 소개">
          <ArrayField name="introduce" placeholder="자기 소개" />
        </FormSection>
        <FormSection title="경력">
          <ObjectArrayField
            name="experience"
            title="경력"
            fieldList={experienceFields}
          />
        </FormSection>
        <FormSection title="학력">
          <ObjectArrayField
            name="education"
            title="학력"
            fieldList={educationFields}
          />
        </FormSection>
        <FormSection title="이력">
          <ObjectArrayField
            name="history"
            title="이력"
            fieldList={historyFields}
          />
        </FormSection>
        <Button
          className="w-full sticky bottom-4 font-semibold"
          size="lg"
          type="submit"
        >
          저장하기
        </Button>
      </form>
    </FormProvider>
  );
}
