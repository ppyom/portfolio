import { notFound } from 'next/navigation';
import PageTitle from '@/components/page-title';
import { getProfile } from '@/database/queries/profile';

export default async function Page() {
  const [profile] = await getProfile.execute({ language: 'ko' });

  if (!profile) {
    return notFound();
  }

  return (
    <section id="About" className="py-20 px-6 bg-card/50">
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

          <div className="space-y-6">
            <div className="bg-background rounded-xl p-6 border border-border glow-hover">
              <h3 className="text-primary font-bold text-lg mb-2">
                Experience
              </h3>
              <ul className="space-y-1 text-foreground/70">
                {profile.experience?.map((content, idx) => (
                  <li key={`experience_${idx}`}>
                    {content.name && (
                      <>
                        <span className="font-semibold font-foground/90">
                          {content.name}
                        </span>
                        <span className="text-sm"> / {content.position} </span>
                      </>
                    )}
                    {!content.name && (
                      <span className="font-semibold text-foground/90 mr-2">
                        {content.position}
                      </span>
                    )}
                    <span className="text-sm">
                      ({content.startDate} - {content.endDate ?? '재직중'})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border glow-hover">
              <h3 className="text-primary font-bold text-lg mb-2">Education</h3>
              <ul className="space-y-1 text-foreground/70">
                {profile.education?.map((content, idx) => (
                  <li key={`education_${idx}`}>
                    <span className="font-semibold font-foground/90">
                      {content.name}
                    </span>
                    <span className="text-sm"> / {content.major} </span>
                    <span className="text-sm">
                      ({content.startDate} - {content.endDate ?? '재학중'})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
