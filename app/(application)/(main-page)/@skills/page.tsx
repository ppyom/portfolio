import { getSkills } from '@/services/skills';
import { cn } from '@/lib/utils';
import PageTitle from '@/components/common/page-title';
import SkillTag from '@/components/common/skill-tag';

export default async function Page() {
  const skills = await getSkills();

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>Skills & Tools</PageTitle>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skillGroup) => (
            <div
              key={skillGroup.category}
              className={cn(
                `bg-card rounded-xl p-6 border border-border glow-hover transition-all duration-500`,
              )}
            >
              <h3 className="text-primary font-bold text-lg mb-4">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill) => (
                  <SkillTag key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
