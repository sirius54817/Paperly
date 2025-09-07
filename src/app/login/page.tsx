'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/auth-context';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, FileText } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('faculty');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password, role);
      if (success) {
        // Redirect based on role
        const dashboardRoutes = {
          hod: '/dashboard/hod',
          coordinator: '/dashboard/coordinator',
          faculty: '/dashboard/faculty'
        };
        router.push(dashboardRoutes[role]);
      } else {
        setError('Invalid credentials. Please check your email, password, and role.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(`${type}-copied`);
    setTimeout(() => setCopied(''), 2000);
  };

  const fillCredentials = (email: string, password: string, roleValue: UserRole) => {
    setEmail(email);
    setPassword(password);
    setRole(roleValue);
  };

  const demoCredentials = [
    { role: 'HoD', email: 'hod@university.edu', password: 'hod123', roleValue: 'hod' as UserRole, color: 'bg-red-50 border-red-200' },
    { role: 'Course Coordinator', email: 'coordinator@university.edu', password: 'coord123', roleValue: 'coordinator' as UserRole, color: 'bg-blue-50 border-blue-200' },
    { role: 'Faculty', email: 'faculty@university.edu', password: 'faculty123', roleValue: 'faculty' as UserRole, color: 'bg-green-50 border-green-200' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back to Home */}
        <div className="flex items-center justify-center">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-2">
              <FileText className="h-8 w-8 text-blue-600 mr-2" />
              <CardTitle className="text-2xl font-bold">
                Paperly
              </CardTitle>
            </div>
            <CardDescription>
              Question Paper Generation System
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hod">Head of Department</SelectItem>
                    <SelectItem value="coordinator">Course Coordinator</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-200">{error}</div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              🚀 Demo Credentials
            </CardTitle>
            <CardDescription>
              Click "Use" to auto-fill credentials or copy them manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${cred.color}`}>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="font-medium">{cred.role}</Badge>
                  <Button 
                    size="sm" 
                    onClick={() => fillCredentials(cred.email, cred.password, cred.roleValue)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Use
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Email:</span>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-2 py-1 rounded border font-mono text-xs">
                        {cred.email}
                      </code>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard(cred.email, `email-${index}`)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Password:</span>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-2 py-1 rounded border font-mono text-xs">
                        {cred.password}
                      </code>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => copyToClipboard(cred.password, `pass-${index}`)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                {copied === `email-${index}-copied` && (
                  <div className="text-xs text-green-600 mt-1">Email copied!</div>
                )}
                {copied === `pass-${index}-copied` && (
                  <div className="text-xs text-green-600 mt-1">Password copied!</div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}