'use client';

import { Order, OrderStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
  // This would be replaced with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: orderId,
        status,
        // Other order fields would come from API
      } as Order);
    }, 500);
  });
}

export function useOrderManagement() {
  const { toast } = useToast();

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      
      toast({
        title: 'Statut mis à jour',
        description: `La commande #${orderId} est maintenant ${getStatusLabel(newStatus)}`,
      });

      return updatedOrder;
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le statut de la commande',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return { handleStatusUpdate };
}

export function getStatusLabel(status: OrderStatus): string {
  const statusLabels: Record<OrderStatus, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    preparing: 'En préparation',
    ready: 'Prête',
    completed: 'Terminée',
    cancelled: 'Annulée',
  };
  return statusLabels[status];
}

export function getStatusStyle(status: OrderStatus): string {
  const statusStyles: Record<OrderStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-purple-100 text-purple-800',
    ready: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  };
  return statusStyles[status];
}