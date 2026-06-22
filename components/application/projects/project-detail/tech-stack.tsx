import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types/project';

interface Props {
  techStacks: NonNullable<Project['techStacks']>;
}

export function TechStack({ techStacks }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {techStacks.map((techStack) => (
        <div
          key={techStack.id}
          className="bg-surface-secondary rounded-md border p-4"
        >
          <p className="font-semibold text-text-primary mb-3">
            {techStack.title}
          </p>
          <div className="flex flex-wrap gap-2">
            {techStack.stacks?.map((stack) => (
              <Badge key={`${techStack.id}-${stack}`} variant="muted">
                {stack}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
