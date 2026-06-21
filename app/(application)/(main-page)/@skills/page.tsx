import { getSkills } from '@/services/skills';
import { Section, SectionTitle } from '@/components/ui/section';
import { TechStack } from '@/components/application/skills/tech-stack';

export default async function Page() {
  const skills = await getSkills();

  return (
    <Section id="skills" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <SectionTitle className="text-3xl text-center">
        Skills & Tools
      </SectionTitle>
      <TechStack skills={skills} />
    </Section>
  );
}
