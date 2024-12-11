'use client';

import { Permission, UserRole } from '@/types/user';
import { useToast } from '@/hooks/use-toast';

export async function updateRolePermissions(role: UserRole, permissions: Permission[]): Promise<void> {
  // This would be replaced with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

export function usePermissionsManagement() {
  const { toast } = useToast();

  const handlePermissionUpdate = async (role: UserRole, permission: Permission, enabled: boolean) => {
    try {
      // Get current permissions for the role
      const currentPermissions = rolePermissions[role];
      
      // Update permissions
      const updatedPermissions = enabled
        ? [...currentPermissions, permission]
        : currentPermissions.filter(p => p !== permission);

      // Save to backend
      await updateRolePermissions(role, updatedPermissions);
      
      // Update local state
      rolePermissions[role] = updatedPermissions;

      toast({
        title: 'Permissions mises à jour',
        description: `Les permissions pour ${roleLabels[role]} ont été mises à jour.`,
      });

      return updatedPermissions;
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour les permissions.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return { handlePermissionUpdate };
}

export const permissionLabels: Record<Permission, string> = {
  manage_menu: 'Gérer le menu',
  manage_orders: 'Gérer les commandes',
  manage_employees: 'Gérer les employés',
  manage_settings: 'Gérer les paramètres',
  view_analytics: 'Voir les analyses',
  manage_customers: 'Gérer les clients',
  manage_qr_codes: 'Gérer les QR codes',
};

export const roleLabels: Record<UserRole, string> = {
  owner: 'Propriétaire',
  manager: 'Gérant',
  chef: 'Chef cuisinier',
  cook: 'Cuisinier',
  waiter: 'Serveur',
};

export const rolePermissions: Record<UserRole, Permission[]> = {
  owner: [
    'manage_menu',
    'manage_orders',
    'manage_employees',
    'manage_settings',
    'view_analytics',
    'manage_customers',
    'manage_qr_codes',
  ],
  manager: [
    'manage_menu',
    'manage_orders',
    'view_analytics',
    'manage_customers',
    'manage_qr_codes',
  ],
  chef: ['manage_menu', 'manage_orders'],
  cook: ['manage_orders'],
  waiter: ['manage_orders'],
};