import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Calendar, BookOpen, Clock, MapPin, Sparkles, User } from 'lucide-react';

export const PublicNewsEvents: React.FC = () => {
  const { events, news } = useSchool();
  const [activeTab, setActiveTab] = useState<'all' | 'events' | 'news'>('all');

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-amber-300 shadow-xs">
          <span>📢</span>
          <span>খবর ও সাম্প্রতিক বিজ্ঞপ্তি</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-outfit tracking-tight">
          সংবাদ ও আসন্ন আয়োজন
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          প্রিয়ফুল পাঠশালার নতুন উদ্যোগ, বই বিতরণ উৎসব, বার্ষিক ক্রীড়া এবং শিশুদের স্বাস্থ্য ক্যাম্পের সর্বশেষ তথ্য জেনে নিন।
        </p>

        {/* Tab Toggle */}
        <div className="flex justify-center gap-2 pt-2">
          {[
            { id: 'all', label: 'সব আপডেট (All)' },
            { id: 'events', label: 'আসন্ন আয়োজন (Events)' },
            { id: 'news', label: 'স্কুল সংবাদ (News)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md scale-105'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Section */}
      {(activeTab === 'all' || activeTab === 'events') && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Calendar className="w-5 h-5 text-amber-600" />
            <h2 className="text-2xl font-black text-slate-900 font-outfit">আসন্ন আয়োজন ও কর্মশালা</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-3xl overflow-hidden border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
                    <img
                      src={evt.coverUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                      {evt.date}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{evt.time}</span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 font-outfit">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {evt.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* News Section */}
      {(activeTab === 'all' || activeTab === 'news') && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <BookOpen className="w-5 h-5 text-rose-600" />
            <h2 className="text-2xl font-black text-slate-900 font-outfit">স্কুল সংবাদ ও সাফল্যের গল্প</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-rose-600 text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                      {item.date}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-black text-slate-900 font-outfit">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>লেখক: {item.author}</span>
                    <span className="text-rose-700 font-bold">বিস্তারিত পড়ুন →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
