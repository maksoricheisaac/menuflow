'use client';

import { BarChart3, ShoppingBag, Users, Utensils } from 'lucide-react';
import { StatsCard } from './stats/stats-card';

const stats = [
  {
    title: 'Ventes du jour',
    value: '45,231 FCFA',
    icon: BarChart3,
    description: '+20.1% par rapport à hier',
  },
  {
    title: 'Commandes',
    value: '12',
    icon: ShoppingBag,
    description: '4 en attente',
  },
  {
    title: 'Plats populaires',
    value: '8',
    icon: Utensils,
    description: 'Sur les 24 plats',
  },
  {
    title: 'Clients',
    value: '573',
    icon: Users,
    description: '+21 cette semaine',
  },
];

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}