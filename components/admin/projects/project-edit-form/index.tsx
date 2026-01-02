'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  createProjectAction,
  updateProjectAction,
} from '@/app/manage/projects/actions';
import { notifyError } from '@/lib/utils/error';
import { createFormData } from '@/lib/utils/form-data';
import { nullToUndefined } from '@/lib/utils/null-to-undefined';
import { type FormDataType, schema } from '@/lib/validation/project.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import ArrayField from '@/components/common/form/array-field';
import Field from '@/components/common/form/field';
import FieldGroup from '@/components/common/form/field-group';
import ImageUploader from '@/components/common/form/image-uploader';
import type { Project } from '@/types/project';

import TechStackField from './tech-stack-field';

interface Props {
  defaultProject?: Project;
}

export default function ProjectEditForm({ defaultProject }: Props) {
  const router = useRouter();

  const form = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: defaultProject?.title || '',
      isPublic: defaultProject?.isPublic ?? true,
      description: defaultProject?.description || '',
      category: defaultProject?.category || '',
      githubUrl: defaultProject?.githubUrl || '',
      applicationUrl: defaultProject?.applicationUrl || '',
      tags: defaultProject?.tags || [],
      overview: defaultProject?.overview || '',
      features: defaultProject?.features ?? [],
      goals: defaultProject?.goals || [],
      results: defaultProject?.results || [],
      member: defaultProject?.member || {
        responsibilities: [],
      },
      techStacks:
        defaultProject?.techStacks.map((item) => nullToUndefined(item)) || [],
      imageFiles: undefined,
      coverImageFile: undefined,
      existedCoverImage: defaultProject?.coverImage
        ? [{ ...defaultProject.coverImage, deleted: false }]
        : [],
      existedImages: defaultProject?.images
        ? defaultProject.images.map((image) => ({ ...image, deleted: false }))
        : [],
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const action = defaultProject?.id ? updateProjectAction : createProjectAction;

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          async (data: FormDataType) => {
            const formData = createFormData(data);

            try {
              const result = await action(formData, defaultProject?.id || '');
              if (!result.success) {
                throw new Error(result.message);
              }
              router.replace('/manage/projects');
              toast.success('저장되었습니다.');
            } catch (error) {
              notifyError(error);
            }
          },
          (error) => notifyError(error),
        )}
      >
        <FieldGroup
          title="프로젝트 기본 정보"
          className="space-y-4"
          headerActions={
            <Field
              label="프로젝트 공개 여부"
              className="flex gap-2 text-muted-foreground"
            >
              <Switch
                checked={watch('isPublic')}
                onCheckedChange={(v) => setValue('isPublic', v)}
              />
            </Field>
          }
        >
          <Field label="프로젝트 제목" required>
            <Input aria-invalid={!!errors.title} {...register('title')} />
          </Field>
          <Field label="프로젝트 간단 설명">
            <Input {...register('description')} />
          </Field>
          <Field label="카테고리">
            <Input {...register('category')} />
          </Field>
          <Field label="커버 이미지">
            <ImageUploader
              name="coverImageFile"
              existName="existedCoverImage"
            />
          </Field>
          <Field label="GitHub Repository 주소">
            <Input {...register('githubUrl')} />
          </Field>
          <Field label="실제 애플리케이션 주소">
            <Input {...register('applicationUrl')} />
          </Field>
          <Field label="기술스택 태그">
            <Input
              placeholder="기술스택 태그 (,로 구분해서 작성)"
              value={watch('tags').join(',')}
              onChange={(e) => setValue('tags', e.target.value.split(','))}
            />
          </Field>
        </FieldGroup>
        <FieldGroup title="프로젝트 개요">
          <Textarea className="resize-none" {...register('overview')} />
        </FieldGroup>
        <FieldGroup title="주요 기능" description="프로젝트의 주요 기능을 작성">
          <ArrayField name="features" />
        </FieldGroup>
        <FieldGroup
          title="기술 스택"
          description="기술 스택은 콤마(,)로 구분해서 작성해주세요."
          className="space-y-4"
        >
          <TechStackField />
        </FieldGroup>
        <FieldGroup title="시연 이미지">
          <ImageUploader name="imageFiles" existName="existedImages" multiple />
        </FieldGroup>
        <FieldGroup title="프로젝트 구성원">
          <Field label="전체 인원" required>
            <Input
              type="number"
              aria-invalid={!!errors.member?.size}
              {...register('member.size', { valueAsNumber: true })}
            />
          </Field>
          <Field label="내가 맡은 역할">
            <Input {...register('member.role')} />
          </Field>
          <Field label="담당 업무">
            <ArrayField name="member.responsibilities" />
          </Field>
        </FieldGroup>
        <FieldGroup title="목표" description="프로젝트의 목표를 작성">
          <ArrayField name="goals" />
        </FieldGroup>
        <FieldGroup title="결과" description="프로젝트의 결과를 작성">
          <ArrayField name="results" />
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
