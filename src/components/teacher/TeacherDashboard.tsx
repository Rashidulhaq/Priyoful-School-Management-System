import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  CalendarCheck,
  Award,
  BookOpen,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Bell
} from 'lucide-react';

interface TeacherDashboardProps {
  onNavigate: (section: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const { teacherProfile } = useAuth();
  const { students, attendance, materials, books, announcements } = useSchool();

  const assignedClass = teacherProfile?.assignedClass || 'Class 1';
  const myStudents = students.filter(s => s.class === assignedClass && s.status === 'Active');

  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecords = attendance.filter(a => a.date === todayStr && a.class === assignedClass);
  const presentCount = todayRecords.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const isAttendanceMarkedToday = todayRecords.length > 0;

  const myMaterials = materials.filter(m => m.class === assignedClass);
  const teacherNotices = announcements.filter(a => a.target === 'All' || a.target === 'Teachers' || a.target === assignedClass);

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌻</span>
            <span className="bg-white/20 text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              Volunteer Educator Portal
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-outfit">
            Welcome back, Teacher {teacherProfile?.fullName.split(' ')[0]}!
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
            You are managing <strong>{assignedClass}</strong>. Thank you for dedicating your time to empower these children through education and love.
          </p>
        </div>

        <button
          onClick={() => onNavigate('attendance')}
          className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-950 font-black rounded-2xl text-xs sm:text-sm shadow-md flex items-center gap-2 shrink-0 transition-all active:scale-95"
        >
          <CalendarCheck className="w-4 h-4 text-emerald-700" />
          <span>{isAttendanceMarkedToday ? 'Review Today\'s Attendance' : 'Take Attendance Now'}</span>
        </button>
      </div>

      {/* 4 Classroom Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1: My Students */}
        <div
          onClick={() => onNavigate('students')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">My Students</span>
            <Users className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-outfit">
            {myStudents.length}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            Enrolled in {assignedClass}
          </span>
        </div>

        {/* Card 2: Today's Attendance */}
        <div
          onClick={() => onNavigate('attendance')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Attendance</span>
            <CalendarCheck className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-outfit">
            {isAttendanceMarkedToday ? `${presentCount}/${myStudents.length}` : 'Pending'}
          </div>
          <span className={`text-[11px] font-semibold block mt-1 ${isAttendanceMarkedToday ? 'text-emerald-700' : 'text-amber-600'}`}>
            {isAttendanceMarkedToday ? 'Marked for today' : 'Click to take attendance'}
          </span>
        </div>

        {/* Card 3: Study Sheets */}
        <div
          onClick={() => onNavigate('materials')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Study Sheets</span>
            <FileText className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-outfit">
            {myMaterials.length}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Available worksheets
          </span>
        </div>

        {/* Card 4: Library Books */}
        <div
          onClick={() => onNavigate('books')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Library Books</span>
            <BookOpen className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-outfit">
            {books.length}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Story & rhyme books
          </span>
        </div>

      </div>

      {/* Two Column Layout: Student Quick Roster & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: My Students Roster */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-lg font-black text-slate-900 font-outfit">
                {assignedClass} Student Roster
              </h3>
              <p className="text-xs text-slate-500">Active learners in your classroom</p>
            </div>

            <button
              onClick={() => onNavigate('students')}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Full Directory →
            </button>
          </div>

          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto pr-1">
            {myStudents.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={s.photoUrl}
                    alt={s.fullName}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <strong className="text-slate-900 font-bold block">{s.fullName}</strong>
                    <span className="text-[11px] text-slate-400">Roll: #{s.rollNumber} • ID: {s.studentId}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-slate-600 block">{s.guardianName}</span>
                  {s.notes && (
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      Care note
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Teacher Circulars & Quick Tips */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Teacher Notices */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-black text-slate-900 font-outfit">School Circulars</h3>
            </div>

            <div className="space-y-3 text-xs">
              {teacherNotices.map((n) => (
                <div key={n.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">{n.title}</strong>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">{n.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Guidance */}
          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-200 space-y-2 text-xs text-emerald-950">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Teaching with Empathy</span>
            </div>
            <p className="leading-relaxed text-emerald-900/80">
              Our students face immense hardship at home. A smile, gentle encouragement, and patient listening can be the spark that changes their entire trajectory.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
