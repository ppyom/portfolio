import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import PageTitle from '@/components/common/page-title';

export default function Page() {
  return (
    <>
      <PageTitle align="left">관리자 대시보드</PageTitle>
      <section className="mb-12 space-y-2">
        <Card>
          <CardHeader>
            <CardTitle>애플리케이션 상태</CardTitle>
            <CardDescription>포트폴리오 사이트의 상태 정보</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-muted-foreground">버전</span>
              <span className="font-semibold">v1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">최근 업데이트</span>
              <span className="font-semibold">-</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
