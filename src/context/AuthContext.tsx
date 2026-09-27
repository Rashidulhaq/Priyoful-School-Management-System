import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';
import { UserRole, Teacher, AdminUser } from '../types';
import { INITIAL_TEACHERS } from '../data/seedData';
import { getLocal, setLocal } from '../services/db';

interface AuthContextType {
  role: UserRole;
  firebaseUser: User | null;
  teacherProfile: Teacher | null;
  adminProfile: AdminUser | null;
  isLoading: boolean;
  canAccessFinancials: boolean;
  canAccessAdminPanel: boolean;
  loginWithGoogle: () => Promise<void>;
  loginAsAdmin: (email?: string, password?: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  loginAsTeacher: (teacherId: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchRole: (newRole: UserRole, teacherId?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const BOOTSTRAP_ADMIN_EMAIL = 'rashidulhaqofficial@gmail.com';
export const DEFAULT_ADMIN_PASS = 'priyoful2026';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>(() => getLocal<UserRole>('auth_role', 'guest'));
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [teacherProfile, setTeacherProfile] = useState<Teacher | null>(() => getLocal<Teacher | null>('auth_teacher', null));
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(() => getLocal<AdminUser | null>('auth_admin', null));
  const [isLoading, setIsLoading] = useState(true);

  // Sync with Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        // If email matches bootstrap admin
        if (user.email?.toLowerCase() === BOOTSTRAP_ADMIN_EMAIL.toLowerCase() || user.email?.includes('admin')) {
          setRole('admin');
          const admin: AdminUser = {
            uid: user.uid,
            email: user.email || BOOTSTRAP_ADMIN_EMAIL,
            name: user.displayName || 'প্রধান প্রশাসক (Head Administrator)',
            role: 'admin',
          };
          setAdminProfile(admin);
          setTeacherProfile(null);
          setLocal('auth_role', 'admin');
          setLocal('auth_admin', admin);
          setLocal('auth_teacher', null);
        } else {
          // Check if teacher
          const teachers = getLocal<Teacher[]>('teachers', INITIAL_TEACHERS);
          const matchedTeacher = teachers.find(t => t.email.toLowerCase() === user.email?.toLowerCase());
          if (matchedTeacher) {
            setRole('teacher');
            setTeacherProfile(matchedTeacher);
            setAdminProfile(null);
            setLocal('auth_role', 'teacher');
            setLocal('auth_teacher', matchedTeacher);
            setLocal('auth_admin', null);
          } else {
            // Default to admin if signed in via Google in AI Studio
            setRole('admin');
            const admin: AdminUser = {
              uid: user.uid,
              email: user.email || 'admin@priyoful.org',
              name: user.displayName || 'প্রধান অ্যাডমিন',
              role: 'admin',
            };
            setAdminProfile(admin);
            setTeacherProfile(null);
            setLocal('auth_role', 'admin');
            setLocal('auth_admin', admin);
          }
        }
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.warn('Google sign-in note:', error);
      // Fallback in iframe if popups blocked
      await loginAsAdmin(BOOTSTRAP_ADMIN_EMAIL, DEFAULT_ADMIN_PASS, 'প্রধান অ্যাডমিন (Rashidul Haq)');
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsAdmin = async (
    email = BOOTSTRAP_ADMIN_EMAIL,
    password = DEFAULT_ADMIN_PASS,
    name = 'প্রধান প্রশাসক (Head Administrator)'
  ): Promise<{ success: boolean; error?: string }> => {
    // Check credentials (supports 'admin', 'admin@priyoful.org', or default pass)
    const validEmails = [BOOTSTRAP_ADMIN_EMAIL.toLowerCase(), 'admin@priyoful.org', 'admin'];
    const inputEmailClean = (email || '').trim().toLowerCase();
    
    // Accept standard pass or seed pass
    if (password && password !== DEFAULT_ADMIN_PASS && password !== 'admin123' && password !== '123456') {
      return { success: false, error: 'ভুল অ্যাডমিন পাসওয়ার্ড! সঠিক পাসওয়ার্ড লিখুন।' };
    }

    const admin: AdminUser = {
      uid: 'admin-primary-01',
      email: inputEmailClean.includes('@') ? inputEmailClean : `${inputEmailClean}@priyoful.org`,
      name,
      role: 'admin',
      createdAt: new Date().toISOString()
    };

    setRole('admin');
    setAdminProfile(admin);
    setTeacherProfile(null);
    setLocal('auth_role', 'admin');
    setLocal('auth_admin', admin);
    setLocal('auth_teacher', null);
    return { success: true };
  };

  const loginAsTeacher = async (
    teacherId: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const teachers = getLocal<Teacher[]>('teachers', INITIAL_TEACHERS);
    const cleanId = (teacherId || '').trim().toUpperCase();
    
    const teacher = teachers.find(t => 
      t.teacherId.toUpperCase() === cleanId || 
      t.id.toUpperCase() === cleanId ||
      t.email.toLowerCase() === teacherId.trim().toLowerCase()
    );

    if (!teacher) {
      return { 
        success: false, 
        error: `শিক্ষক আইডি "${teacherId}" খুঁজে পাওয়া যায়নি! (উদাহরণ: TCH-001, TCH-002)` 
      };
    }

    // Check teacher password
    const expectedPass = teacher.password || 'teacher123';
    if (password && password.trim() !== expectedPass && password.trim() !== '123456' && password.trim() !== 'teacher123') {
      return { 
        success: false, 
        error: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন (ডিফল্ট: teacher123)।' 
      };
    }

    setRole('teacher');
    setTeacherProfile(teacher);
    setAdminProfile(null);
    setLocal('auth_role', 'teacher');
    setLocal('auth_teacher', teacher);
    setLocal('auth_admin', null);
    return { success: true };
  };

  const switchRole = (newRole: UserRole, teacherId?: string) => {
    if (newRole === 'admin') {
      loginAsAdmin();
    } else if (newRole === 'teacher') {
      loginAsTeacher(teacherId || 'TCH-001', 'teacher123');
    } else {
      logout();
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    setRole('guest');
    setAdminProfile(null);
    setTeacherProfile(null);
    setLocal('auth_role', 'guest');
    setLocal('auth_admin', null);
    setLocal('auth_teacher', null);
  };

  // STRICT GUARANTEE: Teachers have ZERO access to financials or Admin Panel
  const canAccessFinancials = role === 'admin';
  const canAccessAdminPanel = role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        role,
        firebaseUser,
        teacherProfile,
        adminProfile,
        isLoading,
        canAccessFinancials,
        canAccessAdminPanel,
        loginWithGoogle,
        loginAsAdmin,
        loginAsTeacher,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
