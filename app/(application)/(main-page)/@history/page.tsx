import { getHistoriesQuery } from '@/database/queries/history';
import { Section, SectionTitle } from '@/components/ui/section';
import { Achievement } from '@/components/application/about/achievement';

export default async function Page() {
  const histories = await getHistoriesQuery();

  return (
    <Section id="history" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <SectionTitle className="text-3xl text-center">
        Learning & Growth
      </SectionTitle>
      <Achievement contents={histories} />
    </Section>
  );
}
