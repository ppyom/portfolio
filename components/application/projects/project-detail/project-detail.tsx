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
  return (
    <ImagePreviewProvider>
      <Header {...project} />
      <main className="max-w-4xl mx-auto p-4 space-y-6">
        {project.overview && (
          <Section>
            <SectionTitle>프로젝트 개요</SectionTitle>
            <p className="whitespace-pre-wrap">{project.overview}</p>
          </Section>
        )}
        {project.features && project.features.length !== 0 && (
          <Section>
            <SectionTitle>주요 기능</SectionTitle>
            <BulletList name="features" items={project.features} />
          </Section>
        )}
        {project.member && (
          <Section>
            <SectionTitle>프로젝트 구성원</SectionTitle>
            <Member member={project.member} />
          </Section>
        )}
        {project.techStacks && project.techStacks.length !== 0 && (
          <Section>
            <SectionTitle>사용 기술</SectionTitle>
            <TechStack techStacks={project.techStacks} />
          </Section>
        )}
        {project.goals && project.goals.length !== 0 && (
          <Section>
            <SectionTitle>목표</SectionTitle>
            <BulletList name="goals" items={project.goals} />
          </Section>
        )}
        {project.results && project.results.length !== 0 && (
          <Section>
            <SectionTitle>성과</SectionTitle>
            <BulletList name="results" items={project.results} />
          </Section>
        )}
        {project.images && project.images.length !== 0 && (
          <Section>
            <SectionTitle>시연 이미지</SectionTitle>
            <Images images={project.images} />
          </Section>
        )}
      </main>
      <ImagePreviewModal />
    </ImagePreviewProvider>
  );
}
