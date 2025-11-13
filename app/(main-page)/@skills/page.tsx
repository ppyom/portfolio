'use client';

import { useEffect, useRef, useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { skillHex, skills } from '@/lib/constants/skills';
import { cn, dynamicTextColor } from '@/lib/utils';

export default function Page() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="Skills" className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>Skills & Tools</PageTitle>

        <div className="grid md:grid-cols-2 gap-8 font-ddobak">
          {skills.map((skillGroup, groupIndex) => (
            <div
              key={skillGroup.category}
              className={cn(
                `bg-card rounded-xl p-6 border border-border glow-hover transition-all duration-500`,
                isVisible ? 'stagger-item' : 'opacity-0',
              )}
              style={{
                animationDelay: isVisible ? `${groupIndex * 0.1}s` : '0s',
              }}
            >
              <h3 className="text-primary font-bold text-lg mb-4">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className={cn(
                      `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default`,
                      isVisible ? 'stagger-item' : 'opacity-0',
                    )}
                    style={{
                      background: skillHex[skill],
                      color: dynamicTextColor(skillHex[skill]),
                      animationDelay: isVisible
                        ? `${groupIndex * 0.1 + skillIndex * 0.05}s`
                        : '0s',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
