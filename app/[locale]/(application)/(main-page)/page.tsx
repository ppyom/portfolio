import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getResumeUrl } from '@/services/profile';
import { createAlternates } from '@/lib/i18n/alternates';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResumeDownloadButton } from '@/components/application/resume/resume-download-button';

export async function generateMetadata(): Promise<Metadata> {
  return { alternates: await createAlternates('/') };
}

export default async function Page() {
  const [resumeUrl, t, tCommon] = await Promise.all([
    getResumeUrl(),
    getTranslations('Home'),
    getTranslations('Common'),
  ]);

  return (
    <section
      id="intro"
      className="flex min-h-screen items-center justify-center px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <Badge
            className="text-sm font-medium tracking-wider uppercase"
            variant="muted"
          >
            {tCommon('role')}
          </Badge>
          <p className="text-5xl font-bold tracking-tight text-text-primary sm:text-6xl">
            {tCommon('name')}
          </p>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
            {t.rich('tagline', { br: () => <br /> })}
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <a href="#projects">
              <Button size="lg">{t('viewProjects')}</Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="secondary">
                {t('contactMe')}
              </Button>
            </a>
            <ResumeDownloadButton url={resumeUrl} size="lg" variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  );
}
