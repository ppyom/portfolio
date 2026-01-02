import { socialLinks } from '@/lib/constants/social-links';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="pb-16 flex flex-col md:flex-row items-center justify-between text-foreground/60 text-sm">
          <p>&copy; {currentYear} Yejin Lee. All rights reserved.</p>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="icon" asChild>
                <a
                  href={
                    link.type === 'mail' ? `mailto:${link.href}` : link.href
                  }
                  title={link.name}
                  target="_blank"
                >
                  <link.icon size={32} />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
