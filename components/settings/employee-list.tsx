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
import { Edit, Trash2 } from 'lucide-react';
import { User, roleLabels } from '@/types/user';

// Données de test
const employees: User[] = [
  {
    id: '1',
    restaurantId: '1',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    phone: '+242 06 123 4567',
    role: 'chef',
    permissions: ['manage_menu', 'manage_orders'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    restaurantId: '1',
    name: 'Marie Claire',
    email: 'marie@example.com',
    phone: '+242 05 987 6543',
    role: 'waiter',
    permissions: ['manage_orders'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface EmployeeListProps {
  onEdit: (employee: User) => void;
}

export function EmployeeList({ onEdit }: EmployeeListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>{roleLabels[employee.role]}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(employee)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}