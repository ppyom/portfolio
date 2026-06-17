import { getProfile } from '@/services/profile';
import { getSkills } from '@/services/skills';
import AchievementSection from '@/components/application/about/achievement-section';
import ProfileHistorySection from '@/components/application/about/profile-history-section';
import ProfileIntroduction from '@/components/application/about/profile-introduction';
import TechStacks from '@/components/application/skills/stacks';
import PageTitle from '@/components/legacy/page-title';

export default async function Page() {
  const profile = await getProfile();
  const skills = await getSkills();
  const learnings = profile.history.filter((h) => h.type === 'learning');
  const certifications = profile.history.filter(
    (h) => h.type === 'certification',
  );

  return (
    <main className="max-w-4xl mx-auto p-4 mb-24 space-y-6">
      <PageTitle align="left">About</PageTitle>
      {profile && (
        <>
          <ProfileIntroduction profile={profile} />
          <ProfileHistorySection title="👩‍💻 Profile History" profile={profile} />
          <AchievementSection title="📖 Learning" items={learnings} />
          <AchievementSection
            title="🏅 Certifications"
            items={certifications}
          />
          <TechStacks title="✨ Tech Stacks" skills={skills} />
        </>
      )}
    </main>
  );
}
