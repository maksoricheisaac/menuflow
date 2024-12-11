'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { MenuList } from '@/components/menu/menu-list';
import { useState } from 'react';
import { MenuDialog } from '@/components/menu/menu-dialog';
import { MenuItem } from '@/types';

export default function MenuPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Menu</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un plat
        </Button>
      </div>
      <MenuList onEdit={handleEdit} />
      <MenuDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        item={editingItem}
        onClose={() => {
          setEditingItem(null);
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}