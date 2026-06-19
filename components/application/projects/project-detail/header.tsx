'use client';

import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/application/layout';
import type { Project } from '@/types/project';

interface Props {
  title: Project['title'];
  description: Project['description'];
  githubUrl: Project['githubUrl'];
  applicationUrl: Project['applicationUrl'];
  coverImage: Project['coverImage'];
}

export function Header({
  title,
  description,
  githubUrl,
  applicationUrl,
  coverImage,
}: Props) {
  return (
    <header
      className={cn(
        'relative bg-cover bg-center',
        !coverImage?.url && 'bg-surface-secondary',
      )}
      style={{
        backgroundImage: coverImage?.url
          ? `url(${coverImage?.url})`
          : undefined,
      }}
    >
      {coverImage?.url && (
        <div className="absolute inset-0 bg-linear-to-b to-black/70 from-black/50" />
      )}
      <div className="relative max-w-4xl mx-auto p-6 pt-14 space-y-6 sm:pt-32">
        <div className="flex flex-col gap-2 sm:flex-row justify-between items-end">
          <PageHeader
            className="mb-0"
            title={title}
            description={description || undefined}
          />
          {(githubUrl || applicationUrl) && (
            <div className="flex flex-wrap gap-2">
              {githubUrl && (
                <Button variant="secondary">
                  <a
                    className="flex gap-2 items-center"
                    href={githubUrl}
                    target="_blank"
                  >
                    GitHub
                    <ArrowUpRight size={14} />
                  </a>
                </Button>
              )}
              {applicationUrl && (
                <Button variant="secondary">
                  <a
                    className="flex gap-2 items-center"
                    href={applicationUrl}
                    target="_blank"
                  >
                    View Site
                    <ArrowUpRight size={14} />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
