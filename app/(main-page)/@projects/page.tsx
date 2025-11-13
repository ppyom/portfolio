import { projects } from '@/lib/constants/projects';
import { skillHex } from '@/lib/constants/skills';
import { dynamicTextColor } from '@/lib/utils';

export default function Page() {
  return (
    <section id="Projects" className="py-20 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto space-y-12 slide-up">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-dongle">
            Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 font-ddobak">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-background rounded-xl overflow-hidden border border-border glow-hover"
            >
              <div className="overflow-hidden h-48 bg-muted">
                <img
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        background: skillHex[tag] || '#aaaaaa',
                        color: dynamicTextColor(skillHex[tag] || '#aaaaaa'),
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
