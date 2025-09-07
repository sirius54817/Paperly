'use client';

import { ReactNode } from 'react';
import { TopNavigation } from './top-navigation';
import { useAuth } from '@/lib/auth/auth-context';

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

export function DashboardLayout({ children, sidebar }: DashboardLayoutProps) {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      
      <div className="flex">
        {sidebar && (
          <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
            {sidebar}
          </aside>
        )}
        
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}