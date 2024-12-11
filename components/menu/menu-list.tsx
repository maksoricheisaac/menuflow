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
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2 } from 'lucide-react';
import { MenuItem } from '@/types';
import Image from 'next/image';

// Temporary mock data
const menuItems: MenuItem[] = [
  {
    id: '1',
    restaurantId: '1',
    name: 'Poulet Yassa',
    description: 'Poulet mariné avec oignons et citron',
    price: 5000,
    category: 'Plats principaux',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    restaurantId: '1',
    name: 'Tiep Bou Dien',
    description: 'Riz au poisson et légumes',
    price: 4500,
    category: 'Plats principaux',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80',
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface MenuListProps {
  onEdit: (item: MenuItem) => void;
}

export function MenuList({ onEdit }: MenuListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Disponible</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src={item.image || ''}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.price.toLocaleString()} FCFA</TableCell>
              <TableCell>
                <Switch checked={item.available} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
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