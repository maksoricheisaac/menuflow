'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { roleLabels, UserRole } from '@/types/user';
import { useState } from 'react';
import { usePermissionsManagement, permissionLabels, rolePermissions } from '@/lib/api/permissions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function PermissionList() {
  const [permissions, setPermissions] = useState({ ...rolePermissions });
  const [isUpdating, setIsUpdating] = useState<{ role: string; permission: string } | null>(null);
  const { handlePermissionUpdate } = usePermissionsManagement();

  const handlePermissionChange = async (role: UserRole, permission: string) => {
    if (role === 'owner') return; // Owner permissions cannot be modified
    
    setIsUpdating({ role, permission });
    try {
      const isCurrentlyEnabled = permissions[role].includes(permission as any);
      const updatedPermissions = await handlePermissionUpdate(
        role,
        permission as any,
        !isCurrentlyEnabled
      );
      
      setPermissions(prev => ({
        ...prev,
        [role]: updatedPermissions,
      }));
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-2xl">Gestion des permissions</CardTitle>
        <CardDescription>
          Définissez les permissions pour chaque rôle dans votre restaurant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Permission</TableHead>
                {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                  <TableHead key={role} className="text-center">
                    {roleLabels[role]}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(permissionLabels).map(([permission, label]) => (
                <TableRow key={permission}>
                  <TableCell className="font-medium">{label}</TableCell>
                  {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                    <TableCell key={role} className="text-center">
                      <Switch
                        checked={permissions[role].includes(permission as any)}
                        onCheckedChange={() => handlePermissionChange(role, permission)}
                        disabled={
                          role === 'owner' ||
                          (isUpdating?.role === role && isUpdating?.permission === permission)
                        }
                        className="data-[state=checked]:bg-primary"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}