import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { fullDateString } from '@/lib/utils/date';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SkillTag from '@/components/common/skill-tag';
import type { Project } from '@/types/project';

import ProjectDropdown from './project-dropdown';
import ProjectVisibilityToggle from './project-visibility-toggle';

interface Props {
  projects: Project[];
}

export default function ProjectList({ projects }: Props) {
  return (
    <ul className="space-y-4">
      {projects.map((project) => (
        <li key={project.id}>
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2 items-center">
                {project.title}
                {project.isPublic && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground"
                    asChild
                  >
                    <Link
                      href={`/projects/${project.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="hidden sm:inline">프로젝트 보기</span>
                      <ArrowUpRightIcon className="size-3" />
                    </Link>
                  </Button>
                )}
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
              <CardAction className="space-x-1">
                <ProjectVisibilityToggle
                  projectId={project.id}
                  isPublic={!!project.isPublic}
                />
                <ProjectDropdown projectId={project.id} />
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">마지막 수정 일자</span>
                <span className="font-semibold text-sm">
                  {fullDateString(project.updatedAt || project.createdAt)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">태그</span>
                <div className="inline-flex gap-2 flex-wrap">
                  {project.tags?.slice(0, 5).map((tag) => (
                    <SkillTag
                      key={`skill_tag-${project.id}-${tag}`}
                      name={tag}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
