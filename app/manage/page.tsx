import PageTitle from '@/components/common/page-title';
import DashboardInbox from '@/components/admin/dashboard/inbox';
import DashboardOverview from '@/components/admin/dashboard/overview';
import DashboardQuickActions from '@/components/admin/dashboard/quick-action';

export default function Page() {
  return (
    <>
      <PageTitle align="left">관리자 대시보드</PageTitle>
      <section className="space-y-6">
        <DashboardOverview />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <div className="lg:col-span-2 xl:col-span-3">
            <DashboardInbox />
          </div>
          <DashboardQuickActions />
        </div>
      </section>
    </>
  );
}
