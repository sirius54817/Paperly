'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { ProtectedRoute } from '@/lib/auth/protected-route';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  BookOpen, 
  Settings, 
  Download,
  Upload,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  FileText,
  Wand2,
  Eye,
  Calendar,
  Target
} from 'lucide-react';

// Mock data for generated papers
const mockGeneratedPapers = [
  {
    id: '1',
    title: 'Mid-Term Exam - Data Structures',
    subject: 'Data Structures',
    unit: 'Linear Data Structures',
    totalMarks: 100,
    totalQuestions: 8,
    difficulty: 'medium',
    bloomDistribution: { remember: 20, understand: 30, apply: 30, analyze: 20 },
    generatedDate: '2024-03-20',
    status: 'completed',
    generationTime: '45s',
    generatedBy: 'AI Assistant'
  },
  {
    id: '2',
    title: 'Assignment 1 - Database Design',
    subject: 'Database Systems',
    unit: 'ER Modeling',
    totalMarks: 50,
    totalQuestions: 5,
    difficulty: 'easy',
    bloomDistribution: { remember: 40, understand: 40, apply: 20 },
    generatedDate: '2024-03-18',
    status: 'completed',
    generationTime: '32s',
    generatedBy: 'AI Assistant'
  },
  {
    id: '3',
    title: 'Final Exam - Algorithms',
    subject: 'Algorithms',
    unit: 'All Units',
    totalMarks: 150,
    totalQuestions: 12,
    difficulty: 'hard',
    bloomDistribution: { understand: 20, apply: 30, analyze: 30, evaluate: 20 },
    generatedDate: '2024-03-15',
    status: 'in-progress',
    generationTime: '1m 15s',
    generatedBy: 'AI Assistant'
  }
];

// Helpers used across this module (shared by the wizard and the history table)
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
    case 'in-progress':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
    case 'failed':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty) {
    case 'easy':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Easy</Badge>;
    case 'medium':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>;
    case 'hard':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Hard</Badge>;
    default:
      return <Badge variant="outline">{difficulty}</Badge>;
  }
};

