'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateProfileAction } from '@/app/manage/profile/actions';
import { Button } from '@/components/ui/button';
import ArrayField from '@/components/common/form/array-field';
import FieldGroup from '@/components/common/form/field-group';
import ObjectArrayField from '@/components/common/form/object-array-field';
import { extractErrorMessage } from '@/lib/utils/extract-error-message';
import { nullToUndefined } from '@/lib/utils/null-to-undefined';
import { profileSchema } from '@/lib/validation/profile.schema';

import type { Profile } from '@/types/profile';

interface Props {
  defaultProfile?: Profile;
}

export type FormDataType = z.infer<typeof profileSchema>;

export default function ProfileEditForm({ defaultProfile }: Props) {
  const form = useForm<FormDataType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      introduce: defaultProfile?.introduce ?? [],
      experience:
        defaultProfile?.experience.map((item) => nullToUndefined(item)) ?? [],
      education:
        defaultProfile?.education.map((item) => nullToUndefined(item)) ?? [],
    },
  });
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          (data: FormDataType) => {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
              if (value != null) {
                formData.append(key, JSON.stringify(value));
              }
            });

            updateProfileAction(data)
              .then((result) => {
                if (!result.success) {
                  throw new Error(result.message);
                }
                toast.success('저장되었습니다.');
              })
              .catch((error) => {
                toast.error(
                  error instanceof Error
                    ? error.message
                    : '알 수 없는 오류가 발생했습니다.',
                );
              });
          },
          (error) => {
            toast.error(extractErrorMessage(error));
          },
        )}
      >
        <FieldGroup title="자기 소개">
          <ArrayField name="introduce" placeholder="자기 소개" textarea />
        </FieldGroup>
        <FieldGroup title="경력">
          <ObjectArrayField
            name="experience"
            title="경력"
            fieldList={[
              {
                name: 'name',
                label: '회사 이름',
                placeholder: '회사 이름',
              },
              { name: 'position', label: '직무', placeholder: '직무' },
              {
                name: 'startDate',
                label: '입사일',
                placeholder: '입사일',
                colSpan: 'half',
              },
              {
                name: 'endDate',
                label: '퇴사일',
                placeholder: '퇴사일',
                colSpan: 'half',
              },
              {
                name: 'description',
                label: '주요 성과',
                placeholder: '해당 회사에서 이룬 성과를 간단하게 작성',
              },
            ]}
          />
        </FieldGroup>
        <FieldGroup title="학력">
          <ObjectArrayField
            name="education"
            title="학력"
            fieldList={[
              { name: 'name', label: '학교 이름', placeholder: '학교 이름' },
              { name: 'major', label: '전공', placeholder: '전공' },
              {
                name: 'startDate',
                label: '입학일',
                placeholder: '입학일',
                colSpan: 'half',
              },
              {
                name: 'endDate',
                label: '졸업일',
                placeholder: '졸업일',
                colSpan: 'half',
              },
            ]}
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
