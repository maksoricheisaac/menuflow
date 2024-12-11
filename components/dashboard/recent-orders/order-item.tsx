'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface OrderItemProps {
  customer: string;
  time: string;
  total: string;
  status: 'pending' | 'preparing' | 'completed';
}

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

export function OrderItem({ customer, time, total, status }: OrderItemProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-1">
        <p className="font-medium">{customer}</p>
        <p className="text-sm text-muted-foreground">{time}</p>
      </div>
      <div className="flex items-center space-x-4">
        <p className="font-medium">{total}</p>
        <Badge
          variant="secondary"
          className={cn(statusStyles[status])}
        >
          {statusLabels[status]}
        </Badge>
      </div>
    </div>
  );
}