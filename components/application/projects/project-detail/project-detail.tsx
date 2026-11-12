import { useTranslations } from 'next-intl';

import { Section, SectionTitle } from '@/components/ui/section';
import type { Project } from '@/types/project';

import { BulletList } from './bullet-list';
import { Header } from './header';
import { ImagePreviewModal, ImagePreviewProvider } from './image-preview';
import { Images } from './images';
import { Member } from './member';
import { TechStack } from './tech-stack';

interface Props {
  project: Project;
}

export function ProjectDetail({ project }: Props) {
  const t = useTranslations('ProjectDetail');

  return (
    <ImagePreviewProvider>
      <Header {...project} />
      <main className="max-w-4xl mx-auto p-6 space-y-8">
        {project.overview && (
          <Section className="space-y-4">
            <SectionTitle>{t('overview')}</SectionTitle>
            <p className="whitespace-pre-wrap">{project.overview}</p>
          </Section>
        )}
        {project.features && project.features.length !== 0 && (
          <Section className="space-y-4">
            <SectionTitle>{t('features')}</SectionTitle>
            <BulletList items={project.features} />
          </Section>
        )}
        {project.techStacks && project.techStacks.length !== 0 && (
          <Section className="space-y-4">
            <SectionTitle>{t('techStack')}</SectionTitle>
            <TechStack techStacks={project.techStacks} />
          </Section>
        )}
        {project.member && (
          <Section className="space-y-4">
            <SectionTitle>{t('member')}</SectionTitle>
            <Member member={project.member} />
          </Section>
        )}
        {project.goals && project.goals.length !== 0 && (
          <Section className="space-y-4">
            <SectionTitle>{t('goals')}</SectionTitle>
            <BulletList items={project.goals} />
          </Section>
        )}
        {project.results && project.results.length !== 0 && (
          <Section className="space-y-4">
            <SectionTitle>{t('results')}</SectionTitle>
            <BulletList items={project.results} />
          </Section>
        )}
        {project.images && project.images.length !== 0 && (
          <Section className="space-y-4">
            <SectionTitle>{t('images')}</SectionTitle>
            <Images images={project.images} />
          </Section>
        )}
      </main>
      <ImagePreviewModal />
    </ImagePreviewProvider>
  );
}
