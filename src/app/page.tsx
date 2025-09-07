'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect to appropriate dashboard based on role
      const dashboardRoutes = {
        hod: '/dashboard/hod',
        coordinator: '/dashboard/coordinator',
        faculty: '/dashboard/faculty'
      };
      router.push(dashboardRoutes[user.role]);
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Paperly</h1>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
