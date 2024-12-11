'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OrderItem } from './order-item';

const orders = [
  {
    id: '1',
    customer: 'Jean Dupont',
    total: '15,000 FCFA',
    status: 'pending' as const,
    time: 'Il y a 5 minutes',
  },
  {
    id: '2',
    customer: 'Marie Claire',
    total: '8,500 FCFA',
    status: 'preparing' as const,
    time: 'Il y a 12 minutes',
  },
  {
    id: '3',
    customer: 'Pierre Michel',
    total: '22,000 FCFA',
    status: 'completed' as const,
    time: 'Il y a 25 minutes',
  },
];

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes récentes</CardTitle>
        <CardDescription>Vous avez 2 commandes en attente</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem
              key={order.id}
              customer={order.customer}
              time={order.time}
              total={order.total}
              status={order.status}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}