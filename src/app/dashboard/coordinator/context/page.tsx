'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ProtectedRoute } from '@/lib/auth/protected-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { 
  Upload, 
  FileText, 
  Trash2, 
  Eye,
  Download,
  FolderOpen,
  Plus,
  Search,
  Filter,
  BarChart3,
  Settings,
  BookOpen,
  Zap,
  Users
} from 'lucide-react';

// Mock context files data
const mockContextFiles = [
  {
    id: '1',
    name: 'DS_Syllabus_2024.pdf',
    type: 'syllabus',
    subject: 'Data Structures',
    uploadDate: '2024-03-01',
    size: '2.3 MB',
    uploadedBy: 'Prof. Sarah Johnson',
    status: 'processed',
    vectorCount: 145
  },
  {
    id: '2',
    name: 'Previous_Papers_DS.pdf',
    type: 'reference',
    subject: 'Data Structures',
    uploadDate: '2024-02-28',
    size: '5.7 MB',
    uploadedBy: 'Prof. Sarah Johnson',
    status: 'processing',
    vectorCount: 0
  },
  {
    id: '3',
    name: 'Course_Outcomes_DB.docx',
    type: 'outcomes',
    subject: 'Database Systems',
    uploadDate: '2024-02-25',
    size: '1.1 MB',
    uploadedBy: 'Prof. Sarah Johnson',
    status: 'processed',
    vectorCount: 89
  },
  {
    id: '4',
    name: 'Reference_Book_Algorithms.pdf',
    type: 'textbook',
    subject: 'Algorithms',
    uploadDate: '2024-02-20',
    size: '15.2 MB',
    uploadedBy: 'Prof. Sarah Johnson',
    status: 'processed',
    vectorCount: 450
  },
  {
    id: '5',
    name: 'Lab_Manual_Web_Dev.pdf',
    type: 'manual',
    subject: 'Web Development',
    uploadDate: '2024-02-15',
    size: '3.8 MB',
    uploadedBy: 'Prof. Sarah Johnson',
    status: 'failed',
    vectorCount: 0
  }
];

const fileTypeConfig = {
  syllabus: { color: 'bg-blue-100 text-blue-800', label: 'Syllabus' },
  reference: { color: 'bg-green-100 text-green-800', label: 'Reference' },
  outcomes: { color: 'bg-purple-100 text-purple-800', label: 'Outcomes' },
  textbook: { color: 'bg-orange-100 text-orange-800', label: 'Textbook' },
  manual: { color: 'bg-cyan-100 text-cyan-800', label: 'Manual' },
  notes: { color: 'bg-yellow-100 text-yellow-800', label: 'Notes' }
};

function CoordinatorSidebar() {
  return (
    <div className="p-6">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/dashboard/coordinator">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/dashboard/coordinator/rubrics">
            <Settings className="mr-2 h-4 w-4" />
            Rubrics Management
          </a>
        </Button>
        <Button variant="default" className="w-full justify-start">
          <Upload className="mr-2 h-4 w-4" />
          RAG Context
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/dashboard/coordinator/question-bank">
            <BookOpen className="mr-2 h-4 w-4" />
            Question Bank
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/dashboard/coordinator/generate">
            <Zap className="mr-2 h-4 w-4" />
            Generate Papers
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/dashboard/coordinator/faculty">
            <Users className="mr-2 h-4 w-4" />
            Faculty Assignment
          </a>
        </Button>
      </nav>
    </div>
  );
}

