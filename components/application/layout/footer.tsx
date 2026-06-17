import { socialLinks } from '@/lib/constants/social-links';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-primary border-t py-12 pb-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 text-sm text-text-muted md:flex-row">
        <p>&copy; {currentYear} Yejin Lee. All rights reserved.</p>
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <Button key={link.name} variant="ghost">
              <a
                href={link.type === 'mail' ? `mailto:${link.href}` : link.href}
                title={link.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon className="size-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
}
