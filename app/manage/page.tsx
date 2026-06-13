import {
  DashboardInbox,
  DashboardOverview,
  DashboardQuickActions,
} from '@/components/admin/dashboard';

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 md:px-8 space-y-8">
      <div className="flex-1 space-y-2">
        <p className="text-2xl font-bold">관리자 대시보드</p>
        <p className="text-text-secondary">
          포트폴리오 관리 현황을 확인하고 주요 작업으로 빠르게 이동할 수
          있습니다.
        </p>
      </div>
      <div className="space-y-6">
        <DashboardOverview />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
          <div className="lg:col-span-2 xl:col-span-3">
            <DashboardInbox />
          </div>
          <DashboardQuickActions />
        </div>
      </div>
    </div>
  );
}
