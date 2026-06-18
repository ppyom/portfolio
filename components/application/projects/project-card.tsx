import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { SkillTag } from '@/components/application/skills/skill-tag';
import type { Project } from '@/types/project';

type Props = Project;

export function ProjectCard({
  id,
  category,
  coverImage: image,
  title,
  description,
  tags,
}: Props) {
  return (
    <Link href={`/projects/${id}`} scroll={false} className="block">
      <div className="group bg-surface-secondary rounded-md overflow-hidden border">
        <div className="relative overflow-hidden h-48 bg-text-muted">
          <Image
            src={image?.url || '/images/no_image.png'}
            alt={title}
            className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={500}
            height={500}
            loading="eager"
          />
          {category && (
            <Badge className="absolute top-4 left-4" variant="secondary">
              {category}
            </Badge>
          )}
        </div>
        <div className="p-6">
          <p className="text-lg font-bold text-text-primary line-clamp-1">
            {title}
          </p>
          <p className="text-text-secondary leading-relaxed line-clamp-2">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {tags?.map((tag) => (
              <SkillTag key={tag} name={tag} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
