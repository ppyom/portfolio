export default function Page() {
  return (
    <section
      id="Intro"
      className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="max-w-2xl mx-auto text-center space-y-8 fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground/80 leading-tight font-dongle break-keep">
            안녕하세요, <span className="text-primary">이예진</span>입니다.
          </h1>
        </div>

        <p className="text-lg md:text-xl text-foreground/70 max-w-xl mx-auto leading-relaxed">
          사용자 중심의 사고와 깔끔한 코드로&nbsp;
          <span className="text-secondary-foreground/90 font-bold bg-primary/30 px-1">
            사용자와 개발자 모두가 만족할 수 있는 애플리케이션
          </span>
          을 만들어가고 싶습니다.
        </p>
      </div>
    </section>
  );
}
