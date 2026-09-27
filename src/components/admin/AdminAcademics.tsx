import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { Award, Plus, Trash2, Edit, Search, Filter, X, Sparkles } from 'lucide-react';
import { AcademicRecord } from '../../types';

export const AdminAcademics: React.FC = () => {
  const { academicRecords, addAcademicRecord, deleteAcademicRecord, students, classes } = useSchool();
  const { adminProfile, teacherProfile } = useAuth();

  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedExam, setSelectedExam] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [studentId, setStudentId] = useState(students[0]?.studentId || '');
  const [subject, setSubject] = useState('Bangla');
  const [examType, setExamType] = useState<AcademicRecord['examType']>('Monthly Test');
  const [marks, setMarks] = useState<number>(45);
  const [maxMarks, setMaxMarks] = useState<number>(50);
  const [remarks, setRemarks] = useState('Consistent improvement in handwriting and reading.');

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

  const filteredRecords = academicRecords.filter(r => {
    if (selectedClass !== 'All' && r.class !== selectedClass) return false;
    if (selectedExam !== 'All' && r.examType !== selectedExam) return false;
    return true;
  });

  const handleOpenAdd = () => {
    if (students.length > 0) {
      setStudentId(students[0].studentId);
    }
    setSubject('Bangla');
    setExamType('Monthly Test');
    setMarks(45);
    setMaxMarks(50);
    setRemarks('Good understanding and enthusiastic participation.');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.studentId === studentId);
    if (!student) return;

    const grade = calculateGrade(marks, maxMarks);
    const currentUserName = adminProfile?.name || teacherProfile?.fullName || 'Educator';

    await addAcademicRecord({
      studentId: student.studentId,
      studentName: student.fullName,
      class: student.class,
      subject,
      examType,
      marks,
      maxMarks,
      grade,
      remarks,
      recordedBy: currentUserName,
      date: new Date().toISOString().split('T')[0]
    });

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-outfit">Academic Assessment Registry</h2>
          <p className="text-xs text-slate-400">Class examinations, subject scores, and teacher encouraging remarks.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Enter Marks / Remarks
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-1.5 focus:ring-amber-500"
            >
              <option value="All">All Classes (1-5)</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">Exam Type:</span>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-1.5 focus:ring-amber-500"
            >
              <option value="All">All Assessments</option>
              <option value="Monthly Test">Monthly Test</option>
              <option value="First Term">First Term</option>
              <option value="Mid Term">Mid Term</option>
              <option value="Final Term">Final Term</option>
              <option value="Weekly Quiz">Weekly Quiz</option>
            </select>
          </div>
        </div>

        <span className="text-slate-400 text-xs">
          {filteredRecords.length} Records Logged
        </span>
      </div>

      {/* Records Table */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 uppercase font-mono text-[11px] text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-3">Class & Exam</th>
                <th className="py-3 px-3">Subject</th>
                <th className="py-3 px-3 text-right">Marks Score</th>
                <th className="py-3 px-3">Grade</th>
                <th className="py-3 px-4">Remarks & Mentor</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No academic records found for this filter.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-700/40 transition-colors">
                    <td className="py-3 px-4">
                      <strong className="text-white font-bold block">{r.studentName}</strong>
                      <span className="text-[10px] font-mono text-slate-400">{r.studentId}</span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-amber-300 font-bold block">{r.class}</span>
                      <span className="text-[11px] text-slate-400">{r.examType}</span>
                    </td>

                    <td className="py-3 px-3 font-semibold text-slate-200">
                      {r.subject}
                    </td>

                    <td className="py-3 px-3 text-right font-black font-mono text-sm text-emerald-400">
                      {r.marks} / {r.maxMarks}
                    </td>

                    <td className="py-3 px-3">
                      <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-black text-xs">
                        {r.grade}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <p className="text-slate-300 line-clamp-1 italic">"{r.remarks}"</p>
                      <span className="text-[10px] text-slate-400 block mt-0.5">By {r.recordedBy}</span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => deleteAcademicRecord(r.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-400"
                        title="Delete Record"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white font-outfit">Log Assessment Result</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Select Student *</label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.studentId}>
                      {s.fullName} ({s.class} - Roll #{s.rollNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Assessment Type *</label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
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
                  <label className="block text-slate-400 font-bold mb-1">Marks Obtained *</label>
                  <input
                    type="number"
                    min="0"
                    max={maxMarks}
                    required
                    value={marks}
                    onChange={(e) => setMarks(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Maximum Marks *</label>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    required
                    value={maxMarks}
                    onChange={(e) => setMaxMarks(parseInt(e.target.value) || 50)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Teacher Remarks & Guidance</label>
                <textarea
                  rows={2}
                  required
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
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
