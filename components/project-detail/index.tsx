import type { Project } from '@/types/project';
import ProjectHeader from './header';
import ProjectContentBase from './content-base';
import ListContent from './list-content';
import MemberContent from './member-content';
import TechStacksContent from './tech-stacks-content';

interface Props {
  project: Project;
}

export default function ProjectContents({ project }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <ProjectHeader project={project} />
      <div className="space-y-4 py-4">
        {project.overview && (
          <ProjectContentBase title="프로젝트 개요">
            <p className="whitespace-pre-wrap">{project.overview}</p>
          </ProjectContentBase>
        )}
        {project.features && project.features.length !== 0 && (
          <ProjectContentBase title="주요 기능">
            <ListContent key="features" items={project.features} />
          </ProjectContentBase>
        )}
        {project.member && <MemberContent member={project.member} />}
        {project.techStacks && project.techStacks.length !== 0 && (
          <TechStacksContent techStacks={project.techStacks} />
        )}
        {project.goals && project.goals.length !== 0 && (
          <ProjectContentBase title="목표">
            <ListContent key="goals" items={project.goals} />
          </ProjectContentBase>
        )}
        {project.results && project.results.length !== 0 && (
          <ProjectContentBase title="성과">
            <ListContent key="results" items={project.results} />
          </ProjectContentBase>
        )}
        {project.images && project.images.length !== 0 && (
          <ProjectContentBase title="시연 이미지">
            {project.images.map((image, idx) => (
              <img
                key={image.id}
                src={image.url}
                alt={`${project.title} ${idx}`}
              />
            ))}
          </ProjectContentBase>
        )}
      </div>
    </div>
  );
}
