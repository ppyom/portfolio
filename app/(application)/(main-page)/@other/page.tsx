import { eq } from 'drizzle-orm';

import { db } from '@/database';
import { historyTable } from '@/database/schema/history.schema';
import PageTitle from '@/components/common/page-title';
import SectionTitle from '@/components/common/section-title';
import AchievementCard from '@/components/application/achievement-card';

export default async function Other() {
  const learnings = await db
    .select()
    .from(historyTable)
    .where(eq(historyTable.type, 'learning'));
  const certifications = await db
    .select()
    .from(historyTable)
    .where(eq(historyTable.type, 'certification'));
  return (
    <section id="other" className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>Learning & Growth</PageTitle>

        <div className="space-y-6">
          <SectionTitle>📖 Learning</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            {learnings.map((item, idx) => (
              <AchievementCard key={`learnings_${idx}`} {...item} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SectionTitle>🏅 Certifications</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((item, idx) => (
              <AchievementCard key={`certifications_${idx}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
