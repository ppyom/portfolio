import Image from 'next/image';
import { skillHex } from '@/lib/constants/skills';
import { dynamicTextColor } from '@/lib/utils';
import type { Project } from '@/lib/types/project';

type Props = Project;

export default function ProjectCard({
  image,
  title,
  description,
  tags,
}: Props) {
  return (
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
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: skillHex[tag] || '#aaaaaa',
                color: dynamicTextColor(skillHex[tag] || '#aaaaaa'),
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
