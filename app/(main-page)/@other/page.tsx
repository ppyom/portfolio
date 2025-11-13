import { AchievementCard } from '@/components/achievement-card';
import { certifications, learnings } from '@/lib/constants/achievements';

export default function Other() {
  return (
    <section id="Other" className="py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12 slide-up">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-dongle">
            Learning & Growth
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3 font-dongle">
            📖 Learning
          </h3>
          <div className="grid md:grid-cols-2 gap-6 font-ddobak">
            {learnings.map((item, idx) => (
              <AchievementCard key={`learnings_${idx}`} {...item} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3 font-dongle">
            🏅 Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-6 font-ddobak">
            {certifications.map((item, idx) => (
              <AchievementCard key={`certifications_${idx}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
