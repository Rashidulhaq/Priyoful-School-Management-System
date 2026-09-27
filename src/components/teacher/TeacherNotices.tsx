import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { Bell, Calendar, Clock, Sparkles } from 'lucide-react';

export const TeacherNotices: React.FC = () => {
  const { announcements } = useSchool();
  const { teacherProfile } = useAuth();
  const assignedClass = teacherProfile?.assignedClass || 'Class 1';

  const visibleNotices = announcements.filter(
    a => a.target === 'All' || a.target === 'Teachers' || a.target === assignedClass
  );

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-slate-900 font-outfit">School Circulars & Teacher Notices</h2>
        <p className="text-xs text-slate-500">Internal coordination announcements, volunteer meetings, and syllabus circulars.</p>
      </div>

      <div className="space-y-4">
        {visibleNotices.map((n) => (
          <div
            key={n.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  Target: {n.target}
                </span>
                <span className="text-xs text-slate-400 font-mono">{n.date}</span>
              </div>
              <span className="text-xs font-semibold text-slate-500">By {n.author}</span>
            </div>

            <h3 className="font-extrabold text-base text-slate-900 font-outfit">
              {n.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {n.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
