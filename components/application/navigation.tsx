'use client';

import Link from 'next/link';

import { sections } from '@/lib/constants/sections';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { useScrollVisibility } from '@/hooks/use-scroll-visibility';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const activeId = useScrollSpy(sections.map((s) => s.id));
  const { visible } = useScrollVisibility();

  return (
    <nav
      className={cn(
        'bg-background/90 sm:bg-transparent p-4 sm:p-0 rounded-lg',
        'fixed right-1/2 bottom-4 sm:right-1 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2',
        'flex sm:flex-col gap-2 items-center duration-300',
        'translate-x-1/2 sm:translate-x-[calc(50%+0.25rem)] sm:hover:translate-x-0',
        visible ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      {sections.map((section) => (
        <Button
          key={`nav__${section.name}`}
          variant="ghost"
          size="icon-sm"
          title={section.name}
          className={cn(
            'rounded-full',
            activeId === section.id && 'bg-primary/30!',
          )}
          asChild
        >
          <Link href={section.link}>
            <section.icon />
          </Link>
        </Button>
      ))}
    </nav>
  );
}
