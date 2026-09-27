import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { Award, Plus, Trash2, X, Sparkles } from 'lucide-react';
import { AcademicRecord } from '../../types';

export const TeacherAcademics: React.FC = () => {
  const { academicRecords, addAcademicRecord, deleteAcademicRecord, students } = useSchool();
  const { teacherProfile } = useAuth();

  const assignedClass = teacherProfile?.assignedClass || 'Class 1';
  const myStudents = students.filter(s => s.class === assignedClass);

  const [modalOpen, setModalOpen] = useState(false);
  const [studentId, setStudentId] = useState(myStudents[0]?.studentId || '');
  const [subject, setSubject] = useState(teacherProfile?.subject || 'Bangla');
  const [examType, setExamType] = useState<AcademicRecord['examType']>('Monthly Test');
  const [marks, setMarks] = useState<number>(45);
  const [maxMarks, setMaxMarks] = useState<number>(50);
  const [remarks, setRemarks] = useState('Attentive and eager to learn.');

  const calculateGrade = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct >= 80) return 'A+';
    if (pct >= 70) return 'A';
    if (pct >= 60) return 'A-';
    if (pct >= 50) return 'B';
    if (pct >= 40) return 'C';
    if (pct >= 33) return 'D';
    return 'F';
  };

  const classRecords = academicRecords.filter(r => r.class === assignedClass);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const student = myStudents.find(s => s.studentId === studentId);
    if (!student) return;

    await addAcademicRecord({
      studentId: student.studentId,
      studentName: student.fullName,
      class: assignedClass,
      subject,
      examType,
      marks,
      maxMarks,
      grade: calculateGrade(marks, maxMarks),
      remarks,
      recordedBy: teacherProfile?.fullName || 'Volunteer Teacher',
      date: new Date().toISOString().split('T')[0]
    });

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-outfit">Academic Assessments: {assignedClass}</h2>
          <p className="text-xs text-slate-500">Record marks, track progress, and provide encouraging feedback.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Student Marks
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 uppercase text-[11px] text-slate-500 border-b border-slate-200 font-bold">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-3">Subject</th>
                <th className="py-3 px-3">Assessment</th>
                <th className="py-3 px-3 text-right">Score</th>
                <th className="py-3 px-3">Grade</th>
                <th className="py-3 px-4">Teacher Remark</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No academic marks entered yet for {assignedClass}.
                  </td>
                </tr>
              ) : (
                classRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {r.studentName}
                      <span className="text-[10px] text-slate-400 font-mono block font-normal">{r.studentId}</span>
                    </td>
                    <td className="py-3 px-3 font-semibold">{r.subject}</td>
                    <td className="py-3 px-3 text-slate-500">{r.examType}</td>
                    <td className="py-3 px-3 text-right font-black font-mono text-emerald-700">
                      {r.marks} / {r.maxMarks}
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                        {r.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 italic text-slate-600 line-clamp-1">
                      "{r.remarks}"
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => deleteAcademicRecord(r.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 font-outfit">Add Exam / Test Score</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Select Student *</label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {myStudents.map((s) => (
                    <option key={s.id} value={s.studentId}>
                      {s.fullName} (Roll #{s.rollNumber})
                    </option>
                  ))}
                </select>
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
                  <label className="block text-slate-700 font-bold mb-1">Assessment Type</label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Monthly Test">Monthly Test</option>
                    <option value="First Term">First Term</option>
                    <option value="Mid Term">Mid Term</option>
                    <option value="Final Term">Final Term</option>
                    <option value="Weekly Quiz">Weekly Quiz</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Score Obtained</label>
                  <input
                    type="number"
                    min="0"
                    max={maxMarks}
                    required
                    value={marks}
                    onChange={(e) => setMarks(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Max Score</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    required
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(parseInt(e.target.value) || 50)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Encouraging Remarks</label>
                <textarea
                  rows={2}
                  required
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
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
                  Save Marks
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
