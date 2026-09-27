import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Layers,
  CalendarCheck,
  Award,
  BookOpen,
  FileText,
  DollarSign,
  Heart,
  Globe,
  Bell,
  Camera,
  MessageSquare,
  ShieldAlert,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activeSection,
  setActiveSection,
}) => {
  const { adminProfile, logout, switchRole } = useAuth();
  const { settings, setActiveTab, stats, messages } = useSchool();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadCount = messages.filter(m => m.status === 'Unread').length;

  const menuItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড ওভারভিউ', icon: LayoutDashboard },
    { id: 'students', label: 'শিক্ষার্থী তালিকা ও ভর্তি', icon: Users, badge: `${stats.totalStudents} জন` },
    { id: 'teachers', label: 'শিক্ষক ও স্বেচ্ছাসেবী দল', icon: GraduationCap, badge: `${stats.activeTeachers} জন` },
    { id: 'classes', label: 'শ্রেণি ব্যবস্থাপনা (১ম-৫ম)', icon: Layers },
    { id: 'attendance', label: 'কেন্দ্রীয় হাজিরা রিপোর্ট', icon: CalendarCheck },
    { id: 'academics', label: 'পরীক্ষার নম্বর ও রেকর্ড', icon: Award },
    { id: 'books', label: 'লাইব্রেরি ও বই ভাণ্ডার', icon: BookOpen },
    { id: 'materials', label: 'পড়াশোনার শিট ও উপকরণ', icon: FileText },
    // FINANCIAL SECTION (STRICTLY MAIN ADMIN)
    { id: 'finances', label: 'জমা ও খরচের লেজার', icon: DollarSign, highlight: true },
    { id: 'donations', label: 'অনলাইন অনুদান যাচাই', icon: Heart, highlight: true },
    // CONTENT & SYSTEM
    { id: 'website', label: 'ওয়েবসাইট কন্টেন্ট এডিটর', icon: Globe },
    { id: 'news-events', label: 'সংবাদ ও আসন্ন ইভেন্ট', icon: Bell },
    { id: 'gallery', label: 'ছবির গ্যালারি আপডেট', icon: Camera },
    {
      id: 'messages',
      label: 'যোগাযোগ ও মেসেজ বক্স',
      icon: MessageSquare,
      badge: unreadCount > 0 ? `${unreadCount} টি নতুন` : undefined,
      highlight: unreadCount > 0
    },
    { id: 'audit-logs', label: 'অডিট লগ ও নিরাপত্তা', icon: ShieldAlert },
    { id: 'settings', label: 'সিস্টেম ও পেমেন্ট সেটিংস', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Admin Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Admin Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-amber-400 to-rose-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-xl">
                  🌻
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-outfit block tracking-tight">
                  PRIYOFUL
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/60 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  প্রধান অ্যাডমিন প্যানেল
                </span>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="grow overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                      : item.highlight
                      ? 'text-amber-300 hover:bg-slate-800/80 hover:text-amber-200'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : item.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-slate-900 text-amber-400' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile & Quick Actions */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/40 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                প্রশাসক
              </div>
              <div className="grow min-w-0">
                <strong className="text-xs font-bold text-white block truncate">
                  {adminProfile?.name || 'প্রধান প্রশাসক'}
                </strong>
                <span className="text-[10px] text-slate-400 block truncate">
                  {adminProfile?.email || 'admin@priyoful.org'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setActiveTab('home')}
                className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                মূল ওয়েবসাইট
              </button>

              {/* Main Admin can switch to Teacher view to audit classroom */}
              <button
                onClick={() => {
                  switchRole('teacher', 'TCH-001');
                  setActiveTab('teacher-dashboard');
                }}
                className="py-1.5 px-2 bg-emerald-950/80 border border-emerald-800/80 hover:bg-emerald-900 text-emerald-300 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                title="শিক্ষক ক্লাসরুম ভিউ পরীক্ষা করুন"
              >
                <GraduationCap className="w-3 h-3" />
                শিক্ষক ভিউ
              </button>
            </div>

            <button
              onClick={() => {
                logout();
                setActiveTab('home');
              }}
              className="w-full py-1.5 px-3 bg-rose-950/40 border border-rose-900/60 hover:bg-rose-900/60 text-rose-300 rounded-lg text-[11px] font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              লগআউট করুন
            </button>
          </div>

        </div>
      </aside>

      {/* Main Admin Content Body */}
      <div className="grow flex flex-col min-w-0 bg-slate-900/60 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-black text-white font-outfit uppercase tracking-wide flex items-center gap-2">
                <span>{menuItems.find(m => m.id === activeSection)?.label}</span>
                {['finances', 'donations'].includes(activeSection) && (
                  <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    গোপনীয় আর্থিক হিসাব
                  </span>
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>লাইভ ওয়েবসাইট</span>
            </button>

            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full hidden md:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              অ্যাডমিন সেশন: পূর্ণাঙ্গ নিয়ন্ত্রণ সক্রিয়
            </span>
          </div>
        </header>

        {/* Workspace Canvas */}
        <main className="p-4 sm:p-6 lg:p-8 grow space-y-6">
          {children}
        </main>
      </div>

    </div>
  );
};
