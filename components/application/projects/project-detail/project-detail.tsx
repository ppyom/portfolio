import type { Project } from '@/types/project';

import { BulletList } from './bullet-list';
import { ContentBase } from './content-base';
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
      <Header project={project} />
      <div className="space-y-4 py-4">
        {project.overview && (
          <ContentBase title="프로젝트 개요">
            <p className="whitespace-pre-wrap">{project.overview}</p>
          </ContentBase>
        )}
        {project.features && project.features.length !== 0 && (
          <ContentBase title="주요 기능">
            <BulletList name="features" items={project.features} />
          </ContentBase>
        )}
        {project.member && <Member member={project.member} />}
        {project.techStacks && project.techStacks.length !== 0 && (
          <TechStack techStacks={project.techStacks} />
        )}
        {project.goals && project.goals.length !== 0 && (
          <ContentBase title="목표">
            <BulletList name="goals" items={project.goals} />
          </ContentBase>
        )}
        {project.results && project.results.length !== 0 && (
          <ContentBase title="성과">
            <BulletList name="results" items={project.results} />
          </ContentBase>
        )}
        {project.images && project.images.length !== 0 && (
          <ContentBase title="시연 이미지">
            <Images images={project.images} />
          </ContentBase>
        )}
      </div>
      <ImagePreviewModal />
    </ImagePreviewProvider>
  );
}
