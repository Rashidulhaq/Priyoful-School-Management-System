import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Globe, Save, CheckCircle, Sparkles, RefreshCw } from 'lucide-react';

export const AdminWebsite: React.FC = () => {
  const { settings, updateSettings } = useSchool();
  const [schoolName, setSchoolName] = useState(settings.schoolName || 'PRIYOFUL');
  const [tagline, setTagline] = useState(settings.tagline || 'Give Every Child a Chance to Learn');
  const [mission, setMission] = useState(settings.aboutMission || '');
  const [vision, setVision] = useState(settings.aboutVision || '');
  const [phone, setPhone] = useState(settings.phone || '');
  const [email, setEmail] = useState(settings.email || '');
  const [address, setAddress] = useState(settings.address || '');
  const [studentsCount, setStudentsCount] = useState(settings.statsOverride?.studentsCount || 145);
  const [volunteersCount, setVolunteersCount] = useState(settings.statsOverride?.volunteersCount || 40);
  const [yearsOfService, setYearsOfService] = useState(settings.statsOverride?.yearsOfService || 4);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      schoolName,
      tagline,
      aboutMission: mission,
      aboutVision: vision,
      phone,
      email,
      address,
      statsOverride: {
        studentsCount,
        volunteersCount,
        yearsOfService,
      }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-outfit">Website Content Management</h2>
          <p className="text-xs text-slate-400">
            Customize public homepage slogans, mission, vision, contact coordinates, and published stats in real-time.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Publish Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          Public website content successfully updated and synced!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 text-xs text-slate-200 shadow-xl">
        
        {/* Brand & Slogans */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <span>Primary Branding & Hero Text</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold mb-1">School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Hero Tagline / Banner Slogan</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="space-y-4 pt-4 border-t border-slate-700">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
            Mission & Vision Statements
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 font-bold mb-1">School Mission Statement</label>
              <textarea
                rows={3}
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Long-term Vision</label>
              <textarea
                rows={3}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="space-y-4 pt-4 border-t border-slate-700">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
            Public Contact Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Primary Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 font-bold mb-1">Physical School Address (Mirpur)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
              />
            </div>
          </div>
        </div>

        {/* Published Statistics Override */}
        <div className="space-y-4 pt-4 border-t border-slate-700">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
            Homepage Statistics Banner
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Total Enrolled Students</label>
              <input
                type="number"
                value={studentsCount}
                onChange={(e) => setStudentsCount(parseInt(e.target.value) || 145)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Volunteers / Educators</label>
              <input
                type="number"
                value={volunteersCount}
                onChange={(e) => setVolunteersCount(parseInt(e.target.value) || 40)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Years of Continuous Operation</label>
              <input
                type="number"
                value={yearsOfService}
                onChange={(e) => setYearsOfService(parseInt(e.target.value) || 4)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-700">
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-md transition-all active:scale-95"
          >
            Save & Publish Website Changes
          </button>
        </div>

      </form>
    </div>
  );
};
