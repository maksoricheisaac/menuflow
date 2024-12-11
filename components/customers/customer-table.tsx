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
import { Download } from 'lucide-react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

interface Customer {
  id: string;
  name: string;
  phone: string;
  orders: number;
  totalSpent: number;
  lastOrder: string;
}

interface CustomerTableProps {
  customers: Customer[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const exportToCSV = () => {
    const csvData = customers.map(customer => ({
      'Nom': customer.name,
      'Téléphone': customer.phone,
      'Nombre de commandes': customer.orders,
      'Total dépensé': `${customer.totalSpent.toLocaleString()} FCFA`,
      'Dernière commande': new Date(customer.lastOrder).toLocaleDateString(),
    }));

    const csv = Papa.unparse(csvData, {
      delimiter: ',',
      header: true,
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'clients.csv');
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Exporter en CSV
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Commandes</TableHead>
            <TableHead>Total dépensé</TableHead>
            <TableHead>Dernière commande</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.orders}</TableCell>
              <TableCell>{customer.totalSpent.toLocaleString()} FCFA</TableCell>
              <TableCell>{new Date(customer.lastOrder).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}