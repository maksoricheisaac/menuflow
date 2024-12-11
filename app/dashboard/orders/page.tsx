'use client';

import { OrderList } from '@/components/orders/order-list';
import { OrderFilters } from '@/components/orders/order-filters';
import { useState } from 'react';
import { OrderStatus } from '@/types';

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Commandes</h1>
      </div>
      <OrderFilters selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
      <OrderList statusFilter={selectedStatus} />
    </div>
  );
}