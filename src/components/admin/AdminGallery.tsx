import React, { useState, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Camera,
  Plus,
  Trash2,
  X,
  Star,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  Filter,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { GalleryItem } from '../../types';

// Preset photos for quick evaluation or fallback
const PRESET_PHOTOS = [
  {
    title: 'শ্রেণিকক্ষে ১ম শ্রেণির গণিত ক্লাস',
    caption: 'ছোটদের কাঠির সাহায্যে গণনা ও আনন্দের সাথে যোগ-বিয়োগ শেখা।',
    category: 'Classroom' as const,
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80'
  },
  {
    title: 'রঙিন ছবি আঁকা ও রঙের মেলা',
    caption: 'প্রতিটি শিশু নিজস্ব প্যাস্টেল রং ও আর্ট পেপারে স্বপ্ন আঁকছে।',
    category: 'Art & Creativity' as const,
    url: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=800&auto=format&fit=crop&q=80'
  },
  {
    title: 'সকালের পুষ্টিকর কলা ও দুধ বিতরণ',
    caption: 'সকালবেলা পুষ্টিকর নাস্তা পেয়ে শিশুদের চোখেমুখে তৃপ্তির হাসিমুখ।',
    category: 'Food & Health' as const,
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80'
  },
  {
    title: 'উঠানে বন্ধুদের সাথে দড়িলাফ ও খেলাধুলা',
    caption: 'পড়ালেখার ফাঁকে প্রতিদিনের খেলাধুলা ও শরীরচর্চা সেশন।',
    category: 'Sports & Fun' as const,
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80'
  }
];

export const AdminGallery: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem } = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [previewImageModal, setPreviewImageModal] = useState<GalleryItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('Classroom');
  const [isFeatured, setIsFeatured] = useState(true);
  const [uploadMode, setUploadMode] = useState<'device' | 'url' | 'presets'>('device');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFilePreview, setImageFilePreview] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle direct file upload from device with client-side optimization
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('অনুগ্রহ করে শুধুমাত্র ছবি ফাইল (JPG, PNG, WebP) নির্বাচন করুন।');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;

      // Optimize and resize image using an off-screen canvas if image is large
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setImageFilePreview(compressedDataUrl);
          setImageUrl(compressedDataUrl);
        } else {
          setImageFilePreview(src);
          setImageUrl(src);
        }

        const sizeKb = Math.round(file.size / 1024);
        setFileDetails({
          name: file.name,
          size: sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`
        });
        setIsProcessing(false);
      };

      img.onerror = () => {
        setErrorMsg('ছবি প্রসেস করতে ব্যর্থ হয়েছে। অন্য একটি ছবি নির্বাচন করুন।');
        setIsProcessing(false);
      };

      img.src = src;
    };

    reader.readAsDataURL(file);
  };

  // Submit Handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('অনুগ্রহ করে ছবির শিরোনাম লিখুন।');
      return;
    }

    const finalImage = uploadMode === 'device' ? imageFilePreview : imageUrl;
    if (!finalImage) {
      setErrorMsg('অনুগ্রহ করে একটি ছবি আপলোড করুন অথবা লিংক দিন।');
      return;
    }

    setIsProcessing(true);
    try {
      await addGalleryItem({
        title: title.trim(),
        caption: caption.trim() || 'প্রিয়ফুল পাঠশালার রঙিন মুহূর্ত।',
        imageUrl: finalImage,
        category,
        date: new Date().toISOString().split('T')[0],
        isFeatured
      });

      setSuccessToast(`"${title}" ছবিটি সফলভাবে গ্যালারিতে যুক্ত হয়েছে!`);
      setTimeout(() => setSuccessToast(''), 4000);

      // Reset form
      setModalOpen(false);
      setTitle('');
      setCaption('');
      setImageUrl('');
      setImageFilePreview(null);
      setFileDetails(null);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('ছবি সংরক্ষণ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredGallery = selectedFilter === 'all'
    ? gallery
    : gallery.filter((item) => item.category === selectedFilter);

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-xs font-bold">{successToast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <h2 className="text-2xl font-black text-white font-outfit">ছবির গ্যালারি ব্যবস্থাপনা</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            সরাসরি ডিভাইস থেকে ফটো আপলোড করুন, ক্লাসরুমের আনন্দময় মুহূর্ত সংরক্ষণ করুন এবং পাবলিক ওয়েবসাইটে প্রদর্শন করুন।
          </p>
        </div>

        <button
          onClick={() => {
            setModalOpen(true);
            setErrorMsg('');
          }}
          className="px-5 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>নতুন ছবি আপলোড করুন</span>
        </button>
      </div>

      {/* Filter and Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-bold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            ফিল্টার:
          </span>
          {[
            { id: 'all', label: 'সকল ছবি' },
            { id: 'Classroom', label: 'ক্লাসরুম' },
            { id: 'Sports & Fun', label: 'খেলাধুলা ও আনন্দ' },
            { id: 'Art & Creativity', label: 'ছবি আঁকা ও আর্ট' },
            { id: 'Food & Health', label: 'নাস্তা ও স্বাস্থ্য' },
            { id: 'Community', label: 'কমিউনিটি ও উৎসব' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                selectedFilter === cat.id
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-slate-400 font-semibold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          মোট ছবি: <strong className="text-amber-400">{filteredGallery.length}</strong> টি
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredGallery.length === 0 ? (
        <div className="p-16 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
          <Camera className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">এই বিভাগে কোনো ছবি পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            উপরের "নতুন ছবি আপলোড করুন" বাটনে ক্লিক করে আপনার কম্পিউটার বা মোবাইল থেকে সরাসরি ফটো যুক্ত করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-400/60 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="relative aspect-4/3 bg-slate-950 overflow-hidden cursor-pointer" onClick={() => setPreviewImageModal(item)}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="p-2 rounded-full bg-slate-900/80 text-white text-xs flex items-center gap-1 font-bold">
                      <Eye className="w-3.5 h-3.5" /> বড় করে দেখুন
                    </span>
                  </div>

                  <span className="absolute top-3 left-3 bg-slate-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-700">
                    {item.category}
                  </span>

                  {item.isFeatured && (
                    <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-slate-950" /> ফিচার্ড
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-sm text-white font-outfit truncate">{item.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.caption}</p>
                  <span className="text-[10px] text-slate-500 block pt-1">তারিখ: {item.date}</span>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-2">
                <button
                  onClick={() => setPreviewImageModal(item)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> প্রিভিউ
                </button>

                <button
                  onClick={() => {
                    if (confirm(`আপনি কি "${item.title}" ছবিটি গ্যালারি থেকে মুছে ফেলতে চান?`)) {
                      deleteGalleryItem(item.id);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                  title="ছবি মুছুন"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FULL PHOTO PREVIEW MODAL */}
      {previewImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setPreviewImageModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={previewImageModal.imageUrl}
                alt={previewImageModal.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {previewImageModal.category}
                </span>
                <span className="text-xs text-slate-400">{previewImageModal.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white font-outfit">{previewImageModal.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{previewImageModal.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* ADD / UPLOAD PHOTO MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 text-slate-200 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-black text-white font-outfit">গ্যালারিতে নতুন ছবি আপলোড</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="bg-rose-950/60 border border-rose-800 text-rose-300 p-3 rounded-2xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Upload Method Tabs */}
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setUploadMode('device');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  uploadMode === 'device'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>সরাসরি ডিভাইস থেকে</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUploadMode('url');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  uploadMode === 'url'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>ছবির ওয়েব লিংক</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUploadMode('presets');
                  setErrorMsg('');
                }}
                className={`flex-1 py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  uploadMode === 'presets'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>নমুনা ছবি</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              {/* 1. DIRECT FILE UPLOAD FROM COMPUTER/PHONE */}
              {uploadMode === 'device' && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5">
                    ডিভাইস থেকে ছবি নির্বাচন করুন *
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {imageFilePreview ? (
                    <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-slate-950 p-2 space-y-2">
                      <div className="aspect-16/9 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                        <img
                          src={imageFilePreview}
                          alt="Upload preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
                        <span className="truncate max-w-[200px] text-amber-300 font-medium">
                          📎 {fileDetails?.name}
                        </span>
                        <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                          {fileDetails?.size}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> অন্য ছবি বেছে নিন
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setImageFilePreview(null);
                            setImageUrl('');
                            setFileDetails(null);
                          }}
                          className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-xl font-bold text-[11px]"
                        >
                          বাতিল
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-700 hover:border-amber-400 bg-slate-950/60 rounded-2xl p-6 text-center cursor-pointer transition-all hover:bg-slate-950 flex flex-col items-center justify-center gap-2 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-slate-200 text-xs">
                        কম্পিউটার বা মোবাইল থেকে ছবি বেছে নিন
                      </span>
                      <p className="text-[11px] text-slate-500">
                        বা এখানে টেনে এনে ছেড়ে দিন (JPG, PNG, WebP)
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* 2. IMAGE URL INPUT */}
              {uploadMode === 'url' && (
                <div>
                  <label className="block text-slate-300 font-bold mb-1">ছবির সরাসরি ওয়েব লিংক (URL) *</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
                  />
                  {imageUrl && (
                    <div className="mt-2 aspect-16/9 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              )}

              {/* 3. PRESET SAMPLES */}
              {uploadMode === 'presets' && (
                <div>
                  <label className="block text-slate-300 font-bold mb-2">
                    নমুনা ছবি থেকে একটি বেছে নিন:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_PHOTOS.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => {
                          setImageUrl(p.url);
                          setTitle(p.title);
                          setCaption(p.caption);
                          setCategory(p.category);
                        }}
                        className={`p-2 rounded-xl border cursor-pointer transition-all ${
                          imageUrl === p.url
                            ? 'border-amber-500 bg-amber-500/10 text-amber-300 ring-2 ring-amber-500/30'
                            : 'border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-400'
                        }`}
                      >
                        <img src={p.url} alt={p.title} className="w-full h-20 object-cover rounded-lg mb-1" />
                        <span className="text-[11px] font-bold block truncate text-slate-200">{p.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">ছবির শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: ৩য় শ্রেণির বাংলা হাতের লেখা প্রতিযোগিতা"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              {/* Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">ক্যাটাগরি বা বিভাগ</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  >
                    <option value="Classroom">ক্লাসরুম (Classroom)</option>
                    <option value="Sports & Fun">খেলাধুলা ও আনন্দ (Sports & Fun)</option>
                    <option value="Art & Creativity">ছবি আঁকা ও আর্ট (Art & Creativity)</option>
                    <option value="Food & Health">নাস্তা ও স্বাস্থ্য (Food & Health)</option>
                    <option value="Community">কমিউনিটি ও উৎসব (Community)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-950 border-slate-700"
                    />
                    <span className="text-slate-300 font-bold text-xs">হোমপেজে ফিচার্ড করুন ⭐</span>
                  </label>
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-slate-300 font-bold mb-1">মর্যাদাপূর্ণ ক্যাপশন বা বর্ণনা *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="ছবিটি সম্পর্কে সুন্দর ও মানবিক বর্ণনা লিখুন..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs transition-colors"
                >
                  বাতিল
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>{isProcessing ? 'আপলোড হচ্ছে...' : 'গ্যালারিতে যুক্ত করুন'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
