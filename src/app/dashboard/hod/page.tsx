'use client';

import Link from 'next/link';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ProtectedRoute } from '@/lib/auth/protected-route';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, BookOpen, FileText, Clock } from 'lucide-react';

const mockStats = { totalPapers: 24, pendingApprovals: 5, totalFaculty: 12, totalSubjects: 8 };

function HoDSidebar() {
  return (
    <div className="p-6">
      <nav className="space-y-2">
        <Button variant="default" className="w-full justify-start">
          <BarChart3 className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/hod/faculty">
            <Users className="mr-2 h-4 w-4" />
            Faculty Management
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/hod/subjects">
            <BookOpen className="mr-2 h-4 w-4" />
            Subjects Overview
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/hod/analytics">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Link>
        </Button>
      </nav>
    </div>
  );
}

export default function HoDDashboard() {
  return (
    <ProtectedRoute allowedRoles={['hod']}>
      <DashboardLayout sidebar={<HoDSidebar />}>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">HoD Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage and oversee all question paper generation activities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium">Total Papers</CardTitle><FileText className="h-4 w-4 text-muted-foreground" /></CardHeader>
              <CardContent><div className="text-2xl font-bold">{mockStats.totalPapers}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium">Pending Approvals</CardTitle><Clock className="h-4 w-4 text-muted-foreground" /></CardHeader>
              <CardContent><div className="text-2xl font-bold">{mockStats.pendingApprovals}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium">Faculty Members</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader>
              <CardContent><div className="text-2xl font-bold">{mockStats.totalFaculty}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-sm font-medium">Subjects</CardTitle><BookOpen className="h-4 w-4 text-muted-foreground" /></CardHeader>
              <CardContent><div className="text-2xl font-bold">{mockStats.totalSubjects}</div></CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
