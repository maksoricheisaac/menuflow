import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { RecentOrders } from '@/components/dashboard/recent-orders';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      <DashboardStats />
      <div className="grid gap-8 md:grid-cols-2">
        <DashboardOverview />
        <RecentOrders />
      </div>
    </div>
  );
}