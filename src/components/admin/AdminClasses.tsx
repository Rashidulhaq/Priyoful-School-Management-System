import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Layers, Users, BookOpen, Edit, X, Plus } from 'lucide-react';
import { SchoolClass } from '../../types';

export const AdminClasses: React.FC = () => {
  const { classes, updateClass, students, teachers } = useSchool();
  const [editingClass, setEditingClass] = useState<SchoolClass | null>(null);

  const [capacity, setCapacity] = useState(30);
  const [assignedTeacher, setAssignedTeacher] = useState('');
  const [room, setRoom] = useState('');
  const [description, setDescription] = useState('');

  const handleOpenEdit = (cls: SchoolClass) => {
    setEditingClass(cls);
    setCapacity(cls.capacity);
    setAssignedTeacher(cls.assignedTeacher);
    setRoom(cls.room);
    setDescription(cls.description);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClass) return;

    await updateClass(editingClass.id, {
      capacity,
      assignedTeacher,
      room,
      description
    });

    setEditingClass(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-black text-white font-outfit">Class Management (Class 1 to 5)</h2>
        <p className="text-xs text-slate-400">Configure classroom capacities, assigned lead educators, and learning milestones.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => {
          const enrolledCount = students.filter(s => s.class === cls.name && s.status === 'Active').length;
          return (
            <div
              key={cls.id}
              className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-4 hover:border-sky-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center font-outfit text-base">
                      0{cls.gradeLevel}
                    </span>
                    <div>
                      <h3 className="text-lg font-black text-white font-outfit">{cls.name}</h3>
                      <span className="text-[11px] text-slate-400">{cls.room}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenEdit(cls)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-amber-400 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lead Teacher:</span>
                    <strong className="text-slate-200">{cls.assignedTeacher}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Enrollment / Capacity:</span>
                    <span className="font-bold text-amber-300">
                      {enrolledCount} / {cls.capacity} Students
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${Math.min(100, (enrolledCount / cls.capacity) * 100)}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 pt-2 leading-relaxed">
                    {cls.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex flex-wrap gap-1">
                {cls.subjects.map((sub, idx) => (
                  <span key={idx} className="bg-slate-900 text-slate-300 text-[10px] px-2 py-0.5 rounded-md">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white font-outfit">Edit {editingClass.name} Settings</h3>
              <button onClick={() => setEditingClass(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Assigned Lead Teacher</label>
                <select
                  value={assignedTeacher}
                  onChange={(e) => setAssignedTeacher(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.fullName}>
                      {t.fullName} ({t.teacherId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Classroom Capacity (Max Students)</label>
                <input
                  type="number"
                  min="10"
                  max="60"
                  value={capacity}
                  onChange={(e) => setCapacity(parseInt(e.target.value) || 30)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Room Designation</label>
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Curriculum & Goal Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingClass(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
