'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { CustomerSearch } from '@/components/customers/customer-search';
import { CustomerTable } from '@/components/customers/customer-table';

const customers = [
  {
    id: '1',
    name: 'Jean Dupont',
    phone: '+242 06 123 4567',
    orders: 15,
    totalSpent: 75000,
    lastOrder: '2024-03-15',
  },
  {
    id: '2',
    name: 'Marie Claire',
    phone: '+242 05 987 6543',
    orders: 8,
    totalSpent: 42000,
    lastOrder: '2024-03-14',
  },
  {
    id: '3',
    name: 'Pierre Michel',
    phone: '+242 06 456 7890',
    orders: 12,
    totalSpent: 63000,
    lastOrder: '2024-03-13',
  },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <CustomerSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="rounded-md border">
        <CustomerTable customers={filteredCustomers} />
      </div>
    </div>
  );
}