import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Heart, MapPin, Phone, Mail, Award, BookOpen, Sparkles, Lock } from 'lucide-react';
import { StaffLoginModal } from '../auth/StaffLoginModal';

export const Footer: React.FC = () => {
  const { settings, setActiveTab } = useSchool();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
            
            {/* Brand & Purpose */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleNav('home')}>
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-rose-500 p-0.5 shadow-md group-hover:rotate-12 transition-transform">
                  <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-xl">
                    <span className="inline-block animate-sway">🌻</span>
                  </div>
                </div>
                <div>
                  <span className="font-extrabold text-2xl text-white tracking-tight font-outfit group-hover:text-amber-400 transition-colors">
                    {settings.schoolName || 'PRIYOFUL'}
                  </span>
                  <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-sm ml-2">
                    প্রিয়ফুল পাঠশালা
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed pr-6">
                মিরপুরের সুবিধাবঞ্চিত বস্তি ও নিম্নআয়ের পরিবারের শিশুদের জন্য সম্পূর্ণ বিনামূল্যে প্রাথমিক শিক্ষা (১ম থেকে ৫ম শ্রেণি), পুষ্টিকর খাবার ও মানবিক বিকাশ নিশ্চিত করার লক্ষ্যে নিবেদিত একটি অলাভজনক স্বেচ্ছাসেবী স্কুল।
              </p>

              <div className="flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-950/40 border border-amber-800/40 px-3 py-2 rounded-xl w-fit">
                <Award className="w-4 h-4 text-amber-400" />
                <span>১০০% স্বেচ্ছাসেবী পরিচালিত • কোনো বেতন বা টিউশন ফি নেই</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">স্কুল পরিচিতি</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button onClick={() => handleNav('about')} className="hover:text-amber-400 transition-colors">
                    আমাদের গল্প ও মিশন
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('classes')} className="hover:text-amber-400 transition-colors">
                    ১ম-৫ম শ্রেণির পাঠক্রম
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('students')} className="hover:text-amber-400 transition-colors">
                    আমাদের শিক্ষার্থীদের গল্প
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('teachers')} className="hover:text-amber-400 transition-colors">
                    নিবেদিত শিক্ষকবৃন্দ
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('activities')} className="hover:text-amber-400 transition-colors">
                    কার্যক্রম, পুষ্টি ও খেলাধুলা
                  </button>
                </li>
              </ul>
            </div>

            {/* Community & Transparency */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">সহযোগিতা ও তথ্য</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>
                  <button onClick={() => handleNav('gallery')} className="hover:text-amber-400 transition-colors">
                    ছবির অ্যালবাম ও ক্লাসরুম
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('news-events')} className="hover:text-amber-400 transition-colors">
                    সংবাদ, সাফল্য ও আয়োজন
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('donate')} className="hover:text-amber-400 transition-colors font-bold text-amber-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-amber-300" />
                    শিশুদের জন্য অনুদান দিন
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('contact')} className="hover:text-amber-400 transition-colors">
                    স্বেচ্ছাসেবী হিসেবে যোগ দিন
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">ঠিকানা ও যোগাযোগ</h4>
              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{settings.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{settings.email}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleNav('donate')}
                  className="w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  একটি শিশুর পাশে দাঁড়ান
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar with Discreet Secure Admin/Staff Portal Entry */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
            <p>© {new Date().getFullYear()} প্রিয়ফুল এডুকেশন ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।</p>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
              <span>মর্যাদা • শিক্ষা • স্বচ্ছতা</span>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span className="hidden sm:inline">মিরপুর কমিউনিটি, ঢাকা</span>
              <span className="text-slate-700 hidden sm:inline">•</span>
              
              {/* Discreet Secure Admin / Staff Portal Button */}
              <button
                onClick={() => setLoginModalOpen(true)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 hover:border-slate-600 transition-colors py-1.5 px-3 rounded-xl border border-slate-800 bg-slate-900/90 text-[11px] font-bold shadow-xs cursor-pointer active:scale-95"
                title="অনুমোদিত শিক্ষক ও প্রধান অ্যাডমিন লগইন"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>অভ্যন্তরীণ স্টাফ ও শিক্ষক পোর্টাল</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Secure Staff Login Modal */}
      <StaffLoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
};
