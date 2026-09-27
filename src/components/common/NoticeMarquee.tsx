import React from 'react';
import { Sparkles, Megaphone, BellRing, Heart } from 'lucide-react';
import { useSchool } from '../../context/SchoolContext';

export const NoticeMarquee: React.FC = () => {
  const { setActiveTab } = useSchool();

  const notices = [
    '🌻 প্রিয়ফুল বিদ্যানিকেতন: ১ম থেকে ৫ম শ্রেণির সকল শিক্ষার্থীর জন্য সম্পূর্ণ বিনামূল্যে নতুন পাঠ্যবই ও ওয়ার্কশিট উন্মুক্ত!',
    '🥛 পুষ্টিকর টিফিন কর্মসূচি: শিশুদের জন্য প্রতিদিন সকালে তাজা দুধ, ডিম ও মৌসুমি ফল পরিবেশন করা হয়।',
    '🎨 আগামী শুক্রবার: বার্ষিক শিশু চিত্রাঙ্কন ও ছড়া পাঠ উৎসব ২০২৬ অনুষ্ঠিত হবে—সকলের অংশগ্রহণ কাম্য!',
    '💖 মাত্র ১,২০০ টাকায় ১ জন সুবিধাবঞ্চিত শিশুর মাসিক পড়াশোনা ও পুষ্টিকর খাবারের দায়িত্ব নিতে পারেন।',
    '📚 নতুন ডিজিটাল লাইব্রেরি ও কম্পিউটার লার্নিং কর্নারে শিশুদের রোমাঞ্চকর পাঠাভ্যাস!',
  ];

  return (
    <div className="bg-linear-to-r from-amber-600 via-orange-600 to-rose-600 text-white overflow-hidden py-2 border-y border-amber-500/40 relative shadow-inner">
      <div className="flex items-center">
        {/* Fixed Left Badge */}
        <div className="z-10 bg-amber-950/70 backdrop-blur-md px-3 py-1 ml-2 rounded-lg flex items-center gap-1.5 shadow-md shrink-0 text-xs font-black tracking-wide border border-amber-400/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
          </span>
          <Megaphone className="w-3.5 h-3.5 text-amber-300 animate-sway" />
          <span className="hidden sm:inline">আজকের বার্তা</span>
        </div>

        {/* Marquee Track */}
        <div className="overflow-hidden whitespace-nowrap grow relative ml-2">
          <div className="animate-marquee flex items-center gap-12 text-xs sm:text-sm font-semibold tracking-wide text-amber-50">
            {notices.map((text, idx) => (
              <span key={`notice-1-${idx}`} className="inline-flex items-center gap-2">
                <span>{text}</span>
                <span className="text-amber-300 opacity-60">✦</span>
              </span>
            ))}
            {/* Duplicated for seamless infinite loop */}
            {notices.map((text, idx) => (
              <span key={`notice-2-${idx}`} className="inline-flex items-center gap-2">
                <span>{text}</span>
                <span className="text-amber-300 opacity-60">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right CTA */}
        <button
          onClick={() => {
            setActiveTab('news-events');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-[11px] font-bold px-3 py-1 mr-2 rounded-lg shrink-0 transition-all hover:scale-105 active:scale-95"
        >
          সব সংবাদ
        </button>
      </div>
    </div>
  );
};
