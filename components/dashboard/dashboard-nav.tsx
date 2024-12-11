'use client';

import { cn } from '@/lib/utils';
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  QrCode,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    title: 'Vue d\'ensemble',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    title: 'Menu',
    href: '/dashboard/menu',
    icon: BookOpen,
  },
  {
    title: 'Commandes',
    href: '/dashboard/orders',
    icon: ClipboardList,
  },
  {
    title: 'QR Codes',
    href: '/dashboard/qr-codes',
    icon: QrCode,
  },
  {
    title: 'Clients',
    href: '/dashboard/customers',
    icon: Users,
  },
  {
    title: 'Paramètres',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

interface DashboardNavProps {
  isOpen: boolean;
}

export function DashboardNav({ isOpen }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'border-r bg-card transition-all duration-300',
        isOpen ? 'w-64' : 'w-[4.5rem]'
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'transparent'
                )}
              >
                <item.icon className={cn('mr-3 h-5 w-5', isOpen ? 'mr-3 h-5 w-5' : 'mr-1 h-7 w-7')} />
                <span className={cn('transition-opacity', isOpen ? 'opacity-100' : 'hidden')}>
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}