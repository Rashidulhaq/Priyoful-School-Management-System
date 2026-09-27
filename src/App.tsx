import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SchoolProvider, useSchool } from './context/SchoolContext';

// Common
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { FloatingPetals } from './components/common/FloatingPetals';
import { NoticeMarquee } from './components/common/NoticeMarquee';

// Public Pages
import { PublicHome } from './components/public/PublicHome';
import { PublicAbout } from './components/public/PublicAbout';
import { PublicStudents } from './components/public/PublicStudents';
import { PublicTeachers } from './components/public/PublicTeachers';
import { PublicClasses } from './components/public/PublicClasses';
import { PublicActivities } from './components/public/PublicActivities';
import { PublicGallery } from './components/public/PublicGallery';
import { PublicNewsEvents } from './components/public/PublicNewsEvents';
import { PublicDonate } from './components/public/PublicDonate';
import { PublicContact } from './components/public/PublicContact';

// Main Admin Panels
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminStudents } from './components/admin/AdminStudents';
import { AdminTeachers } from './components/admin/AdminTeachers';
import { AdminClasses } from './components/admin/AdminClasses';
import { AdminAttendance } from './components/admin/AdminAttendance';
import { AdminAcademics } from './components/admin/AdminAcademics';
import { AdminBooks } from './components/admin/AdminBooks';
import { AdminMaterials } from './components/admin/AdminMaterials';
import { AdminFinances } from './components/admin/AdminFinances';
import { AdminDonations } from './components/admin/AdminDonations';
import { AdminWebsite } from './components/admin/AdminWebsite';
import { AdminNewsEvents } from './components/admin/AdminNewsEvents';
import { AdminGallery } from './components/admin/AdminGallery';
import { AdminMessages } from './components/admin/AdminMessages';
import { AdminAuditLogs } from './components/admin/AdminAuditLogs';
import { AdminSettings } from './components/admin/AdminSettings';

// Teacher Panels
import { TeacherLayout } from './components/teacher/TeacherLayout';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherStudents } from './components/teacher/TeacherStudents';
import { TeacherAttendance } from './components/teacher/TeacherAttendance';
import { TeacherAcademics } from './components/teacher/TeacherAcademics';
import { TeacherMaterials } from './components/teacher/TeacherMaterials';
import { TeacherBooks } from './components/teacher/TeacherBooks';
import { TeacherNotices } from './components/teacher/TeacherNotices';

// Quick Role switcher icon
import {
  ShieldCheck,
  GraduationCap,
  Globe,
  ChevronUp,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { role, switchRole, teacherProfile } = useAuth();
  const { activeTab, setActiveTab, isReady } = useSchool();
  const [adminSection, setAdminSection] = useState('dashboard');
  const [teacherSection, setTeacherSection] = useState('dashboard');
  const [switcherOpen, setSwitcherOpen] = useState(false);

  // If initial load in progress
  if (!isReady) {
    return (
      <div className="min-h-screen bg-amber-50/40 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-linear-to-br from-amber-400 to-rose-500 p-0.5 shadow-xl animate-bounce">
          <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center text-3xl">
            🌻
          </div>
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-slate-900 font-outfit">PRIYOFUL SCHOOL</h2>
          <p className="text-xs text-slate-500 font-medium">Loading school management system & database...</p>
        </div>
      </div>
    );
  }

  // 1. MAIN ADMIN WORKSPACE (Strictly blocked for teachers, only role === 'admin')
  if (role === 'admin' && (activeTab === 'admin-dashboard' || activeTab.startsWith('admin'))) {
    return (
      <>
        <AdminLayout
          activeSection={adminSection}
          setActiveSection={setAdminSection}
        >
          {adminSection === 'dashboard' && (
            <AdminDashboard
              onNavigate={(section) => setAdminSection(section)}
              onOpenQuickAction={(action) => {
                if (action === 'add-student') setAdminSection('students');
                else if (action === 'add-expense') setAdminSection('finances');
                else if (action === 'add-donation') setAdminSection('donations');
              }}
            />
          )}
          {adminSection === 'students' && <AdminStudents />}
          {adminSection === 'teachers' && <AdminTeachers />}
          {adminSection === 'classes' && <AdminClasses />}
          {adminSection === 'attendance' && <AdminAttendance />}
          {adminSection === 'academics' && <AdminAcademics />}
          {adminSection === 'books' && <AdminBooks />}
          {adminSection === 'materials' && <AdminMaterials />}
          {adminSection === 'finances' && <AdminFinances />}
          {adminSection === 'donations' && <AdminDonations />}
          {adminSection === 'website' && <AdminWebsite />}
          {adminSection === 'news-events' && <AdminNewsEvents />}
          {adminSection === 'gallery' && <AdminGallery />}
          {adminSection === 'messages' && <AdminMessages />}
          {adminSection === 'audit-logs' && <AdminAuditLogs />}
          {adminSection === 'settings' && <AdminSettings />}
        </AdminLayout>
      </>
    );
  }

  // 2. TEACHER WORKSPACE (Accessible to teachers and admin auditing teacher view)
  if ((role === 'teacher' || role === 'admin') && (activeTab === 'teacher-dashboard' || activeTab.startsWith('teacher'))) {
    return (
      <>
        <TeacherLayout
          activeSection={teacherSection}
          setActiveSection={setTeacherSection}
        >
          {teacherSection === 'dashboard' && (
            <TeacherDashboard onNavigate={(section) => setTeacherSection(section)} />
          )}
          {teacherSection === 'students' && <TeacherStudents />}
          {teacherSection === 'attendance' && <TeacherAttendance />}
          {teacherSection === 'academics' && <TeacherAcademics />}
          {teacherSection === 'materials' && <TeacherMaterials />}
          {teacherSection === 'books' && <TeacherBooks />}
          {teacherSection === 'notices' && <TeacherNotices />}
        </TeacherLayout>
      </>
    );
  }

  // Security guard: If teacher tries to go to admin route, block and reset
  if (role === 'teacher' && activeTab.startsWith('admin')) {
    setActiveTab('teacher-dashboard');
  }

  // 3. PUBLIC WEBSITE
  return (
    <div className="min-h-screen flex flex-col justify-between bg-amber-50/20 relative selection:bg-amber-400 selection:text-amber-950">
      <FloatingPetals />
      <Navbar />
      <NoticeMarquee />

      <main className="grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {activeTab === 'home' && <PublicHome />}
            {activeTab === 'about' && <PublicAbout />}
            {activeTab === 'students' && <PublicStudents />}
            {activeTab === 'teachers' && <PublicTeachers />}
            {activeTab === 'classes' && <PublicClasses />}
            {activeTab === 'activities' && <PublicActivities />}
            {activeTab === 'gallery' && <PublicGallery />}
            {activeTab === 'news-events' && <PublicNewsEvents />}
            {activeTab === 'donate' && <PublicDonate />}
            {activeTab === 'contact' && <PublicContact />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <SchoolProvider>
        <MainAppContent />
      </SchoolProvider>
    </AuthProvider>
  );
}
