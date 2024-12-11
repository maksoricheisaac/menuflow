'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { EmployeeList } from '@/components/settings/employee-list';
import { useState } from 'react';
import { EmployeeDialog } from '@/components/settings/employee-dialog';
import { User } from '@/types/user';

export default function EmployeesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<User | null>(null);

  const handleEdit = (employee: User) => {
    setEditingEmployee(employee);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Gestion des employés</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un employé
        </Button>
      </div>

      <EmployeeList onEdit={handleEdit} />

      <EmployeeDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        employee={editingEmployee}
        onClose={() => {
          setEditingEmployee(null);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}