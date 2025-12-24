import { Suspense } from 'react';

import PageTitle from '@/components/common/page-title';

import ProjectCardSkeleton from '@/components/application/projects/project-card.skeleton';
import ProjectList from '@/components/application/projects/project-list';

export default async function Page() {
  return (
    <section id="projects" className="py-20 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>Projects</PageTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <Suspense
            fallback={
              <>
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
                <ProjectCardSkeleton />
              </>
            }
          >
            <ProjectList />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