function CoordinatorSidebar() {
  return (
    <div className="p-6">
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/coordinator">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
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
        <Button variant="default" className="w-full justify-start">
          <Zap className="mr-2 h-4 w-4" />
          Generate Papers
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

function PaperGenerationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    units: [] as string[],
    totalMarks: 100,
    totalQuestions: 8,
    difficulty: 'medium',
    bloomDistribution: {
      remember: 20,
      understand: 30,
      apply: 30,
      analyze: 20,
      evaluate: 0,
      create: 0
    },
    questionTypes: {
      mcq: false,
      shortAnswer: true,
      longAnswer: true,
      practical: false
    },
    instructions: ''
  });

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Paper details and subject' },
    { id: 2, title: 'Configuration', description: 'Marks and question distribution' },
    { id: 3, title: 'Bloom\'s Taxonomy', description: 'Cognitive level distribution' },
    { id: 4, title: 'Review & Generate', description: 'Final review and generation' }
  ];

  // using module-level helpers: getStatusBadge, getDifficultyBadge

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Paper Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., Mid-Term Exam - Data Structures"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Data Structures">Data Structures</SelectItem>
                  <SelectItem value="Database Systems">Database Systems</SelectItem>
                  <SelectItem value="Algorithms">Algorithms</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Units to Include</Label>
              <div className="mt-2 space-y-2">
                {['Linear Data Structures', 'Trees', 'Graphs', 'Sorting Algorithms'].map((unit) => (
                  <div key={unit} className="flex items-center space-x-2">
                    <Checkbox 
                      id={unit}
                      checked={formData.units.includes(unit)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({...formData, units: [...formData.units, unit]});
                        } else {
                          setFormData({...formData, units: formData.units.filter(u => u !== unit)});
                        }
                      }}
                    />
                    <Label htmlFor={unit}>{unit}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalMarks">Total Marks</Label>
                <Input 
                  id="totalMarks" 
                  type="number"
                  value={formData.totalMarks}
                  onChange={(e) => setFormData({...formData, totalMarks: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="totalQuestions">Total Questions</Label>
                <Input 
                  id="totalQuestions" 
                  type="number"
                  value={formData.totalQuestions}
                  onChange={(e) => setFormData({...formData, totalQuestions: parseInt(e.target.value)})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="difficulty">Overall Difficulty</Label>
              <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Question Types</Label>
              <div className="mt-2 space-y-2">
                {Object.entries(formData.questionTypes).map(([type, checked]) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={type}
                      checked={checked}
                      onCheckedChange={(isChecked) => 
                        setFormData({
                          ...formData, 
                          questionTypes: {...formData.questionTypes, [type]: isChecked}
                        })
                      }
                    />
                    <Label htmlFor={type} className="capitalize">
                      {type.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label>Bloom's Taxonomy Distribution (%)</Label>
              <div className="mt-4 space-y-4">
                {Object.entries(formData.bloomDistribution).map(([level, percentage]) => (
                  <div key={level} className="flex items-center space-x-4">
                    <Label className="w-24 capitalize">{level}</Label>
                    <div className="flex-1">
                      <Input 
                        type="number"
                        min="0"
                        max="100"
                        value={percentage}
                        onChange={(e) => setFormData({
                          ...formData,
                          bloomDistribution: {
                            ...formData.bloomDistribution,
                            [level]: parseInt(e.target.value) || 0
                          }
                        })}
                        className="w-20"
                      />
                    </div>
                    <div className="flex-1">
                      <Progress value={percentage} className="w-full" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Total: {Object.values(formData.bloomDistribution).reduce((sum, val) => sum + val, 0)}%
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-4">Paper Configuration Summary</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Title:</strong> {formData.title}</div>
                <div><strong>Subject:</strong> {formData.subject}</div>
                <div><strong>Total Marks:</strong> {formData.totalMarks}</div>
                <div><strong>Total Questions:</strong> {formData.totalQuestions}</div>
                <div><strong>Difficulty:</strong> {formData.difficulty}</div>
                <div><strong>Units:</strong> {formData.units.join(', ')}</div>
              </div>
            </div>
            <div>
              <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
              <Textarea 
                id="instructions"
                placeholder="Any specific instructions for the AI generator..."
                value={formData.instructions}
                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                rows={3}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="mr-2 h-5 w-5" />
          AI Paper Generator
        </CardTitle>
        <CardDescription>
          Generate question papers using AI with your custom requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="mx-4 h-px bg-gray-300 w-12"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <div className="flex space-x-2">
            {currentStep < 4 ? (
              <Button onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}>
                Next
              </Button>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Play className="mr-2 h-4 w-4" />
                Generate Paper
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function GeneratePapersPage() {
  const [activeTab, setActiveTab] = useState('generate');

  const totalGenerated = mockGeneratedPapers.length;
  const completedPapers = mockGeneratedPapers.filter(p => p.status === 'completed').length;
  const avgGenerationTime = '45s';
  const totalQuestions = mockGeneratedPapers.reduce((sum, p) => sum + p.totalQuestions, 0);

  return (
    <ProtectedRoute allowedRoles={['coordinator']}>
      <DashboardLayout sidebar={<CoordinatorSidebar />}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Generate Papers</h1>
              <p className="mt-2 text-gray-600">
                Create question papers using AI-powered generation with your custom requirements
              </p>
            </div>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              View Templates
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Papers Generated</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalGenerated}</div>
                <p className="text-xs text-muted-foreground">
                  Total created
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedPapers}</div>
                <p className="text-xs text-muted-foreground">
                  Successfully generated
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Generation Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgGenerationTime}</div>
                <p className="text-xs text-muted-foreground">
                  Per paper
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalQuestions}</div>
                <p className="text-xs text-muted-foreground">
                  Generated
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('generate')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'generate'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Generate New Paper
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Generation History
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'generate' && <PaperGenerationWizard />}

          {activeTab === 'history' && (
            <Card>
              <CardHeader>
                <CardTitle>Generation History</CardTitle>
                <CardDescription>
                  View all previously generated papers and their details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Marks</TableHead>
                        <TableHead>Questions</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Generated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockGeneratedPapers.map((paper) => (
                        <TableRow key={paper.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{paper.title}</div>
                              <div className="text-sm text-gray-500">{paper.unit}</div>
                            </div>
                          </TableCell>
                          <TableCell>{paper.subject}</TableCell>
                          <TableCell>{paper.totalMarks}</TableCell>
                          <TableCell>{paper.totalQuestions}</TableCell>
                          <TableCell>{getDifficultyBadge(paper.difficulty)}</TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm">{paper.generatedDate}</div>
                              <div className="text-xs text-gray-500">{paper.generationTime}</div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(paper.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
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
          )}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}