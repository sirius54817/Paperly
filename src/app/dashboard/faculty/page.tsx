'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ProtectedRoute } from '@/lib/auth/protected-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  User, 
  BookOpen, 
  MessageSquare,
  Clock,
  CheckCircle,
  Download,
  Eye,
  Calendar,
  BarChart3,
  Target,
  TrendingUp
} from 'lucide-react';

// Mock data for faculty papers
const mockPapers = [
  {
    id: '1',
    title: 'Mid-Term Exam - Data Structures',
    subject: 'Data Structures',
    type: 'Mid-Term',
    totalMarks: 100,
    totalQuestions: 8,
    generatedDate: '2024-03-15',
    deadline: '2024-03-25',
    status: 'submitted',
    feedback: 'Approved with minor suggestions',
    downloadCount: 45,
    studentsCount: 120
  },
  {
    id: '2',
    title: 'Assignment 1 - Linked Lists',
    subject: 'Data Structures',
    type: 'Assignment',
    totalMarks: 50,
    totalQuestions: 5,
    generatedDate: '2024-03-10',
    deadline: '2024-03-20',
    status: 'approved',
    feedback: 'Excellent question distribution',
    downloadCount: 32,
    studentsCount: 120
  },
  {
    id: '3',
    title: 'Quiz 2 - Trees and Graphs',
    subject: 'Data Structures',
    type: 'Quiz',
    totalMarks: 25,
    totalQuestions: 10,
    generatedDate: '2024-03-12',
    deadline: '2024-03-18',
    status: 'pending',
    feedback: null,
    downloadCount: 0,
    studentsCount: 120
  },
  {
    id: '4',
    title: 'Final Exam - Complete Syllabus',
    subject: 'Data Structures',
    type: 'Final',
    totalMarks: 150,
    totalQuestions: 12,
    generatedDate: '2024-03-08',
    deadline: '2024-04-15',
    status: 'draft',
    feedback: null,
    downloadCount: 0,
    studentsCount: 120
  }
];

function FacultySidebar() {
  return (
    <div className="p-6">
      <nav className="space-y-2">
        <Button variant="default" className="w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          My Papers
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/faculty/materials">
            <BookOpen className="mr-2 h-4 w-4" />
            Study Materials
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/faculty/feedback">
            <MessageSquare className="mr-2 h-4 w-4" />
            Feedback
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/faculty/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </Button>
      </nav>
    </div>
  );
}

export default function FacultyPapersPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Submitted</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Review</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Needs Revision</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'Mid-Term': 'bg-blue-100 text-blue-800',
      'Final': 'bg-purple-100 text-purple-800',
      'Assignment': 'bg-green-100 text-green-800',
      'Quiz': 'bg-orange-100 text-orange-800'
    };
    const color = colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    return <Badge className={`${color} hover:${color}`}>{type}</Badge>;
  };

  const filteredPapers = statusFilter === 'all' 
    ? mockPapers 
    : mockPapers.filter(paper => paper.status === statusFilter);

  const totalPapers = mockPapers.length;
  const approvedPapers = mockPapers.filter(p => p.status === 'approved').length;
  const pendingPapers = mockPapers.filter(p => p.status === 'pending').length;
  const totalDownloads = mockPapers.reduce((sum, p) => sum + p.downloadCount, 0);

  return (
    <ProtectedRoute allowedRoles={['faculty']}>
      <DashboardLayout sidebar={<FacultySidebar />}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Papers</h1>
              <p className="mt-2 text-gray-600">
                Manage your question papers and track their status
              </p>
            </div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Create New Paper
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Papers</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPapers}</div>
                <p className="text-xs text-muted-foreground">
                  Generated papers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{approvedPapers}</div>
                <p className="text-xs text-muted-foreground">
                  Ready for use
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingPapers}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting approval
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalDownloads}</div>
                <p className="text-xs text-muted-foreground">
                  Total downloads
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Papers Table */}
          <Card>
            <CardHeader>
              <CardTitle>Question Papers</CardTitle>
              <CardDescription>
                Your generated question papers and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filter */}
              <div className="mb-4">
                <div className="flex space-x-2">
                  {['all', 'draft', 'pending', 'submitted', 'approved', 'rejected'].map((status) => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                      className="capitalize"
                    >
                      {status === 'all' ? 'All Papers' : status.replace('-', ' ')}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paper Details</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Questions/Marks</TableHead>
                      <TableHead>Generated</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPapers.map((paper) => (
                      <TableRow key={paper.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{paper.title}</div>
                            <div className="text-sm text-gray-500">{paper.subject}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(paper.type)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{paper.totalQuestions} questions</div>
                            <div className="text-sm text-gray-500">{paper.totalMarks} marks</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{paper.generatedDate}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{paper.deadline}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(paper.status)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{paper.downloadCount}</div>
                            <div className="text-sm text-gray-500">{paper.studentsCount} students</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {paper.status === 'approved' && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Feedback Section */}
              {filteredPapers.some(p => p.feedback) && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Feedback</h3>
                  <div className="space-y-3">
                    {filteredPapers
                      .filter(p => p.feedback)
                      .slice(0, 3)
                      .map((paper) => (
                        <div key={paper.id} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium text-blue-900">{paper.title}</div>
                              <div className="text-blue-700 mt-1">{paper.feedback}</div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">
                              {paper.status}
                            </Badge>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}