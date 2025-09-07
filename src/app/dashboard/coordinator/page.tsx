'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ProtectedRoute } from '@/lib/auth/protected-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  Plus, 
  Upload, 
  Settings,
  BookOpen,
  Users,
  Zap,
  Edit,
  Trash2,
  Eye,
  BarChart3
} from 'lucide-react';

// Mock data
const mockRubrics = [
  {
    id: '1',
    subject: 'Data Structures',
    totalMarks: 100,
    duration: '3 hours',
    lastUpdated: '2024-03-10',
    status: 'active'
  },
  {
    id: '2',
    subject: 'Database Systems',
    totalMarks: 100,
    duration: '3 hours',
    lastUpdated: '2024-03-08',
    status: 'active'
  }
];

const mockSubjects = [
  { id: '1', name: 'Data Structures', faculty: 'Dr. Michael Brown', papers: 5 },
  { id: '2', name: 'Database Systems', faculty: 'Dr. Alice Cooper', papers: 3 },
  { id: '3', name: 'Algorithms', faculty: 'Dr. John Wilson', papers: 4 }
];

const mockContextFiles = [
  { id: '1', name: 'DS_Syllabus_2024.pdf', type: 'syllabus', uploadDate: '2024-03-01', size: '2.3 MB' },
  { id: '2', name: 'Previous_Papers_DS.pdf', type: 'reference', uploadDate: '2024-02-28', size: '5.7 MB' },
  { id: '3', name: 'Course_Outcomes.docx', type: 'outcomes', uploadDate: '2024-02-25', size: '1.1 MB' }
];

function CoordinatorSidebar() {
  return (
    <div className="p-6">
      <nav className="space-y-2">
        <Button variant="default" className="w-full justify-start">
          <BarChart3 className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/coordinator/rubrics">
            <Settings className="mr-2 h-4 w-4" />
            Rubrics Management
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/coordinator/context">
            <Upload className="mr-2 h-4 w-4" />
            RAG Context
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/coordinator/question-bank">
            <BookOpen className="mr-2 h-4 w-4" />
            Question Bank
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/coordinator/generate">
            <Zap className="mr-2 h-4 w-4" />
            Generate Papers
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/coordinator/faculty">
            <Users className="mr-2 h-4 w-4" />
            Faculty Assignment
          </Link>
        </Button>
      </nav>
    </div>
  );
}

function NewRubricDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Rubric
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Rubric</DialogTitle>
          <DialogDescription>
            Set up marking scheme and question distribution for a subject
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ds">Data Structures</SelectItem>
                  <SelectItem value="db">Database Systems</SelectItem>
                  <SelectItem value="algo">Algorithms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input id="totalMarks" type="number" placeholder="100" />
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" placeholder="3 hours" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label>Bloom's Taxonomy Distribution (%)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <Label htmlFor="remember" className="text-sm">Remember</Label>
                  <Input id="remember" type="number" placeholder="20" />
                </div>
                <div>
                  <Label htmlFor="understand" className="text-sm">Understand</Label>
                  <Input id="understand" type="number" placeholder="25" />
                </div>
                <div>
                  <Label htmlFor="apply" className="text-sm">Apply</Label>
                  <Input id="apply" type="number" placeholder="25" />
                </div>
                <div>
                  <Label htmlFor="analyze" className="text-sm">Analyze</Label>
                  <Input id="analyze" type="number" placeholder="15" />
                </div>
                <div>
                  <Label htmlFor="evaluate" className="text-sm">Evaluate</Label>
                  <Input id="evaluate" type="number" placeholder="10" />
                </div>
                <div>
                  <Label htmlFor="create" className="text-sm">Create</Label>
                  <Input id="create" type="number" placeholder="5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Create Rubric</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CoordinatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <ProtectedRoute allowedRoles={['coordinator']}>
      <DashboardLayout sidebar={<CoordinatorSidebar />}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Coordinator Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Manage rubrics, context data, and generate question papers
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Zap className="mr-2 h-4 w-4" />
              Generate New Paper
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subjects Managed</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Active subjects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rubrics Created</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+1 this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Papers Generated</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Context Files</CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">Documents uploaded</p>
              </CardContent>
            </Card>
          </div>

          {/* Rubrics Management */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Rubrics Management</CardTitle>
                <CardDescription>
                  Define marking schemes and question distribution for subjects
                </CardDescription>
              </div>
              <NewRubricDialog />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Total Marks</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRubrics.map((rubric) => (
                    <TableRow key={rubric.id}>
                      <TableCell className="font-medium">{rubric.subject}</TableCell>
                      <TableCell>{rubric.totalMarks}</TableCell>
                      <TableCell>{rubric.duration}</TableCell>
                      <TableCell>{rubric.lastUpdated}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {rubric.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Subject Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Assignment</CardTitle>
              <CardDescription>
                Manage faculty assignments and track question paper status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Assigned Faculty</TableHead>
                    <TableHead>Papers Generated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSubjects.map((subject) => (
                    <TableRow key={subject.id}>
                      <TableCell className="font-medium">{subject.name}</TableCell>
                      <TableCell>{subject.faculty}</TableCell>
                      <TableCell>{subject.papers}</TableCell>
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
            </CardContent>
          </Card>

          {/* RAG Context Files */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>RAG Context Files</CardTitle>
                <CardDescription>
                  Upload syllabus, reference materials, and course documents
                </CardDescription>
              </div>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockContextFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{file.type}</Badge>
                      </TableCell>
                      <TableCell>{file.uploadDate}</TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}