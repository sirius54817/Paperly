'use client';

import Link from 'next/link';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ProtectedRoute } from '@/lib/auth/protected-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Users, 
  FileText, 
  TrendingUp,
  Plus,
  Edit,
  Eye
} from 'lucide-react';

// Mock data for subjects
const mockSubjects = [
  {
    id: '1',
    name: 'Data Structures',
    code: 'CS201',
    credits: 4,
    semester: 3,
    faculty: 'Dr. John Wilson',
    studentsEnrolled: 120,
    papersGenerated: 8,
    lastPaperDate: '2024-03-15',
    syllabusCoverage: 85,
    status: 'active'
  },
  {
    id: '2',
    name: 'Database Systems',
    code: 'CS301',
    credits: 3,
    semester: 5,
    faculty: 'Dr. Alice Cooper',
    studentsEnrolled: 95,
    papersGenerated: 6,
    lastPaperDate: '2024-03-12',
    syllabusCoverage: 78,
    status: 'active'
  },
  {
    id: '3',
    name: 'Web Development',
    code: 'CS401',
    credits: 4,
    semester: 7,
    faculty: 'Dr. Michael Brown',
    studentsEnrolled: 110,
    papersGenerated: 12,
    lastPaperDate: '2024-03-18',
    syllabusCoverage: 92,
    status: 'active'
  },
  {
    id: '4',
    name: 'Mobile App Development',
    code: 'CS402',
    credits: 3,
    semester: 7,
    faculty: 'Dr. Michael Brown',
    studentsEnrolled: 85,
    papersGenerated: 4,
    lastPaperDate: '2024-03-10',
    syllabusCoverage: 65,
    status: 'active'
  },
  {
    id: '5',
    name: 'Algorithms',
    code: 'CS202',
    credits: 4,
    semester: 4,
    faculty: 'Dr. John Wilson',
    studentsEnrolled: 105,
    papersGenerated: 10,
    lastPaperDate: '2024-03-14',
    syllabusCoverage: 88,
    status: 'active'
  }
];

function HoDSidebar() {
  return (
    <div className="p-6">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/hod">
            <Users className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/hod/faculty">
            <Users className="mr-2 h-4 w-4" />
            Faculty Management
          </Link>
        </Button>
        <Button variant="default" className="w-full justify-start">
          <BookOpen className="mr-2 h-4 w-4" />
          Subjects
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/hod/analytics">
            <TrendingUp className="mr-2 h-4 w-4" />
            Analytics
          </Link>
        </Button>
      </nav>
    </div>
  );
}

export default function SubjectsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return 'bg-green-500';
    if (coverage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const totalStudents = mockSubjects.reduce((sum, subject) => sum + subject.studentsEnrolled, 0);
  const totalPapers = mockSubjects.reduce((sum, subject) => sum + subject.papersGenerated, 0);
  const avgCoverage = mockSubjects.reduce((sum, subject) => sum + subject.syllabusCoverage, 0) / mockSubjects.length;

  return (
    <ProtectedRoute allowedRoles={['hod']}>
      <DashboardLayout sidebar={<HoDSidebar />}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Subjects Overview</h1>
              <p className="mt-2 text-gray-600">
                Monitor subjects, syllabus coverage, and paper generation activity
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockSubjects.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active subjects
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStudents}</div>
                <p className="text-xs text-muted-foreground">
                  Enrolled this semester
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Papers Generated</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPapers}</div>
                <p className="text-xs text-muted-foreground">
                  All subjects combined
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Coverage</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgCoverage.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Syllabus coverage
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Subjects Table */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Details</CardTitle>
              <CardDescription>
                Comprehensive view of all subjects and their metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Faculty</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Papers</TableHead>
                      <TableHead>Syllabus Coverage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSubjects.map((subject) => (
                      <TableRow key={subject.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{subject.name}</div>
                            <div className="text-sm text-gray-500">
                              {subject.code} • Semester {subject.semester}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{subject.faculty}</TableCell>
                        <TableCell>{subject.studentsEnrolled}</TableCell>
                        <TableCell>{subject.credits}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{subject.papersGenerated}</div>
                            <div className="text-sm text-gray-500">
                              Last: {subject.lastPaperDate}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{subject.syllabusCoverage}%</span>
                            </div>
                            <Progress 
                              value={subject.syllabusCoverage} 
                              className="h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(subject.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Subject Performance Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Subjects</CardTitle>
                <CardDescription>Based on syllabus coverage and paper generation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSubjects
                    .sort((a, b) => b.syllabusCoverage - a.syllabusCoverage)
                    .slice(0, 3)
                    .map((subject, index) => (
                      <div key={subject.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            index === 0 ? 'bg-yellow-500' : 
                            index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{subject.name}</div>
                            <div className="text-sm text-gray-500">{subject.code}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{subject.syllabusCoverage}%</div>
                          <div className="text-sm text-gray-500">{subject.papersGenerated} papers</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Semester Distribution</CardTitle>
                <CardDescription>Subjects by semester with enrollment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(new Set(mockSubjects.map(s => s.semester)))
                    .sort()
                    .map(semester => {
                      const semesterSubjects = mockSubjects.filter(s => s.semester === semester);
                      const totalEnrolled = semesterSubjects.reduce((sum, s) => sum + s.studentsEnrolled, 0);
                      
                      return (
                        <div key={semester} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">Semester {semester}</div>
                            <div className="text-sm text-gray-500">
                              {semesterSubjects.length} subjects
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{totalEnrolled} students</div>
                            <div className="text-sm text-gray-500">enrolled</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}