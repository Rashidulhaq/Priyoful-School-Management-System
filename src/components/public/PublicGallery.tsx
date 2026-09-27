import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Camera, X, Sparkles, Filter } from 'lucide-react';
import { GalleryItem } from '../../types';

export const PublicGallery: React.FC = () => {
  const { gallery } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'All', label: 'সব ছবি (All)' },
    { id: 'Classroom', label: 'ক্লাসরুম ও পড়ালেখা' },
    { id: 'Sports & Fun', label: 'খেলাধুলা ও আনন্দ' },
    { id: 'Art & Creativity', label: 'ছবি আঁকা ও শিল্প' },
    { id: 'Food & Health', label: 'পুষ্টিকর খাবার ও যত্ন' },
    { id: 'Community', label: 'কমিউনিটি ও অভিভাবক' },
  ];

  const filtered = gallery.filter(item => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-amber-300 shadow-xs">
          <span>📷</span>
          <span>ছবির অ্যালবামে রঙিন স্মৃতি</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-outfit tracking-tight">
          প্রিয়ফুল ফটো গ্যালারি
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          আমাদের ক্লাসরুমের প্রাণবন্ত হাসিমুখ, দুপুরের নাস্তা বিতরণ, উঠানের খেলাধুলা আর শিক্ষক-শিক্ষার্থীদের অকৃত্রিম বন্ধনের কিছু স্মরণীয় মুহূর্ত।
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/25 scale-105'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="card-hover-3d group cursor-pointer rounded-3xl overflow-hidden bg-white border-2 border-slate-100 shadow-sm hover:shadow-2xl hover:border-amber-300 transition-all duration-300 relative"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full">
                {item.category}
              </span>
              <span className="absolute bottom-3 right-3 bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                {item.date}
              </span>
            </div>

            <div className="p-5">
              <h4 className="font-black text-base text-slate-900 font-outfit group-hover:text-amber-600 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Zoom Modal */}
      {activeModalItem && (
        <div
          onClick={() => setActiveModalItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95"
          >
            <div className="relative aspect-16/9 bg-slate-950">
              <img
                src={activeModalItem.imageUrl}
                alt={activeModalItem.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                  {activeModalItem.category} • {activeModalItem.date}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 font-outfit mb-1">
                {activeModalItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {activeModalItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
