'use client';

import { Button } from '@/components/ui/button';
import { OrderStatus } from '@/types';
import { cn } from '@/lib/utils';

interface OrderFiltersProps {
  selectedStatus: OrderStatus | 'all';
  onStatusChange: (status: OrderStatus | 'all') => void;
}

const statusFilters = [
  { value: 'all', label: 'Toutes' },
  { value: 'pending', label: 'En attente' },
  { value: 'confirmed', label: 'Confirmées' },
  { value: 'preparing', label: 'En préparation' },
  { value: 'ready', label: 'Prêtes' },
  { value: 'completed', label: 'Terminées' },
  { value: 'cancelled', label: 'Annulées' },
] as const;

export function OrderFilters({ selectedStatus, onStatusChange }: OrderFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {statusFilters.map((filter) => (
        <Button
          key={filter.value}
          variant="outline"
          size="sm"
          onClick={() => onStatusChange(filter.value as OrderStatus | 'all')}
          className={cn(
            selectedStatus === filter.value && 'bg-primary text-primary-foreground'
          )}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}