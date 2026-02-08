import {
  getCertificationsQuery,
  getLearningsQuery,
} from '@/database/queries/history';
import PageTitle from '@/components/common/page-title';
import AchievementSection from '@/components/application/about/achievement-section';

export default async function Page() {
  const learnings = await getLearningsQuery();
  const certifications = await getCertificationsQuery();

  return (
    <section id="history" className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>Learning & Growth</PageTitle>
        <AchievementSection title="📖 Learning" items={learnings} />
        <AchievementSection title="🏅 Certifications" items={certifications} />
      </div>
    </section>
  );
}
