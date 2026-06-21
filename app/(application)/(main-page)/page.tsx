import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <section
      id="intro"
      className="flex min-h-screen items-center justify-center px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <Badge
            className="text-sm font-medium tracking-wider uppercase"
            variant="muted"
          >
            Frontend Developer
          </Badge>
          <p className="text-5xl font-bold tracking-tight text-text-primary sm:text-6xl">
            이예진
          </p>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
            사용자와 개발자 모두가 만족할 수 있는
            <br />웹 애플리케이션을 만듭니다.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <a href="#projects">
              <Button size="lg">프로젝트 보기</Button>
            </a>
            <a href="#contact">
              <Button size="lg" variant="secondary">
                연락하기
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
