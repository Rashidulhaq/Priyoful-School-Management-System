import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useSchool } from '../../context/SchoolContext';
import {
  Heart,
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  Sparkles,
  ArrowRight,
  Sun,
  ShieldCheck,
  CheckCircle,
  Award,
  Smile,
  Coffee,
  Palette,
  Eye,
  Star,
  Music,
  Compass,
  Trophy,
  PartyPopper,
  Check,
  HelpCircle
} from 'lucide-react';

export const PublicHome: React.FC = () => {
  const { settings, stats, classes, events, news, gallery, setActiveTab, setSelectedClassForDetail } = useSchool();
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null);
  const [selectedDreamCategory, setSelectedDreamCategory] = useState<'all' | 'doctor' | 'teacher' | 'artist' | 'engineer'>('all');

  const handleNav = (tab: string, className?: string) => {
    if (className) {
      setSelectedClassForDetail(className);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Student Dreams list with child-friendly quotes
  const studentDreams = [
    {
      id: 1,
      name: 'মারিয়া আক্তার',
      nameEn: 'Maria Akter',
      class: 'Class 3 (পল্লব)',
      dream: 'ডাক্তার (Doctor)',
      category: 'doctor',
      quote: 'আমি বড় হয়ে বস্তির গরিব শিশু আর বৃদ্ধদের ফ্রিতে চিকিৎসা দেবো। অসুস্থ হলে কারো যেন কষ্ট না হয়!',
      avatar: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=300&auto=format&fit=crop&q=80',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: '🩺'
    },
    {
      id: 2,
      name: 'সজীব হোসেন',
      nameEn: 'Sojib Hossain',
      class: 'Class 4 (মুকুল)',
      dream: 'কম্পিউটার ইঞ্জিনিয়ার (Engineer)',
      category: 'engineer',
      quote: 'কম্পিউটার দিয়ে আমি রোবট বানাতে চাই। প্রিয়ফুলের ল্যাবে প্রথম কম্পিউটার দেখে আমার খুব ভালো লেগেছে!',
      avatar: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&auto=format&fit=crop&q=80',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      icon: '💻'
    },
    {
      id: 3,
      name: 'ফাতেমা তুজ জোহরা',
      nameEn: 'Fatema Tuz Zohra',
      class: 'Class 5 (সৌরভ)',
      dream: 'স্কুল শিক্ষিকা (Teacher)',
      category: 'teacher',
      quote: 'আমাদের প্রিয়ফুলের আপুদের মতো আমিও বড় হয়ে সুবিধাবঞ্চিত শিশুদের বিনা খরচে মনের আনন্দে পড়াবো।',
      avatar: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=300&auto=format&fit=crop&q=80',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: '📚'
    },
    {
      id: 4,
      name: 'আরিফুল ইসলাম',
      nameEn: 'Ariful Islam',
      class: 'Class 2 (পাপড়ি)',
      dream: 'চিত্রশিল্পী (Artist)',
      category: 'artist',
      quote: 'আমি লাল, সবুজ আর হলুদ রং দিয়ে নদী, ফুল আর বড় বড় গাছ আঁকতে খুব ভালোবাসি!',
      avatar: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&auto=format&fit=crop&q=80',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: '🎨'
    }
  ];

  const filteredDreams = selectedDreamCategory === 'all'
    ? studentDreams
    : studentDreams.filter(d => d.category === selectedDreamCategory);

  // Daily Joy Routine
  const dailySchedule = [
    {
      time: '০৮:৪৫ সকাল',
      title: 'সকালের সমাবেশ ও জাতীয় সংগীত',
      desc: 'সবাই মিলে শৃঙ্খলা, শরীরচর্চা, জাতীয় সংগীত ও শপথ পাঠ দিয়ে দিন শুরু হয়।',
      icon: '☀️',
      color: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      time: '০৯:১৫ সকাল',
      title: 'মজার ছলে বাংলা ও বর্ণমালা',
      desc: 'গল্পের ছলে বর্ণমালা শেখা, বানান খেলা ও সুন্দর হস্তলিপি অনুশীলন।',
      icon: '📖',
      color: 'bg-rose-100 text-rose-900 border-rose-200'
    },
    {
      time: '১১:০০ সকাল',
      title: 'পুষ্টিকর নাস্তা ও ফ্রেশ দুধ',
      desc: 'কলা, ডিম, বিস্কুট অথবা খাঁটি দুধ—যাতে পড়ার সময় ক্ষুধা কোনো শিশুর মন কাড়তে না পারে।',
      icon: '🥛',
      color: 'bg-emerald-100 text-emerald-900 border-emerald-200'
    },
    {
      time: '১১:৩০ সকাল',
      title: 'ছবি আঁকা, ছড়া ও বিজ্ঞানের মজা',
      desc: 'রঙের মেলা, মাটির খেলনা তৈরি, গণিতের জাদু আর ইংরেজিতে ছোট ছোট বাক্য বলা।',
      icon: '🎨',
      color: 'bg-sky-100 text-sky-900 border-sky-200'
    },
    {
      time: '১২:৩০ দুপুর',
      title: 'বন্ধুদের সাথে খেলা ও হাসিমুখে ছুটি',
      desc: 'দড়িলাফ, লুডু ও ফুটবল খেলে প্রতিদিন নতুন আনন্দ নিয়ে ঘরে ফেরা।',
      icon: '🎈',
      color: 'bg-purple-100 text-purple-900 border-purple-200'
    }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION: WORLD-CLASS PROFESSIONAL INSTITUTIONAL HERO */}
      <section className="relative overflow-hidden pt-6 pb-14 lg:pt-12 lg:pb-20">
        
        {/* Soft Ambient Warm Glows (Clean & Unobtrusive) */}
        <div className="absolute inset-0 bg-linear-to-b from-amber-50/40 via-white to-amber-50/20 -z-10" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-rose-200/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Authoritative, Inspiring Narrative */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Trust Kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-950 text-xs sm:text-sm font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <span>QSP ফাউন্ডেশন পরিচালিত অলাভজনক মানবিক শিক্ষা প্রকল্প</span>
                <span className="text-amber-400">·</span>
                <span className="text-slate-600 font-semibold">মিরপুর, ঢাকা</span>
              </div>

              {/* Dignified & Powerful Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] font-outfit">
                ভালোবাসা ও শিক্ষার আলোয় গড়ে উঠুক প্রতিটি{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-orange-600 to-rose-600">
                  সুবিধাবঞ্চিত শিশুর স্বপ্ন
                </span>
              </h1>

              {/* Mission Narrative */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                মিরপুরের নিম্নআয়ের বস্তি পরিবারের সন্তানদের জন্য সম্পূর্ণ অবৈতনিক প্রাথমিক পাঠশালা। নতুন পাঠ্যবই, প্রতিদিনের পুষ্টিকর সকালের নাস্তা, উন্নত ক্লাসরুম ও নিবেদিতপ্রাণ শিক্ষকবৃন্দের স্নেহপূর্ণ তত্ত্বাবধানে আমরা প্রতিটি শিশুর সম্ভাবনাময় শৈশব গড়ে তুলছি।
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-1">
                <button
                  onClick={() => {
                    confetti({
                      particleCount: 35,
                      spread: 55,
                      origin: { y: 0.6 },
                      colors: ['#f59e0b', '#f43f5e', '#10b981'],
                    });
                    setTimeout(() => handleNav('donate'), 200);
                  }}
                  className="px-7 py-4 rounded-xl bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-sm sm:text-base shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 transition-all flex items-center justify-center gap-2.5 active:scale-95 group cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-white group-hover:scale-115 transition-transform" />
                  <span>একটি শিশুর পাশে দাঁড়ান (Donate)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => handleNav('about')}
                  className="px-6 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm sm:text-base shadow-xs hover:border-amber-400 hover:text-amber-800 transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
                >
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>আমাদের ক্লাসরুম ও গল্প জানুন</span>
                </button>
              </div>

              {/* 4-Point Transparency & Impact Ribbon */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-base mb-1">🎒</div>
                  <strong className="text-xs font-black text-slate-900 block">১০০% ফ্রি বই-খাতা</strong>
                  <span className="text-[11px] text-slate-500">বই, ব্যাগ ও স্টেশনারি</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-base mb-1">🥛</div>
                  <strong className="text-xs font-black text-slate-900 block">প্রতিদিনের পুষ্টিকর নাস্তা</strong>
                  <span className="text-[11px] text-slate-500">দুধ, ডিম ও তাজা ফল</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-base mb-1">👩‍🏫</div>
                  <strong className="text-xs font-black text-slate-900 block">নিবেদিত শিক্ষক দল</strong>
                  <span className="text-[11px] text-slate-500">৪০+ মেন্টর ও তরুণ দল</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="text-base mb-1">🛡️</div>
                  <strong className="text-xs font-black text-slate-900 block">স্বচ্ছ ব্যবস্থাপনা</strong>
                  <span className="text-[11px] text-slate-500">১০০% অর্থ শিশুদের জন্য</span>
                </div>
              </div>

            </div>

            {/* Right Column: High-Fidelity Authentic Photography Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* Clean, Elegant Main Frame */}
                <div className="rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/10 transition-all duration-300">
                  
                  {/* Photo Display */}
                  <div className="relative aspect-4/3 bg-slate-100 overflow-hidden group">
                    <img
                      src="/pic2.jpg"
                      alt="Priyoful School Students Classroom with QSP Foundation"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for Caption */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-5 sm:p-6">
                      <div className="text-white">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-2">
                          <span>🌻</span>
                          <span>প্রিয়ফুল পাঠশালা • ক্লাসরুম পাঠদান</span>
                        </span>
                        <h3 className="font-bold text-lg sm:text-xl text-white font-outfit leading-tight">
                          শিশুদের আনন্দময় চিত্রকলা ও পাঠদান
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 font-medium">
                          পরিচালনায়: QSP ফাউন্ডেশন • মিরপুর কমিউনিটি শাখা
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Clean Bottom Metrics Ribbon */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-3 gap-2 text-center divide-x divide-slate-200">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block">শিক্ষার্থী</span>
                      <strong className="text-sm font-black text-slate-900 font-outfit">১৪৫+ জন</strong>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block">শ্রেণি সংখ্যা</span>
                      <strong className="text-sm font-black text-slate-900 font-outfit">১ম–৫ম শ্রেণি</strong>
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block">টিউশন ফি</span>
                      <strong className="text-sm font-black text-emerald-700 font-outfit">সম্পূর্ণ ফ্রি</strong>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. COLORFUL STATISTICS METRICS BAR */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-[2.5rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden border border-slate-700">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700">
            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-3xl lg:text-5xl font-black text-amber-400 font-outfit">১৪৫+</span>
              <p className="text-xs lg:text-sm font-bold text-amber-100 uppercase tracking-wider">ভর্তিকৃত শিক্ষার্থী</p>
              <p className="text-[11px] text-slate-400">বস্তির পরিবারের ছোট্ট সোনামণিরা</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-3xl lg:text-5xl font-black text-rose-400 font-outfit">৪০+</span>
              <p className="text-xs lg:text-sm font-bold text-rose-100 uppercase tracking-wider">শিক্ষক ও স্বেচ্ছাসেবী</p>
              <p className="text-[11px] text-slate-400">বিশ্ববিদ্যালয়ের নিবেদিত তরুণ দল</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-3xl lg:text-5xl font-black text-emerald-400 font-outfit">৫ টি</span>
              <p className="text-xs lg:text-sm font-bold text-emerald-100 uppercase tracking-wider">প্রাথমিক শ্রেণি</p>
              <p className="text-[11px] text-slate-400">১ম শ্রেণি থেকে ৫ম শ্রেণি পর্যন্ত</p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <span className="text-3xl lg:text-5xl font-black text-sky-400 font-outfit">৪+ বছর</span>
              <p className="text-xs lg:text-sm font-bold text-sky-100 uppercase tracking-wider">ভালোবাসার পথচলা</p>
              <p className="text-[11px] text-slate-400">ধারাবাহিক আলো ছড়ানোর গল্প</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLASSES OVERVIEW (CLASS 1 TO 5): COLOR-CODED & CHILD-FRIENDLY */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase tracking-wider border border-amber-300">
            <span>📚</span>
            <span>আমাদের আনন্দময় পাঠক্রম</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
            ১ম থেকে ৫ম শ্রেণি: প্রতিটি ধাপেই নতুন আবিষ্কার
          </h2>
          <p className="text-sm text-slate-600">
            জাতীয় শিক্ষাক্রমের সাথে মিল রেখে খেলার ছলে পাঠদান, যাতে প্রতিটি শিশু আনন্দের সাথে শেখে।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {classes.map((cls, idx) => {
            // Cute themes for 5 primary classes
            const classThemes = [
              { banglaSub: 'কুঁড়ি (Buds)', color: 'from-amber-400 to-orange-400', badge: 'bg-amber-100 text-amber-800', icon: '🌱' },
              { banglaSub: 'পাপড়ি (Petals)', color: 'from-rose-400 to-pink-400', badge: 'bg-rose-100 text-rose-800', icon: '🌸' },
              { banglaSub: 'পল্লব (Leaves)', color: 'from-emerald-400 to-teal-400', badge: 'bg-emerald-100 text-emerald-800', icon: '🌿' },
              { banglaSub: 'মুকুল (Blossoms)', color: 'from-sky-400 to-blue-400', badge: 'bg-sky-100 text-sky-800', icon: '🌼' },
              { banglaSub: 'সৌরভ (Fragrance)', color: 'from-purple-400 to-indigo-400', badge: 'bg-purple-100 text-purple-800', icon: '🌺' }
            ];
            const theme = classThemes[idx % classThemes.length];

            return (
              <div
                key={cls.id}
                onClick={() => handleNav('classes', cls.name)}
                className="bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all group flex flex-col justify-between transform hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`w-12 h-12 rounded-2xl bg-linear-to-br ${theme.color} text-white font-black flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition-transform`}>
                      {theme.icon}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full">
                      {cls.room}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 group-hover:text-amber-600 transition-colors font-outfit">
                    {cls.name}
                  </h3>
                  
                  <span className={`inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${theme.badge}`}>
                    {theme.banglaSub}
                  </span>

                  <p className="text-xs text-slate-500 mt-2.5 line-clamp-3 leading-relaxed">
                    {cls.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">ক্লাস শিক্ষক:</span>
                    <strong className="text-xs font-bold text-slate-800 block truncate mt-0.5">
                      {cls.assignedTeacher}
                    </strong>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full text-[11px]">
                    আসন: {cls.capacity} জন
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNav('classes', cls.name);
                    }}
                    className="text-amber-600 hover:text-amber-700 font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    বই ও শিট দেখুন →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. "বাচ্চাদের হাসিমুখ ও দৈনন্দিন যত্ন" (DAILY CARE & NUTRITION) */}
      <section className="bg-linear-to-b from-amber-50/70 via-rose-50/30 to-white py-16 border-y border-amber-200/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
              শুধুমাত্র বই নয়, সার্বিক যত্ন
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
              বাচ্চাদের হাসিমুখ, পুষ্টি ও সৃজনশীলতা
            </h2>
            <p className="text-sm text-slate-600">
              একটি শিশু তখনই মন দিয়ে পড়তে পারে, যখন তার পেট ভরা থাকে এবং মন থাকে খুশিতে ভরপুর।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-3xl mb-4 shadow-xs">
                🍌
              </div>
              <h3 className="font-black text-base text-slate-900 mb-1">প্রতিদিনের পুষ্টিকর নাস্তা</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                তাজা কলা, খাঁটি তরল দুধ, সেদ্ধ ডিম ও বিস্কুট—যাতে পুষ্টিহীনতা কোনো শিশুর পড়ালেখার অন্তরায় না হয়।
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-rose-100 hover:shadow-lg hover:border-rose-300 transition-all transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl mb-4 shadow-xs">
                🎨
              </div>
              <h3 className="font-black text-base text-slate-900 mb-1">রঙের মেলা ও হাতের কাজ</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                প্রতিটি শিশুর রয়েছে নিজস্ব ড্রয়িং খাতা ও প্যাস্টেল রং। এখানে মনের আনন্দে ছবি আঁকে আর হাতের কাজ শেখে।
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-emerald-100 hover:shadow-lg hover:border-emerald-300 transition-all transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4 shadow-xs">
                🦷
              </div>
              <h3 className="font-black text-base text-slate-900 mb-1">দাঁতের যত্ন ও স্বাস্থ্য ক্যাম্প</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                নিয়মিত বিনামূল্যে ডাক্তারদের স্বাস্থ্য পরীক্ষা, কৃমিনাশক প্রদান, দাঁতের যত্ন ও পরিষ্কার-পরিচ্ছন্নতার প্রশিক্ষণ।
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-sky-100 hover:shadow-lg hover:border-sky-300 transition-all transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-3xl mb-4 shadow-xs">
                ⚽
              </div>
              <h3 className="font-black text-base text-slate-900 mb-1">খেলাধুলা ও মজার ছড়া</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                উঠানভর্তি হাসাহাসি, গোল্লাছুট, দড়িলাফ, ক্যারম আর ছড়ার ক্লাসে আনন্দে মুখরিত থাকে পুরো স্কুল প্রাঙ্গণ।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "বাচ্চাদের স্বপ্নের কথা" (WALL OF LITTLE DREAMS - INTERACTIVE) */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="bg-linear-to-br from-amber-100/70 via-rose-100/40 to-sky-100/50 rounded-[2.5rem] p-8 sm:p-12 border-2 border-amber-200/80 shadow-md">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase mb-2">
                <span>🌟</span>
                <span>ছোটদের বড় স্বপ্ন</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
                বাচ্চাদের স্বপ্নের কথা (Wall of Smiles)
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                বস্তির প্রতিটি শিশুর বুকেও লুকিয়ে আছে আকাশ ছোঁয়ার স্বপ্ন।
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDreamCategory('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedDreamCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                সব স্বপ্ন (All)
              </button>
              <button
                onClick={() => setSelectedDreamCategory('doctor')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedDreamCategory === 'doctor'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                🩺 ডাক্তার
              </button>
              <button
                onClick={() => setSelectedDreamCategory('engineer')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedDreamCategory === 'engineer'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                💻 ইঞ্জিনিয়ার
              </button>
              <button
                onClick={() => setSelectedDreamCategory('teacher')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedDreamCategory === 'teacher'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                📚 শিক্ষক
              </button>
              <button
                onClick={() => setSelectedDreamCategory('artist')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedDreamCategory === 'artist'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                🎨 চিত্রশিল্পী
              </button>
            </div>
          </div>

          {/* Dream Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDreams.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={d.avatar}
                      alt={d.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-200 shadow-xs"
                    />
                    <div>
                      <h4 className="font-black text-slate-900 text-base font-outfit">{d.name}</h4>
                      <span className="text-[11px] text-slate-500 block">{d.class}</span>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1 ${d.badgeColor}`}>
                        <span>{d.icon}</span>
                        <span>{d.dream}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 italic bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100/60 leading-relaxed">
                    "{d.quote}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-amber-700 font-bold flex items-center justify-between">
                  <span>প্রিয়ফুল শিক্ষার্থী</span>
                  <span>❤️ স্বপ্নপূরণে পাশে থাকুন</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. DAILY SCHEDULE / এক নজরে আমাদের দিনটি */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider border border-emerald-300">
            <span>⏰</span>
            <span>স্কুলের রুটিন</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight">
            এক নজরে প্রিয়ফুলের একটি দিন
          </h2>
          <p className="text-sm text-slate-600">
            প্রতিটি দিন শুরু হয় শৃঙ্খলা, ভালোবাসা ও আনন্দের ছোঁয়ায়।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {dailySchedule.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-5 border-2 ${item.color} shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-white/70">
                    {item.time}
                  </span>
                </div>
                <h4 className="font-black text-base text-slate-900 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-700 leading-relaxed mt-2">{item.desc}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-black/10 text-[11px] font-bold text-slate-600">
                ধাপ {idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. INTERACTIVE FUN QUIZ FOR KIDS */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="bg-linear-to-r from-amber-400 via-orange-400 to-rose-400 rounded-[2.5rem] p-8 sm:p-12 text-slate-900 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="bg-white/80 text-slate-900 text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
                <span>🎯</span>
                <span>ছোটদের মজার কুইজ ও খেলা</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-outfit leading-tight">
                আজকের মজার প্রশ্ন: বাংলাদেশের জাতীয় ফুলের নাম কী? 🌸
              </h3>
              <p className="text-amber-50 text-sm">
                ছোট বন্ধুরা, সঠিক উত্তরে ক্লিক করে দেখে নাও তোমার উত্তরটি ঠিক হয়েছে কি না!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { text: '১. গোলাপ (Rose)', correct: false },
                  { text: '২. শাপলা (Water Lily)', correct: true },
                  { text: '৩. সূর্যমুখী (Sunflower)', correct: false }
                ].map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => {
                      setQuizAnswered(optIdx);
                      if (opt.correct) {
                        confetti({
                          particleCount: 65,
                          spread: 75,
                          origin: { y: 0.65 },
                          colors: ['#10b981', '#fbbf24', '#f43f5e', '#3b82f6'],
                        });
                      }
                    }}
                    className={`p-3.5 rounded-2xl font-black text-sm text-left transition-all cursor-pointer ${
                      quizAnswered === optIdx
                        ? opt.correct
                          ? 'bg-emerald-600 text-white shadow-lg scale-105'
                          : 'bg-rose-600 text-white shadow-lg'
                        : 'bg-white hover:bg-amber-50 text-slate-800 shadow-sm hover:scale-102'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {quizAnswered !== null && (
                <div className={`p-4 rounded-2xl text-xs font-bold animate-in fade-in ${
                  quizAnswered === 1
                    ? 'bg-white text-emerald-800 border-2 border-emerald-400 shadow-md'
                    : 'bg-white text-rose-800 border-2 border-rose-400'
                }`}>
                  {quizAnswered === 1 ? (
                    <span className="flex items-center gap-2">
                      <PartyPopper className="w-5 h-5 text-emerald-600 animate-bounce" />
                      দারুণ! সঠিক উত্তর হয়েছে! বাংলাদেশের জাতীয় ফুল হলো সাদা শাপলা! 🌸🎉
                    </span>
                  ) : (
                    <span>আবার চেষ্টা করো বন্ধু! সঠিক উত্তরটি হলো: ২. শাপলা (Water Lily) 🌿</span>
                  )}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/95 backdrop-blur-xs rounded-3xl p-6 shadow-2xl border-2 border-white max-w-sm text-center space-y-3 card-hover-3d">
                <span className="text-5xl block animate-float">🌻</span>
                <h4 className="font-black text-slate-900 text-lg font-outfit">প্রিয়ফুলে প্রতিদিন নতুন আনন্দ</h4>
                <p className="text-xs text-slate-600">
                  আমরা বিশ্বাস করি পড়াশোনা কোনো বোঝা নয়, পড়াশোনা হলো রঙিন ডানায় ভর করে স্বপ্ন ছোঁয়ার আনন্দযাত্রা!
                </p>
                <button
                  onClick={() => handleNav('activities')}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
                >
                  আমাদের সব মজার কার্যক্রম দেখুন →
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. GALLERY PREVIEW */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              ছবির অ্যালবামে প্রিয়ফুল
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit tracking-tight mt-2">
              আমাদের রঙিন মুহূর্তগুলি
            </h2>
          </div>
          <button
            onClick={() => handleNav('gallery')}
            className="text-sm font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 group"
          >
            <span>সব ছবি দেখুন ({gallery.length}টি)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-xl transition-all"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-black text-base text-slate-900 font-outfit">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. DONATION IMPACT CTA BANNER */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="bg-white/20 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full">
              স্বচ্ছতা ও প্রত্যক্ষ সহযোগিতা
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-outfit tracking-tight leading-tight">
              আপনার সামান্য দান একটি শিশুর পুরো ভবিষ্যৎ বদলে দিতে পারে
            </h2>
            <p className="text-amber-100 text-sm sm:text-base leading-relaxed">
              আপনার পাঠানো প্রতিটি টাকা সরাসরি ব্যবহৃত হয় ক্লাসরুমের ভাড়া, নতুন বই-খাতা, চক-ডাস্টার এবং শিশুদের সকালের তাজা দুধের জন্য। আমাদের কোনো অতিরিক্ত প্রশাসনিক ব্যয় নেই।
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleNav('donate')}
                className="bg-white text-slate-900 hover:bg-amber-50 font-black px-8 py-4 rounded-full shadow-xl text-sm sm:text-base flex items-center gap-2 transition-transform active:scale-95 group"
              >
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 group-hover:scale-125 transition-transform" />
                <span>বিকাশ / নগদ / ব্যাংকে অনুদান দিন</span>
              </button>

              <button
                onClick={() => handleNav('contact')}
                className="bg-black/20 hover:bg-black/30 border border-white/30 text-white font-bold px-6 py-4 rounded-full text-sm sm:text-base transition-colors"
              >
                স্বেচ্ছাসেবী হিসেবে যোগ দিন
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. LATEST NEWS & UPCOMING EVENTS */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <h3 className="text-2xl font-black text-slate-900 font-outfit">আসন্ন আয়োজন ও ইভেন্ট</h3>
              </div>
              <button
                onClick={() => handleNav('news-events')}
                className="text-xs font-bold text-amber-700 hover:underline"
              >
                সব আয়োজন দেখুন →
              </button>
            </div>

            <div className="space-y-4">
              {events.slice(0, 2).map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-amber-300 transition-colors flex gap-4"
                >
                  <img
                    src={evt.coverUrl}
                    alt={evt.title}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="grow min-w-0">
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
                      {evt.date} • {evt.time}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1 truncate">{evt.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      📍 {evt.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* School Stories & News */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-rose-600" />
                <h3 className="text-2xl font-black text-slate-900 font-outfit">স্কুল সংবাদ ও গল্প</h3>
              </div>
              <button
                onClick={() => handleNav('news-events')}
                className="text-xs font-bold text-rose-700 hover:underline"
              >
                আরও খবর পড়ুন →
              </button>
            </div>

            <div className="space-y-4">
              {news.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-rose-300 transition-colors flex gap-4"
                >
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="grow min-w-0">
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm">
                      {item.date} • By {item.author}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1 truncate">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 11. LEADERSHIP & PATRON (সিম্পল ও ন্যাচারাল সংক্ষিপ্ত সেকশন) */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-200/80 shadow-sm">
          
          {/* Subtle natural header */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-amber-100">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌱</span>
              <h3 className="text-base sm:text-lg font-black text-slate-800 font-outfit">
                আমাদের অভিভাবক ও নেতৃত্ব
              </h3>
              <span className="text-xs text-amber-700 bg-amber-100/70 font-semibold px-2.5 py-0.5 rounded-full">
                দিকনির্দেশনা
              </span>
            </div>
            <button
              onClick={() => handleNav('about')}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>আমাদের গল্প ও অনুপ্রেরণা পড়ুন</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            
            {/* 1. Mahmudul Hasan Bahar Bhai (পরিচালক ও প্রধান স্বপ্নদ্রষ্টা) - Compact & Natural */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-amber-50/50 hover:bg-amber-50/80 border border-amber-200/60 transition-colors">
              {/* 100% Accurate Circular Portrait */}
              <div className="shrink-0 relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-linear-to-tr from-amber-400 to-orange-400 shadow-sm">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-slate-100">
                    <img
                      src="/bahar_vi.jpg"
                      alt="মাহমুদুল হাসান বাহার (Mahmudul Hasan Bahar)"
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    মাহমুদুল হাসান বাহার
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-900">
                    পরিচালক
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  পরিচালক ও প্রধান স্বপ্নদ্রষ্টা • প্রিয়ফুল পাঠশালা (QSP ফাউন্ডেশন)
                </p>
                <p className="text-xs text-slate-700 leading-relaxed italic bg-white/80 p-2.5 rounded-xl border border-amber-200/40 text-left">
                  “একটি শিশুও যেন কেবল দারিদ্র্যের কারণে শিক্ষার আলো থেকে বঞ্চিত না হয়—এটাই প্রিয়ফুলের অঙ্গীকার। এটি ভালোবাসা ও স্নেহের নিরাপদ ভুবন।”
                </p>
              </div>
            </div>

            {/* 2. Honorable Patron / Advisor: BUBT VC Sir (Planned Support Slot) - Compact & Natural */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-dashed border-slate-300 transition-colors">
              {/* Circular Avatar Placeholder */}
              <div className="shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-linear-to-tr from-sky-400 to-indigo-400 shadow-sm flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-sky-50 flex flex-col items-center justify-center text-center p-1">
                    <GraduationCap className="w-6 h-6 text-sky-600 mb-0.5" />
                    <span className="text-[9px] font-black text-sky-950 uppercase">BUBT</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <h4 className="text-base font-black text-slate-900 leading-tight">
                    উপাচার্য (VC) মহোদয়
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                    উপদেষ্টা ও পৃষ্ঠপোষক
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  বাংলাদেশ ইউনিভার্সিটি অব বিজনেস অ্যান্ড টেকনোলজি (BUBT)
                </p>
                <div className="text-xs text-slate-600 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-left">
                  <span>উচ্চশিক্ষা সহায়তা ও সামাজিক দিকনির্দেশক হিসেবে পাশে থাকছেন।</span>
                  <span className="shrink-0 text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                    শীঘ্রই যুক্ত হচ্ছে
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
