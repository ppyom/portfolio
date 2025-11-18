'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { sections } from '@/lib/constants/sections';

export default function Navigation() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/30 rounded-xl p-3 flex gap-2 items-center backdrop-blur-lg">
      {sections.map((section) => (
        <Button
          key={`nav__${section.name}`}
          variant="ghost"
          size="icon"
          title={section.name}
          asChild
        >
          <Link href={section.link}>
            <section.icon />
          </Link>
        </Button>
      ))}
      <Separator className="bg-foreground/50 h-5!" orientation="vertical" />
      <ThemeToggle />
    </nav>
  );
}
