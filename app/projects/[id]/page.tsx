import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/constants/projects';
import { Button } from '@/components/ui/button';
import PageTitle from '@/components/page-title';
import BackButton from '@/components/back-button';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        <BackButton className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group mb-8">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </BackButton>
        <div className="space-y-6 animate-in fade-in slide-up duration-500">
          <div className="flex justify-between">
            <PageTitle align="left">{project.title}</PageTitle>
            <div>
              <Button className="font-bold" size="lg" asChild>
                <a href="#" target="_blank">
                  GitHub
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>
          <Image
            className="w-full h-full object-cover"
            src={project.image}
            alt={project.title}
            width={500}
            height={500}
          />
        </div>
        <div>{project.body}</div>
      </div>
    </main>
  );
}
