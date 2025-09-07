'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthState } from '@/types/auth';

// Hardcoded test users for demo
const TEST_USERS = [
  {
    id: '1',
    email: 'hod@university.edu',
    name: 'Dr. John Smith',
    role: 'hod' as UserRole,
    department: 'Computer Science',
    password: 'hod123'
  },
  {
    id: '2',
    email: 'coordinator@university.edu',
    name: 'Prof. Sarah Johnson',
    role: 'coordinator' as UserRole,
    department: 'Computer Science',
    subjects: ['Data Structures', 'Algorithms', 'Database Systems'],
    password: 'coord123'
  },
  {
    id: '3',
    email: 'faculty@university.edu',
    name: 'Dr. Michael Brown',
    role: 'faculty' as UserRole,
    department: 'Computer Science',
    subjects: ['Web Development', 'Mobile App Development'],
    password: 'faculty123'
  }
];

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on mount
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Find user in test data
    const testUser = TEST_USERS.find(
      u => u.email === email && u.password === password && u.role === role
    );

    if (testUser) {
      const { password: _, ...userWithoutPassword } = testUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}