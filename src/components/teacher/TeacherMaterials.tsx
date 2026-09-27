import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { FileText, Plus, Trash2, Download, X } from 'lucide-react';
import { StudyMaterial } from '../../types';

export const TeacherMaterials: React.FC = () => {
  const { materials, addMaterial, deleteMaterial } = useSchool();
  const { teacherProfile } = useAuth();

  const assignedClass = teacherProfile?.assignedClass || 'Class 1';
  const [modalOpen, setModalOpen] = useState(false);

  // Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState(teacherProfile?.subject || 'Bangla');
  const [fileType, setFileType] = useState<StudyMaterial['fileType']>('PDF Worksheet');

  const myMaterials = materials.filter(m => m.class === assignedClass);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    await addMaterial({
      title,
      description,
      class: assignedClass,
      subject,
      teacherName: teacherProfile?.fullName || 'Volunteer Teacher',
      teacherId: teacherProfile?.teacherId || 'TCH-001',
      fileType,
      fileUrl: `#worksheet-${Date.now()}`
    });

    setModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-outfit">Classroom Worksheets: {assignedClass}</h2>
          <p className="text-xs text-slate-500">Upload worksheets, handwriting tracing sheets, and visual flashcards for students.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Upload Worksheet / Sheet
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myMaterials.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {m.subject} • {m.fileType}
                </span>
                <span className="text-[10px] text-slate-400">{m.uploadDate}</span>
              </div>
              <h3 className="font-bold text-base text-slate-900 font-outfit">{m.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">Ready for printing & distribution</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => alert(`Downloading worksheet: ${m.title}`)}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-emerald-700"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteMaterial(m.id)}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-rose-600"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 font-outfit">Add {assignedClass} Study Sheet</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Sheet Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bangla Bornomala Tracing Exercise"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Resource Type</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="PDF Worksheet">PDF Worksheet</option>
                    <option value="Practice Sheet">Practice Sheet</option>
                    <option value="Visual Chart">Visual Chart</option>
                    <option value="Lesson Notes">Lesson Notes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl"
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
