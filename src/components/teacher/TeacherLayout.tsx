import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  CalendarCheck,
  Award,
  BookOpen,
  FileText,
  Bell,
  User,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  Heart
} from 'lucide-react';

interface TeacherLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const TeacherLayout: React.FC<TeacherLayoutProps> = ({
  children,
  activeSection,
  setActiveSection,
}) => {
  const { teacherProfile, logout, role } = useAuth();
  const { setActiveTab, students } = useSchool();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const assignedClass = teacherProfile?.assignedClass || 'Class 1';
  const myStudentsCount = students.filter(s => s.class === assignedClass && s.status === 'Active').length;

  const menuItems = [
    { id: 'dashboard', label: 'শ্রেণিকক্ষ ড্যাশবোর্ড', icon: LayoutDashboard },
    { id: 'students', label: `আমার শিক্ষার্থী (${assignedClass})`, icon: Users, badge: `${myStudentsCount} জন` },
    { id: 'attendance', label: 'দৈনিক হাজিরা গ্রহণ', icon: CalendarCheck },
    { id: 'academics', label: 'পরীক্ষার ফলাফল ও নম্বর', icon: Award },
    { id: 'materials', label: 'পড়াশোনার শিট ও লেকচার', icon: FileText },
    { id: 'books', label: 'লাইব্রেরি ও বই সংগ্রহ', icon: BookOpen },
    { id: 'notices', label: 'নোটিশ বোর্ড ও বিজ্ঞপ্তি', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex">
      
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Teacher Workspace Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 shadow-lg lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-emerald-700 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 p-0.5 flex items-center justify-center text-xl">
                🌻
              </div>
              <div>
                <span className="font-black text-lg text-white font-outfit block tracking-tight">
                  PRIYOFUL
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200 bg-white/10 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                  <GraduationCap className="w-3 h-3" />
                  শিক্ষক পোর্টাল
                </span>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Teacher Badge Card */}
          <div className="p-4 bg-emerald-50/70 border-b border-emerald-100/80">
            <div className="flex items-center gap-3">
              <img
                src={teacherProfile?.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'}
                alt={teacherProfile?.fullName || 'Teacher'}
                className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500 shadow-xs shrink-0"
              />
              <div className="grow min-w-0">
                <strong className="text-xs font-black text-slate-900 block truncate">
                  {teacherProfile?.fullName || 'স্বেচ্ছাসেবী শিক্ষক'}
                </strong>
                <span className="text-[11px] font-bold text-emerald-700 block">
                  শ্রেণি শিক্ষক: {assignedClass}
                </span>
                <span className="text-[10px] text-slate-500 block truncate">
                  আইডি: {teacherProfile?.teacherId || 'TCH-001'} • {teacherProfile?.subject}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items (Strictly Educational & Classroom) */}
          <nav className="grow overflow-y-auto px-3 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white font-black shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Portal Switch & Sign Out */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2.5 text-xs">
            {/* If Main Admin is viewing, show button to return to Admin panel */}
            {role === 'admin' ? (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-center space-y-1">
                <span className="text-[11px] font-bold block">অ্যাডমিন প্রিভিউ মোড</span>
                <button
                  onClick={() => setActiveTab('admin-dashboard')}
                  className="w-full py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold flex items-center justify-center gap-1.5 transition-colors text-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>অ্যাডমিন প্যানেলে ফিরুন</span>
                </button>
              </div>
            ) : (
              /* For regular teachers, only show public site link */
              <button
                onClick={() => setActiveTab('home')}
                className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>স্কুল ওয়েবসাইট দেখুন</span>
              </button>
            )}

            <button
              onClick={() => {
                logout();
                setActiveTab('home');
              }}
              className="w-full py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>লগআউট করুন</span>
            </button>
          </div>

        </div>
      </aside>

      {/* Main Workspace Body */}
      <div className="grow flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                ক্লাসরুম ও শিক্ষা পোর্টাল
              </span>
              <h1 className="text-lg font-black text-slate-900 font-outfit uppercase tracking-tight">
                {menuItems.find(m => m.id === activeSection)?.label}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full hidden sm:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              নির্ধারিত শ্রেণি: {assignedClass}
            </span>

            {/* If Admin is viewing, show quick return button */}
            {role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin-dashboard')}
                className="text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1 rounded-lg hover:bg-amber-400 flex items-center gap-1"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>অ্যাডমিন প্যানেল</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('home')}
              className="text-xs font-bold text-slate-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">মূল ওয়েবসাইট</span>
            </button>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="p-4 sm:p-6 lg:p-8 grow space-y-6 max-w-7xl w-full mx-auto">
          {children}
        </main>

      </div>

    </div>
  );
};
