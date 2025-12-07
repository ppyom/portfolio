'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Project } from '@/types/project';

interface Props {
  defaultProject?: Project;
}

export default function ProjectEditForm({ defaultProject }: Props) {
  const [project, setProject] = useState<Partial<Project>>(
    defaultProject || { coverImageUrl: undefined, images: [] },
  );

  const handleChange = (key: keyof Project, value: Project[keyof Project]) => {
    setProject((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(project);

    fetch(`http://localhost:3000/api/projects/${defaultProject?.id || ''}`, {
      method: defaultProject?.id ? 'PATCH' : 'POST',
      body: JSON.stringify({
        ...project,
        coverImageUrl: undefined,
        images: [],
      }),
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>프로젝트 기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="프로젝트 제목"
            value={project.title || ''}
            onChange={({ target }) => handleChange('title', target.value)}
          />
          <Input
            placeholder="프로젝트 간단 설명"
            value={project.description || ''}
            onChange={({ target }) => handleChange('description', target.value)}
          />
          <Input
            placeholder="카테고리 (ex. WebApplication, ...)"
            value={project.category || ''}
            onChange={({ target }) => handleChange('category', target.value)}
          />
          {/* TODO File Input 분리!! (one, many) */}
          <Input type="file" accept="image/*" />
          {/* ---- */}
          <Input
            placeholder="GitHub Repository 주소"
            value={project.githubUrl || ''}
            onChange={({ target }) => handleChange('githubUrl', target.value)}
          />
          <Input
            placeholder="실제 애플리케이션 주소"
            value={project.applicationUrl || ''}
            onChange={({ target }) =>
              handleChange('applicationUrl', target.value)
            }
          />
          <Input
            placeholder="기술스택 태그 (,로 구분해서 작성)"
            value={project.tags?.join(',') || ''}
            onChange={({ target }) =>
              handleChange('tags', target.value.split(','))
            }
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>프로젝트 개요</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="resize-none"
            placeholder="프로젝트 개요를 작성해주세요."
            value={project.overview || ''}
            onChange={({ target }) => handleChange('overview', target.value)}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>주요 기능</CardTitle>
          <CardDescription>줄바꿈으로 구분해서 작성해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="resize-none"
            placeholder="주요 기능"
            value={project.features?.join('\n') || ''}
            onChange={({ target }) =>
              handleChange('features', target.value.split('\n'))
            }
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>기술 스택</CardTitle>
          <CardDescription>
            기술은 콤마(,)로 구분해서 작성해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {project.techStacks?.map((techStack, idx) => (
            <div key={`techStack_${techStack.id || idx}`}>
              {/* TODO TechStack 분리!! (그룹으로, 배열) */}
              <Input
                placeholder="유형"
                value={project.techStacks?.[idx].title || ''}
                onChange={({ target }) =>
                  handleChange(
                    'techStacks',
                    project.techStacks?.map((stack, i) =>
                      idx === i ? { ...stack, title: target.value } : stack,
                    ) || [],
                  )
                }
              />
              <Input
                placeholder="기술스택(,로 구분)"
                value={project.techStacks?.[idx].stacks?.join(',') || ''}
                onChange={({ target }) =>
                  handleChange(
                    'techStacks',
                    project.techStacks?.map((stack, i) =>
                      idx === i
                        ? { ...stack, stacks: target.value.split(',') }
                        : stack,
                    ) || [],
                  )
                }
              />
            </div>
          ))}
          <Button>추가</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>시연 이미지</CardTitle>
        </CardHeader>
        <CardContent>
          {/* TODO File Input 분리!! (one, many) */}
          <Input type="file" accept="image/*" multiple />
          {/* ---- */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>프로젝트 구성원</CardTitle>
          <CardDescription>
            담당 업무는 줄바꿈으로 구분해서 작성해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="number"
            placeholder="전체 인원"
            min={1}
            value={project.member?.size || 1}
            onChange={({ target }) =>
              handleChange('member', {
                size: Number(target.value),
                role: project.member?.role || '',
                responsibilities: project.member?.responsibilities || [],
              })
            }
          />
          <Input
            placeholder="내가 맡은 역할"
            value={project.member?.role || ''}
            onChange={({ target }) =>
              handleChange('member', {
                size: project.member?.size || 1,
                role: target.value,
                responsibilities: project.member?.responsibilities || [],
              })
            }
          />
          <Textarea
            className="resize-none"
            placeholder="담당 업무"
            value={project.member?.responsibilities.join('\n') || ''}
            onChange={({ target }) =>
              handleChange('member', {
                size: project.member?.size || 1,
                role: project.member?.role || '',
                responsibilities: target.value.split('\n') || [],
              })
            }
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>목표</CardTitle>
          <CardDescription>줄바꿈으로 구분해서 작성해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="resize-none"
            placeholder="목표"
            value={project.goals?.join('\n') || ''}
            onChange={({ target }) =>
              handleChange('goals', target.value.split('\n'))
            }
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>결과</CardTitle>
          <CardDescription>줄바꿈으로 구분해서 작성해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="resize-none"
            placeholder="결과"
            value={project.results?.join('\n') || ''}
            onChange={({ target }) =>
              handleChange('results', target.value.split('\n'))
            }
          />
        </CardContent>
      </Card>
      <Button type="submit">저장하기</Button>
    </form>
  );
}
