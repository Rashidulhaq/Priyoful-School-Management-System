import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Coffee, Palette, Eye, Smile, Sparkles, Heart, Sun, Award } from 'lucide-react';

export const PublicActivities: React.FC = () => {
  const { setActiveTab } = useSchool();

  const activities = [
    {
      title: 'প্রতিদিনের পুষ্টিকর নাস্তা ও খাঁটি দুধ',
      category: 'স্বাস্থ্য ও পুষ্টি',
      icon: Coffee,
      color: 'bg-orange-100 text-orange-600',
      description: 'প্রতিদিন সকাল ১১:০০ টায় প্রতিটি শিশুকে কলা, খাঁটি তরল দুধ ও সেদ্ধ ডিম দেওয়া হয়। ক্ষুধার কারণে কোনো শিশু যাতে পড়ালেখা ছেড়ে না দেয়, এটি আমাদের অন্যতম প্রধান অঙ্গীকার।',
      frequency: 'প্রতিদিন ক্লাসের মাঝে'
    },
    {
      title: 'রঙের মেলা, চিত্রাঙ্কন ও মাটির কাজ',
      category: 'সৃজনশীলতা ও আনন্দ',
      icon: Palette,
      color: 'bg-rose-100 text-rose-600',
      description: 'শিশুদের প্যাস্টেল রং, ড্রয়িং খাতা ও নরম মাটি দেওয়া হয়। তারা মনের মাধুরী মিশিয়ে ফুল, নদী ও তাদের স্বপ্নের ছবি আঁকে, যা তাদের ভেতরের প্রতিভাকে বিকশিত করে।',
      frequency: 'সপ্তাহে ২ দিন'
    },
    {
      title: 'দাঁত ও চোখের স্বাস্থ্য পরীক্ষা ক্যাম্প',
      category: 'স্বাস্থ্যসেবা ও যত্ন',
      icon: Eye,
      color: 'bg-emerald-100 text-emerald-600',
      description: 'স্বেচ্ছাসেবী ডাক্তারদের তত্ত্বাবধানে নিয়মিত দাঁতের যত্ন, টুথব্রাশ বিতরণ, কৃমিনাশক ওষুধ প্রদান এবং দৃষ্টিশক্তি পরীক্ষা করা হয়।',
      frequency: 'প্রতি মাসে ১ বার'
    },
    {
      title: 'উঠান খেলাধুলা ও গ্রামীণ আনন্দ',
      category: 'শারীরিক বিকাশ',
      icon: Smile,
      color: 'bg-sky-100 text-sky-600',
      description: 'ফুটবল, দড়িলাফ, দাঁড়িয়াবান্ধা ও কানামাছি খেলার মাধ্যমে শিশুদের মাঝে সহমর্মিতা, নেতৃত্ব ও শারীরিক সুস্থতা গড়ে তোলা হয়।',
      frequency: 'প্রতি শুক্রবার বিকালে'
    },
    {
      title: 'গল্পের আসর ও নৈতিক শিক্ষা',
      category: 'মূল্যবোধ ও চরিত্র গঠন',
      icon: Sun,
      color: 'bg-amber-100 text-amber-600',
      description: 'শিক্ষকরা রূপকথা, শিক্ষণীয় নীতিগল্প ও মনীষীদের জীবনীর গল্প শোনান। শিশুরা সততা, শৃঙ্খলা ও বড়দের শ্রদ্ধার পাঠ শেখে।',
      frequency: 'প্রতিদিনের ক্লাসের শেষে'
    },
    {
      title: 'পরিচ্ছন্নতা ও বৃক্ষরোপণ কর্মসূচি',
      category: 'পরিবেশ সচেতনতা',
      icon: Award,
      color: 'bg-teal-100 text-teal-600',
      description: 'নিজেদের ক্লাসরুম পরিষ্কার রাখা, ফুলের টবে পানি দেওয়া এবং প্লাস্টিক বর্জ্য সঠিক স্থানে ফেলার অভ্যাস গড়ে তোলা।',
      frequency: 'সাপ্তাহিক কার্যক্রম'
    }
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-amber-300 shadow-xs">
          <span>🎨</span>
          <span>শিশুদের আনন্দময় পরিবেশ</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-outfit tracking-tight">
          পাঠ্যবইয়ের বাইরে: সার্বিক যত্ন ও সৃজনশীলতা
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          শিক্ষা কেবল মুখস্থ বিদ্যা নয়; মানসিক শান্তি, শারীরিক পুষ্টি ও স্বাধীন ভাবনার বিকাশই প্রিয়ফুলের মূল শক্তি।
        </p>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((act, idx) => {
          const Icon = act.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${act.color} flex items-center justify-center shadow-xs`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {act.frequency}
                  </span>
                </div>

                <span className="text-xs font-black uppercase tracking-wider text-amber-700 block mb-1">
                  {act.category}
                </span>

                <h3 className="text-xl font-black text-slate-900 font-outfit">
                  {act.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 font-medium">
                  {act.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-bold">✓ শতভাগ বিনামূল্যে</span>
                <button
                  onClick={() => setActiveTab('donate')}
                  className="text-amber-700 hover:text-amber-800 font-black flex items-center gap-1"
                >
                  সহযোগিতা করুন →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Support Nutrition Banner */}
      <div className="bg-linear-to-r from-orange-500 via-amber-500 to-rose-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full uppercase">
            পুষ্টি নিশ্চিতকরণ তহবিল
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-outfit">
            মাত্র ১,০০০ টাকায় ১টি শিশুর ১ মাসের পুষ্টিকর নাস্তার দায়িত্ব নিন
          </h2>
          <p className="text-amber-100 text-sm">
            আপনার পাঠানো অনুদানে শিশুরা পায় নিয়মিত তাজা কলা ও খাঁটি দুধ।
          </p>
        </div>

        <button
          onClick={() => setActiveTab('donate')}
          className="bg-white text-slate-900 hover:bg-amber-50 font-black px-8 py-3.5 rounded-full text-sm shadow-md shrink-0 transition-transform active:scale-95"
        >
          নাস্তা ফান্ডে অনুদান দিন
        </button>
      </div>

    </div>
  );
};
