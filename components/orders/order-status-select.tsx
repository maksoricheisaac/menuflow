'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { OrderStatus } from '@/types';
import { getStatusLabel } from '@/lib/api/orders';

interface OrderStatusSelectProps {
  value: OrderStatus;
  onValueChange: (value: OrderStatus) => void;
  disabled?: boolean;
}

const statuses: OrderStatus[] = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'completed',
  'cancelled',
];

export function OrderStatusSelect({
  value,
  onValueChange,
  disabled = false,
}: OrderStatusSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(value) => onValueChange(value as OrderStatus)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status} value={status}>
            {getStatusLabel(status)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}