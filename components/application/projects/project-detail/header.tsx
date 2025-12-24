import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import BackButton from '@/components/common/back-button';
import PageTitle from '@/components/common/page-title';
import type { Project } from '@/types/project';

interface Props {
  project: Project;
}

export default function ProjectHeader({ project }: Props) {
  return (
    <header>
      <BackButton className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group mb-8">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </BackButton>
      <div className="space-y-6 animate-in fade-in slide-up duration-500">
        <div className="flex flex-col gap-2 sm:flex-row justify-between">
          <PageTitle align="left">{project.title}</PageTitle>
          {(project.githubUrl || project.applicationUrl) && (
            <div className="space-x-1">
              {project.githubUrl && (
                <Button className="font-bold" size="lg" asChild>
                  <a href={project.githubUrl} target="_blank">
                    GitHub
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
              {project.applicationUrl && (
                <Button className="font-bold" size="lg" asChild>
                  <a href={project.applicationUrl} target="_blank">
                    View Site
                    <ArrowUpRight />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
        {project.coverImage && (
          <Image
            className="w-full h-full object-cover"
            src={project.coverImage.url}
            alt={project.title}
            width={1080}
            height={567}
            loading="eager"
          />
        )}
      </div>
    </header>
  );
}
