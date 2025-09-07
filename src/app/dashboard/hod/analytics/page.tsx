'use client';

import Link from 'next/link';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ProtectedRoute } from '@/lib/auth/protected-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  BookOpen,
  Calendar,
  Award,
  Target
} from 'lucide-react';

// Mock analytics data
const analyticsData = {
  paperGeneration: {
    thisMonth: 15,
    lastMonth: 12,
    growth: 25,
    bySubject: [
      { subject: 'Web Development', count: 5, percentage: 33 },
      { subject: 'Data Structures', count: 4, percentage: 27 },
      { subject: 'Database Systems', count: 3, percentage: 20 },
      { subject: 'Algorithms', count: 2, percentage: 13 },
      { subject: 'Mobile Development', count: 1, percentage: 7 }
    ]
  },
  facultyPerformance: [
    { name: 'Dr. Michael Brown', papers: 8, subjects: 2, avgRating: 4.8 },
    { name: 'Dr. John Wilson', papers: 6, subjects: 2, avgRating: 4.6 },
    { name: 'Dr. Alice Cooper', papers: 4, subjects: 2, avgRating: 4.5 }
  ],
  bloomsTaxonomy: {
    remember: 25,
    understand: 20,
    apply: 20,
    analyze: 15,
    evaluate: 12,
    create: 8
  },
  difficultyDistribution: {
    easy: 30,
    medium: 50,
    hard: 20
  },
  approvalMetrics: {
    totalSubmitted: 18,
    approved: 15,
    pending: 2,
    rejected: 1,
    approvalRate: 83.3
  }
};

function HoDSidebar() {
  return (
    <div className="p-6">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/hod">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
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
            Subjects
          </Link>
        </Button>
        <Button variant="default" className="w-full justify-start">
          <TrendingUp className="mr-2 h-4 w-4" />
          Analytics
        </Button>
      </nav>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute allowedRoles={['hod']}>
      <DashboardLayout sidebar={<HoDSidebar />}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Comprehensive insights into department performance and trends
              </p>
            </div>
            <Select defaultValue="thisMonth">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
                <SelectItem value="thisQuarter">This Quarter</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Papers This Month</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.paperGeneration.thisMonth}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{analyticsData.paperGeneration.growth}%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.approvalMetrics.approvalRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {analyticsData.approvalMetrics.approved} of {analyticsData.approvalMetrics.totalSubmitted} approved
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Faculty</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.facultyPerformance.length}</div>
                <p className="text-xs text-muted-foreground">
                  Contributing members
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Quality Rating</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6</div>
                <p className="text-xs text-muted-foreground">
                  Out of 5.0 stars
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Paper Generation by Subject */}
            <Card>
              <CardHeader>
                <CardTitle>Papers by Subject</CardTitle>
                <CardDescription>Distribution of question papers across subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.paperGeneration.bySubject.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium">{item.subject}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24">
                          <Progress value={item.percentage} className="h-2" />
                        </div>
                        <span className="text-sm text-gray-500 w-8">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Faculty Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Faculty Performance</CardTitle>
                <CardDescription>Papers generated and quality ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.facultyPerformance.map((faculty, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{faculty.name}</div>
                        <div className="text-sm text-gray-500">{faculty.subjects} subjects</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{faculty.papers} papers</div>
                        <div className="text-sm text-gray-500">★ {faculty.avgRating}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bloom's Taxonomy and Difficulty Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bloom's Taxonomy Distribution</CardTitle>
                <CardDescription>Cognitive skill levels in generated questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analyticsData.bloomsTaxonomy).map(([level, percentage]) => (
                    <div key={level} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium capitalize">{level}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32">
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <span className="text-sm text-gray-500 w-8">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Difficulty Distribution</CardTitle>
                <CardDescription>Question difficulty levels across all papers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(analyticsData.difficultyDistribution).map(([level, percentage]) => (
                    <div key={level} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${
                          level === 'easy' ? 'bg-green-500' :
                          level === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-medium capitalize">{level}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32">
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <span className="text-sm text-gray-500 w-8">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Approval Workflow Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Approval Workflow Metrics</CardTitle>
              <CardDescription>Question paper approval process insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{analyticsData.approvalMetrics.totalSubmitted}</div>
                  <div className="text-sm text-gray-500 mt-1">Total Submitted</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{analyticsData.approvalMetrics.approved}</div>
                  <div className="text-sm text-gray-500 mt-1">Approved</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{analyticsData.approvalMetrics.pending}</div>
                  <div className="text-sm text-gray-500 mt-1">Pending</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{analyticsData.approvalMetrics.rejected}</div>
                  <div className="text-sm text-gray-500 mt-1">Rejected</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}