function UploadContextDialog() {
  const [open, setOpen] = useState(false);

  const handleFileUpload = (files: File[]) => {
    console.log('Uploading files:', files);
    // Handle file upload logic here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Context Files
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload RAG Context Files</DialogTitle>
          <DialogDescription>
            Upload syllabus, reference materials, and course documents to enhance question generation
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
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
                  <SelectItem value="web">Web Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="fileType">File Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="syllabus">Syllabus</SelectItem>
                  <SelectItem value="reference">Reference Material</SelectItem>
                  <SelectItem value="outcomes">Course Outcomes</SelectItem>
                  <SelectItem value="textbook">Textbook</SelectItem>
                  <SelectItem value="manual">Lab Manual</SelectItem>
                  <SelectItem value="notes">Lecture Notes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <FileUpload
            onUpload={handleFileUpload}
            acceptedFileTypes=".pdf,.doc,.docx,.ppt,.pptx,.txt"
            maxFileSize={50}
            multiple={true}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Upload Files</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function RAGContextPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Processed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const config = fileTypeConfig[type as keyof typeof fileTypeConfig] || fileTypeConfig.reference;
    return <Badge className={`${config.color} hover:${config.color}`}>{config.label}</Badge>;
  };

  const filteredFiles = mockContextFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || file.subject === subjectFilter;
    const matchesType = typeFilter === 'all' || file.type === typeFilter;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const totalVectors = mockContextFiles.reduce((sum, file) => sum + file.vectorCount, 0);
  const processedFiles = mockContextFiles.filter(file => file.status === 'processed').length;
  const totalSize = mockContextFiles.reduce((sum, file) => {
    const sizeInMB = parseFloat(file.size.replace(' MB', ''));
    return sum + sizeInMB;
  }, 0);

  return (
    <ProtectedRoute allowedRoles={['coordinator']}>
      <DashboardLayout sidebar={<CoordinatorSidebar />}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">RAG Context Management</h1>
              <p className="mt-2 text-gray-600">
                Upload and manage context files for AI-powered question generation
              </p>
            </div>
            <UploadContextDialog />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Files</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockContextFiles.length}</div>
                <p className="text-xs text-muted-foreground">
                  Context documents
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processed Files</CardTitle>
                <Upload className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{processedFiles}</div>
                <p className="text-xs text-muted-foreground">
                  Ready for RAG
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vector Count</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalVectors.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Embedding vectors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Size</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalSize.toFixed(1)} MB</div>
                <p className="text-xs text-muted-foreground">
                  Storage used
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Context Files Management */}
          <Card>
            <CardHeader>
              <CardTitle>Context Files</CardTitle>
              <CardDescription>
                Manage uploaded context files for RAG-powered question generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search files by name or subject..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Data Structures">Data Structures</SelectItem>
                    <SelectItem value="Database Systems">Database Systems</SelectItem>
                    <SelectItem value="Algorithms">Algorithms</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="syllabus">Syllabus</SelectItem>
                    <SelectItem value="reference">Reference</SelectItem>
                    <SelectItem value="outcomes">Outcomes</SelectItem>
                    <SelectItem value="textbook">Textbook</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Files Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Vectors</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFiles.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{file.name}</div>
                            <div className="text-sm text-gray-500">by {file.uploadedBy}</div>
                          </div>
                        </TableCell>
                        <TableCell>{file.subject}</TableCell>
                        <TableCell>{getTypeBadge(file.type)}</TableCell>
                        <TableCell>{file.uploadDate}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>
                          {file.vectorCount > 0 ? file.vectorCount.toLocaleString() : '-'}
                        </TableCell>
                        <TableCell>{getStatusBadge(file.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
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
              </div>
            </CardContent>
          </Card>

          {/* Processing Status and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Status</CardTitle>
                <CardDescription>Current status of uploaded files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['processed', 'processing', 'failed'].map(status => {
                    const count = mockContextFiles.filter(file => file.status === status).length;
                    const percentage = (count / mockContextFiles.length) * 100;
                    
                    return (
                      <div key={status} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            status === 'processed' ? 'bg-green-500' :
                            status === 'processing' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm font-medium capitalize">{status}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-500">{count} files</span>
                          <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>File Types Distribution</CardTitle>
                <CardDescription>Breakdown by document type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    mockContextFiles.reduce((acc, file) => {
                      acc[file.type] = (acc[file.type] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([type, count]) => {
                    const percentage = (count / mockContextFiles.length) * 100;
                    const config = fileTypeConfig[type as keyof typeof fileTypeConfig];
                    
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className={`${config.color} hover:${config.color} text-xs`}>
                            {config.label}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-500">{count} files</span>
                          <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
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