'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const orders = [
  {
    id: '1',
    customer: 'Jean Dupont',
    total: '15,000 FCFA',
    status: 'pending',
    time: 'Il y a 5 minutes',
  },
  {
    id: '2',
    customer: 'Marie Claire',
    total: '8,500 FCFA',
    status: 'preparing',
    time: 'Il y a 12 minutes',
  },
  {
    id: '3',
    customer: 'Pierre Michel',
    total: '22,000 FCFA',
    status: 'completed',
    time: 'Il y a 25 minutes',
  },
];

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const statusLabels = {
  pending: 'En attente',
  preparing: 'En préparation',
  completed: 'Terminé',
};

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
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-1">
                <p className="font-medium">{order.customer}</p>
                <p className="text-sm text-muted-foreground">{order.time}</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="font-medium">{order.total}</p>
                <Badge
                  variant="secondary"
                  className={cn(statusStyles[order.status as keyof typeof statusStyles])}
                >
                  {statusLabels[order.status as keyof typeof statusLabels]}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}