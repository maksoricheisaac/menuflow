export type UserRole = 'owner' | 'manager' | 'chef' | 'cook' | 'waiter';

export interface User {
  id: string;
  restaurantId: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

export type Permission =
  | 'manage_menu'
  | 'manage_orders'
  | 'manage_employees'
  | 'manage_settings'
  | 'view_analytics'
  | 'manage_customers'
  | 'manage_qr_codes';

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

export const roleLabels: Record<UserRole, string> = {
  owner: 'Propriétaire',
  manager: 'Gérant',
  chef: 'Chef cuisinier',
  cook: 'Cuisinier',
  waiter: 'Serveur',
};