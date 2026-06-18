import { getProfile } from '@/services/profile';
import { getSkills } from '@/services/skills';
import { Section, SectionTitle } from '@/components/ui/section';
import { Achievement } from '@/components/application/about/achievement';
import { CareerHistory } from '@/components/application/about/career-history';
import { Introduction } from '@/components/application/about/introduction';
import { PageHeader } from '@/components/application/layout';
import { TechStack } from '@/components/application/skills/tech-stack';

export default async function Page() {
  const profile = await getProfile();
  const skills = await getSkills();

  return (
    <main className="max-w-4xl mx-auto p-4 mb-24 space-y-8">
      <PageHeader title="이예진 (Yejin Lee)" description="Frontend Developer" />
      <Section>
        <Introduction contents={profile.introduce} />
        <CareerHistory
          experiences={profile.experience}
          educations={profile.education}
        />
      </Section>
      <Section>
        <SectionTitle>🏆 Achievements</SectionTitle>
        <Achievement contents={profile.history} />
      </Section>
      <Section>
        <SectionTitle>🛠 Tech Stack</SectionTitle>
        <TechStack skills={skills} />
      </Section>
    </main>
  );
}
