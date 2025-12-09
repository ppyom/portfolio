'use client';

import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { projectSchema } from '@/lib/validation/project.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Project } from '@/types/project';
import TechStackField from './project-edit-form/tech-stack-field';
import ArrayField from './project-edit-form/array-field';
import FieldGroup from './project-edit-form/field-group';

interface Props {
  defaultProject?: Project;
}

const formSchema = projectSchema.and(
  z.object({
    coverImageFile: z.file().optional(),
    imagesFile: z.file().optional(),
  }),
);
export type FormData = z.infer<typeof formSchema>;

export default function ProjectEditForm({ defaultProject }: Props) {
  const router = useRouter();

  const form = useForm<FormData>({
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
        defaultProject?.techStacks.map((ts) => ({
          title: ts.title ?? undefined,
          stacks: ts.stacks ?? undefined,
        })) || [],
      imagesFile: undefined,
      coverImageFile: undefined,
    },
  });
  const { register, handleSubmit, watch, setValue } = form;

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          (data: FormData) => {
            console.log(data);

            fetch(
              `http://localhost:3000/api/projects/${defaultProject?.id || ''}`,
              {
                method: defaultProject?.id ? 'PATCH' : 'POST',
                body: JSON.stringify({
                  ...data,
                }),
              },
            )
              .then((res) => {
                if (!res.ok) {
                  console.error(res.statusText);
                  throw new Error('업로드 중 오류가 발생했습니다.');
                }
                return res.json();
              })
              .then(() => {
                router.replace('/manage/projects');
                // 저장되었습니다
              })
              .catch(console.error);
          },
          (error) => {
            console.error(error);
          },
        )}
      >
        <FieldGroup title="프로젝트 기본 정보">
          <Input placeholder="프로젝트 제목" {...register('title')} />
          <Input
            placeholder="프로젝트 간단 설명"
            {...register('description')}
          />
          <Input
            placeholder="카테고리 (ex. WebApplication, ...)"
            {...register('category')}
          />
          {/* TODO File Input 분리!! (one, many) */}
          <Input type="file" accept="image/*" {...register('coverImageFile')} />
          {/* ---- */}
          <Input
            placeholder="GitHub Repository 주소"
            {...register('githubUrl')}
          />
          <Input
            placeholder="실제 애플리케이션 주소"
            {...register('applicationUrl')}
          />
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
          {/* TODO File Input 분리!! (one, many) */}
          <Input type="file" accept="image/*" multiple />
          {/* ---- */}
        </FieldGroup>
        <FieldGroup title="프로젝트 구성원">
          <Input
            type="number"
            placeholder="전체 인원"
            min={1}
            {...register('member.size', { valueAsNumber: true })}
          />
          <Input placeholder="내가 맡은 역할" {...register('member.role')} />
          <ArrayField name="member.responsibilities" placeholder="담당 업무" />
        </FieldGroup>
        <FieldGroup title="목표" description="프로젝트의 목표를 작성">
          <ArrayField name="goals" placeholder="목표" />
        </FieldGroup>
        <FieldGroup title="결과" description="프로젝트의 결과를 작성">
          <ArrayField name="results" placeholder="결과" />
        </FieldGroup>
        <Button type="submit">저장하기</Button>
      </form>
    </FormProvider>
  );
}
