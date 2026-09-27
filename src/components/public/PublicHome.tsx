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
  const [heroBgMode, setHeroBgMode] = useState<'cinematic' | 'vivid'>('cinematic');

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
      
      {/* 1. HERO SECTION: SUPER EYE-CATCHING REAL PHOTO HERO WITH ATMOSPHERIC BLEND */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24">
        
        {/* Real School Community Photo Background with Soft Dreamy Aesthetic */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <img
            src="/pic1.jpg"
            alt="Priyoful School Mural & Students Wall"
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
              heroBgMode === 'vivid'
                ? 'opacity-85 lg:opacity-90 scale-100 filter brightness-100 contrast-105'
                : 'opacity-65 lg:opacity-75 scale-102 filter blur-[1.5px] brightness-95 contrast-105'
            }`}
            referrerPolicy="no-referrer"
          />
          {/* Subtle translucent veil that lets pic1 shine through while ensuring readability */}
          <div className={`absolute inset-0 transition-colors duration-700 ${
            heroBgMode === 'vivid'
              ? 'bg-linear-to-r from-amber-50/65 via-white/35 to-transparent'
              : 'bg-linear-to-r from-amber-50/70 via-white/40 to-amber-50/20'
          }`} />
          {/* Bottom fade into the page */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-white via-white/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white/40 to-transparent" />
        </div>

        {/* Playful Floating Ambient Glows */}
        <div className="absolute top-10 left-6 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-28 right-12 w-80 h-80 bg-rose-400/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute bottom-6 left-1/3 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading & Child-Centered Heart with Frosted Glass Container */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left p-6 sm:p-8 lg:p-9 rounded-3xl bg-white/85 backdrop-blur-md border border-white/70 shadow-xl shadow-amber-950/5 transition-all duration-300">
              
              {/* Cute Badges with Background Style Selector */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-amber-200 via-orange-200 to-rose-200 border border-amber-300 text-slate-800 text-xs sm:text-sm font-extrabold shadow-sm transform hover:scale-105 transition-transform cursor-default">
                  <span className="text-lg">🌸</span>
                  <span>প্রিয়ফুল পাঠশালা • ছোটদের আনন্দের ভুবন</span>
                  <span className="text-amber-700 font-bold">•</span>
                  <span className="bg-white/80 px-2 py-0.5 rounded-full text-rose-700 text-xs">Class 1 to 5</span>
                </div>

                {/* Interactive Background View Mode Toggle for User Review */}
                <button
                  onClick={() => setHeroBgMode(heroBgMode === 'cinematic' ? 'vivid' : 'cinematic')}
                  title="ব্যাকগ্রাউন্ড ছবির লুক পরিবর্তন করে দেখুন"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 border border-amber-300 shadow-xs text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>🖼️</span>
                  <span>ব্যাকগ্রাউন্ড:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    heroBgMode === 'cinematic'
                      ? 'bg-amber-400 text-slate-900'
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {heroBgMode === 'cinematic' ? 'হালকা আবছা লুক ✦' : 'সম্পূর্ণ স্পষ্ট'}
                  </span>
                </button>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] font-outfit">
                ভালোবাসা ও শিক্ষায় আলোকিত হোক প্রতিটি{' '}
                <span className="relative whitespace-nowrap text-transparent bg-clip-text bg-linear-to-r from-amber-500 via-orange-500 to-rose-500">
                  ছোট্ট স্বপ্ন
                  <span className="absolute left-0 -bottom-2 w-full h-3 bg-amber-300/70 rounded-full -z-10 transform -rotate-1"></span>
                </span>
                {' '}🌻
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                মিরপুরের সুবিধাবঞ্চিত বস্তির শিশুদের জন্য সম্পূর্ণ অবৈতনিক প্রাথমিক বিদ্যালয়। এখানে প্রতিটি শিশু পায় বিনামূল্যে নতুন বই, খাতা-কলম, পুষ্টিকর খাবার, মমতাময়ী শিক্ষক এবং হাসিমুখে বড় হওয়ার অবারিত সুযোগ।
              </p>

              {/* CTAs with Playful Styling & Confetti micro-interaction */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    confetti({
                      particleCount: 40,
                      spread: 60,
                      origin: { y: 0.6 },
                      colors: ['#f59e0b', '#f43f5e', '#10b981'],
                    });
                    setTimeout(() => handleNav('donate'), 250);
                  }}
                  className="px-8 py-4 rounded-full bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black text-base shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all flex items-center gap-3 active:scale-95 group cursor-pointer animate-pulse-glow"
                >
                  <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform animate-heartbeat" />
                  <span>একটি শিশুর মুখে হাসি ফোটান (Donate)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={() => handleNav('about')}
                  className="px-7 py-4 rounded-full bg-white hover:bg-amber-50/90 border-2 border-amber-300 text-slate-800 font-extrabold text-base shadow-sm hover:border-amber-400 hover:shadow-md transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span className="text-xl group-hover:rotate-12 transition-transform">📖</span>
                  <span>আমাদের গল্প ও স্বপ্ন</span>
                </button>
              </div>

              {/* Child-Friendly Highlights Badges */}
              <div className="pt-6 border-t border-amber-200/60 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-center gap-2 bg-white/90 p-2.5 rounded-2xl border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all">
                  <span className="text-lg">🎒</span>
                  <span className="font-bold text-slate-800">১০০% বিনামূল্যে বই-খাতা</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 p-2.5 rounded-2xl border border-amber-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all">
                  <span className="text-lg">🥛</span>
                  <span className="font-bold text-slate-800">প্রতিদিনের পুষ্টিকর নাস্তা</span>
                </div>
                <div className="flex items-center gap-2 bg-white/90 p-2.5 rounded-2xl border border-amber-200/80 shadow-xs col-span-2 sm:col-span-1 hover:border-amber-400 hover:shadow-md transition-all">
                  <span className="text-lg">💖</span>
                  <span className="font-bold text-slate-800">মমতাময়ী স্বেচ্ছাসেবী শিক্ষক</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Card with Real Mural & Community Photo */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Card with 3D hover */}
                <div className="card-hover-3d rounded-[2.5rem] p-4 bg-white shadow-2xl shadow-amber-900/15 border-2 border-amber-200 transform -rotate-1 hover:rotate-0 transition-all duration-300 relative group">
                  
                  {/* Cute Top Pin Sticker */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-rose-500 to-amber-500 text-white font-black text-[11px] px-4 py-1.5 rounded-full shadow-md z-20 flex items-center gap-1.5 animate-pulse whitespace-nowrap">
                    <span>✨</span>
                    <span>প্রিয়ফুল পাঠশালা • আসল ক্লাসরুম ও দেওয়ালচিত্র</span>
                  </div>

                  <div className="relative rounded-[2rem] overflow-hidden aspect-4/3 shadow-inner">
                    <img
                      src="/pic2.jpg"
                      alt="Priyoful School Students Classroom with QSP Foundation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end p-5">
                      <div className="text-white">
                        <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-sm">
                          <span className="animate-spin-slow">🌻</span>
                          <span>শ্রেণিকক্ষে আনন্দের পাঠদান • প্রিয়ফুল</span>
                        </span>
                        <h3 className="font-black text-lg sm:text-xl text-white mt-2 font-outfit">
                          পরিচালনায়: QSP ফাউন্ডেশন
                        </h3>
                        <p className="text-xs text-amber-200 font-medium mt-0.5">
                          আমাদের শিক্ষক, মেন্টর ও শিশুদের আনন্দঘন মিলনমেলা
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Colorful Stats Pills inside Card */}
                  <div className="p-2 grid grid-cols-2 gap-3 mt-3">
                    <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 text-center hover:bg-amber-100/70 transition-colors">
                      <span className="text-[11px] font-bold text-amber-700 block">শ্রেণি সংখ্যা</span>
                      <strong className="text-base font-black text-amber-950">১ম থেকে ৫ম শ্রেণি</strong>
                    </div>
                    <div className="bg-rose-50 rounded-2xl p-3.5 border border-rose-200 text-center hover:bg-rose-100/70 transition-colors">
                      <span className="text-[11px] font-bold text-rose-700 block">স্বেচ্ছাসেবী ও শিক্ষক</span>
                      <strong className="text-base font-black text-rose-950">৪০+ জন তরুণ</strong>
                    </div>
                  </div>
                </div>

                {/* Floating Badge (Left) - Smooth Floating Animation */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-3xl p-4 shadow-xl border-2 border-amber-200 flex items-center gap-3 hidden sm:flex animate-float z-20">
                  <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl shadow-md">
                    ☀️
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 font-bold block">আমাদের শিক্ষার্থী</span>
                    <strong className="text-base font-black text-slate-900">১৪৫+ ফুলের মতো শিশু</strong>
                  </div>
                </div>

                {/* Floating Badge (Right) - Smooth Floating Reverse */}
                <div className="absolute -top-6 -right-4 bg-white rounded-3xl p-3.5 shadow-xl border-2 border-rose-200 hidden sm:flex items-center gap-2 animate-float-reverse z-20">
                  <span className="text-2xl animate-sway inline-block">🎈</span>
                  <div className="text-[11px] font-black text-rose-600">
                    ১০০% ফ্রি পাঠশালা
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
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/50 hover:bg-amber-50/80 border border-amber-200/60 transition-colors">
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
                <div className="flex flex-wrap items-center gap-1.5">
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
                <p className="text-xs text-slate-700 leading-relaxed italic bg-white/80 p-2 rounded-xl border border-amber-200/40">
                  “একটি শিশুও যেন কেবল দারিদ্র্যের কারণে শিক্ষার আলো থেকে বঞ্চিত না হয়—এটাই প্রিয়ফুলের অঙ্গীকার। এটি ভালোবাসা ও স্নেহের নিরাপদ ভুবন।”
                </p>
              </div>
            </div>

            {/* 2. Honorable Patron / Advisor: BUBT VC Sir (Planned Support Slot) - Compact & Natural */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/70 hover:bg-slate-50 border border-dashed border-slate-300 transition-colors">
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
                <div className="flex flex-wrap items-center gap-1.5">
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
                <div className="text-xs text-slate-600 leading-relaxed bg-white/80 p-2 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
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
