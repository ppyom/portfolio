import Link from 'next/link';
import Image from 'next/image';
import SkillTag from '@/components/skill-tag';
import type { Project } from '@/lib/types/project';

type Props = Project;

export default function ProjectCard({
  id,
  image,
  title,
  description,
  tags,
}: Props) {
  return (
    <Link href={`/projects/${id}`}>
      <div className="group bg-background rounded-xl overflow-hidden border border-border glow-hover">
        <div className="overflow-hidden h-48 bg-muted">
          <Image
            src={image || '/placeholder.svg'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={500}
            height={500}
          />
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-foreground/70 text-sm leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <SkillTag key={tag} name={tag} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
