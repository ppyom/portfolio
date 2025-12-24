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
        'fixed right-1 top-1/2 -translate-y-1/2',
        'flex flex-col gap-2 items-center duration-300',
        'translate-x-[calc(50%+0.25rem)] hover:translate-x-0',
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
