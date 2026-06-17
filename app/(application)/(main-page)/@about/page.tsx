import { getProfile } from '@/services/profile';
import { CareerHistory } from '@/components/application/about/career-history';
import PageTitle from '@/components/legacy/page-title';

export default async function Page() {
  const profile = await getProfile();

  if (!profile) {
    return null;
  }

  return (
    <section id="about" className="py-20 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>About Me</PageTitle>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-foreground/80">
            {profile.introduce?.map((content, idx) => (
              <p key={`introduce_${idx}`} className="text-lg leading-relaxed">
                {content}
              </p>
            ))}
          </div>
          <CareerHistory profile={profile} />
        </div>
      </div>
    </section>
  );
}
