'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  BookOpen, 
  Users, 
  BarChart3, 
  Shield, 
  Clock,
  CheckCircle,
  ArrowRight,
  Brain,
  FileText,
  Target
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Generation",
      description: "Automatically generate question papers using advanced AI with customizable difficulty levels and Bloom's taxonomy distribution."
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Role-Based Dashboards",
      description: "Separate interfaces for HoD, Course Coordinators, and Faculty with role-specific features and permissions."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-purple-600" />,
      title: "Question Bank Management",
      description: "Comprehensive question repository with categorization, tagging, and smart search capabilities."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: "Analytics & Insights",
      description: "Track paper generation metrics, question usage patterns, and performance analytics across subjects."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with role-based access control and audit trails for educational institutions."
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      title: "Quick Generation",
      description: "Generate complete question papers in seconds with automatic formatting and export capabilities."
    }
  ];

  const roles = [
    {
      title: "Head of Department",
      description: "Monitor faculty performance, approve question papers, and oversee department-wide analytics.",
      features: ["Faculty management", "Approval workflows", "Department analytics", "Subject oversight"]
    },
    {
      title: "Course Coordinator",
      description: "Generate question papers, manage rubrics, and maintain question banks for assigned courses.",
      features: ["AI paper generation", "Question bank curation", "Rubric management", "RAG context setup"]
    },
    {
      title: "Faculty Member",
      description: "Access teaching materials, submit questions, and receive feedback on contributed content.",
      features: ["Material access", "Question submission", "Performance feedback", "Course resources"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">Paperly</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center">
          <Badge className="mb-4" variant="outline">
            🚀 AI-Powered Question Paper Generation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Smart Question Paper
            <br />
            <span className="text-blue-600">Generation System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your educational assessment process with AI-powered question paper generation. 
            Create, manage, and distribute assessments with unprecedented efficiency and intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/login">
                Start Generating Papers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Education
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to streamline question paper creation and management in one intelligent platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Roles Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Every Educational Role
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored experiences and features designed specifically for different roles in academic institutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Assessment Process?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join educational institutions worldwide who are already using Paperly to create smarter, 
            more efficient question papers with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/login">
                <Target className="mr-2 h-5 w-5" />
                Start Your Journey
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <FileText className="h-6 w-6 text-blue-400 mr-2" />
              <span className="text-xl font-bold">Paperly</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Paperly. Built for educational excellence.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
