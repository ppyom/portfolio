'use client';

import Link from 'next/link';

import { sections } from '@/lib/constants/sections';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { useScrollVisibility } from '@/hooks/use-scroll-visibility';
import { Button } from '@/components/ui/button';

export function SectionNavigation() {
  const activeId = useScrollSpy(sections.map((s) => s.id));
  const { visible } = useScrollVisibility();

  return (
    <nav
      className={cn(
        'group bg-surface-elevated/90 sm:bg-transparent p-4 sm:p-0 rounded-lg',
        'fixed right-1/2 bottom-4 sm:right-1 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2',
        'flex sm:flex-col gap-2 items-center duration-300',
        'translate-x-1/2 sm:translate-x-[calc(50%+0.25rem)] sm:hover:translate-x-0',
        visible ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      {sections.map((section) => (
        <Link
          key={`nav__${section.name}`}
          className="group/item relative flex items-center"
          href={section.link}
        >
          <Button
            variant="ghost"
            size="sm"
            title={section.name}
            className={cn(
              'rounded-full',
              activeId === section.id &&
                'bg-brand-primary/20! text-brand-primary',
            )}
          >
            <section.icon size={14} />
            <span
              className={cn(
                'absolute right-full mr-4 whitespace-nowrap',
                'text-text-secondary group-hover/item:text-text-primary',
                'opacity-0 pointer-events-none',
                'translate-x-2 transition-all duration-200',
                'sm:group-hover:opacity-100',
                'sm:group-hover:translate-x-0',
                activeId === section.id && 'text-brand-primary!',
              )}
            >
              {section.name}
            </span>
          </Button>
        </Link>
      ))}
    </nav>
  );
}
