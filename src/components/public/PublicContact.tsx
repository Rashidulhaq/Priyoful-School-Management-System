import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useSchool } from '../../context/SchoolContext';
import { MapPin, Phone, Mail, Send, CheckCircle2, Clock, MessageSquare, HelpCircle, Heart } from 'lucide-react';

export const PublicContact: React.FC = () => {
  const { settings, submitContactMessage } = useSchool();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('স্বেচ্ছাসেবক হওয়ার আবেদন');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSubmitting(true);

    try {
      await submitContactMessage({
        name,
        email,
        phone,
        subject,
        message,
      });
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#fbbf24', '#f59e0b', '#ec4899'],
      });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 space-y-16 max-w-6xl">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-amber-300 shadow-xs">
          <span>📬</span>
          <span>যোগাযোগ ও মতামত</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-outfit tracking-tight">
          প্রিয়ফুলের সাথে যুক্ত হোন
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          স্বেচ্ছাসেবী শিক্ষকতা, বই অনুদান, নাস্তা স্পন্সর বা মিরপুর ক্লাসরুম পরিদর্শনের বিষয়ে যে কোনো প্রশ্ন থাকলে আমাদের বার্তা পাঠান।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-slate-900 font-outfit">
              আমাদের যোগাযোগের ঠিকানা
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">স্কুল ক্যাম্পাস</strong>
                  <p className="text-slate-600 leading-relaxed">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">হটলাইন ও হোয়াটসঅ্যাপ</strong>
                  <p className="text-slate-600 font-mono font-bold">{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">অফিসিয়াল ইমেইল</strong>
                  <p className="text-slate-600 font-mono">{settings.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">ক্লাস ও অফিস সময়সূচি</strong>
                  <p className="text-slate-600">শনিবার থেকে বৃহস্পতিবার: সকাল ৮:৩০ - দুপুর ১:০০</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-xl">
          {submitted ? (
            <div className="p-8 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-outfit">
                আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!
              </h3>
              <p className="text-sm text-slate-600">
                প্রিয়ফুলের স্বেচ্ছাসেবী সমন্বয়ক দল খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে। পাশে থাকার জন্য ধন্যবাদ।
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                আরেকটি বার্তা পাঠান
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-black text-slate-900 font-outfit mb-2">
                বার্তা বা আবেদনের ফর্ম
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="নাম লিখুন"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল ঠিকানা *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর</label>
                  <input
                    type="tel"
                    placeholder="+৮৮০ ১৭XX-XXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">বিষয় বা উদ্দেশ্য</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                  >
                    <option value="স্বেচ্ছাসেবক হওয়ার আবেদন">স্বেচ্ছাসেবক হওয়ার আবেদন</option>
                    <option value="বই ও স্টেশনারি উপহার দান">বই ও স্টেশনারি উপহার দান</option>
                    <option value="নাস্তা ও পুষ্টি স্পন্সর">নাস্তা ও পুষ্টি স্পন্সর</option>
                    <option value="ক্যাম্পাস পরিদর্শনের অনুমতি">ক্যাম্পাস পরিদর্শনের অনুমতি</option>
                    <option value="সাধারণ অনুসন্ধান">সাধারণ অনুসন্ধান</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">বিস্তারিত বার্তা লিখুন *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="আপনার বার্তা বা প্রস্তাবনা বিস্তারিত লিখুন..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-linear-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black rounded-xl text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>বার্তা প্রেরণ করুন</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
