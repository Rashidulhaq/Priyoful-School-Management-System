import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  MessageSquare,
  Mail,
  Phone,
  CheckCircle,
  Clock,
  Trash2,
  Reply,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  Send,
  User,
  Calendar,
  Sparkles
} from 'lucide-react';
import { ContactMessage } from '../../types';

export const AdminMessages: React.FC = () => {
  const { messages, updateMessageStatus, deleteContactMessage, submitContactMessage } = useSchool();
  const [filterStatus, setFilterStatus] = useState<'all' | 'Unread' | 'Read' | 'Replied'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const showToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Stats calculation
  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => m.status === 'Unread').length;
  const repliedCount = messages.filter((m) => m.status === 'Replied').length;
  const readCount = messages.filter((m) => m.status === 'Read').length;

  // Filter and search
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter = filterStatus === 'all' || msg.status === filterStatus;
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.phone && msg.phone.includes(searchQuery)) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Test send inquiry helper for live testing
  const handleSendTestMessage = async () => {
    await submitContactMessage({
      name: 'তানভীর আহমেদ (স্বেচ্ছাসেবক)',
      email: 'tanvir.volunteer@gmail.com',
      phone: '+880 1812-998877',
      subject: 'স্বেচ্ছাসেবক হওয়ার আবেদন',
      message: 'আসসালামু আলাইকুম। আমি ঢাকা বিশ্ববিদ্যালয়ের শিক্ষার্থী। প্রিয়ফুল স্কুলের ১ম বা ২য় শ্রেণির বাচ্চাদের গণিত ও বিজ্ঞান ক্লাসে প্রতি শুক্রবার স্বেচ্ছাসেবী শিক্ষক হিসেবে পাঠদান করতে আগ্রহী।'
    });
    showToast('একটি ডেমো ইনবাউন্ড মেসেজ সফলভাবে জমা হয়েছে এবং ইনবক্সে যুক্ত হয়েছে!');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📬</span>
            <h2 className="text-2xl font-black text-white font-outfit">
              পাবলিক ওয়েবসাইট ইনবাউন্ড মেসেজ বক্স
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            মেইন ওয়েবসাইটের "যোগাযোগ" পেজ থেকে কোনো দর্শনার্থী বা দাতা বার্তা পাঠালে তাৎক্ষণিকভাবে এখানে জমা হয়।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSendTestMessage}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
            title="ইনবক্স পরীক্ষা করার জন্য একটি টেস্ট মেসেজ পাঠান"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>টেস্ট মেসেজ পাঠান</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-slate-400 block text-[11px]">মোট প্রাপ্ত বার্তা</span>
          <strong className="text-2xl font-black text-white mt-1 block font-outfit">{totalCount} টি</strong>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 p-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-amber-400 text-[11px] font-bold">নতুন ও অপঠিত</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            )}
          </div>
          <strong className="text-2xl font-black text-amber-400 mt-1 block font-outfit">{unreadCount} টি</strong>
        </div>

        <div className="bg-slate-900 border border-emerald-500/30 p-4 rounded-2xl">
          <span className="text-emerald-400 block text-[11px] font-bold">উত্তর সম্পন্ন</span>
          <strong className="text-2xl font-black text-emerald-400 mt-1 block font-outfit">{repliedCount} টি</strong>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <span className="text-slate-400 block text-[11px]">পঠিত / পর্যালোচিত</span>
          <strong className="text-2xl font-black text-slate-300 mt-1 block font-outfit">{readCount} টি</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800">
          {[
            { id: 'all', label: `সকল বার্তা (${totalCount})` },
            { id: 'Unread', label: `অপঠিত (${unreadCount})` },
            { id: 'Read', label: `পঠিত (${readCount})` },
            { id: 'Replied', label: `উত্তর দেওয়া (${repliedCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterStatus === tab.id
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="নাম, ইমেইল বা বিষয় খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="p-16 text-center bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-400 text-xs space-y-2">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">কোনো বার্তা পাওয়া যায়নি</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              পাবলিক ওয়েবসাইটের "যোগাযোগ" পেজ থেকে কেউ বার্তা পাঠালে সাথে সাথে এখানে প্রদর্শিত হবে।
            </p>
          </div>
        ) : (
          filteredMessages.map((msg) => {
            const isUnread = msg.status === 'Unread';
            const isReplied = msg.status === 'Replied';

            return (
              <div
                key={msg.id}
                className={`border rounded-3xl p-6 transition-all space-y-4 shadow-sm ${
                  isUnread
                    ? 'bg-slate-900/90 border-amber-500/50 ring-1 ring-amber-500/20'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm uppercase shadow-xs ${
                      isUnread
                        ? 'bg-amber-500 text-slate-950 font-outfit'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {msg.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-base font-bold font-outfit">{msg.name}</strong>
                        {isUnread && (
                          <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.2 rounded-full uppercase tracking-wider">
                            নতুন
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-0.5">
                        <a
                          href={`mailto:${msg.email}`}
                          className="hover:text-amber-400 flex items-center gap-1 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-500" />
                          <span>{msg.email}</span>
                        </a>

                        {msg.phone && (
                          <a
                            href={`tel:${msg.phone}`}
                            className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-slate-500" />
                            <span>{msg.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
                        isReplied
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                          : isUnread
                          ? 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {msg.status === 'Replied'
                        ? '✓ উত্তর দেওয়া হয়েছে'
                        : msg.status === 'Read'
                        ? 'পঠিত'
                        : '● অপঠিত বার্তা'}
                    </span>

                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {msg.createdAt?.split('T')[0] || 'আজ'}
                    </span>
                  </div>
                </div>

                {/* Subject & Message Content */}
                <div>
                  <div className="inline-block bg-slate-950 text-amber-400 text-xs font-bold px-3 py-1 rounded-lg border border-slate-800 mb-2">
                    বিষয়: {msg.subject}
                  </div>

                  <div className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 whitespace-pre-line font-normal">
                    {msg.message}
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Mailto Reply */}
                    <a
                      href={`mailto:${msg.email}?subject=Regarding: ${encodeURIComponent(msg.subject)}&body=Dear ${encodeURIComponent(msg.name)},%0D%0A%0D%0AThank you for contacting Priyoful School.%0D%0A%0D%0A`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
                    >
                      <Reply className="w-3.5 h-3.5 text-amber-400" />
                      <span>ইমেইলে উত্তর দিন</span>
                    </a>

                    {/* Call if phone available */}
                    {msg.phone && (
                      <a
                        href={`tel:${msg.phone}`}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" />
                        <span>ফোন করুন</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status change actions */}
                    {msg.status !== 'Replied' && (
                      <button
                        onClick={() => {
                          updateMessageStatus(msg.id, 'Replied');
                          showToast('বার্তার স্ট্যাটাস "উত্তর সম্পন্ন" হিসেবে চিহ্নিত করা হয়েছে।');
                        }}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>উত্তর সম্পন্ন করুন</span>
                      </button>
                    )}

                    {msg.status === 'Unread' && (
                      <button
                        onClick={() => {
                          updateMessageStatus(msg.id, 'Read');
                          showToast('বার্তার স্ট্যাটাস "পঠিত" করা হয়েছে।');
                        }}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors border border-slate-700"
                      >
                        পঠিত মার্ক করুন
                      </button>
                    )}

                    {msg.status === 'Read' && (
                      <button
                        onClick={() => {
                          updateMessageStatus(msg.id, 'Unread');
                          showToast('বার্তার স্ট্যাটাস পুনরায় "অপঠিত" করা হয়েছে।');
                        }}
                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold rounded-xl transition-colors border border-slate-700"
                      >
                        অপঠিত করুন
                      </button>
                    )}

                    {/* Delete Message */}
                    <button
                      onClick={() => {
                        if (confirm(`আপনি কি "${msg.name}"-এর পাঠানো এই বার্তাটি মুছে ফেলতে চান?`)) {
                          deleteContactMessage(msg.id);
                          showToast('বার্তাটি সফলভাবে মুছে ফেলা হয়েছে।');
                        }
                      }}
                      className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors border border-slate-800"
                      title="বার্তা মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
