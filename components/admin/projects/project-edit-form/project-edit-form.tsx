'use client';

import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';

import {
  createProjectAction,
  updateProjectAction,
} from '@/app/manage/projects/actions';
import { notifyError } from '@/lib/utils/error';
import { createFormData } from '@/lib/utils/form-data';
import { type FormDataType, schema } from '@/lib/validation/project.schema';
import { Button } from '@/components/ui/button';
import { Description } from '@/components/ui/description';
import { Field } from '@/components/ui/field';
import { FormSection } from '@/components/ui/form-section';
import {
  ImageUpload,
  ImageUploadPreview,
  ImageUploadTrigger,
} from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { StringArrayField } from '@/components/form';
import type { Project } from '@/types/project';

import { ImageUploadController } from './image-upload-controller';
import {
  createProjectDefaultValues,
  createProjectPayload,
} from './project-edit-form.utils';
import { TechStackField } from './tech-stack-field';

interface Props {
  defaultProject?: Project;
}

export function ProjectEditForm({ defaultProject }: Props) {
  const router = useRouter();

  const form = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: createProjectDefaultValues(defaultProject),
  });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = form;
  const isPublic = useWatch({
    control,
    name: 'isPublic',
  });

  const action = defaultProject?.id ? updateProjectAction : createProjectAction;

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          async (data: FormDataType) => {
            const payload = createProjectPayload(data);
            const formData = createFormData(payload);

            const result = await action(formData, defaultProject?.id || '');
            if (result.success) {
              router.replace('/manage/projects');
              toast.success('저장되었습니다.');
            } else {
              toast.error(result.message);
            }
          },
          (error) => notifyError(error),
        )}
      >
        <FormSection
          className="relative"
          title="프로젝트 기본 정보"
          description="프로젝트를 소개하는 기본 정보를 작성합니다."
        >
          <Field className="absolute top-6 right-6 flex-row items-center">
            <Label htmlFor="isPublic">프로젝트 공개 여부</Label>
            <Switch
              id="isPublic"
              checked={isPublic}
              onChange={({ target }) => setValue('isPublic', target.checked)}
            />
          </Field>
          <div className="space-y-4">
            <Field required>
              <Label htmlFor="title" required>
                프로젝트 제목
              </Label>
              <Input id="title" {...register('title')} />
            </Field>
            <Field>
              <Label htmlFor="description">프로젝트 간단 설명</Label>
              <Input id="description" {...register('description')} />
            </Field>
            <Field>
              <Label htmlFor="category">카테고리</Label>
              <Input id="category" {...register('category')} />
            </Field>
            <Field>
              <Label htmlFor="coverImage">커버 이미지</Label>
              <ImageUpload id="coverImage">
                <ImageUploadController name="coverImage" />
                <div className="space-y-2">
                  <ImageUploadTrigger>
                    <Button type="button" className="gap-2">
                      <PlusIcon size={14} />
                      이미지 선택
                    </Button>
                  </ImageUploadTrigger>
                  <ImageUploadPreview />
                </div>
              </ImageUpload>
            </Field>
            <Field>
              <Label htmlFor="githubUrl">Github Repository 주소</Label>
              <Input id="githubUrl" {...register('githubUrl')} />
            </Field>
            <Field>
              <Label htmlFor="applicationUrl">실제 애플리케이션 주소</Label>
              <Input id="applicationUrl" {...register('applicationUrl')} />
            </Field>
            <Field>
              <Label>기술스택 태그</Label>
              <Description>콤마(,)로 구분해서 작성해주세요.</Description>
              <Controller
                control={control}
                name="tags"
                render={({ field }) => (
                  <Input
                    value={field.value.join(',')}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .split(',')
                          .map((item) => item.trim())
                          .filter(Boolean),
                      )
                    }
                  />
                )}
              />
            </Field>
          </div>
        </FormSection>
        <FormSection
          title="프로젝트 개요"
          description="프로젝트의 목적과 전반적인 내용을 작성합니다."
        >
          <Textarea className="w-full" {...register('overview')} />
        </FormSection>
        <FormSection
          title="주요 기능"
          description="프로젝트에서 제공하는 주요 기능을 작성합니다."
        >
          <StringArrayField name="features" />
        </FormSection>
        <FormSection
          className="space-y-4 pb-4"
          title="기술 스택"
          description="프로젝트에 사용된 기술과 도구를 작성합니다."
        >
          <TechStackField />
        </FormSection>
        <FormSection
          title="시연 이미지"
          description="프로젝트의 주요 화면이나 기능을 확인할 수 있는 이미지를 등록합니다."
        >
          <ImageUpload id="images" multiple>
            <ImageUploadController name="images" />
            <div className="space-y-4">
              <ImageUploadTrigger>
                <Button type="button" className="gap-2">
                  <PlusIcon size={14} />
                  이미지 추가
                </Button>
              </ImageUploadTrigger>
              <ImageUploadPreview />
            </div>
          </ImageUpload>
        </FormSection>
        <FormSection
          title="프로젝트 구성원"
          description="프로젝트 규모와 담당 역할 및 업무를 작성합니다."
        >
          <div className="space-y-4">
            <Field required>
              <Label required>전체 인원</Label>
              <Input
                type="number"
                aria-invalid={!!errors.member?.size}
                {...register('member.size', { valueAsNumber: true })}
              />
            </Field>
            <Field>
              <Label>내가 맡은 역할</Label>
              <Input {...register('member.role')} />
            </Field>
            <Field>
              <Label>담당 업무</Label>
              <StringArrayField name="member.responsibilities" />
            </Field>
          </div>
        </FormSection>
        <FormSection
          title="목표"
          description="프로젝트를 진행하며 달성하고자 했던 목표를 작성합니다."
        >
          <StringArrayField name="goals" />
        </FormSection>
        <FormSection
          title="결과"
          description="프로젝트 진행 후 얻은 성과와 결과를 작성합니다."
        >
          <StringArrayField name="results" />
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
