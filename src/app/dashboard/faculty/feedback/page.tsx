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
import { 
  MessageSquare, 
  FileText, 
  User, 
  BookOpen,
  Send, 
  Plus, 
  Eye,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  ThumbsUp,
  MessageCircle,
  Filter
} from 'lucide-react';

// Mock feedback data
const mockFeedback = [
  {
    id: '1',
    paperTitle: 'Mid-Term Exam - Data Structures',
    paperSubject: 'Data Structures',
    message: 'The questions on linked lists are well-structured, but I suggest adding more practical implementation problems. Students would benefit from code debugging questions.',
    sentDate: '2024-03-16',
    status: 'sent',
    rating: 4,
    coordinatorResponse: 'Thank you for the feedback. We will include more practical problems in the next version.',
    responseDate: '2024-03-17',
    type: 'suggestion'
  },
  {
    id: '2',
    paperTitle: 'Assignment 1 - Web Development',
    paperSubject: 'Web Development',
    message: 'Consider adding questions about modern React hooks and state management. The current questions focus too much on basic concepts.',
    sentDate: '2024-03-12',
    status: 'acknowledged',
    rating: 3,
    coordinatorResponse: 'We appreciate your input. The next assignment will cover advanced React topics.',
    responseDate: '2024-03-13',
    type: 'improvement'
  },
  {
    id: '3',
    paperTitle: 'Quiz 2 - Database Systems',
    paperSubject: 'Database Systems',
    message: 'The normalization questions are excellent. However, please add more SQL query optimization problems.',
    sentDate: '2024-03-10',
    status: 'draft',
    rating: 5,
    coordinatorResponse: null,
    responseDate: null,
    type: 'appreciation'
  },
  {
    id: '4',
    paperTitle: 'Final Exam - Mobile Development',
    paperSubject: 'Mobile Development',
    message: 'The paper covers theoretical concepts well but lacks hands-on coding challenges. Mobile development requires more practical assessment.',
    sentDate: '2024-03-08',
    status: 'under-review',
    rating: 2,
    coordinatorResponse: null,
    responseDate: null,
    type: 'concern'
  }
];

