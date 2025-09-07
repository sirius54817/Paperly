'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ProtectedRoute } from '@/lib/auth/protected-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileUpload } from '@/components/ui/file-upload';
import { 
  BookOpen, 
  FileText, 
  User, 
  MessageSquare,
  Upload, 
  Plus, 
  Eye,
  Download,
  Trash2,
  Search,
  Filter,
  Calendar,
  FileIcon,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

// Mock study materials data
const mockMaterials = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    fileName: 'react_advanced_patterns.pdf',
    subject: 'Web Development',
    type: 'Lecture Notes',
    uploadDate: '2024-03-15',
    size: '3.2 MB',
    downloads: 45,
    description: 'Comprehensive guide to advanced React patterns including hooks, context, and performance optimization',
    status: 'approved',
    tags: ['React', 'Hooks', 'Performance', 'Patterns']
  },
  {
    id: '2',
    title: 'JavaScript ES6+ Features',
    fileName: 'javascript_es6_guide.docx',
    subject: 'Web Development',
    type: 'Reference Material',
    uploadDate: '2024-03-10',
    size: '1.8 MB',
    downloads: 32,
    description: 'Complete reference for modern JavaScript features from ES6 onwards',
    status: 'approved',
    tags: ['JavaScript', 'ES6', 'Modern JS', 'Syntax']
  },
  {
    id: '3',
    title: 'Database Normalization Examples',
    fileName: 'db_normalization_examples.pdf',
    subject: 'Database Systems',
    type: 'Practice Problems',
    uploadDate: '2024-03-08',
    size: '2.5 MB',
    downloads: 28,
    description: 'Practical examples and exercises for database normalization techniques',
    status: 'pending',
    tags: ['Database', 'Normalization', 'Examples', 'Practice']
  },
  {
    id: '4',
    title: 'Data Structures Cheat Sheet',
    fileName: 'data_structures_cheatsheet.pdf',
    subject: 'Data Structures',
    type: 'Quick Reference',
    uploadDate: '2024-03-05',
    size: '1.2 MB',
    downloads: 67,
    description: 'Quick reference guide for common data structures and their operations',
    status: 'approved',
    tags: ['Data Structures', 'Cheat Sheet', 'Reference', 'Algorithms']
  },
  {
    id: '5',
    title: 'Mobile App UI/UX Guidelines',
    fileName: 'mobile_ui_ux_guidelines.pptx',
    subject: 'Mobile Development',
    type: 'Presentation',
    uploadDate: '2024-03-02',
    size: '5.1 MB',
    downloads: 19,
    description: 'Best practices and guidelines for mobile application user interface design',
    status: 'rejected',
    tags: ['Mobile', 'UI/UX', 'Design', 'Guidelines']
  }
];

function FacultySidebar() {
  return (
    <div className="p-6">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/dashboard/faculty">
            <FileText className="mr-2 h-4 w-4" />
            My Papers
          </a>
        </Button>
        <Button variant="default" className="w-full justify-start">
          <BookOpen className="mr-2 h-4 w-4" />
          Study Materials
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/dashboard/faculty/feedback">
            <MessageSquare className="mr-2 h-4 w-4" />
            Feedback
          </a>
        </Button>
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/dashboard/faculty/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </a>
        </Button>
      </nav>
    </div>
  );
}

function UploadMaterialDialog() {
  const [open, setOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Material
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Study Material</DialogTitle>
          <DialogDescription>
            Upload educational content to support question generation and student learning
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Material Title</Label>
              <Input id="title" placeholder="e.g., Advanced React Patterns" />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-dev">Web Development</SelectItem>
                  <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                  <SelectItem value="data-structures">Data Structures</SelectItem>
                  <SelectItem value="database">Database Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Material Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lecture-notes">Lecture Notes</SelectItem>
                  <SelectItem value="reference">Reference Material</SelectItem>
                  <SelectItem value="practice">Practice Problems</SelectItem>
                  <SelectItem value="presentation">Presentation</SelectItem>
                  <SelectItem value="quick-ref">Quick Reference</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" placeholder="e.g., React, Hooks, Advanced" />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe what this material covers and how it can be used..."
              rows={3}
            />
          </div>

          <div>
            <Label>Upload Files</Label>
            <FileUpload
              acceptedFileTypes=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md"
              multiple={false}
              onUpload={setUploadedFiles}
              maxFileSize={10} // 10MB
            />
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT, MD (Max: 10MB)
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Upload Material</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function FacultyMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="h-3 w-3 mr-1" />
          Pending Review
        </Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          Needs Revision
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'Lecture Notes': 'bg-blue-100 text-blue-800',
      'Reference Material': 'bg-purple-100 text-purple-800',
      'Practice Problems': 'bg-green-100 text-green-800',
      'Presentation': 'bg-orange-100 text-orange-800',
      'Quick Reference': 'bg-pink-100 text-pink-800'
    };
    const color = colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    return <Badge className={`${color} hover:${color}`}>{type}</Badge>;
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileIcon className="h-4 w-4 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileIcon className="h-4 w-4 text-blue-500" />;
      case 'ppt':
      case 'pptx':
        return <FileIcon className="h-4 w-4 text-orange-500" />;
      default:
        return <FileIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = subjectFilter === 'all' || material.subject === subjectFilter;
    const matchesStatus = statusFilter === 'all' || material.status === statusFilter;
    const matchesType = typeFilter === 'all' || material.type === typeFilter;
    
    return matchesSearch && matchesSubject && matchesStatus && matchesType;
  });

  const totalMaterials = mockMaterials.length;
  const approvedMaterials = mockMaterials.filter(m => m.status === 'approved').length;
  const totalDownloads = mockMaterials.reduce((sum, m) => sum + m.downloads, 0);
  const pendingMaterials = mockMaterials.filter(m => m.status === 'pending').length;

  return (
    <ProtectedRoute allowedRoles={['faculty']}>
      <DashboardLayout sidebar={<FacultySidebar />}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
              <p className="mt-2 text-gray-600">
                Manage your educational content and resources for students
              </p>
            </div>
            <UploadMaterialDialog />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalMaterials}</div>
                <p className="text-xs text-muted-foreground">
                  Uploaded materials
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{approvedMaterials}</div>
                <p className="text-xs text-muted-foreground">
                  Available for use
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalDownloads}</div>
                <p className="text-xs text-muted-foreground">
                  Student downloads
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingMaterials}</div>
                <p className="text-xs text-muted-foreground">
                  Awaiting approval
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Materials Management */}
          <Card>
            <CardHeader>
              <CardTitle>My Study Materials</CardTitle>
              <CardDescription>
                Manage your uploaded educational content and track their usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search materials by title, description, or tags..."
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
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem value="Data Structures">Data Structures</SelectItem>
                    <SelectItem value="Database Systems">Database Systems</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Lecture Notes">Lecture Notes</SelectItem>
                    <SelectItem value="Reference Material">Reference</SelectItem>
                    <SelectItem value="Practice Problems">Practice</SelectItem>
                    <SelectItem value="Presentation">Presentation</SelectItem>
                    <SelectItem value="Quick Reference">Quick Ref</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Materials Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material Details</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>File Info</TableHead>
                      <TableHead>Uploaded</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{material.title}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {material.description}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {material.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {material.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{material.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{material.subject}</TableCell>
                        <TableCell>{getTypeBadge(material.type)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getFileIcon(material.fileName)}
                            <div>
                              <div className="text-sm font-medium">{material.fileName}</div>
                              <div className="text-xs text-gray-500">{material.size}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{material.uploadDate}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{material.downloads}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(material.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {material.status === 'approved' && (
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
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
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}