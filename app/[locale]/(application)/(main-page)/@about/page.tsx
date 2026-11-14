import { getTranslations } from 'next-intl/server';

import { getPublicProfile, getResumeUrl } from '@/services/profile';
import { resolveRequestLocale } from '@/lib/i18n/request-locale';
import { Section, SectionTitle } from '@/components/ui/section';
import { CareerHistory } from '@/components/application/about/career-history';
import { Introduction } from '@/components/application/about/introduction';
import { ResumeDownloadButton } from '@/components/application/resume/resume-download-button';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: Props) {
  const locale = await resolveRequestLocale(params);
  const [profile, resumeUrl, t] = await Promise.all([
    getPublicProfile(locale),
    getResumeUrl(locale),
    getTranslations('Home.about'),
  ]);

  if (!profile) {
    return null;
  }

  return (
    <Section id="about" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <SectionTitle className="text-3xl text-center">{t('title')}</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Introduction contents={profile.introduce} />
        <div className="space-y-6">
          <CareerHistory
            experiences={profile.experience}
            educations={profile.education}
          />
          <ResumeDownloadButton url={resumeUrl} variant="secondary" />
        </div>
      </div>
    </Section>
  );
}
