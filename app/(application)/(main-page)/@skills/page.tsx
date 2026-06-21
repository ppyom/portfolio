import { getSkills } from '@/services/skills';
import { Section, SectionTitle } from '@/components/ui/section';
import { TechStack } from '@/components/application/skills/tech-stack';

export default async function Page() {
  const skills = await getSkills();

  return (
    <Section id="skills" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-3 text-center">
        <SectionTitle className="text-3xl">Skills & Tools</SectionTitle>
        <p className="text-text-muted max-w-2xl mx-auto">
          주로 사용하는 기술과 도구입니다.
        </p>
      </div>
      <TechStack skills={skills} />
    </Section>
  );
}
