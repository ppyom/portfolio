import { getProfile } from '@/services/profile';
import { getSkills } from '@/services/skills';
import { Section, SectionTitle } from '@/components/ui/section';
import { Achievement } from '@/components/application/about/achievement';
import { CareerHistory } from '@/components/application/about/career-history';
import { Introduction } from '@/components/application/about/introduction';
import PageTitle from '@/components/legacy/page-title';
import { TechStacks } from '@/components/skill/tech-stacks';

export default async function Page() {
  const profile = await getProfile();
  const skills = await getSkills();

  return (
    <main className="max-w-4xl mx-auto p-4 mb-24 space-y-6">
      <PageTitle align="left">About</PageTitle>
      {profile && (
        <>
          <Section>
            <Introduction contents={profile.introduce} />
          </Section>
          <Section>
            <SectionTitle>✨ Tech Stacks</SectionTitle>
            <TechStacks skills={skills} />
          </Section>
          <Section>
            <SectionTitle>👩‍💻 Profile History</SectionTitle>
            <CareerHistory
              experiences={profile.experience}
              educations={profile.education}
            />
          </Section>
          <Section>
            <SectionTitle>🏆 Achievements</SectionTitle>
            <Achievement contents={profile.history} />
          </Section>
        </>
      )}
    </main>
  );
}
