import { getHistoriesQuery } from '@/database/queries/history';
import { Section, SectionTitle } from '@/components/ui/section';
import { Achievement } from '@/components/application/about/achievement';

export default async function Page() {
  const histories = await getHistoriesQuery();

  return (
    <Section id="history" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-3 text-center">
        <SectionTitle className="text-3xl">Learning & Growth</SectionTitle>
        <p className="text-text-muted">학습 및 활동 이력입니다.</p>
      </div>
      <Achievement contents={histories} />
    </Section>
  );
}
