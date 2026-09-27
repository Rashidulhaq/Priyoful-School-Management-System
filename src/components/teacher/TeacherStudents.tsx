import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { Users, Search, Eye, Edit, X, Phone, Heart, Sparkles } from 'lucide-react';
import { Student } from '../../types';

export const TeacherStudents: React.FC = () => {
  const { students, updateStudent, academicRecords } = useSchool();
  const { teacherProfile } = useAuth();

  const assignedClass = teacherProfile?.assignedClass || 'Class 1';
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [editingNotesStudent, setEditingNotesStudent] = useState<Student | null>(null);
  const [notesText, setNotesText] = useState('');

  const myStudents = students.filter(s => {
    if (s.class !== assignedClass) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return s.fullName.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenEditNotes = (s: Student) => {
    setEditingNotesStudent(s);
    setNotesText(s.notes || '');
  };

  const handleSaveNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotesStudent) return;
    await updateStudent(editingNotesStudent.id, { notes: notesText });
    setEditingNotesStudent(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-outfit">My Students: {assignedClass}</h2>
          <p className="text-xs text-slate-500">Student roster, guardian contacts, care notes, and academic assessment records.</p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search student in my class..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myStudents.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={s.photoUrl}
                  alt={s.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/20 shrink-0"
                />
                <div className="grow min-w-0">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full inline-block">
                    Roll #{s.rollNumber} • {s.studentId}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 font-outfit truncate mt-1">
                    {s.fullName}
                  </h3>
                  <span className="text-xs text-slate-500 block">{s.gender} • DOB: {s.dateOfBirth}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <p><strong>Guardian:</strong> {s.guardianName}</p>
                <p><strong>Emergency Contact:</strong> {s.guardianPhone}</p>
                {s.notes && (
                  <div className="mt-2 bg-amber-50/70 border border-amber-200/60 p-2.5 rounded-xl text-amber-900 text-[11px] italic">
                    "{s.notes}"
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => setViewingStudent(s)}
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                View Full Profile
              </button>

              <button
                onClick={() => handleOpenEditNotes(s)}
                className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
              >
                <Edit className="w-3.5 h-3.5" />
                Care Notes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Notes Modal */}
      {editingNotesStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-lg text-slate-900 font-outfit">
                Care & Special Guidance Notes: {editingNotesStudent.fullName}
              </h3>
              <button onClick={() => setEditingNotesStudent(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNotes} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Add observations, learning interests, or care requirements:
                </label>
                <textarea
                  rows={4}
                  required
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingNotesStudent(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-xs"
                >
                  Update Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Student Profile Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={viewingStudent.photoUrl}
                  alt={viewingStudent.fullName}
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <h3 className="font-black text-base text-slate-900 font-outfit">{viewingStudent.fullName}</h3>
                  <span className="text-[11px] text-slate-500 font-mono">{viewingStudent.studentId} • Roll #{viewingStudent.rollNumber}</span>
                </div>
              </div>
              <button onClick={() => setViewingStudent(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Gender / DOB</span>
                  <strong>{viewingStudent.gender} • {viewingStudent.dateOfBirth}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Blood Group</span>
                  <strong>{viewingStudent.bloodGroup || 'Not Tested'}</strong>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl space-y-1">
                <span className="font-bold text-slate-900 block">Guardian Details:</span>
                <p><strong>Name:</strong> {viewingStudent.guardianName}</p>
                <p><strong>Phone:</strong> {viewingStudent.guardianPhone}</p>
                <p><strong>Address:</strong> {viewingStudent.guardianAddress}</p>
              </div>

              {/* Academic records for this student */}
              <div>
                <span className="font-bold text-slate-900 block mb-1">Academic Scores:</span>
                {academicRecords.filter(a => a.studentId === viewingStudent.studentId).length === 0 ? (
                  <p className="text-slate-400 italic">No exams recorded yet for this student.</p>
                ) : (
                  <div className="space-y-1">
                    {academicRecords.filter(a => a.studentId === viewingStudent.studentId).map(ar => (
                      <div key={ar.id} className="flex justify-between bg-slate-50 p-2 rounded-xl text-xs">
                        <span>{ar.subject} ({ar.examType})</span>
                        <strong className="text-emerald-700">{ar.marks}/{ar.maxMarks} (Grade {ar.grade})</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingStudent(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
