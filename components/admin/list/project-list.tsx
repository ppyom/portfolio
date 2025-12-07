import Link from 'next/link';
import { projectTable, projectTechStackTable } from '@/database/schema';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SkillTag from '@/components/skill-tag';
import ProjectDropdown from '@/components/admin/list/project-dropdown';

interface Props {
  projects: (typeof projectTable.$inferSelect & {
    techStacks: (typeof projectTechStackTable.$inferSelect)[];
  })[];
}

export default function ProjectList({ projects }: Props) {
  return (
    <ul className="space-y-4">
      {projects.map((project) => (
        <li key={project.id}>
          <Card>
            <CardHeader>
              <Link href={`/projects/${project.id}`}>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </Link>
              <CardAction className="space-x-1">
                <ProjectDropdown projectId={project.id} />
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">마지막 수정 일자</span>
                <span className="font-semibold text-sm">
                  {new Date(
                    project.updatedAt || project.createdAt,
                  ).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">태그</span>
                <div className="inline-flex gap-2 flex-wrap">
                  {project.tags?.slice(0, 5).map((tag) => (
                    <SkillTag
                      key={`skill_tag-${project.id}-${tag}`}
                      name={tag}
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
