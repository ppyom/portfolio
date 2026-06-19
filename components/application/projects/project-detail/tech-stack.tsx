import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui-legacy/card';
import Tag from '@/components/legacy/tag';
import type { Project } from '@/types/project';

import { ContentBase } from './content-base';

interface Props {
  techStacks: NonNullable<Project['techStacks']>;
}

export function TechStack({ techStacks }: Props) {
  return (
    <ContentBase title="사용 기술">
      <div className="grid sm:grid-cols-2 gap-2">
        {techStacks.map((techStack) => (
          <Card key={techStack.id}>
            <CardHeader>
              <CardTitle>{techStack.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-1 flex-wrap">
              {techStack.stacks?.map((stack) => (
                <Tag key={`${techStack.id}_${stack}`} name={stack} size="sm" />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </ContentBase>
  );
}
