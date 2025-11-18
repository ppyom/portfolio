import PageTitle from '@/components/page-title';

export default function Page() {
  return (
    <section id="About" className="py-20 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto space-y-12 slide-up">
        <PageTitle>About Me</PageTitle>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-foreground/80">
            <p className="text-lg leading-relaxed">
              저는 좋아하는 것을 끊임없이 탐구하며 그 열정을 서비스에 담아내는
              것을 즐깁니다. 이전 회사에서 1년 정도의 기간동안의 경험을 바탕으로
              사용자와 개발자 모두가 만족할 수 있는 깔끔하고 효율적인 코드를
              사용하는 것을 가장 중요하게 생각합니다.
            </p>
            <p className="text-lg leading-relaxed">
              작은 변화라도 사용자 경험을 개선할 수 있다면 주저하지 않고
              시도하며, 새로운 기술과 도전을 마주할 때에는 항상 호기심과 열정을
              가지고 임합니다. 매 프로젝트는 저에게 성장과 즐거움을 동시에 주는
              여정입니다.
            </p>
            <p className="text-lg leading-relaxed">
              코딩 이외의 시간에는 온전히 휴식을 취하며 재충전하는 것을 중요하게
              생각합니다. 주로 게임을 즐기거나 산책을 하며, 마음을 비우고 새로운
              영감을 얻습니다.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-background rounded-xl p-6 border border-border glow-hover">
              <h3 className="text-primary font-bold text-lg mb-2">
                Experience
              </h3>
              <p className="text-foreground/70">
                <span className="font-semibold text-foground/90">
                  웹 솔루션 개발자
                </span>{' '}
                <span className="text-sm">(2021.07 - 2022.08)</span>
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 border border-border glow-hover">
              <h3 className="text-primary font-bold text-lg mb-2">Education</h3>
              <ul className="space-y-1 text-foreground/70">
                <li>
                  <span className="font-semibold font-foground/90">
                    명지전문대학
                  </span>{' '}
                  <span className="text-sm">
                    / 컴퓨터공학 (2017.03 - 2021.08)
                  </span>
                </li>
                <li>
                  <span className="font-semibold font-foground/90">
                    안산디자인문화고등학교
                  </span>{' '}
                  <span className="text-sm">
                    / 미디어콘텐츠 (2014.03 - 2017.02)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
