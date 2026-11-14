'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { saveProjectTranslationAction } from '@/app/manage/projects/actions';
import { notifyError } from '@/lib/utils/error';
import {
  type FormDataType,
  schema,
} from '@/lib/validation/project-translation.schema';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { FormSection } from '@/components/ui/form-section';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { StringArrayField } from '@/components/form';
import type { Locale } from '@/i18n/routing';
import type { Project, ProjectTranslation } from '@/types/project';

import { OriginalText } from './original-text';
import {
  createProjectTranslationDefaultValues,
  createProjectTranslationPayload,
} from './project-translation-form.utils';

interface Props {
  project: Project;
  language: Locale;
  defaultTranslation: ProjectTranslation | null;
}

export function ProjectTranslationForm({
  project,
  language,
  defaultTranslation,
}: Props) {
  const router = useRouter();

  const form = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: createProjectTranslationDefaultValues(defaultTranslation),
  });
  const { register, handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          async (data: FormDataType) => {
            const result = await saveProjectTranslationAction(
              project.id,
              language,
              createProjectTranslationPayload(data),
            );
            if (result.success) {
              router.refresh();
              toast.success('저장되었습니다.');
            } else {
              toast.error(result.message);
            }
          },
          (error) => notifyError(error),
        )}
      >
        <p className="rounded-md bg-surface-secondary px-4 py-3 text-sm text-text-secondary">
          번역할 텍스트만 입력합니다. 비워둔 항목은 한국어 내용이 그대로
          표시됩니다. 이미지·링크·태그·공개 여부는 한국어 탭에서 수정합니다.
        </p>
        <FormSection
          title="프로젝트 기본 정보"
          description="프로젝트를 소개하는 기본 정보를 번역합니다."
        >
          <div className="space-y-4">
            <Field>
              <Label htmlFor="title">프로젝트 제목</Label>
              <Input
                id="title"
                placeholder={project.title}
                {...register('title')}
              />
            </Field>
            <Field>
              <Label htmlFor="description">프로젝트 간단 설명</Label>
              <Input
                id="description"
                placeholder={project.description ?? ''}
                {...register('description')}
              />
            </Field>
            <Field>
              <Label htmlFor="category">카테고리</Label>
              <Input
                id="category"
                placeholder={project.category ?? ''}
                {...register('category')}
              />
            </Field>
          </div>
        </FormSection>
        <FormSection
          title="프로젝트 개요"
          description="프로젝트의 목적과 전반적인 내용을 번역합니다."
        >
          <Textarea
            className="w-full"
            placeholder={project.overview ?? ''}
            {...register('overview')}
          />
        </FormSection>
        <FormSection
          className="space-y-4"
          title="주요 기능"
          description="프로젝트에서 제공하는 주요 기능을 번역합니다."
        >
          <OriginalText values={project.features} />
          <StringArrayField name="features" />
        </FormSection>
        <FormSection
          className="space-y-4"
          title="프로젝트 구성원"
          description="담당 역할 및 업무를 번역합니다. 전체 인원은 한국어 탭의 값을 사용합니다."
        >
          <Field>
            <Label htmlFor="member-role">내가 맡은 역할</Label>
            <Input
              id="member-role"
              placeholder={project.member?.role ?? ''}
              {...register('member.role')}
            />
          </Field>
          <Field>
            <Label>담당 업무</Label>
            <OriginalText values={project.member?.responsibilities} />
            <StringArrayField name="member.responsibilities" />
          </Field>
        </FormSection>
        <FormSection
          className="space-y-4"
          title="목표"
          description="프로젝트를 진행하며 달성하고자 했던 목표를 번역합니다."
        >
          <OriginalText values={project.goals} />
          <StringArrayField name="goals" />
        </FormSection>
        <FormSection
          className="space-y-4"
          title="결과"
          description="프로젝트 진행 후 얻은 성과와 결과를 번역합니다."
        >
          <OriginalText values={project.results} />
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
