'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types';
import { cn } from '@/lib/utils';
import { OrderStatusSelect } from './order-status-select';
import { useOrderManagement, getStatusStyle } from '@/lib/api/orders';
import { useState } from 'react';

interface OrderDetailsDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOrderUpdated?: (order: Order) => void;
}

const paymentMethodLabels = {
  mtn: 'MTN Money',
  airtel: 'Airtel Money',
  cash: 'Espèces',
};

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
  onOrderUpdated,
}: OrderDetailsDialogProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { handleStatusUpdate } = useOrderManagement();

  if (!order) return null;

  const handleStatusChange = async (newStatus: string) => {
    try {
      setIsUpdating(true);
      const updatedOrder = await handleStatusUpdate(order.id, newStatus as any);
      onOrderUpdated?.(updatedOrder);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Commande #{order.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Statut</p>
              <OrderStatusSelect
                value={order.status}
                onValueChange={handleStatusChange}
                disabled={isUpdating}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Paiement</p>
              <Badge
                variant="secondary"
                className={cn(
                  order.paymentStatus === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                )}
              >
                {order.paymentStatus === 'completed' ? 'Payé' : 'En attente'}
                {' - '}
                {paymentMethodLabels[order.paymentMethod]}
              </Badge>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Client</h3>
            <div className="rounded-lg border p-4">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-sm text-muted-foreground">
                {order.customerPhone}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Articles commandés</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.price.toLocaleString()} FCFA × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {(item.price * item.quantity).toLocaleString()} FCFA
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">
                  {order.total.toLocaleString()} FCFA
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}