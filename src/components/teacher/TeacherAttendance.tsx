import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { CalendarCheck, Check, Save, CheckCheck, Sparkles } from 'lucide-react';
import { AttendanceRecord } from '../../types';

export const TeacherAttendance: React.FC = () => {
  const { students, attendance, recordAttendance } = useSchool();
  const { teacherProfile } = useAuth();

  const assignedClass = teacherProfile?.assignedClass || 'Class 1';
  const classStudents = students.filter(s => s.class === assignedClass && s.status === 'Active');

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Status mapping
  const existingRecords = attendance.filter(a => a.date === selectedDate && a.class === assignedClass);
  const initialMap: Record<string, AttendanceRecord['status']> = {};
  const initialRemark: Record<string, string> = {};

  classStudents.forEach(s => {
    const match = existingRecords.find(e => e.studentId === s.studentId);
    initialMap[s.studentId] = match ? match.status : 'Present';
    initialRemark[s.studentId] = match ? (match.remark || '') : '';
  });

  const [statusMap, setStatusMap] = useState<Record<string, AttendanceRecord['status']>>(initialMap);
  const [remarkMap, setRemarkMap] = useState<Record<string, string>>(initialRemark);

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    setSavedSuccess(false);
    const existing = attendance.filter(a => a.date === newDate && a.class === assignedClass);
    const newMap: Record<string, AttendanceRecord['status']> = {};
    const newRemark: Record<string, string> = {};
    classStudents.forEach(s => {
      const match = existing.find(e => e.studentId === s.studentId);
      newMap[s.studentId] = match ? match.status : 'Present';
      newRemark[s.studentId] = match ? (match.remark || '') : '';
    });
    setStatusMap(newMap);
    setRemarkMap(newRemark);
  };

  const handleMarkAll = (status: AttendanceRecord['status']) => {
    const updated: Record<string, AttendanceRecord['status']> = {};
    classStudents.forEach(s => {
      updated[s.studentId] = status;
    });
    setStatusMap(updated);
    setSavedSuccess(false);
  };

  const handleSave = async () => {
    const educatorName = teacherProfile?.fullName || 'Volunteer Teacher';
    const payload = classStudents.map(s => ({
      date: selectedDate,
      class: assignedClass,
      studentId: s.studentId,
      studentName: s.fullName,
      status: statusMap[s.studentId] || 'Present',
      remark: remarkMap[s.studentId] || '',
      markedBy: educatorName
    }));

    await recordAttendance(payload);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const presentCount = classStudents.filter(s => statusMap[s.studentId] === 'Present' || statusMap[s.studentId] === 'Late').length;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-outfit">Daily Attendance: {assignedClass}</h2>
          <p className="text-xs text-slate-500">Record morning roll-call and track student daily attendance.</p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Today's Attendance</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-700" />
          Attendance successfully saved!
        </div>
      )}

      {/* Date & Bulk Action Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-bold">Attendance Date:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleMarkAll('Present')}
            className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl font-bold transition-colors flex items-center gap-1.5"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark All Present
          </button>
          <button
            type="button"
            onClick={() => handleMarkAll('Absent')}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <span className="font-bold text-slate-800">
            {assignedClass} Classroom Attendance ({presentCount}/{classStudents.length} Present)
          </span>
          <span className="text-slate-500 font-mono">{selectedDate}</span>
        </div>

        <div className="divide-y divide-slate-100">
          {classStudents.map((s) => {
            const currentStatus = statusMap[s.studentId] || 'Present';
            return (
              <div
                key={s.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={s.photoUrl}
                    alt={s.fullName}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <strong className="text-slate-900 font-bold block">{s.fullName}</strong>
                    <span className="text-slate-400 text-[11px]">Roll #{s.rollNumber} • {s.studentId}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(['Present', 'Absent', 'Late', 'Leave'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusMap({ ...statusMap, [s.studentId]: st })}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                        currentStatus === st
                          ? st === 'Present'
                            ? 'bg-emerald-600 text-white font-black shadow-xs'
                            : st === 'Absent'
                            ? 'bg-rose-600 text-white font-black shadow-xs'
                            : st === 'Late'
                            ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                            : 'bg-sky-600 text-white font-black shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}

                  <input
                    type="text"
                    placeholder="Reason/note..."
                    value={remarkMap[s.studentId] || ''}
                    onChange={(e) => setRemarkMap({ ...remarkMap, [s.studentId]: e.target.value })}
                    className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs w-36 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
