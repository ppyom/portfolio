import { socialLinks } from '@/lib/constants/social-links';

export function ContactLinks() {
  return (
    <>
      {socialLinks.map((link) => (
        <div key={`contact_${link.name}`} className="flex gap-4 items-center">
          <div className="p-4 bg-text-muted/5 border rounded-full">
            <link.icon className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-text-secondary">{link.name}</span>
            <a
              className="font-medium underline-offset-2 hover:underline break-all"
              href={link.type === 'mail' ? `mailto:${link.href}` : link.href}
              target="_blank"
            >
              {link.href}
            </a>
          </div>
        </div>
      ))}
    </>
  );
}
