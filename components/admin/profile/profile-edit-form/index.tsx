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
import ArrayField from '@/components/common/form/array-field';
import FieldGroup from '@/components/common/form/field-group';
import ObjectArrayField from '@/components/common/form/object-array-field';
import type { Profile } from '@/types/profile';

interface Props {
  defaultProfile?: Profile;
}

export default function ProfileEditForm({ defaultProfile }: Props) {
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
        <FieldGroup title="자기 소개">
          <ArrayField name="introduce" placeholder="자기 소개" textarea />
        </FieldGroup>
        <FieldGroup title="경력">
          <ObjectArrayField
            name="experience"
            title="경력"
            fieldList={experienceFields}
          />
        </FieldGroup>
        <FieldGroup title="학력">
          <ObjectArrayField
            name="education"
            title="학력"
            fieldList={educationFields}
          />
        </FieldGroup>
        <FieldGroup title="이력">
          <ObjectArrayField
            name="history"
            title="이력"
            fieldList={historyFields}
          />
        </FieldGroup>
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
