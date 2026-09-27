import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  GraduationCap,
  Sparkles,
  BookOpen,
  Heart,
  Smile,
  ShieldAlert,
  Search,
  CheckCircle2
} from 'lucide-react';

export const PublicStudents: React.FC = () => {
  const { students, classes, setActiveTab } = useSchool();
  const [selectedClass, setSelectedClass] = useState<string>('All');

  // Filter students for dignified public showcase
  const filteredStudents = students.filter(s => {
    if (selectedClass !== 'All' && s.class !== selectedClass) return false;
    return s.status === 'Active';
  });

  const classFilters = [
    { id: 'All', label: 'সব শ্রেণি (All)' },
    { id: 'Class 1', label: '১ম শ্রেণি' },
    { id: 'Class 2', label: '২য় শ্রেণি' },
    { id: 'Class 3', label: '৩য় শ্রেণি' },
    { id: 'Class 4', label: '৪র্থ শ্রেণি' },
    { id: 'Class 5', label: '৫ম শ্রেণি' },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-amber-300 shadow-xs">
          <span>🌸</span>
          <span>আমাদের শিক্ষার্থীদের গল্প</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-outfit tracking-tight">
          ফুলের মতো নিষ্পাপ শিশু, উজ্জ্বল ভবিষ্যৎ
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          প্রতিটি পরিসংখ্যানের পেছনে রয়েছে একটি শিশুর স্বপ্ন ও সংগ্রাম। বস্তির প্রতিটি শিশু যেন মর্যাদা ও আনন্দের সাথে বড় হয়ে উঠতে পারে, প্রিয়ফুল সেই লক্ষ্যেই তাদের পাশে আছে।
        </p>
      </div>

      {/* Dignity & Privacy Notice */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-amber-950 max-w-3xl mx-auto shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
        <p>
          <strong>শিশু সুরক্ষা নীতি:</strong> শিশুদের ব্যক্তিগত নিরাপত্তা ও গোপনীয়তা রক্ষার স্বার্থে শিক্ষার্থীদের পূর্ণাঙ্গ ঠিকানা ও অভিভাবকের মোবাইল নম্বর শুধুমাত্র বিদ্যালয়ের পাসওয়ার্ড সুরক্ষিত অভ্যন্তরীণ রেজিস্ট্রিতে সংরক্ষিত থাকে।
        </p>
      </div>

      {/* Class Filtering */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {classFilters.map((cls) => (
          <button
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedClass === cls.id
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/25 scale-105'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cls.label}
          </button>
        ))}
      </div>

      {/* Students Showcase Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStudents.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative rounded-2xl overflow-hidden aspect-square mb-4 bg-amber-50">
                <img
                  src={s.photoUrl}
                  alt={s.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  রোল: {s.rollNumber}
                </span>
                <span className="absolute bottom-2.5 left-2.5 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {s.class}
                </span>
              </div>

              <h3 className="font-black text-lg text-slate-900 font-outfit">{s.fullName}</h3>
              {s.nickname && (
                <span className="text-xs text-slate-500 block">ডাকনাম: {s.nickname}</span>
              )}

              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>অভিভাবক:</span>
                  <span className="font-bold text-slate-800">{s.guardianName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>ভর্তির তারিখ:</span>
                  <span className="font-medium text-slate-700">{s.admissionDate}</span>
                </div>
              </div>

              {s.notes && (
                <p className="text-[11px] text-slate-500 italic mt-2.5 bg-slate-50 p-2 rounded-xl border border-slate-100 line-clamp-2">
                  "{s.notes}"
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('donate')}
                className="w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-amber-200"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>এই শিশুর পাশে দাঁড়ান</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
