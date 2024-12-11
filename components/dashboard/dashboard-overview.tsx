'use client';

import { LineChart } from '@/components/charts/line-chart';
import { ChartContainer } from '@/components/charts/chart-container';

const data = [
  { name: 'Lun', value: 400 },
  { name: 'Mar', value: 300 },
  { name: 'Mer', value: 600 },
  { name: 'Jeu', value: 800 },
  { name: 'Ven', value: 700 },
  { name: 'Sam', value: 900 },
  { name: 'Dim', value: 500 },
];

export function DashboardOverview() {
  return (
    <ChartContainer
      title="Aperçu des ventes"
      description="Vos ventes sur les 7 derniers jours"
    >
      <LineChart data={data} height={300} />
    </ChartContainer>
  );
}