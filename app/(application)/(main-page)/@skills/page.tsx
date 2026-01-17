import { getSkills } from '@/services/skills';
import PageTitle from '@/components/common/page-title';
import TechStacks from '@/components/application/skills/stacks';

export default async function Page() {
  const skills = await getSkills();

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>Skills & Tools</PageTitle>
        <TechStacks skills={skills} />
      </div>
    </section>
  );
}
