import { getProfile } from '@/services/profile';
import { Section, SectionTitle } from '@/components/ui/section';
import { CareerHistory } from '@/components/application/about/career-history';
import { Introduction } from '@/components/application/about/introduction';

export default async function Page() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  return (
    <Section id="about" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <SectionTitle className="text-3xl text-center">About Me</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Introduction contents={profile.introduce} />
        <div className="space-y-6">
          <CareerHistory
            experiences={profile.experience}
            educations={profile.education}
          />
        </div>
      </div>
    </Section>
  );
}
