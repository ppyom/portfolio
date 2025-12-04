import { Suspense } from 'react';
import PageTitle from '@/components/page-title';
import ProjectList from '@/components/project-list';
import ProjectCardSkeleton from '@/components/project-card.skeleton';

export default async function Page() {
  return (
    <section id="Projects" className="py-20 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto space-y-12 slide-up">
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
