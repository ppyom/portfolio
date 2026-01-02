import { socialLinks } from '@/lib/constants/social-links';

export default function ContactInformation() {
  return (
    <div className="py-12">
      <div className="space-y-2 mb-8">
        <h2 className="text-base font-semibold">연락처 정보</h2>
        <p className="text-sm text-muted-foreground">
          아래 정보를 통해 직접 연락하실 수 있습니다.
        </p>
      </div>
      <div className="space-y-4">
        {socialLinks.map((link) => (
          <div key={`contact_${link.name}`} className="flex gap-4 items-center">
            <div className="p-4 bg-primary/10 border-2 border-primary/20 rounded-full">
              <link.icon className="size-4" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-primary-foreground dark:text-primary">
                {link.name}
              </span>
              <a
                className="font-medium underline-offset-2 hover:underline"
                href={link.type === 'mail' ? `mailto:${link.href}` : link.href}
                target="_blank"
              >
                {link.href}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
