import {
  getCertificationsQuery,
  getLearningsQuery,
} from '@/database/queries/history';
import { Achievement } from '@/components/application/about/achievement';
import PageTitle from '@/components/legacy/page-title';

export default async function Page() {
  const learnings = await getLearningsQuery();
  const certifications = await getCertificationsQuery();

  return (
    <section id="history" className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>Learning & Growth</PageTitle>
        <Achievement title="📖 Learning" contents={learnings} />
        <Achievement title="🏅 Certifications" contents={certifications} />
      </div>
    </section>
  );
}
