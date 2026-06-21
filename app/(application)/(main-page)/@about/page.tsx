import { getProfile } from '@/services/profile';
import { Section, SectionTitle } from '@/components/ui/section';
import { CareerHistory } from '@/components/application/about/career-history';

export default async function Page() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  return (
    <Section id="about" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <SectionTitle className="text-3xl text-center">About Me</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-text-secondary">
          {profile.introduce?.map((content, idx) => (
            <p key={`introduce_${idx}`} className="text-lg leading-relaxed">
              {content}
            </p>
          ))}
        </div>
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
