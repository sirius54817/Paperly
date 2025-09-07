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
import { 
  User, 
  FileText, 
  BookOpen, 
  MessageSquare,
  Edit, 
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Clock,
  Target,
  TrendingUp,
  Users,
  CheckCircle
} from 'lucide-react';

// Mock faculty profile data
const mockProfile = {
  id: 'faculty-001',
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  phone: '+1 234-567-8901',
  office: 'CS-201',
  department: 'Computer Science',
  designation: 'Professor',
  experience: '15 years',
  qualification: 'Ph.D. in Computer Science',
  specialization: ['Data Structures', 'Algorithms', 'Database Systems', 'Web Development'],
  joinDate: '2024-01-15',
  employeeId: 'CS-2024-001',
  biography: 'Dr. Sarah Johnson is a dedicated educator with over 15 years of experience in computer science education. She specializes in data structures, algorithms, and database systems, with a passion for innovative teaching methodologies.',
  researchInterests: ['Machine Learning', 'Database Optimization', 'Educational Technology'],
  achievements: [
    'Best Faculty Award 2023',
    'Research Excellence Award 2022',
    'Outstanding Teaching Award 2021'
  ]
};

// Mock statistics
const mockStats = {
  papersGenerated: 24,
  materialsUploaded: 18,
  feedbackProvided: 12,
  studentsTeaching: 340,
  coursesHandling: 3,
  averageRating: 4.7
};

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
        <Button variant="ghost" className="w-full justify-start" asChild>
          <a href="/dashboard/faculty/feedback">
            <MessageSquare className="mr-2 h-4 w-4" />
            Feedback
          </a>
        </Button>
        <Button variant="default" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Profile
        </Button>
      </nav>
    </div>
  );
}

export default function FacultyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(mockProfile);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setProfileData(mockProfile); // Reset to original data
  };

  return (
    <ProtectedRoute allowedRoles={['faculty']}>
      <DashboardLayout sidebar={<FacultySidebar />}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="mt-2 text-gray-600">
                Manage your personal information and academic details
              </p>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Papers</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.papersGenerated}</div>
                <p className="text-xs text-muted-foreground">Generated</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Materials</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.materialsUploaded}</div>
                <p className="text-xs text-muted-foreground">Uploaded</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Feedback</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.feedbackProvided}</div>
                <p className="text-xs text-muted-foreground">Provided</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.studentsTeaching}</div>
                <p className="text-xs text-muted-foreground">Teaching</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Courses</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.coursesHandling}</div>
                <p className="text-xs text-muted-foreground">Handling</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.averageRating}</div>
                <p className="text-xs text-muted-foreground">Average</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Personal Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Your basic personal and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        />
                      ) : (
                        <div className="flex items-center mt-2">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{profileData.name}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <div className="flex items-center mt-2">
                        <Badge variant="outline">{profileData.employeeId}</Badge>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      ) : (
                        <div className="flex items-center mt-2">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{profileData.email}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      ) : (
                        <div className="flex items-center mt-2">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{profileData.phone}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="office">Office</Label>
                      {isEditing ? (
                        <Input
                          id="office"
                          value={profileData.office}
                          onChange={(e) => setProfileData({...profileData, office: e.target.value})}
                        />
                      ) : (
                        <div className="flex items-center mt-2">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{profileData.office}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="joinDate">Join Date</Label>
                      <div className="flex items-center mt-2">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{profileData.joinDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="biography">Biography</Label>
                    {isEditing ? (
                      <Textarea
                        id="biography"
                        value={profileData.biography}
                        onChange={(e) => setProfileData({...profileData, biography: e.target.value})}
                        rows={4}
                      />
                    ) : (
                      <div className="mt-2 text-gray-700">
                        {profileData.biography}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Academic Information */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>
                    Your academic qualifications and role
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Department</Label>
                    <div className="flex items-center mt-2">
                      <GraduationCap className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{profileData.department}</span>
                    </div>
                  </div>

                  <div>
                    <Label>Designation</Label>
                    <div className="mt-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {profileData.designation}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label>Experience</Label>
                    <div className="flex items-center mt-2">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{profileData.experience}</span>
                    </div>
                  </div>

                  <div>
                    <Label>Qualification</Label>
                    <div className="mt-2 text-gray-700">
                      {profileData.qualification}
                    </div>
                  </div>

                  <div>
                    <Label>Specialization</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.specialization.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Research Interests</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.researchInterests.map((interest, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-800 text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Awards</CardTitle>
              <CardDescription>
                Recognition and accomplishments in your academic career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {profileData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <Award className="h-8 w-8 text-yellow-600 mr-3" />
                    <div>
                      <div className="font-semibold text-yellow-900">{achievement}</div>
                      <div className="text-sm text-yellow-700">
                        {achievement.includes('2023') ? '2023' : 
                         achievement.includes('2022') ? '2022' : '2021'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity Summary</CardTitle>
              <CardDescription>
                Your recent activities in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <div className="font-medium">Generated 3 new papers this week</div>
                    <div className="text-sm text-gray-600">Mid-term exams for Data Structures and Web Development</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <div className="font-medium">Uploaded 2 new study materials</div>
                    <div className="text-sm text-gray-600">Advanced React patterns and JavaScript ES6 guide</div>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <div className="font-medium">Provided feedback on 4 papers</div>
                    <div className="text-sm text-gray-600">Suggestions for improving question quality and coverage</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}