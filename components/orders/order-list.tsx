'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { Order, OrderStatus } from '@/types';
import { useState } from 'react';
import { OrderDetailsDialog } from './order-details-dialog';
import { cn } from '@/lib/utils';
import { getStatusLabel, getStatusStyle } from '@/lib/api/orders';

// Mock data
const orders: Order[] = [
  {
    id: '1',
    restaurantId: '1',
    customerName: 'Jean Dupont',
    customerPhone: '+242 XX XXX XXXX',
    items: [
      {
        menuItemId: '1',
        name: 'Poulet Yassa',
        quantity: 2,
        price: 5000,
      },
      {
        menuItemId: '2',
        name: 'Jus de Gingembre',
        quantity: 2,
        price: 1000,
      },
    ],
    total: 12000,
    status: 'pending',
    paymentMethod: 'mtn',
    paymentStatus: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    restaurantId: '1',
    customerName: 'Marie Claire',
    customerPhone: '+242 XX XXX XXXX',
    items: [
      {
        menuItemId: '3',
        name: 'Tiep Bou Dien',
        quantity: 1,
        price: 4500,
      },
    ],
    total: 4500,
    status: 'preparing',
    paymentMethod: 'airtel',
    paymentStatus: 'completed',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const paymentMethodLabels = {
  mtn: 'MTN Money',
  airtel: 'Airtel Money',
  cash: 'Espèces',
};

interface OrderListProps {
  statusFilter: OrderStatus | 'all';
}

export function OrderList({ statusFilter }: OrderListProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [ordersList, setOrdersList] = useState<Order[]>(orders);

  const filteredOrders = statusFilter === 'all'
    ? ordersList
    : ordersList.filter(order => order.status === statusFilter);

  const handleOrderUpdated = (updatedOrder: Order) => {
    setOrdersList(orders => 
      orders.map(order => 
        order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order
      )
    );
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Commande</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customerPhone}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{order.total.toLocaleString()} FCFA</TableCell>
                <TableCell>
                  {paymentMethodLabels[order.paymentMethod]}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(getStatusStyle(order.status))}
                  >
                    {getStatusLabel(order.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {order.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <OrderDetailsDialog
        order={selectedOrder}
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
        onOrderUpdated={handleOrderUpdated}
      />
    </>
  );
}