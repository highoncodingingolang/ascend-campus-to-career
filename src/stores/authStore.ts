import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'student' | 'faculty' | 'college_admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  college?: string;
  department?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
}

// Mock users for demo
const mockUsers: Record<string, User> = {
  'student@demo.com': {
    id: '1',
    name: 'Rahul Sharma',
    email: 'student@demo.com',
    role: 'student',
    college: 'IIT Delhi',
    department: 'Computer Science',
  },
  'faculty@demo.com': {
    id: '2',
    name: 'Dr. Priya Patel',
    email: 'faculty@demo.com',
    role: 'faculty',
    college: 'IIT Delhi',
    department: 'Computer Science',
  },
  'admin@demo.com': {
    id: '3',
    name: 'Vikram Singh',
    email: 'admin@demo.com',
    role: 'college_admin',
    college: 'IIT Delhi',
  },
  'super@demo.com': {
    id: '4',
    name: 'Anjali Gupta',
    email: 'super@demo.com',
    role: 'super_admin',
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, _password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const user = mockUsers[email.toLowerCase()];
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: 'lms-auth',
    }
  )
);
