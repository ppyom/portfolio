'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateProfileAction } from '@/app/manage/profile/actions';
import {
  educationFields,
  experienceFields,
  historyFields,
} from '@/lib/form/profile.fields';
import { notifyError } from '@/lib/utils/error';
import { FormDataType, schema } from '@/lib/validation/profile.schema';
import { Button } from '@/components/ui/button';
import { FormSection } from '@/components/ui/form-section';
import { toast } from '@/components/ui/toast';
import { ObjectArrayField, StringArrayField } from '@/components/form';
import type { Profile } from '@/types/profile';

import {
  createProfileDefaultValues,
  createProfilePayload,
} from './profile-edit-form.utils';

interface Props {
  defaultProfile?: Profile;
}

export function ProfileEditForm({ defaultProfile }: Props) {
  const form = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: createProfileDefaultValues(defaultProfile),
  });
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          async (data: FormDataType) => {
            const payload = createProfilePayload(data);
            const result = await updateProfileAction(payload);

            if (result.success) {
              toast.success('저장되었습니다.');
            } else {
              toast.error(result.message);
            }
          },
          (error) => notifyError(error),
        )}
      >
        <FormSection
          title="자기 소개"
          description="본인을 소개할 수 있는 내용을 작성합니다."
        >
          <StringArrayField name="introduce" textarea />
        </FormSection>
        <FormSection
          title="경력"
          description="근무 경력과 주요 업무 내용을 작성합니다."
        >
          <ObjectArrayField
            name="experience"
            title="경력"
            fieldList={experienceFields}
          />
        </FormSection>
        <FormSection
          title="학력"
          description="학력 및 전공과 관련된 정보를 작성합니다."
        >
          <ObjectArrayField
            name="education"
            title="학력"
            fieldList={educationFields}
          />
        </FormSection>
        <FormSection
          title="이력"
          description="수상, 자격증, 교육, 대외활동 등 주요 이력을 작성합니다."
        >
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
