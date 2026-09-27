import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { FileText, Plus, Trash2, Download, Search, X, CheckCircle, Tag } from 'lucide-react';
import { StudyMaterial } from '../../types';

export const AdminMaterials: React.FC = () => {
  const { materials, addMaterial, deleteMaterial } = useSchool();
  const { adminProfile, teacherProfile } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetClass, setTargetClass] = useState('Class 1');
  const [subject, setSubject] = useState('Bangla');
  const [fileType, setFileType] = useState<StudyMaterial['fileType']>('PDF Worksheet');

  const filteredMaterials = materials.filter(m => {
    if (selectedClass !== 'All' && m.class !== selectedClass) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return m.title.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenAdd = () => {
    setTitle('');
    setDescription('');
    setTargetClass('Class 1');
    setSubject('Bangla');
    setFileType('PDF Worksheet');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const teacherName = adminProfile?.name || teacherProfile?.fullName || 'Educator';
    const teacherId = teacherProfile?.teacherId || 'ADMIN-01';

    await addMaterial({
      title,
      description,
      class: targetClass,
      subject,
      teacherName,
      teacherId,
      fileType,
      fileUrl: `#resource-${Date.now()}`
    });

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-outfit">Study Materials & Worksheets Repository</h2>
          <p className="text-xs text-slate-400">Class worksheets, practice exercise sheets, flashcards, and printable lesson notes.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Upload Study Material
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative grow sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search material title, subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold">Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-1.5 focus:ring-amber-500"
          >
            <option value="All">All Classes</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Class 3">Class 3</option>
            <option value="Class 4">Class 4</option>
            <option value="Class 5">Class 5</option>
          </select>
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((m) => (
          <div
            key={m.id}
            className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-amber-500/20 text-amber-300 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  {m.class} • {m.subject}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {m.fileType}
                </span>
              </div>

              <h3 className="font-bold text-base text-white font-outfit">
                {m.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {m.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Uploaded by <strong className="text-slate-200">{m.teacherName}</strong> on {m.uploadDate}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Downloading worksheet file: ${m.title}`)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-emerald-400"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteMaterial(m.id)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-rose-400"
                  title="Remove Material"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white font-outfit">Add Study Material / Sheet</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Addition & Subtraction Practice Sheet 01"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Target Class *</label>
                  <select
                    value={targetClass}
                    onChange={(e) => setTargetClass(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Format Type</label>
                <select
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                >
                  <option value="PDF Worksheet">PDF Worksheet</option>
                  <option value="Practice Sheet">Practice Sheet</option>
                  <option value="Visual Chart">Visual Chart / Infographic</option>
                  <option value="Lesson Notes">Lesson Notes</option>
                  <option value="Audio Rhyme">Audio Rhyme / Story</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Instructions for students or teaching volunteers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
                >
                  Save Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
