import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { GraduationCap, Heart, Award, Sparkles, Mail, CheckCircle2 } from 'lucide-react';

export const PublicTeachers: React.FC = () => {
  const { teachers, setActiveTab } = useSchool();

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-300 shadow-xs">
          <GraduationCap className="w-4 h-4 text-emerald-700" />
          <span>নিবেদিত শিক্ষক ও মেন্টর দল</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-outfit tracking-tight">
          আমাদের মমতাময়ী স্বেচ্ছাসেবী শিক্ষকবৃন্দ
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          প্রিয়ফুল পরিচালিত হয় বিশ্ববিদ্যালয়ের উদ্যমী তরুণ-তরুণী ও স্বেচ্ছাসেবকদের ভালোবাসায়। কোনো বিনিময় ছাড়াই তারা প্রতিদিন বস্তির শিশুদের মাঝে ছড়িয়ে দেন শিক্ষার আলো।
        </p>
      </div>

      {/* Teachers Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={teacher.photoUrl}
                  alt={teacher.fullName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/30 shadow-xs shrink-0"
                />
                <div className="grow min-w-0">
                  <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {teacher.volunteerStatus === 'Full-time Volunteer' ? 'পূর্ণকালীন শিক্ষক' : 'খন্ডকালীন মেন্টর'}
                  </span>
                  <h3 className="font-black text-lg text-slate-900 font-outfit truncate">
                    {teacher.fullName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium truncate">{teacher.subject}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">নির্ধারিত শ্রেণি:</span>
                  <strong className="text-slate-800 font-black">{teacher.assignedClass}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">স্বেচ্ছাসেবায় যোগদান:</span>
                  <span className="text-slate-700 font-medium">{teacher.joiningDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">শিক্ষক কোড (ID):</span>
                  <span className="text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded">{teacher.teacherId}</span>
                </div>
                {teacher.notes && (
                  <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-3 rounded-2xl italic border border-slate-100">
                    "{teacher.notes}"
                  </p>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>সক্রিয় স্বেচ্ছাসেবী</span>
              </span>
              <button
                onClick={() => setActiveTab('contact')}
                className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
              >
                যোগাযোগ করুন →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Become a Volunteer Banner */}
      <div className="bg-linear-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
            স্বেচ্ছাসেবার আহ্বান
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-outfit">
            আপনিও কি শিশুদের সাথে আপনার সময় ভাগ করে নিতে চান?
          </h2>
          <p className="text-emerald-100 text-sm">
            সপ্তাহে মাত্র ২ ঘণ্টা সময় দিয়ে মিরপুরের সুবিধাবঞ্চিত শিশুদের মুখে হাসি ফোটাতে আমাদের স্বেচ্ছাসেবী শিক্ষক দলে যোগ দিন।
          </p>
        </div>

        <button
          onClick={() => setActiveTab('contact')}
          className="bg-white text-emerald-900 hover:bg-emerald-50 font-black px-8 py-3.5 rounded-full text-sm shadow-md shrink-0 transition-transform active:scale-95"
        >
          স্বেচ্ছাসেবী হিসেবে আবেদন করুন
        </button>
      </div>

    </div>
  );
};
