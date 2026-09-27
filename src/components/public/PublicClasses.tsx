import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { useSchool } from '../../context/SchoolContext';
import {
  GraduationCap,
  BookOpen,
  FileText,
  Clock,
  Users,
  CheckCircle,
  Sparkles,
  Heart,
  ArrowLeft,
  ArrowRight,
  Eye,
  Download,
  Search,
  Filter,
  Layers,
  Calendar,
  UserCheck,
  Printer,
  X,
  Smile,
  Volume2,
  BookmarkCheck,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { Book, StudyMaterial, SchoolClass } from '../../types';

export const PublicClasses: React.FC = () => {
  const { classes, books, materials, teachers, selectedClassForDetail, setSelectedClassForDetail, setActiveTab } = useSchool();

  // Selected Class ID or name (default to null = show all classes, or string = show class drilldown)
  const [activeClassId, setActiveClassId] = useState<string | null>(selectedClassForDetail);
  const [classSubTab, setClassSubTab] = useState<'books' | 'sheets' | 'routine' | 'syllabus' | 'teacher'>('books');

  // Search & Filter within Class
  const [bookSearch, setBookSearch] = useState('');
  const [bookCategoryFilter, setBookCategoryFilter] = useState('all');
  const [sheetSearch, setSheetSearch] = useState('');
  const [sheetSubjectFilter, setSheetSubjectFilter] = useState('all');

  // Modals for Book Reader Preview & Sheet Study Preview
  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState('');

  // Synchronize with context if selected from Home or elsewhere
  useEffect(() => {
    if (selectedClassForDetail) {
      setActiveClassId(selectedClassForDetail);
    }
  }, [selectedClassForDetail]);

  const showToast = (text: string) => {
    setDownloadSuccessToast(text);
    setTimeout(() => setDownloadSuccessToast(''), 3500);
  };

  // Class Bangla Themes & Visuals
  const classBanglaThemes: Record<string, { title: string; flower: string; icon: string; color: string; badge: string; border: string; bgGradient: string }> = {
    'Class 1': {
      title: '১ম শ্রেণি: কুঁড়ি (Buds)',
      flower: 'কুঁড়ি (Buds)',
      icon: '🌱',
      color: 'from-amber-400 to-orange-500',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      border: 'border-amber-200 hover:border-amber-400',
      bgGradient: 'from-amber-500/10 via-orange-500/5 to-transparent'
    },
    'Class 2': {
      title: '২য় শ্রেণি: পাপড়ি (Petals)',
      flower: 'পাপড়ি (Petals)',
      icon: '🌸',
      color: 'from-rose-400 to-pink-500',
      badge: 'bg-rose-100 text-rose-900 border-rose-300',
      border: 'border-rose-200 hover:border-rose-400',
      bgGradient: 'from-rose-500/10 via-pink-500/5 to-transparent'
    },
    'Class 3': {
      title: '৩য় শ্রেণি: পল্লব (Leaves)',
      flower: 'পল্লব (Leaves)',
      icon: '🌿',
      color: 'from-emerald-400 to-teal-500',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      border: 'border-emerald-200 hover:border-emerald-400',
      bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent'
    },
    'Class 4': {
      title: '৪র্থ শ্রেণি: মুকুল (Blossoms)',
      flower: 'মুকুল (Blossoms)',
      icon: '🌼',
      color: 'from-sky-400 to-blue-500',
      badge: 'bg-sky-100 text-sky-900 border-sky-300',
      border: 'border-sky-200 hover:border-sky-400',
      bgGradient: 'from-sky-500/10 via-blue-500/5 to-transparent'
    },
    'Class 5': {
      title: '৫ম শ্রেণি: সৌরভ (Fragrance)',
      flower: 'সৌরভ (Fragrance)',
      icon: '🌺',
      color: 'from-purple-400 to-indigo-500',
      badge: 'bg-purple-100 text-purple-900 border-purple-300',
      border: 'border-purple-200 hover:border-purple-400',
      bgGradient: 'from-purple-500/10 via-indigo-500/5 to-transparent'
    }
  };

  // Find active class data
  const currentClass = classes.find(
    (c) => c.name === activeClassId || c.id === activeClassId
  );

  const currentTheme = currentClass
    ? classBanglaThemes[currentClass.name] || {
        title: currentClass.name,
        flower: currentClass.name,
        icon: '📚',
        color: 'from-amber-400 to-orange-500',
        badge: 'bg-amber-100 text-amber-900 border-amber-300',
        border: 'border-amber-200',
        bgGradient: 'from-amber-500/10 to-transparent'
      }
    : null;

  // Filter books for this specific class
  const classBooks = currentClass
    ? books.filter((b) => b.class === currentClass.name || b.class === 'All')
    : [];

  const filteredClassBooks = classBooks.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(bookSearch.toLowerCase()) ||
      b.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
      b.description.toLowerCase().includes(bookSearch.toLowerCase());
    const matchesCat = bookCategoryFilter === 'all' || b.category === bookCategoryFilter;
    return matchesSearch && matchesCat;
  });

  // Filter study materials & sheets for this specific class
  const classMaterials = currentClass
    ? materials.filter((m) => m.class === currentClass.name)
    : [];

  const filteredClassMaterials = classMaterials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(sheetSearch.toLowerCase()) ||
      m.description.toLowerCase().includes(sheetSearch.toLowerCase());
    const matchesSub = sheetSubjectFilter === 'all' || m.subject === sheetSubjectFilter;
    return matchesSearch && matchesSub;
  });

  // Assigned teacher object
  const currentTeacher = currentClass
    ? teachers.find((t) => t.fullName === currentClass.assignedTeacher || t.assignedClass === currentClass.name)
    : null;

  // Sample Weekly Class Routines by Class
  const classRoutines: Record<string, { day: string; periods: { time: string; subject: string; teacher: string; room: string }[] }[]> = {
    'Class 1': [
      {
        day: 'শনিবার (Saturday)',
        periods: [
          { time: '০৯:০০ - ০৯:৪৫', subject: 'বাংলা বর্ণমালা ও ছড়া', teacher: 'ফারহানা ইয়াসমিন', room: 'Room 101' },
          { time: '০৯:৪৫ - ১০:৩০', subject: 'প্রাথমিক গণিত ও গণনা', teacher: 'তানভীর হাসান', room: 'Room 101' },
          { time: '১০:৩০ - ১১:০০', subject: 'টিফিন ও পুষ্টিকর নাস্তা 🍌', teacher: 'স্বেচ্ছাসেবী দল', room: 'ডাইনিং কর্নার' },
          { time: '১১:০০ - ১১:৪৫', subject: 'English Phonics & Rhymes', teacher: 'নুসরাত জাহান', room: 'Room 101' },
          { time: '১১:৪৫ - ১২:৩০', subject: 'ছবি আঁকা ও রঙের খেলা', teacher: 'ফারহানা ইয়াসমিন', room: 'আর্ট রুম' }
        ]
      },
      {
        day: 'রবিবার (Sunday)',
        periods: [
          { time: '০৯:০০ - ০৯:৪৫', subject: 'বাংলা সুন্দর হাতের লেখা', teacher: 'ফারহানা ইয়াসমিন', room: 'Room 101' },
          { time: '০৯:৪৫ - ১০:৩০', subject: 'গণিত ধাঁধা ও কাঠি গণনা', teacher: 'তানভীর হাসান', room: 'Room 101' },
          { time: '১০:৩০ - ১১:০০', subject: 'টিফিন ও খাঁটি তরল দুধ 🥛', teacher: 'স্বেচ্ছাসেবী দল', room: 'ডাইনিং কর্নার' },
          { time: '১১:০০ - ১১:৪৫', subject: 'নৈতিক মূল্যবোধ ও গল্পের আসর', teacher: 'সাদিয়া সুলতানা', room: 'লাইব্রেরি রুম' },
          { time: '১১:৪৫ - ১২:৩০', subject: 'উঠান খেলা ও শরীরচর্চা', teacher: 'আরিফুর রহমান', room: 'স্কুল মাঠ' }
        ]
      },
      {
        day: 'সোমবার (Monday)',
        periods: [
          { time: '০৯:০০ - ০৯:৪৫', subject: 'বাংলা সহজ পাঠ ও আবৃত্তি', teacher: 'ফারহানা ইয়াসমিন', room: 'Room 101' },
          { time: '০৯:৪৫ - ১০:৩০', subject: 'সংখ্যা মেলানো ওয়ার্কশিট', teacher: 'তানভীর হাসান', room: 'Room 101' },
          { time: '১০:৩০ - ১১:০০', subject: 'টিফিন ও সেদ্ধ ডিম 🥚', teacher: 'স্বেচ্ছাসেবী দল', room: 'ডাইনিং কর্নার' },
          { time: '১১:০০ - ১১:৪৫', subject: 'English Animal Names & Action', teacher: 'নুসরাত জাহান', room: 'Room 101' },
          { time: '১১:৪৫ - ১২:৩০', subject: 'মাটির খেলনা ও পেপার ক্রাফট', teacher: 'ফারহানা ইয়াসমিন', room: 'আর্ট রুম' }
        ]
      },
      {
        day: 'মঙ্গলবার (Tuesday)',
        periods: [
          { time: '০৯:০০ - ০৯:৪৫', subject: 'বাংলা ছড়া অভিনয় ও গান', teacher: 'ফারহানা ইয়াসমিন', room: 'Room 101' },
          { time: '০৯:৪৫ - ১০:৩০', subject: 'প্রাথমিক গণিত ও আকৃতি চেনা', teacher: 'তানভীর হাসান', room: 'Room 101' },
          { time: '১০:৩০ - ১১:০০', subject: 'টিফিন ও পুষ্টিকর ফল 🍎', teacher: 'স্বেচ্ছাসেবী দল', room: 'ডাইনিং কর্নার' },
          { time: '১১:০০ - ১১:৪৫', subject: 'পরিবেশ ও গাছপালার যত্ন', teacher: 'আরিফুর রহমান', room: 'গার্ডেন' },
          { time: '১১:৪৫ - ১২:৩০', subject: 'দড়িলাফ ও মজার খেলাধুলা', teacher: 'তানভীর হাসান', room: 'স্কুল মাঠ' }
        ]
      },
      {
        day: 'বুধবার (Wednesday)',
        periods: [
          { time: '০৯:০০ - ০৯:৪৫', subject: 'বাংলা শব্দ গঠন ও ছবি দেখা', teacher: 'ফারহানা ইয়াসমিন', room: 'Room 101' },
          { time: '০৯:৪৫ - ১০:৩০', subject: 'গণিত কুইজ ও নাম্বার গেম', teacher: 'তানভীর হাসান', room: 'Room 101' },
          { time: '১০:৩০ - ১১:০০', subject: 'টিফিন ও বিস্কুট 🍪', teacher: 'স্বেচ্ছাসেবী দল', room: 'ডাইনিং কর্নার' },
          { time: '১১:০০ - ১১:৪৫', subject: 'English Conversation Games', teacher: 'নুসরাত জাহান', room: 'Room 101' },
          { time: '১১:৪৫ - ১২:৩০', subject: 'রঙিন কার্টুন ও শিক্ষণীয় ভিডিও', teacher: 'আরিফুর রহমান', room: 'মিডিয়া রুম' }
        ]
      },
      {
        day: 'বৃহস্পতিবার (Thursday)',
        periods: [
          { time: '০৯:০০ - ০৯:৪৫', subject: 'সাপ্তাহিক মূল্যায়ন ও ছড়া পাঠ', teacher: 'ফারহানা ইয়াসমিন', room: 'Room 101' },
          { time: '০৯:৪৫ - ১০:৩০', subject: 'গণিত শিট সমাধান ও পুরষ্কার', teacher: 'তানভীর হাসান', room: 'Room 101' },
          { time: '১০:৩০ - ১১:০০', subject: 'বিশেষ টিফিন ও মিষ্টি ফল 🍇', teacher: 'স্বেচ্ছাসেবী দল', room: 'ডাইনিং কর্নার' },
          { time: '১১:০০ - ১২:০০', subject: 'সাপ্তাহিক আনন্দ মেলা ও সাংস্কৃতিক অনুষ্ঠান', teacher: 'সকল শিক্ষক', room: 'মূল অডিটোরিয়াম' }
        ]
      }
    ]
  };

  // Syllabus & Milestones data
  const classSyllabus: Record<string, { subject: string; milestones: string[]; examWeight: string }[]> = {
    'Class 1': [
      {
        subject: 'বাংলা (Mother Tongue)',
        milestones: [
          'স্বরবর্ণ (অ থেকে ঔ) এবং ব্যঞ্জনবর্ণ (ক থেকে ঁ) শুদ্ধ উচ্চারণে চেনা ও পড়া',
          'ডট টেনে সঠিক নির্দেশনায় প্রতিটি বর্ণ সুন্দরভাবে খাতায় লেখা',
          '১০টি জনপ্রিয় দেশীয় ছড়া মুখস্থ করা ও আনন্দের সাথে হাততালি দিয়ে অভিনয়',
          'নিজের নাম ও অভিভাবকের নাম বাংলায় বলতে ও লিখতে পারা'
        ],
        examWeight: 'মৌখিক ৬০% • লিখিত ৪০%'
      },
      {
        subject: 'প্রাথমিক গণিত (Basic Math)',
        milestones: [
          '১ থেকে ৫০ পর্যন্ত সংখ্যা মুখে বলা ও বাস্তব বস্তু গুনে লেখা',
          'ছোট-বড়, হালকা-ভারী, কাছে-দূরের তুলনামূলক ধারণা লাভ',
          'ছবি দেখে সহজ এক অঙ্কের যোগ ও বিয়োগ (১ থেকে ১০ পর্যন্ত)',
          'গোল (বৃত্ত), চারকোনা (বর্গ) ও তিনকোনা (ত্রিভুজ) আকৃতি চিহ্নিতকরণ'
        ],
        examWeight: 'মৌখিক ৫০% • লিখিত ৫০%'
      },
      {
        subject: 'English Rhymes & Phonics',
        milestones: [
          'A to Z capital and small letters with clean phonetic pronunciation',
          'Names of 10 common animals, 5 fruits, and 5 colors in English',
          'Greeting phrases: Good morning, Thank you, Please, How are you?',
          'Recitation of 5 world-famous nursery rhymes with actions'
        ],
        examWeight: 'মৌখিক ৭০% • অ্যাক্টিভিটি ৩০%'
      },
      {
        subject: 'নৈতিক শিক্ষা ও পরিবেশ (Moral & Habits)',
        milestones: [
          'খাওয়ার আগে সাবান দিয়ে হাত ধোয়া ও প্রতিদিন দাঁত ব্রাশ করা',
          'সহপাঠীদের সাথে টিফিন ও রঙের পেন্সিল শেয়ার করার অভ্যাস গঠন',
          'ছোট ছোট গাছ লাগানো এবং ময়লা নির্দিষ্ট ঝুড়িতে ফেলার অভ্যাস'
        ],
        examWeight: 'আচরণ ও উপস্থিতি ১০০%'
      }
    ]
  };

  const handleSelectClass = (clsName: string) => {
    setActiveClassId(clsName);
    setSelectedClassForDetail(clsName);
    setClassSubTab('books');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBackToAllClasses = () => {
    setActiveClassId(null);
    setSelectedClassForDetail(null);
  };

  const handleDownloadSheet = (mat: StudyMaterial) => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#10b981', '#fbbf24', '#f59e0b', '#3b82f6'],
    });
    showToast(`"${mat.title}" শিটটি সফলভাবে প্রস্তুত হয়েছে ও ডাউনলোড করা হয়েছে!`);
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 space-y-12 max-w-7xl animate-in fade-in">
      
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold">{downloadSuccessToast}</span>
        </div>
      )}

      {/* Main Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-amber-300 mb-2">
            <span>📚</span>
            <span>প্রাথমিক শিক্ষাক্রম • ১ম থেকে ৫ম শ্রেণি</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-outfit tracking-tight">
            {currentClass ? currentTheme?.title : '১ম শ্রেণি থেকে ৫ম শ্রেণি পর্যন্ত'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl font-medium">
            {currentClass
              ? 'এই শ্রেণির অন্তর্ভুক্ত সকল পাঠ্যবই, অনুশীলন শিট, সাপ্তাহিক রুটিন ও শিক্ষণ সামগ্রী।'
              : 'প্রতিটি শ্রেণিতে প্রবেশ করে দেখুন পাঠ্যবই, ওয়ার্কশিট, সাপ্তাহিক রুটিন ও পূর্ণাঙ্গ পাঠ্যসূচি।'}
          </p>
        </div>

        {/* Action Button: Back to All Classes or Quick Navigation */}
        <div className="flex items-center gap-2 flex-wrap">
          {activeClassId && (
            <button
              onClick={handleBackToAllClasses}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>সকল শ্রেণিতে ফিরে যান</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('donate')}
            className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>একটি শিশুকে স্পন্সর করুন</span>
          </button>
        </div>
      </div>

      {/* Class Switcher Tabs (Quick Access to Class 1-5 anytime) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={handleBackToAllClasses}
          className={`px-4 py-2 rounded-2xl font-extrabold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeClassId === null
              ? 'bg-slate-900 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>সকল শ্রেণি একনজরে</span>
        </button>

        {classes.map((cls) => {
          const theme = classBanglaThemes[cls.name] || { flower: cls.name, icon: '🌸' };
          const isActive = activeClassId === cls.name || activeClassId === cls.id;
          return (
            <button
              key={cls.id}
              onClick={() => handleSelectClass(cls.name)}
              className={`px-4 py-2 rounded-2xl font-extrabold text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md scale-105 ring-2 ring-amber-400'
                  : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
              }`}
            >
              <span>{theme.icon}</span>
              <span>{cls.name} : {theme.flower}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* VIEW A: OVERVIEW LIST (When no single class is open)     */}
      {/* ======================================================== */}
      {!activeClassId && (
        <div className="space-y-8 animate-in fade-in">
          
          <div className="bg-linear-to-r from-amber-500/15 via-orange-500/10 to-rose-500/10 rounded-3xl p-6 sm:p-8 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-2xl">🌱 🌸 🌿 🌼 🌺</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit">
                শ্রেণিভিত্তিক পাঠ্যবই ও শিট অন্বেষণ করুন
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-medium">
                যে কোনো শ্রেণিতে ক্লিক করে ভেতরে প্রবেশ করুন। প্রতিটি শ্রেণির আলাদা পাঠ্যবই লাইব্রেরি, হাতের লেখার শিট, অঙ্কের ধাঁধা ও সাপ্তাহিক রুটিন রয়েছে।
              </p>
            </div>
            <div className="text-xs font-bold text-slate-600 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs shrink-0">
              মোট ৫টি শ্রেণি • ১০০% বিনা খরচে বই ও খাতা প্রদান
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => {
              const theme = classBanglaThemes[cls.name] || {
                title: cls.name,
                flower: cls.name,
                icon: '🌸',
                color: 'from-amber-400 to-orange-400',
                badge: 'bg-amber-100 text-amber-900 border-amber-300',
                border: 'border-slate-200'
              };

              const bCount = books.filter((b) => b.class === cls.name || b.class === 'All').length;
              const mCount = materials.filter((m) => m.class === cls.name).length;

              return (
                <div
                  key={cls.id}
                  onClick={() => handleSelectClass(cls.name)}
                  className="card-hover-3d bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-100 hover:border-amber-400 shadow-sm hover:shadow-2xl transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-2xl shadow-md group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
                        {theme.icon}
                      </span>
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${theme.badge} shadow-xs`}>
                        {theme.flower}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors font-outfit">
                        {cls.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-bold block mt-0.5">{cls.room}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                      {cls.description}
                    </p>

                    {/* Quick Stats: Books & Sheets Count */}
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="bg-amber-50/80 p-2.5 rounded-2xl border border-amber-200/70 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <strong className="text-xs font-black text-slate-900 block">{bCount} টি বই</strong>
                          <span className="text-[10px] text-slate-500 font-bold">পাঠ্য ও গল্প</span>
                        </div>
                      </div>

                      <div className="bg-sky-50/80 p-2.5 rounded-2xl border border-sky-200/70 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-sky-600 shrink-0" />
                        <div>
                          <strong className="text-xs font-black text-slate-900 block">{mCount} টি শিট</strong>
                          <span className="text-[10px] text-slate-500 font-bold">ওয়ার্কশিট ও নোট</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1 border border-slate-100">
                      <div className="flex justify-between items-center text-slate-600 font-medium">
                        <span>ক্লাস শিক্ষক:</span>
                        <strong className="text-slate-900 font-bold">{cls.assignedTeacher}</strong>
                      </div>
                      <div className="flex justify-between items-center text-slate-600 font-medium">
                        <span>ধারণক্ষমতা:</span>
                        <span className="text-emerald-700 font-bold">{cls.capacity} জন শিক্ষার্থী</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-bold">শাখা: {cls.sections.join(', ')}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectClass(cls.name);
                      }}
                      className="text-xs font-black text-amber-600 hover:text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>শ্রেণিতে প্রবেশ করুন</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW B: CLASS DETAIL DRILLDOWN (Inside Selected Class)   */}
      {/* ======================================================== */}
      {currentClass && currentTheme && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Class Hero Banner */}
          <div className={`bg-linear-to-br ${currentTheme.bgGradient} bg-white rounded-3xl p-6 sm:p-8 border-2 ${currentTheme.border} shadow-lg relative overflow-hidden`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-3xl shadow-md">
                    {currentTheme.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-outfit">
                        {currentTheme.title}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                      {currentClass.room} • শাখা: {currentClass.sections.join(', ')} • ধারণক্ষমতা: {currentClass.capacity} জন
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                  {currentClass.description}
                </p>

                {/* Subject Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentClass.subjects.map((sub, sIdx) => (
                    <span
                      key={sIdx}
                      className="bg-white/90 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{sub}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Class Teacher Mini Card */}
              <div className="lg:col-span-4 bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      currentTeacher?.photoUrl ||
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80'
                    }
                    alt={currentClass.assignedTeacher}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-amber-300"
                  />
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">
                      প্রধান শ্রেণি শিক্ষক
                    </span>
                    <strong className="text-sm font-black text-slate-900 block font-outfit">
                      {currentClass.assignedTeacher}
                    </strong>
                    <span className="text-[11px] text-amber-700 font-bold block">
                      {currentTeacher?.subject || 'প্রাথমিক পাঠদান'}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-100 flex items-center justify-between font-medium">
                  <span>অভিভাবক সহায়তা:</span>
                  <span className="text-emerald-700 font-bold font-mono">
                    {currentTeacher?.phone || '+880 1712-345678'}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Sub Navigation Inside This Class */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
            {[
              { id: 'books', label: `পাঠ্যবই ও গল্পের বই (${classBooks.length})`, icon: BookOpen },
              { id: 'sheets', label: `ওয়ার্কশিট ও শিট (${classMaterials.length})`, icon: FileText },
              { id: 'routine', label: 'সাপ্তাহিক ক্লাস রুটিন', icon: Clock },
              { id: 'syllabus', label: 'পাঠ্যসূচি ও শিখনফল', icon: BookmarkCheck },
              { id: 'teacher', label: 'শ্রেণি শিক্ষক ও তথ্য', icon: UserCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = classSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setClassSubTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-2xl font-black text-xs transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ------------------------------------------------------------- */}
          {/* TAB 1: BOOKS FOR THIS CLASS (বইসমূহ)                         */}
          {/* ------------------------------------------------------------- */}
          {classSubTab === 'books' && (
            <div className="space-y-6">
              
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="বইয়ের নাম বা লেখক খুঁজুন..."
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  {[
                    { id: 'all', label: 'সকল বই' },
                    { id: 'Textbook', label: 'পাঠ্যবই' },
                    { id: 'Bangla Rhymes', label: 'ছড়া' },
                    { id: 'English Reader', label: 'ইংরেজি' },
                    { id: 'Science & Nature', label: 'বিজ্ঞান' },
                    { id: 'Moral & Values', label: 'নীতিগল্প' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setBookCategoryFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        bookCategoryFilter === cat.id
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Books Grid */}
              {filteredClassBooks.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-200">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-base font-black text-slate-800">কোনো বই পাওয়া যায়নি</h4>
                  <p className="text-xs text-slate-500">অন্য কোনো কি-ওয়ার্ড দিয়ে আবার অনুসন্ধান করুন।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredClassBooks.map((book) => (
                    <div
                      key={book.id}
                      className="book-card-3d bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-100 hover:border-amber-300 shadow-sm hover:shadow-2xl transition-all flex flex-col justify-between group cursor-pointer"
                    >
                      <div className="space-y-3">
                        <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                          <img
                            src={book.coverUrl}
                            alt={book.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20">
                            {book.category}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-black text-slate-900 text-sm font-outfit line-clamp-2 group-hover:text-amber-600 transition-colors">
                            {book.name}
                          </h4>
                          <span className="text-xs text-slate-500 font-bold block mt-0.5">{book.author}</span>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {book.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>সংগ্রহে আছে:</span>
                          <strong className="text-emerald-700 font-bold">{book.availableQuantity} কপি ফ্রি লভ্য</strong>
                        </div>

                        <button
                          onClick={() => setPreviewBook(book)}
                          className="w-full py-2 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>বই পড়ুন / পৃষ্ঠা দেখুন</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 2: SHEETS & WORKSHEETS FOR THIS CLASS (শিটসমূহ)            */}
          {/* ------------------------------------------------------------- */}
          {classSubTab === 'sheets' && (
            <div className="space-y-6">
              
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="শিটের নাম বা বিষয় খুঁজুন..."
                    value={sheetSearch}
                    onChange={(e) => setSheetSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                  {['all', 'Bangla', 'Basic Math', 'Elementary Math', 'Mathematics', 'English', 'Primary Science'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSheetSubjectFilter(sub)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        sheetSubjectFilter === sub
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {sub === 'all' ? 'সকল বিষয়' : sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sheets List */}
              {filteredClassMaterials.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-slate-200">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-base font-black text-slate-800">কোনো শিট পাওয়া যায়নি</h4>
                  <p className="text-xs text-slate-500">অন্য বিষয় বা শব্দ লিখে পুনরায় অনুসন্ধান করুন।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredClassMaterials.map((mat) => (
                    <div
                      key={mat.id}
                      className="card-hover-3d bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 hover:border-amber-300 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <span className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 font-black flex items-center justify-center shrink-0">
                            {mat.fileType === 'Audio Rhyme' ? <Volume2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                          </span>

                          <div className="flex items-center gap-2">
                            <span className="bg-amber-100/80 text-amber-900 border border-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                              {mat.subject}
                            </span>
                            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {mat.fileType}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-black text-slate-900 text-base font-outfit">
                            {mat.title}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-bold block mt-0.5">
                            শিক্ষক: {mat.teacherName} • আপলোড: {mat.uploadDate}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {mat.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>ফ্রি অনুশীলন কপি</span>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreviewMaterial(mat)}
                            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>অনলাইনে পড়ুন</span>
                          </button>

                          <button
                            onClick={() => handleDownloadSheet(mat)}
                            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>ডাউনলোড / প্রিন্ট</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 3: WEEKLY CLASS ROUTINE                                  */}
          {/* ------------------------------------------------------------- */}
          {classSubTab === 'routine' && (
            <div className="space-y-6">
              <div className="bg-amber-50/70 p-5 rounded-3xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="font-black text-slate-900 text-sm font-outfit">
                      {currentClass.name} - সাপ্তাহিক ক্লাসের পূর্ণাঙ্গ সময়সূচি
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      শনিবার থেকে বৃহস্পতিবার সকাল ৯:০০ থেকে দুপুর ১২:৩০ পর্যন্ত। মাঝে পুষ্টিকর নাস্তার বিরতি অন্তর্ভুক্ত।
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => showToast('ক্লাস রুটিন সফলভাবে ডাউনলোড ও প্রিন্ট মোডে প্রস্তুত হয়েছে!')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>রুটিন প্রিন্ট করুন</span>
                </button>
              </div>

              {/* Routine Days Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(classRoutines[currentClass.name] || classRoutines['Class 1']).map((dayItem, dIdx) => (
                  <div
                    key={dIdx}
                    className="bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h4 className="font-black text-slate-900 text-sm font-outfit flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span>{dayItem.day}</span>
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {dayItem.periods.length} টি পিরিয়ড
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {dayItem.periods.map((p, pIdx) => (
                        <div
                          key={pIdx}
                          className={`p-3 rounded-2xl text-xs space-y-1 ${
                            p.subject.includes('টিফিন')
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                              : 'bg-slate-50 border border-slate-100 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-amber-700 font-mono text-[11px]">{p.time}</span>
                            <span className="text-[10px] text-slate-500">{p.room}</span>
                          </div>
                          <strong className="block text-slate-900 font-black text-xs">
                            {p.subject}
                          </strong>
                          <span className="text-[10px] text-slate-500 block">
                            শিক্ষক: {p.teacher}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 4: SYLLABUS & MILESTONES                                 */}
          {/* ------------------------------------------------------------- */}
          {classSubTab === 'syllabus' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900 font-outfit">
                    {currentClass.name} এর শিখনফল ও বার্ষিক লক্ষ্যসমূহ
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    জাতীয় প্রাথমিক শিক্ষাক্রমের আলোকে প্রতিটি শিশুর মানসিক ও সামাজিক বিকাশের মাইলফলক।
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(classSyllabus[currentClass.name] || classSyllabus['Class 1']).map((syl, sIdx) => (
                    <div
                      key={sIdx}
                      className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-slate-900 text-base font-outfit">{syl.subject}</h4>
                        <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                          {syl.examWeight}
                        </span>
                      </div>

                      <ul className="space-y-2 text-xs text-slate-700">
                        {syl.milestones.map((m, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-amber-600 font-bold text-sm shrink-0">✓</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* TAB 5: TEACHER & MENTORSHIP                                  */}
          {/* ------------------------------------------------------------- */}
          {classSubTab === 'teacher' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-4 text-center md:text-left space-y-3">
                  <img
                    src={
                      currentTeacher?.photoUrl ||
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
                    }
                    alt={currentClass.assignedTeacher}
                    className="w-36 h-36 rounded-3xl object-cover border-4 border-amber-200 mx-auto md:mx-0 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-black text-slate-900 font-outfit">
                      {currentClass.assignedTeacher}
                    </h3>
                    <span className="text-xs text-amber-700 font-bold block mt-0.5">
                      {currentTeacher?.volunteerStatus || 'প্রধান স্বেচ্ছাসেবী শিক্ষক'}
                    </span>
                    <span className="text-xs text-slate-400 block">{currentClass.name} ক্লাস ইনচার্জ</span>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      শিক্ষক পরিচিতি ও পাঠদান দর্শন
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {currentTeacher?.notes ||
                        'শিশুদের ভীতিহীন আনন্দময় শিক্ষার পরিবেশ উপহার দেওয়া এবং প্রতিটি শিশুর সৃজনশীলতা জাগ্রত করাই আমার ব্রত। প্রতিদিন ক্লাসের পর পিছিয়ে পড়া শিক্ষার্থীদের বিশেষ রিভিশন দেওয়া হয়।'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      <span className="text-slate-400 font-bold block">যোগাযোগ নম্বর:</span>
                      <strong className="text-slate-900 font-mono text-sm block mt-0.5">
                        {currentTeacher?.phone || '+880 1712-345678'}
                      </strong>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                      <span className="text-slate-400 font-bold block">ইমেইল ঠিকানা:</span>
                      <strong className="text-slate-900 font-mono text-sm block mt-0.5 truncate">
                        {currentTeacher?.email || 'teacher@priyoful.org'}
                      </strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-slate-700 flex items-center justify-between gap-4">
                    <span>অভিভাবকদের সাথে নিয়মিত প্রতি মাসের প্রথম শনিবারে মতবিনিময় সভা অনুষ্ঠিত হয়।</span>
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="px-3.5 py-1.5 bg-slate-900 text-white font-bold rounded-xl whitespace-nowrap"
                    >
                      বার্তা পাঠান
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation Switcher */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={handleBackToAllClasses}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>সকল শ্রেণিতে ফিরে যান</span>
            </button>

            <button
              onClick={() => setActiveTab('donate')}
              className="text-xs font-black text-rose-600 hover:text-rose-700 flex items-center gap-1.5 bg-rose-50 px-4 py-2 rounded-2xl border border-rose-200"
            >
              <Heart className="w-4 h-4 fill-rose-600" />
              <span>{currentClass.name} এর শিশুদের সহায়তায় হাত বাড়িয়ে দিন</span>
            </button>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: INTERACTIVE BOOK READER & PAGE PREVIEW          */}
      {/* ======================================================== */}
      {previewBook && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-lg font-black font-outfit">{previewBook.name}</h3>
                  <span className="text-xs text-slate-400">{previewBook.author} • {previewBook.class}</span>
                </div>
              </div>
              <button
                onClick={() => setPreviewBook(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 aspect-3/4 rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-50">
                  <img
                    src={previewBook.coverUrl}
                    alt={previewBook.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:col-span-7 space-y-3">
                  <span className="bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full border border-amber-300">
                    {previewBook.category}
                  </span>
                  <h4 className="text-lg font-black text-slate-900">{previewBook.name}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {previewBook.description}
                  </p>

                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-600">
                      <span>শ্রেণি পর্যায়:</span>
                      <strong className="text-slate-900 font-bold">{previewBook.class}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>লাইব্রেরিতে মজুত কপি:</span>
                      <strong className="text-emerald-700 font-bold">{previewBook.availableQuantity} কপি (সর্বমোট {previewBook.quantity} কপি)</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>সংযোজন তারিখ:</span>
                      <span className="font-mono text-slate-700">{previewBook.addedDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Reading Page Preview */}
              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 text-xs text-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <strong className="font-black text-slate-900 text-sm flex items-center gap-1.5">
                    <span>📖</span>
                    <span>নমুনা পাঠ ও সূচিপত্র পূর্বরূপ</span>
                  </strong>
                  <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                    বিনামূল্যে ডিজিটাল সংস্করণ
                  </span>
                </div>
                <p className="leading-relaxed text-slate-700 italic">
                  "আতা গাছে তোতা পাখি, ডালিম গাছে মৌ। এত ডাকি তবু কথা কও না কেন বউ?..."
                  বইটিতে ছোটদের জন্য বড় হরফে ছবিযুক্ত গল্প, বর্ণমালার রঙিন উদাহরণ এবং শব্দার্থ সংযোজন করা আছে।
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500 font-bold">
                  প্রিয়ফুল পাঠাগার • শিশুদের বিনামূল্যে পড়ার অধিকার
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      showToast(`"${previewBook.name}" বইটি পড়ার জন্য লাইব্রেরি কপি বুকিং সম্পন্ন হয়েছে!`);
                      setPreviewBook(null);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-xs"
                  >
                    বইটি সংগ্রহ করুন
                  </button>
                  <button
                    onClick={() => setPreviewBook(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: INTERACTIVE STUDY MATERIAL & SHEET PREVIEW       */}
      {/* ======================================================== */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-amber-400" />
                <div>
                  <h3 className="text-lg font-black font-outfit">{previewMaterial.title}</h3>
                  <span className="text-xs text-slate-400">{previewMaterial.class} • {previewMaterial.subject}</span>
                </div>
              </div>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-amber-100 text-amber-900 font-black px-2.5 py-0.5 rounded-full border border-amber-300">
                    {previewMaterial.fileType}
                  </span>
                  <span className="text-slate-500 font-medium">
                    প্রস্তুতকারক শিক্ষক: <strong className="text-slate-800 font-bold">{previewMaterial.teacherName}</strong>
                  </span>
                </div>
                <p className="text-slate-700 text-sm font-medium leading-relaxed">
                  {previewMaterial.description}
                </p>
              </div>

              {/* Sample Worksheet Content Interactive Box */}
              <div className="border-2 border-dashed border-amber-300 rounded-3xl p-6 bg-amber-50/40 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📝</span>
                    <strong className="text-sm font-black text-slate-900">
                      ওয়ার্কশিট প্রশ্ন ও বাড়ির কাজের নমুনা
                    </strong>
                  </div>
                  <span className="text-xs font-bold text-amber-800">পূর্ণমান: ২০</span>
                </div>

                <div className="space-y-3 text-xs text-slate-800">
                  <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs space-y-1">
                    <strong className="block text-slate-900">১. খালি ঘরে সঠিক সংখ্যা/শব্দ বসাও:</strong>
                    <p className="text-slate-600 font-mono">
                      (ক) ৫ + ৩ = [____] &nbsp;&nbsp;&nbsp;&nbsp; (খ) ১০ - ৪ = [____]
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs space-y-1">
                    <strong className="block text-slate-900">২. সুন্দর করে হাতের লেখা অনুশীলন করো:</strong>
                    <p className="text-slate-600 italic">
                      "সদা সত্য কথা বলিব, কখনো মিথ্যা বলিব না।" (৩ বার খাতায় লেখো)
                    </p>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-amber-100 shadow-2xs space-y-1">
                    <strong className="block text-slate-900">৩. ছবি দেখে রং করো ও নাম লেখো:</strong>
                    <p className="text-slate-600">
                      আমাদের জাতীয় ফুল শাপলার পাপড়িতে সাদা ও পাতায় গাঢ় সবুজ রং দাও।
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    handleDownloadSheet(previewMaterial);
                    setPreviewMaterial(null);
                  }}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>শিটটি ডাউনলোড ও প্রিন্ট করুন</span>
                </button>

                <button
                  onClick={() => setPreviewMaterial(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
