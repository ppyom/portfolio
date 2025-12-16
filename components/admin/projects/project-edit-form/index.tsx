'use client';

import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ArrayField from '@/components/form/array-field';
import FieldGroup from '@/components/form/field-group';
import ImageUploader from '@/components/form/image-uploader';
import { projectSchema } from '@/lib/validation/project.schema';
import type { Project } from '@/types/project';
import TechStackField from './tech-stack-field';
import {
  createProjectAction,
  updateProjectAction,
} from '@/app/manage/projects/actions';
import { extractErrorMessage } from '@/lib/utils/extract-error-message';
import { nullToUndefined } from '@/lib/utils/null-to-undefined';

interface Props {
  defaultProject?: Project;
}

const formSchema = projectSchema.and(
  z.object({
    coverImageFile: z
      .instanceof(File) // File 객체인지 확인
      .optional(),
    imageFiles: z.array(z.instanceof(File)).optional(),
    existedCoverImage: z.array(
      z.object({
        id: z.string(),
        url: z.string(),
        deleted: z.boolean(),
      }),
    ),
    existedImages: z.array(
      z.object({ id: z.string(), url: z.string(), deleted: z.boolean() }),
    ),
  }),
);
export type FormDataType = z.infer<typeof formSchema>;

export default function ProjectEditForm({ defaultProject }: Props) {
  const router = useRouter();

  const form = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: defaultProject?.title || '',
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
          (data: FormDataType) => {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
              if (Array.isArray(value) && value[0] instanceof File) {
                if (value != null) {
                  (value as File[]).forEach((v) => formData.append(key, v));
                }
              } else if (value instanceof File || typeof value === 'string') {
                formData.append(key, value);
              } else {
                if (value != null) {
                  formData.append(key, JSON.stringify(value));
                }
              }
            });

            action(formData, defaultProject?.id || '')
              .then((result) => {
                if (!result.success) {
                  throw new Error(result.message);
                }
                router.replace('/manage/projects');
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
        <FieldGroup
          title="프로젝트 기본 정보"
          className="space-y-4 grid sm:grid-cols-[120px_1fr] gap-x-4"
        >
          <Label>프로젝트 제목</Label>
          <Input
            placeholder="프로젝트 제목"
            aria-invalid={!!errors.title}
            {...register('title')}
          />
          <Label>프로젝트 간단 설명</Label>
          <Input
            placeholder="프로젝트 간단 설명"
            {...register('description')}
          />
          <Label>카테고리</Label>
          <Input
            placeholder="카테고리 (ex. WebApplication, ...)"
            {...register('category')}
          />
          <Label>커버 이미지</Label>
          <ImageUploader name="coverImageFile" existName="existedCoverImage" />
          <Label>GitHub Repository 주소</Label>
          <Input
            placeholder="GitHub Repository 주소"
            {...register('githubUrl')}
          />
          <Label>실제 애플리케이션 주소</Label>
          <Input
            placeholder="실제 애플리케이션 주소"
            {...register('applicationUrl')}
          />
          <Label>기술스택 태그</Label>
          <Input
            placeholder="기술스택 태그 (,로 구분해서 작성)"
            value={watch('tags').join(',')}
            onChange={(e) => setValue('tags', e.target.value.split(','))}
          />
        </FieldGroup>
        <FieldGroup title="프로젝트 개요">
          <Textarea
            className="resize-none"
            placeholder="프로젝트 개요를 작성해주세요."
            {...register('overview')}
          />
        </FieldGroup>
        <FieldGroup title="주요 기능" description="프로젝트의 주요 기능을 작성">
          <ArrayField name="features" placeholder="주요 기능" />
        </FieldGroup>
        <FieldGroup
          title="기술 스택"
          description="기술 스택은 콤마(,)로 구분해서 작성해주세요."
        >
          <TechStackField />
        </FieldGroup>
        <FieldGroup title="시연 이미지">
          <ImageUploader name="imageFiles" existName="existedImages" multiple />
        </FieldGroup>
        <FieldGroup title="프로젝트 구성원">
          <Label>전체 인원</Label>
          <Input
            type="number"
            placeholder="전체 인원"
            min={1}
            aria-invalid={!!errors.member?.size}
            {...register('member.size', { valueAsNumber: true })}
          />
          <Label>내가 맡은 역할</Label>
          <Input placeholder="내가 맡은 역할" {...register('member.role')} />
          <Label>담당 업무</Label>
          <ArrayField name="member.responsibilities" placeholder="담당 업무" />
        </FieldGroup>
        <FieldGroup title="목표" description="프로젝트의 목표를 작성">
          <ArrayField name="goals" placeholder="목표" />
        </FieldGroup>
        <FieldGroup title="결과" description="프로젝트의 결과를 작성">
          <ArrayField name="results" placeholder="결과" />
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
