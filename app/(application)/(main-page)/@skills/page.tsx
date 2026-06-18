import { getSkills } from '@/services/skills';
import PageTitle from '@/components/legacy/page-title';
import { TechStack } from '@/components/skill/tech-stack';

export default async function Page() {
  const skills = await getSkills();

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>Skills & Tools</PageTitle>
        <TechStack skills={skills} />
      </div>
    </section>
  );
}
