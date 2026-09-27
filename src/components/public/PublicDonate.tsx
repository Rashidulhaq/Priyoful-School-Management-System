import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useSchool } from '../../context/SchoolContext';
import {
  Heart,
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  CreditCard,
  Building,
  ArrowRight,
  Printer,
  Sparkles,
  Lock,
  Info
} from 'lucide-react';
import { Donation } from '../../types';

export const PublicDonate: React.FC = () => {
  const { settings, submitDonation } = useSchool();

  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Bank Transfer' | 'Card'>('bKash');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedDonation, setCompletedDonation] = useState<Donation | null>(null);

  const predefinedAmounts = [
    { amount: 500, label: '৳৫০০', desc: '১টি শিশুর ১ মাসের খাতা-কলম ও স্টেশনারি' },
    { amount: 1000, label: '৳১,০০০', desc: '১টি শিশুর ১ মাসের পুষ্টিকর নাস্তা ও দুধ' },
    { amount: 2500, label: '৳২,৫০০', desc: 'একটি ক্লাসের পাঠাগার ও ড্রয়িং কিট' },
    { amount: 5000, label: '৳৫,০০০', desc: 'স্কুলের ঘরভাড়া ও ক্লাসরুম রক্ষণাবেক্ষণ' },
  ];

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(label);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount <= 0) return;
    setIsSubmitting(true);

    try {
      const donation = await submitDonation({
        donorName: isAnonymous ? 'বেনামী শুভাকাঙ্ক্ষী' : (donorName || 'দানশীল শুভাকাঙ্ক্ষী'),
        donorEmail: donorEmail || 'supporter@priyoful.org',
        donorPhone: donorPhone || 'N/A',
        amount: currentAmount,
        paymentMethod,
        transactionId: transactionId.trim() || `PF-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        message: message.trim() || 'সুবিধাবঞ্চিত শিশুদের শিক্ষার উন্নয়নে অনুদান।',
        status: 'Verified',
        isAnonymous,
        date: new Date().toISOString().split('T')[0]
      });

      setCompletedDonation(donation);
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#f43f5e', '#10b981', '#fbbf24', '#ec4899', '#6366f1'],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If donation succeeded, show printable confirmation receipt
  if (completedDonation) {
    return (
      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-2xl">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-200 shadow-2xl space-y-6 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-black tracking-widest text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300">
              অনলাইন অনুদান প্রাপ্তিস্বীকার পত্র
            </span>
            <h2 className="text-3xl font-black text-slate-900 font-outfit">
              আপনার অকৃত্রিম ভালোবাসার জন্য ধন্যবাদ!
            </h2>
            <p className="text-sm text-slate-600">
              আপনার পাঠানো <strong className="text-slate-900 font-black">৳{completedDonation.amount.toLocaleString()}</strong> টাকা সরাসরি প্রিয়ফুল পাঠশালার সুবিধাবঞ্চিত শিশুদের মুখে হাসি ফোটাবে।
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-slate-50 rounded-2xl p-6 text-left border border-slate-200 text-xs space-y-3 font-mono">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">মানি রিসিট নম্বর:</span>
              <strong className="text-slate-800 font-bold">{completedDonation.id}</strong>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">তারিখ:</span>
              <span className="text-slate-800 font-bold">{completedDonation.date}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">দাতার নাম:</span>
              <span className="text-slate-800 font-bold">{completedDonation.isAnonymous ? 'বেনামী শুভাকাঙ্ক্ষী' : completedDonation.donorName}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">পেমেন্ট মাধ্যম:</span>
              <span className="text-slate-800 font-bold">{completedDonation.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">ট্রানজেকশন আইডি (TrxID):</span>
              <span className="text-slate-800 font-bold">{completedDonation.transactionId}</span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-black font-sans">
              <span className="text-slate-800">মোট অনুদান:</span>
              <span className="text-emerald-700">৳{completedDonation.amount.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            আপনার এই অনুদান প্রিয়ফুলের কেন্দ্রীয় লেজারে অন্তর্ভুক্ত হয়েছে। আমাদের স্বেচ্ছাসেবক দল প্রাপ্ত অনুদানের ১০০% অংশই শিশুদের পুষ্টি, খাতা-কলম ও ক্লাসরুমের ভাড়ায় ব্যয় করে থাকে।
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200"
            >
              <Printer className="w-4 h-4" />
              <span>রসিদ প্রিন্ট / সেভ করুন</span>
            </button>
            <button
              onClick={() => setCompletedDonation(null)}
              className="flex-1 py-3 px-4 bg-linear-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>নতুন অনুদান প্রদান করুন</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12 space-y-12 max-w-5xl">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-rose-300 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
          <span>বস্তির শিশুদের বিনামূল্যে শিক্ষার জন্য অনুদান</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-outfit tracking-tight">
          একটি শিশুর সুন্দর ভবিষ্যতের অংশীদার হোন
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          দারিদ্র্যের কারণে যেন কোনো শিশুর স্বপ্ন ঝরে না যায়। আপনার পাঠানো অনুদান নিশ্চিত করে শিশুদের বিনামূল্যে বই-খাতা, সুস্বাদু সকালের খাবার এবং উজ্জ্বল আগামী।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form: Amount & Details */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Amount Selection */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                ১. অনুদানের পরিমাণ নির্ধারণ করুন (টাকা ৳)
              </label>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                {predefinedAmounts.map((preset) => (
                  <button
                    key={preset.amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(preset.amount);
                      setCustomAmount('');
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                      !customAmount && selectedAmount === preset.amount
                        ? 'border-amber-500 bg-amber-50/70 text-amber-950 ring-2 ring-amber-500/20 shadow-xs scale-[1.02]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-black text-lg text-amber-900">{preset.label}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">{preset.desc}</div>
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs text-slate-500 font-bold mb-1 block">অথবা আপনার পছন্দমতো পরিমাণ লিখুন (৳):</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 font-bold">৳</span>
                  <input
                    type="number"
                    min="50"
                    placeholder="টাকার পরিমাণ লিখুন (যেমন: ২০০০)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
                ২. পেমেন্ট মাধ্যম বাছাই করুন
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'bKash', label: 'বিকাশ (bKash)', color: 'bg-pink-600' },
                  { id: 'Nagad', label: 'নগদ (Nagad)', color: 'bg-orange-600' },
                  { id: 'Bank Transfer', label: 'ব্যাংক হিসাব', color: 'bg-indigo-700' },
                  { id: 'Card', label: 'কার্ড / অন্যান্য', color: 'bg-slate-800' }
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`py-3 px-3 rounded-2xl border-2 font-black text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                      paymentMethod === method.id
                        ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500/20 scale-[1.02]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{method.label}</span>
                  </button>
                ))}
              </div>

              {/* Instructions Box */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 space-y-2">
                {paymentMethod === 'bKash' && (
                  <>
                    <div className="font-bold text-amber-900 flex items-center justify-between">
                      <span>বিকাশ নম্বর: {settings.bKashNumber}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(settings.bKashNumber, 'bkash')}
                        className="text-[11px] bg-white border border-amber-300 text-amber-800 px-2 py-0.5 rounded-md hover:bg-amber-100 flex items-center gap-1"
                      >
                        {copiedNumber === 'bkash' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedNumber === 'bkash' ? 'কপি হয়েছে' : 'কপি করুন'}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      ১. আপনার বিকাশ অ্যাপ থেকে Send Money বা Payment করুন।<br />
                      ২. টাকার পরিমাণ ৳{currentAmount} লিখুন।<br />
                      ৩. রেফারেন্সে "Priyoful" লিখুন এবং নিচের ঘরে TrxID দিন।
                    </p>
                  </>
                )}

                {paymentMethod === 'Nagad' && (
                  <>
                    <div className="font-bold text-orange-950 flex items-center justify-between">
                      <span>নগদ নম্বর: {settings.nagadNumber}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(settings.nagadNumber, 'nagad')}
                        className="text-[11px] bg-white border border-orange-300 text-orange-800 px-2 py-0.5 rounded-md hover:bg-orange-100 flex items-center gap-1"
                      >
                        {copiedNumber === 'nagad' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        {copiedNumber === 'nagad' ? 'কপি হয়েছে' : 'কপি করুন'}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      নগদ অ্যাপে Send Money করুন ৳{currentAmount} এবং প্রাপ্ত TrxID নিচের বক্সে জমা দিন।
                    </p>
                  </>
                )}

                {paymentMethod === 'Bank Transfer' && (
                  <div className="space-y-1">
                    <strong className="text-indigo-950 block">ব্যাংক অ্যাকাউন্ট বিবরণী:</strong>
                    <p className="text-[11px] font-mono text-slate-800 bg-white p-2.5 rounded-lg border border-indigo-100">
                      {settings.bankDetails}
                    </p>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <p className="text-[11px] text-slate-600">
                    ভিসা বা মাস্টারকার্ডের মাধ্যমে অনুদান সম্পন্ন করে রেফারেন্স কোডটি নিচে উল্লেখ করুন।
                  </p>
                )}
              </div>
            </div>

            {/* Step 3: Transaction ID & Donor Info */}
            <div className="space-y-4 pt-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                ৩. ট্রানজেকশন আইডি ও দাতার তথ্য
              </label>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ট্রানজেকশন আইডি (TrxID / Reference) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="যেমন: 9K8J7H6G5F বা DBBL-098234"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Anonymous Checkbox */}
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 rounded-md text-amber-600 focus:ring-amber-500 border-slate-300"
                />
                <span>নাম প্রকাশে অনিচ্ছুক (বেনামী অনুদানকারী হিসেবে সংরক্ষিত থাকবে)</span>
              </label>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">আপনার পূর্ণ নাম</label>
                    <input
                      type="text"
                      placeholder="আপনার নাম লিখুন"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">ইমেইল ঠিকানা</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">মোবাইল নম্বর (ঐচ্ছিক)</label>
                    <input
                      type="tel"
                      placeholder="+৮৮০ ১৭XX-XXXXXX"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">শিশুদের উদ্দেশ্যে কোনো বার্তা বা দোয়া (ঐচ্ছিক)</label>
                <textarea
                  rows={2}
                  placeholder="আপনার শুভকামনা বা ভালোবাসার বার্তা..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || currentAmount <= 0}
              className="w-full py-4 bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-black rounded-2xl shadow-xl shadow-orange-500/25 text-base flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>৳{currentAmount.toLocaleString()} অনুদান নিশ্চিত করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Column: Trust & Impact */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-amber-50 rounded-3xl p-6 border-2 border-amber-200 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-3 py-1 rounded-full">
              অনুদানের সদ্ব্যবহার
            </span>
            <h3 className="text-xl font-black text-slate-900 font-outfit">
              আপনার প্রতিটি টাকার নিশ্চিত প্রভাব
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              প্রিয়ফুল কোনো কর্পোরেট তহবিল বা বিদেশি অনুদানের ওপর নির্ভরশীল নয়। আপনাদের মতো সাধারণ সহৃদয় মানুষের ক্ষুদ্র অনুদানেই টিকে আছে এই বিদ্যালয়টি।
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>১০০% সরাসরি ব্যয়:</strong> কোনো বেতন বা মধ্যস্বত্বভোগী নেই।</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>তাৎক্ষণিক রসিদ:</strong> অনুদান দেওয়ার সাথে সাথেই মানি রিসিট প্রদান।</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-700"><strong>স্কুল ভিজিটের সুযোগ:</strong> মিরপুরের ক্যাম্পাসে এসে সশরীরে শিশুদের সাথে দেখা করার আমন্ত্রণ।</span>
              </div>
            </div>
          </div>

          {/* Contact help card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-2 text-xs text-slate-600 shadow-sm">
            <strong className="text-slate-900 font-black block text-sm">অনুদান সম্পর্কিত যে কোনো প্রশ্নে:</strong>
            <p>আমাদের অর্থবিষয়ক সমন্বয়কের সাথে সরাসরি যোগাযোগ করুন:</p>
            <p className="font-bold text-amber-700">ফোন: {settings.phone}</p>
            <p className="font-bold text-amber-700">ইমেইল: {settings.email}</p>
          </div>
        </div>

      </div>

    </div>
  );
};
