'use client';

import { PermissionList } from '@/components/settings/permission-list';

export default function PermissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Gestion des permissions</h2>
        <p className="text-muted-foreground">
          Gérez les permissions de vos employés selon leurs rôles
        </p>
      </div>

      <PermissionList />
    </div>
  );
}