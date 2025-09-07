export type UserRole = 'hod' | 'coordinator' | 'faculty';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  subjects?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}