// Mock recent papers for feedback
const mockRecentPapers = [
  { id: '1', title: 'Mid-Term Exam - Advanced Algorithms', subject: 'Algorithms', date: '2024-03-20' },
  { id: '2', title: 'Assignment 3 - React Performance', subject: 'Web Development', date: '2024-03-18' },
  { id: '3', title: 'Quiz 4 - Database Indexing', subject: 'Database Systems', date: '2024-03-15' }
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
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/dashboard/faculty/materials">
            <BookOpen className="mr-2 h-4 w-4" />
            Study Materials
          </a>
        </Button>
        <Button variant="default" className="w-full justify-start">
          <MessageSquare className="mr-2 h-4 w-4" />
          Feedback
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

function ProvideFeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Provide Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Provide Paper Feedback</DialogTitle>
          <DialogDescription>
            Share your thoughts and suggestions about a question paper
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paper">Select Paper</Label>
              <Select value={selectedPaper} onValueChange={setSelectedPaper}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a paper" />
                </SelectTrigger>
                <SelectContent>
                  {mockRecentPapers.map((paper) => (
                    <SelectItem key={paper.id} value={paper.id}>
                      {paper.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type">Feedback Type</Label>
              <Select value={feedbackType} onValueChange={setFeedbackType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="appreciation">Appreciation</SelectItem>
                  <SelectItem value="concern">Concern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Overall Rating</Label>
            <div className="flex space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400 transition-colors`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="message">Feedback Message</Label>
            <Textarea 
              id="message"
              placeholder="Share your detailed feedback, suggestions, or concerns about the paper..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Feedback Guidelines</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Be specific about which sections or questions you're referring to</li>
              <li>• Provide constructive suggestions for improvement</li>
              <li>• Consider student learning outcomes and difficulty level</li>
              <li>• Mention any gaps in content coverage</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>
            <Send className="mr-2 h-4 w-4" />
            Send Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function FacultyFeedbackPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Send className="h-3 w-3 mr-1" />
          Sent
        </Badge>;
      case 'acknowledged':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          Acknowledged
        </Badge>;
      case 'under-review':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          <Clock className="h-3 w-3 mr-1" />
          Under Review
        </Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          <AlertCircle className="h-3 w-3 mr-1" />
          Draft
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'suggestion': 'bg-blue-100 text-blue-800',
      'improvement': 'bg-purple-100 text-purple-800',
      'appreciation': 'bg-green-100 text-green-800',
      'concern': 'bg-red-100 text-red-800'
    };
    const color = colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    return <Badge className={`${color} hover:${color} capitalize`}>{type}</Badge>;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredFeedback = mockFeedback.filter(feedback => {
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    const matchesType = typeFilter === 'all' || feedback.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const totalFeedback = mockFeedback.length;
  const sentFeedback = mockFeedback.filter(f => f.status === 'sent' || f.status === 'acknowledged').length;
  const acknowledgedFeedback = mockFeedback.filter(f => f.status === 'acknowledged').length;
  const averageRating = mockFeedback.reduce((sum, f) => sum + f.rating, 0) / mockFeedback.length;

  return (
    <ProtectedRoute allowedRoles={['faculty']}>
      <DashboardLayout sidebar={<FacultySidebar />}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
              <p className="mt-2 text-gray-600">
                Provide feedback on question papers and track responses
              </p>
            </div>
            <ProvideFeedbackDialog />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalFeedback}</div>
                <p className="text-xs text-muted-foreground">
                  Feedback provided
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sent</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sentFeedback}</div>
                <p className="text-xs text-muted-foreground">
                  Successfully sent
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{acknowledgedFeedback}</div>
                <p className="text-xs text-muted-foreground">
                  Received response
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">
                  Your ratings
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Management */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback History</CardTitle>
              <CardDescription>
                Track your feedback submissions and coordinator responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex space-x-4 mb-6">
                <div>
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="acknowledged">Acknowledged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type-filter">Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                      <SelectItem value="improvement">Improvement</SelectItem>
                      <SelectItem value="appreciation">Appreciation</SelectItem>
                      <SelectItem value="concern">Concern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Feedback Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Paper & Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Feedback</TableHead>
                      <TableHead>Sent Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Response</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFeedback.map((feedback) => (
                      <TableRow key={feedback.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{feedback.paperTitle}</div>
                            <div className="text-sm text-gray-500">{feedback.paperSubject}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getTypeBadge(feedback.type)}</TableCell>
                        <TableCell>{renderStars(feedback.rating)}</TableCell>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="text-sm truncate">{feedback.message}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{feedback.sentDate}</div>
                        </TableCell>
                        <TableCell>{getStatusBadge(feedback.status)}</TableCell>
                        <TableCell>
                          {feedback.coordinatorResponse ? (
                            <div className="max-w-xs">
                              <div className="text-sm truncate">{feedback.coordinatorResponse}</div>
                              <div className="text-xs text-gray-500">{feedback.responseDate}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">No response yet</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {feedback.coordinatorResponse && (
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Responses */}
          {mockFeedback.filter(f => f.coordinatorResponse).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Coordinator Responses</CardTitle>
                <CardDescription>
                  Latest responses to your feedback submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFeedback
                    .filter(f => f.coordinatorResponse)
                    .slice(0, 3)
                    .map((feedback) => (
                      <div key={feedback.id} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-medium text-green-900 mb-1">
                              Response to: {feedback.paperTitle}
                            </div>
                            <div className="text-green-800 mb-2">{feedback.coordinatorResponse}</div>
                            <div className="text-sm text-green-600">
                              Responded on {feedback.responseDate}
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            Acknowledged
                          </Badge>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}