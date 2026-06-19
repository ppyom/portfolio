import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui-legacy/card';
import Tag from '@/components/legacy/tag';
import type { Project } from '@/types/project';

interface Props {
  techStacks: NonNullable<Project['techStacks']>;
}

export function TechStack({ techStacks }: Props) {
  return (
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
  );
}
