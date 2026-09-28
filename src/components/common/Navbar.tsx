import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import {
  Heart,
  BookOpen,
  Menu,
  X,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  ChevronDown,
  LogOut,
  UserCheck
} from 'lucide-react';
import { StaffLoginModal } from '../auth/StaffLoginModal';

export const Navbar: React.FC = () => {
  const { role, teacherProfile, adminProfile, logout, switchRole } = useAuth();
  const { activeTab, setActiveTab, settings } = useSchool();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'হোম' },
    { id: 'about', label: 'আমাদের কথা' },
    { id: 'students', label: 'শিক্ষার্থীবৃন্দ' },
    { id: 'teachers', label: 'শিক্ষকবৃন্দ' },
    { id: 'classes', label: '১ম-৫ম শ্রেণি' },
    { id: 'activities', label: 'কার্যক্রম ও নাস্তা' },
    { id: 'gallery', label: 'ছবির অ্যালবাম' },
    { id: 'news-events', label: 'সংবাদ ও আয়োজন' },
    { id: 'contact', label: 'যোগাযোগ' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-amber-600 text-amber-50 text-xs py-1.5 px-4 font-medium flex items-center justify-between shadow-xs">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-700/80 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">স্বেচ্ছাসেবী পাঠশালা</span>
            <span className="hidden sm:inline">সুবিধাবঞ্চিত শিশুদের জন্য সম্পূর্ণ বিনামূল্যে প্রাথমিক শিক্ষা (১ম থেকে ৫ম শ্রেণি)</span>
            <span className="sm:hidden">১০০% ফ্রি প্রাথমিক শিক্ষা</span>
          </div>

          {/* Warm Child-friendly community indicator */}
          <div className="flex items-center gap-3">
            {role === 'guest' ? (
              <span className="text-amber-100 text-xs font-medium hidden md:inline-flex items-center gap-1.5">
                <span>🌸</span>
                <span>ভালোবাসা ও শিক্ষায় আলোকিত প্রতিটি শিশু</span>
              </span>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="bg-amber-700/80 hover:bg-amber-800 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {role === 'admin' ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Main Admin</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Teacher: {teacherProfile?.fullName.split(' ')[0]}</span>
                    </>
                  )}
                  <ChevronDown className="w-3 h-3" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-1.5 w-56 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 border-b border-slate-100 text-xs text-slate-500 font-medium">
                      Signed in as: <strong className="text-slate-800 block truncate">{adminProfile?.name || teacherProfile?.fullName}</strong>
                    </div>

                    {role === 'admin' && (
                      <button
                        onClick={() => {
                          setActiveTab('admin-dashboard');
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-amber-50 text-amber-900 flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        Go to Main Admin Panel
                      </button>
                    )}

                    {role === 'teacher' && (
                      <button
                        onClick={() => {
                          setActiveTab('teacher-dashboard');
                          setRoleDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-semibold hover:bg-emerald-50 text-emerald-900 flex items-center gap-2"
                      >
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                        Go to Teacher Panel
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1"></div>
                    
                    <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">Quick Switch Role</div>
                    <button
                      onClick={() => {
                        switchRole('admin');
                        setActiveTab('admin-dashboard');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                        Main Admin
                      </span>
                      {role === 'admin' && <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 rounded">Active</span>}
                    </button>

                    <button
                      onClick={() => {
                        switchRole('teacher', 'TCH-001');
                        setActiveTab('teacher-dashboard');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                        Teacher (Farhana - Cl. 1)
                      </span>
                      {role === 'teacher' && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 rounded">Active</span>}
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setActiveTab('home');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/60 shadow-xs">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & School Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 group text-left transition-transform active:scale-95 cursor-pointer"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-linear-to-br from-amber-400 via-orange-500 to-rose-500 p-0.5 shadow-md shadow-amber-500/25 group-hover:rotate-12 transition-transform duration-300 shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <span className="text-xl sm:text-2xl select-none group-hover:scale-125 transition-transform duration-300" role="img" aria-label="Sunflower flower">🌻</span>
                <span className="absolute inset-0 bg-linear-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors font-outfit truncate">
                  {settings.schoolName || 'PRIYOFUL'}
                </span>
                <span className="text-[11px] sm:text-xs bg-linear-to-r from-amber-100 to-rose-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-200/80 shadow-xs shrink-0">
                  প্রিয়ফুল 🌸
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-bold tracking-wide truncate max-w-[180px] sm:max-w-none">
                কমিউনিটি অবৈতনিক প্রাথমিক পাঠশালা • শ্রেণি ১ম-৫ম
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-amber-50/50 p-1.5 rounded-2xl border border-amber-100/80">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'text-amber-950 font-black'
                      : 'text-slate-600 hover:text-amber-700 hover:bg-white/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white shadow-xs rounded-xl border border-amber-200"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Direct Dashboard Link if logged in as Admin */}
            {role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer ${
                  activeTab.startsWith('admin')
                    ? 'bg-slate-900 text-white shadow-slate-900/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>প্রধান অ্যাডমিন প্যানেল</span>
              </button>
            )}

            {/* Direct Dashboard Link if logged in as Teacher */}
            {role === 'teacher' && (
              <button
                onClick={() => handleNavClick('teacher-dashboard')}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer ${
                  activeTab.startsWith('teacher')
                    ? 'bg-emerald-700 text-white shadow-emerald-700/20'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-emerald-200" />
                <span>শিক্ষক প্যানেল: {teacherProfile?.fullName?.split(' ')[0] || 'শিক্ষক'}</span>
              </button>
            )}

            {/* Donate CTA Button with Heartbeat & Glow */}
            <button
              onClick={() => handleNavClick('donate')}
              className="relative overflow-hidden inline-flex items-center gap-1.5 sm:gap-2 bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full font-black text-xs sm:text-sm shadow-md shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 transition-all active:scale-95 cursor-pointer animate-pulse-glow group shrink-0"
            >
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white animate-heartbeat" />
              <span>অনুদান দিন</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2.5 text-left text-sm font-bold rounded-xl transition-all active:scale-95 ${
                    activeTab === item.id
                      ? 'text-amber-900 bg-amber-100/80 font-black shadow-xs'
                      : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-1 flex flex-col gap-2">
              {role === 'admin' ? (
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="w-full py-3 px-4 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>প্রধান অ্যাডমিন প্যানেল খুলুন</span>
                </button>
              ) : role === 'teacher' ? (
                <button
                  onClick={() => handleNavClick('teacher-dashboard')}
                  className="w-full py-3 px-4 bg-emerald-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-200" />
                  <span>শিক্ষক প্যানেল খুলুন ({teacherProfile?.fullName?.split(' ')[0] || 'শিক্ষক'})</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavClick('donate');
                  }}
                  className="w-full py-3 px-4 bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>একটি শিশুর মুখে হাসি ফোটান (অনুদান দিন)</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Staff Login Modal */}
      <StaffLoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
};
