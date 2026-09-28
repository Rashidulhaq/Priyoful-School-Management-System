import React, { useState } from 'react';
import { useAuth, DEFAULT_ADMIN_PASS, BOOTSTRAP_ADMIN_EMAIL } from '../../context/AuthContext';
import { useSchool } from '../../context/SchoolContext';
import {
  X,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle,
  KeyRound
} from 'lucide-react';

interface StaffLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StaffLoginModal: React.FC<StaffLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginWithGoogle, loginAsAdmin, loginAsTeacher, role } = useAuth();
  const { teachers, setActiveTab } = useSchool();
  
  const [modalTab, setModalTab] = useState<'admin' | 'teacher'>('teacher');
  const [adminEmail, setAdminEmail] = useState('admin@priyoful.org');
  const [adminPass, setAdminPass] = useState(DEFAULT_ADMIN_PASS);
  
  // Teacher credentials state
  const [teacherId, setTeacherId] = useState('TCH-001');
  const [teacherPass, setTeacherPass] = useState('teacher123');
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    
    const result = await loginAsAdmin(adminEmail, adminPass, 'প্রধান প্রশাসক (Rashidul Haq)');
    setIsSubmitting(false);

    if (result.success) {
      onClose();
      setActiveTab('admin-dashboard');
    } else {
      setErrorMsg(result.error || 'ভুল অ্যাডমিন তথ্য! অনুগ্রহ করে সঠিক তথ্য দিন।');
    }
  };

  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    const result = await loginAsTeacher(teacherId, teacherPass);
    setIsSubmitting(false);

    if (result.success) {
      onClose();
      setActiveTab('teacher-dashboard');
    } else {
      setErrorMsg(result.error || 'ভুল শিক্ষক আইডি বা পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।');
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsSubmitting(true);
    await loginWithGoogle();
    setIsSubmitting(false);
    onClose();
    setActiveTab('admin-dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto border border-slate-100 animate-in zoom-in-95 my-auto">
        
        {/* Modal Header */}
        <div className="relative bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 p-5 sm:p-6 text-white sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            title="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌻</span>
            <span className="bg-white/25 text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              প্রিয়ফুল শিক্ষাঙ্গন পোর্টাল
            </span>
          </div>
          <h2 className="text-2xl font-black font-outfit">অভ্যন্তরীণ স্টাফ ও শিক্ষক লগইন</h2>
          <p className="text-amber-100 text-xs mt-1">
            শুধুমাত্র অনুমোদিত শিক্ষক ও প্রধান প্রশাসকের জন্য সংরক্ষিত প্রবেশপথ
          </p>

          {/* Role Tabs */}
          <div className="flex gap-2 mt-5 bg-black/20 p-1.5 rounded-2xl">
            <button
              type="button"
              onClick={() => {
                setModalTab('teacher');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                modalTab === 'teacher'
                  ? 'bg-white text-emerald-950 shadow-md scale-[1.02]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>শ্রেণি শিক্ষক (Teacher)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setModalTab('admin');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all ${
                modalTab === 'admin'
                  ? 'bg-white text-slate-950 shadow-md scale-[1.02]'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>প্রধান অ্যাডমিন (Admin)</span>
            </button>
          </div>
        </div>

        {/* Error notification banner if any */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6">
          {modalTab === 'teacher' ? (
            /* TEACHER LOGIN FORM */
            <div>
              <div className="mb-4 bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3.5 text-xs text-emerald-900">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>শিক্ষকদের ক্লাসরুম ও পাঠদান প্যানেল</span>
                </div>
                <span>শিক্ষক আইডি ও পাসওয়ার্ড দিয়ে লগইন করে আপনার শ্রেণির শিক্ষার্থী, দৈনিক উপস্থিতি, পরীক্ষার নম্বর ও পড়ার উপকরণ পরিচালনা করুন।</span>
                <div className="mt-1 text-[11px] font-bold text-rose-700 flex items-center gap-1">
                  <span>🔒 শিক্ষক প্যানেল থেকে কোনো আর্থিক তথ্য বা অ্যাডমিন প্যানেল এক্সেস করা যাবে না।</span>
                </div>
              </div>

              <form onSubmit={handleTeacherLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    শিক্ষক আইডি (Teacher ID)
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={teacherId}
                      onChange={(e) => setTeacherId(e.target.value)}
                      placeholder="যেমন: TCH-001, TCH-002"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-bold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    পাসওয়ার্ড (Teacher Password)
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      value={teacherPass}
                      onChange={(e) => setTeacherPass(e.target.value)}
                      placeholder="পাসওয়ার্ড লিখুন"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                      required
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    ডিফল্ট পাসওয়ার্ড: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-bold">teacher123</code>
                  </span>
                </div>

                {/* Quick teacher selector helper for convenience */}
                <div className="pt-1">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                    অথবা শিক্ষক তালিকা থেকে দ্রুত বাছাই করুন:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
                    {teachers.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setTeacherId(t.teacherId);
                          setTeacherPass(t.password || 'teacher123');
                          setErrorMsg(null);
                        }}
                        className={`p-2 rounded-lg text-left text-xs transition-colors border ${
                          teacherId === t.teacherId
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                            : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="font-bold truncate">{t.fullName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{t.teacherId} • {t.assignedClass}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-200" />
                  <span>শিক্ষক প্যানেলে প্রবেশ করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            /* ADMIN LOGIN FORM */
            <div>
              <div className="mb-4 bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>পূর্ণাঙ্গ কেন্দ্রীয় ব্যবস্থাপনা ও অর্থনৈতিক হিসাব</span>
                </div>
                <span>প্রধান অ্যাডমিন হিসেবে আপনি শিক্ষার্থী, শিক্ষক, শ্রেণি, অনুদান, জমা-খরচের লেজার এবং ওয়েবসাইটের সব সেটিংস নিয়ন্ত্রণ করতে পারবেন।</span>
              </div>

              {/* Google Sign-in Option */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full mb-3.5 py-2.5 px-4 bg-white hover:bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 font-bold text-xs flex items-center justify-center gap-3 transition-colors shadow-xs"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>গুগল অ্যাকাউন্ট দিয়ে প্রবেশ (Google Sign-In)</span>
              </button>

              <div className="relative flex py-1.5 items-center">
                <div className="grow border-t border-slate-200"></div>
                <span className="shrink mx-3 text-slate-400 text-[11px] font-bold uppercase">অথবা ইমেইল ও পাসওয়ার্ড</span>
                <div className="grow border-t border-slate-200"></div>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-3 mt-1.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">অ্যাডমিন ইমেইল বা আইডি</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@priyoful.org"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">সিকিউরিটি পাসওয়ার্ড</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="পাসওয়ার্ড লিখুন"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                      required
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    ডিফল্ট পাসওয়ার্ড: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono font-bold">{DEFAULT_ADMIN_PASS}</code>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>প্রধান অ্যাডমিন প্যানেলে প্রবেশ করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span>সহায়তার জন্য স্কুল সমন্বয়কের সাথে যোগাযোগ করুন: +৮৮০ ১৭১২-৩৪৫৬৭৮</span>
        </div>
      </div>
    </div>
  );
};
