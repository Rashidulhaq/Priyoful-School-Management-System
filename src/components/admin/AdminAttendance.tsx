import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import {
  CalendarCheck,
  Check,
  X,
  Clock,
  AlertCircle,
  Save,
  CheckCheck,
  Users,
  Calendar,
  Sparkles
} from 'lucide-react';
import { AttendanceRecord } from '../../types';

export const AdminAttendance: React.FC = () => {
  const { students, classes, attendance, recordAttendance } = useSchool();
  const { adminProfile, teacherProfile, role } = useAuth();

  const [selectedClass, setSelectedClass] = useState('Class 1');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Filter students for this class
  const classStudents = students.filter(s => s.class === selectedClass && s.status === 'Active');

  // Existing attendance map for this date & class
  const existingForDay = attendance.filter(a => a.date === selectedDate && a.class === selectedClass);
  const statusMapInitial: Record<string, AttendanceRecord['status']> = {};
  const remarkMapInitial: Record<string, string> = {};

  classStudents.forEach(s => {
    const existing = existingForDay.find(e => e.studentId === s.studentId);
    statusMapInitial[s.studentId] = existing ? existing.status : 'Present';
    remarkMapInitial[s.studentId] = existing ? (existing.remark || '') : '';
  });

  const [statusMap, setStatusMap] = useState<Record<string, AttendanceRecord['status']>>(statusMapInitial);
  const [remarkMap, setRemarkMap] = useState<Record<string, string>>(remarkMapInitial);

  // Handle class/date change sync
  const handleClassChange = (newCls: string) => {
    setSelectedClass(newCls);
    setSavedSuccess(false);
    const newStudents = students.filter(s => s.class === newCls && s.status === 'Active');
    const existing = attendance.filter(a => a.date === selectedDate && a.class === newCls);
    const newStatusMap: Record<string, AttendanceRecord['status']> = {};
    const newRemarkMap: Record<string, string> = {};
    newStudents.forEach(s => {
      const match = existing.find(e => e.studentId === s.studentId);
      newStatusMap[s.studentId] = match ? match.status : 'Present';
      newRemarkMap[s.studentId] = match ? (match.remark || '') : '';
    });
    setStatusMap(newStatusMap);
    setRemarkMap(newRemarkMap);
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    setSavedSuccess(false);
    const existing = attendance.filter(a => a.date === newDate && a.class === selectedClass);
    const newStatusMap: Record<string, AttendanceRecord['status']> = {};
    const newRemarkMap: Record<string, string> = {};
    classStudents.forEach(s => {
      const match = existing.find(e => e.studentId === s.studentId);
      newStatusMap[s.studentId] = match ? match.status : 'Present';
      newRemarkMap[s.studentId] = match ? (match.remark || '') : '';
    });
    setStatusMap(newStatusMap);
    setRemarkMap(newRemarkMap);
  };

  const setAllStatus = (newStatus: AttendanceRecord['status']) => {
    const updated: Record<string, AttendanceRecord['status']> = {};
    classStudents.forEach(s => {
      updated[s.studentId] = newStatus;
    });
    setStatusMap(updated);
    setSavedSuccess(false);
  };

  const handleSave = async () => {
    const currentUserName = adminProfile?.name || teacherProfile?.fullName || 'Educator';
    const payload = classStudents.map(s => ({
      date: selectedDate,
      class: selectedClass,
      studentId: s.studentId,
      studentName: s.fullName,
      status: statusMap[s.studentId] || 'Present',
      remark: remarkMap[s.studentId] || '',
      markedBy: currentUserName,
    }));

    await recordAttendance(payload);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Metrics
  const presentCount = classStudents.filter(s => statusMap[s.studentId] === 'Present' || statusMap[s.studentId] === 'Late').length;
  const absentCount = classStudents.filter(s => statusMap[s.studentId] === 'Absent').length;
  const lateCount = classStudents.filter(s => statusMap[s.studentId] === 'Late').length;
  const leaveCount = classStudents.filter(s => statusMap[s.studentId] === 'Leave').length;
  const attendanceRate = classStudents.length > 0 ? Math.round((presentCount / classStudents.length) * 100) : 100;

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-outfit">Daily Attendance Register</h2>
          <p className="text-xs text-slate-400">Track and archive daily student attendance for Class 1 through Class 5.</p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save Attendance</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4" />
          Attendance successfully recorded and saved to central database!
        </div>
      )}

      {/* Selectors & Quick Actions */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">Select Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => handleClassChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 focus:ring-amber-500 font-bold"
            >
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold">Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 focus:ring-amber-500 font-mono text-xs"
            />
          </div>
        </div>

        {/* Quick Batch Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAllStatus('Present')}
            className="px-3 py-1.5 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-300 rounded-xl font-bold transition-colors flex items-center gap-1.5"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark All Present
          </button>
          <button
            type="button"
            onClick={() => setAllStatus('Absent')}
            className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 border border-rose-900/60 text-rose-300 rounded-xl font-bold transition-colors"
          >
            Clear All
          </button>
        </div>

      </div>

      {/* Attendance Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
        <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Present / Late</span>
          <strong className="text-emerald-400 text-xl font-black font-outfit">{presentCount} / {classStudents.length}</strong>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Absent</span>
          <strong className="text-rose-400 text-xl font-black font-outfit">{absentCount}</strong>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Late Arrival</span>
          <strong className="text-amber-400 text-xl font-black font-outfit">{lateCount}</strong>
        </div>
        <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">Attendance Rate</span>
          <strong className="text-teal-300 text-xl font-black font-outfit">{attendanceRate}%</strong>
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-900/90 border-b border-slate-700 flex justify-between items-center text-xs">
          <span className="font-bold text-white uppercase tracking-wider">
            {selectedClass} Student Register ({classStudents.length} Students)
          </span>
          <span className="text-slate-400">Date: {selectedDate}</span>
        </div>

        <div className="divide-y divide-slate-700/60">
          {classStudents.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No students enrolled in {selectedClass} yet.
            </div>
          ) : (
            classStudents.map((student) => {
              const currentStatus = statusMap[student.studentId] || 'Present';
              return (
                <div
                  key={student.id}
                  className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-700/30 transition-colors text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={student.photoUrl}
                      alt={student.fullName}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-600 shrink-0"
                    />
                    <div>
                      <strong className="text-white font-bold block">{student.fullName}</strong>
                      <span className="text-slate-400 text-[11px]">
                        Roll #{student.rollNumber} • {student.studentId}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {(['Present', 'Absent', 'Late', 'Leave'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => {
                          setStatusMap({ ...statusMap, [student.studentId]: st });
                          setSavedSuccess(false);
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all text-xs ${
                          currentStatus === st
                            ? st === 'Present'
                              ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                              : st === 'Absent'
                              ? 'bg-rose-500 text-white font-black shadow-md'
                              : st === 'Late'
                              ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                              : 'bg-sky-500 text-white font-black shadow-md'
                            : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    ))}

                    <input
                      type="text"
                      placeholder="Remark / reason..."
                      value={remarkMap[student.studentId] || ''}
                      onChange={(e) => {
                        setRemarkMap({ ...remarkMap, [student.studentId]: e.target.value });
                        setSavedSuccess(false);
                      }}
                      className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs w-36 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
