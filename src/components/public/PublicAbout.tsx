import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Heart, BookOpen, Users, Compass, Eye, ShieldCheck, Sun, CheckCircle, Award, Sparkles, Quote, Building2 } from 'lucide-react';

export const PublicAbout: React.FC = () => {
  const { settings, setActiveTab } = useSchool();

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-amber-300 shadow-xs">
          <span>🌻</span>
          <span>আমাদের গল্প ও অনুপ্রেরণা</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-outfit tracking-tight">
          প্রিয়ফুল পাঠশালার ইতিহাস
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          {settings.aboutMission || 'মিরপুরের সুবিধাবঞ্চিত বস্তির শিশুদের জন্য বিনামূল্যে মানসম্মত প্রাথমিক শিক্ষা (১ম থেকে ৫ম শ্রেণি), পুষ্টি ও মানবিক যত্ন নিশ্চিত করার অঙ্গীকার।'}
        </p>
      </div>

      {/* The Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            কীভাবে শুরু হয়েছিল
          </span>
          <h2 className="text-3xl font-black text-slate-900 font-outfit leading-tight">
            ভালোবাসায় গড়া একটি বিদ্যালয়, বিত্তে নয়
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            ২০২২ সালের শুরুর দিকে, কয়েকজন বিশ্ববিদ্যালয়ের শিক্ষার্থী ও তরুণ মিরপুরের বস্তি এলাকায় ঘুরে দেখতে পান—স্কুল চলাকালীন সময়ে অসংখ্য শিশু অলিতে-গলিতে প্লাস্টিকের বোতল কুড়াচ্ছে অথবা অলসভাবে সময় কাটাচ্ছে।
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            অভিভাবকদের সাথে কথা বলে জানা যায়, স্কুলে কোনো ভর্তি ফি না থাকলেও গাইড বই, খাতা, কলম, বেতন এবং পোশাকের অদৃশ্য খরচের কারণে তারা সন্তানদের স্কুলে পাঠাতে পারছিলেন না।
          </p>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-bold bg-amber-50 p-4 rounded-2xl border border-amber-200">
            আমরা একটি টিনের ঘর ভাড়া নিই, দেয়ালে রং করি, ছোট ছোট বেঞ্চ বসাই এবং স্কুলের নাম দিই "প্রিয়ফুল"। কারণ ফুল যেখানেই ফুটুক না কেন—সূর্যের আলো আর ভালোবাসায় তা সুন্দরভাবে প্রস্ফুটিত হওয়ার অধিকার রাখে।
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80"
              alt="Priyoful community learning"
              className="rounded-3xl shadow-xl border-2 border-amber-200 object-cover w-full h-[400px]"
            />
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white rounded-3xl p-5 shadow-2xl max-w-xs text-xs space-y-1.5 border border-slate-700">
              <strong className="text-amber-400 font-black text-sm block">১০০% স্বেচ্ছাসেবী নিবেদন</strong>
              <p className="text-slate-300">
                আমাদের শিক্ষকরা কোনো সম্মানী নেন না; বরং নিজেদের পকেট খরচ ও টিউশনির টাকা দিয়ে স্কুলের ঘরভাড়া ও শিশুদের নাস্তার ব্যবস্থা করেন।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars of Priyoful */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-lg">
            ১
          </div>
          <h3 className="font-black text-xl text-slate-900 font-outfit">মর্যাদাপূর্ণ শিক্ষাদান</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            আমরা কোনো শিশুকে করুণার দৃষ্টিতে দেখি না। আমরা তাদের দেখি আগামী দিনের চিকিৎসক, প্রকৌশলী, শিক্ষক ও দেশের সুযোগ্য নাগরিক হিসেবে।
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg">
            ২
          </div>
          <h3 className="font-black text-xl text-slate-900 font-outfit">সম্পূর্ণ অবৈতনিক</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            বই, খাতা, কলম, ড্রেস, নাস্তা বা পরীক্ষা—কোনো কিছুর জন্যই কখনো একটি টাকাও নেওয়া হয় না। আর্থিক অসচ্ছলতা এখানে কোনো বাধা নয়।
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-black text-lg">
            ৩
          </div>
          <h3 className="font-black text-xl text-slate-900 font-outfit">হিসাবের শতভাগ স্বচ্ছতা</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            প্রাপ্ত প্রতিটি অনুদানের পাই পাই হিসাব সফটওয়্যারের মাধ্যমে সংরক্ষিত থাকে। কোনো অপ্রয়োজনীয় প্রশাসনিক ব্যয় নেই।
          </p>
        </div>
      </div>

      {/* Leadership & Patrons (Compact, Natural & Simple) */}
      <section className="bg-linear-to-b from-amber-50/40 via-white to-amber-50/30 rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
        
        {/* Simple Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-amber-200/60 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <h3 className="text-xl font-black text-slate-900 font-outfit">
              আমাদের অভিভাবক ও নেতৃত্ব
            </h3>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full border border-amber-300">
              Guidance & Leadership
            </span>
          </div>
          <span className="text-xs text-slate-600 font-medium">
            যাঁদের স্নেহ ও দিকনির্দেশনায় প্রিয়ফুল বিকশিত হচ্ছে
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Card 1: Mahmudul Hasan Bahar (Director) */}
          <div className="md:col-span-7 bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="shrink-0 relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-linear-to-tr from-amber-400 to-orange-500 shadow-md">
                <img
                  src="/bahar_vi.jpg"
                  alt="মাহমুদুল হাসান বাহার (Mahmudul Hasan Bahar)"
                  className="w-full h-full rounded-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-1 rounded-full shadow-xs" title="পরিচালক">
                <Award className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div>
                <h4 className="text-base font-black text-slate-900">
                  মাহমুদুল হাসান বাহার
                </h4>
                <p className="text-[11px] font-bold text-amber-700">
                  পরিচালক ও প্রধান স্বপ্নদ্রষ্টা • প্রিয়ফুল পাঠশালা (QSP ফাউন্ডেশন)
                </p>
              </div>

              <div className="bg-amber-50/70 rounded-xl p-2.5 border border-amber-100 text-xs text-slate-700 space-y-1 font-medium italic">
                <p>“একটি শিশুও যেন কেবল দারিদ্র্যের কারণে শিক্ষার আলো ও সুন্দর ভবিষ্যৎ গড়ার স্বপ্ন থেকে বঞ্চিত না হয়—এটাই প্রিয়ফুলের অঙ্গীকার।”</p>
                <p className="text-amber-900 not-italic font-bold">“প্রিয়ফুল নিছক বিদ্যালয় নয়; এটি ভালোবাসা ও স্নেহের নিরাপদ ভুবন।”</p>
              </div>
            </div>
          </div>

          {/* Card 2: BUBT VC Sir (Honorable Patron) */}
          <div className="md:col-span-5 bg-white/90 rounded-2xl p-5 border border-dashed border-amber-300 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shrink-0 bg-slate-100 border-2 border-slate-300 flex flex-col items-center justify-center text-slate-400 text-center p-2">
              <Building2 className="w-6 h-6 text-slate-500 mb-1" />
              <span className="text-[9px] font-bold text-slate-600 leading-tight">BUBT VC</span>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                <span>🎓</span>
                <span>শিক্ষা ও উন্নয়ন সহযোগী</span>
              </div>
              <h4 className="text-sm font-black text-slate-900">
                সম্মানিত উপাচার্য (VC) মহোদয়
              </h4>
              <p className="text-[11px] font-bold text-slate-600">
                বাংলাদেশ ইউনিভার্সিটি অব বিজনেস অ্যান্ড টেকনোলজি (BUBT)
              </p>
              <p className="text-xs text-slate-500 font-medium pt-1">
                উচ্চশিক্ষা সহায়তা ও সামাজিক দিকনির্দেশক হিসেবে পাশে থাকছেন। (শীঘ্রই প্রোফাইল যুক্ত হচ্ছে)
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
