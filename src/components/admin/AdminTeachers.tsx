import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { GraduationCap, Plus, Edit, Trash2, Phone, Mail, MapPin, X, CheckCircle2 } from 'lucide-react';
import { Teacher } from '../../types';

export const AdminTeachers: React.FC = () => {
  const { teachers, addTeacher, updateTeacher, deleteTeacher, classes } = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Form State
  const [teacherId, setTeacherId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [assignedClass, setAssignedClass] = useState('Class 1');
  const [subject, setSubject] = useState('Bangla & Early Literacy');
  const [volunteerStatus, setVolunteerStatus] = useState<Teacher['volunteerStatus']>('Full-time Volunteer');
  const [joiningDate, setJoiningDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<Teacher['status']>('Active');
  const [photoUrl, setPhotoUrl] = useState('');
  const [notes, setNotes] = useState('');

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    const nextNum = teachers.length + 1;
    setTeacherId(`TCH-${String(nextNum).padStart(3, '0')}`);
    setFullName('');
    setEmail('volunteer@priyoful.org');
    setPhone('+880 17');
    setAddress('Mirpur, Dhaka');
    setAssignedClass('Class 1');
    setSubject('General Primary');
    setVolunteerStatus('Full-time Volunteer');
    setJoiningDate(new Date().toISOString().split('T')[0]);
    setStatus('Active');
    setPhotoUrl('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80');
    setNotes('');
    setModalOpen(true);
  };

  const handleOpenEdit = (t: Teacher) => {
    setEditingTeacher(t);
    setTeacherId(t.teacherId);
    setFullName(t.fullName);
    setEmail(t.email);
    setPhone(t.phone);
    setAddress(t.address);
    setAssignedClass(t.assignedClass);
    setSubject(t.subject);
    setVolunteerStatus(t.volunteerStatus);
    setJoiningDate(t.joiningDate);
    setStatus(t.status);
    setPhotoUrl(t.photoUrl);
    setNotes(t.notes || '');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const payload = {
      teacherId,
      fullName,
      email,
      phone,
      address,
      assignedClass,
      assignedClasses: [assignedClass],
      subject,
      volunteerStatus,
      joiningDate,
      status,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      notes,
    };

    if (editingTeacher) {
      await updateTeacher(editingTeacher.id, payload);
    } else {
      await addTeacher(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove teacher: ${name}?`)) {
      await deleteTeacher(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-outfit">Teachers & Volunteers Directory</h2>
          <p className="text-xs text-slate-400">Manage volunteer profiles, class assignments, and teaching schedules.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Volunteer Teacher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((t) => (
          <div
            key={t.id}
            className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-4 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4">
                <img
                  src={t.photoUrl}
                  alt={t.fullName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-600 shrink-0"
                />
                <div className="grow min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-amber-400">{t.teacherId}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      t.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-white truncate font-outfit mt-0.5">{t.fullName}</h3>
                  <span className="text-xs text-slate-400 block truncate">{t.subject}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Assigned:</span>
                  <strong className="text-amber-300 font-bold bg-slate-900 px-2 py-0.5 rounded">{t.assignedClass}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Volunteer Mode:</span>
                  <span>{t.volunteerStatus}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 pt-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="truncate">{t.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t.phone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500">Joined: {t.joiningDate}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-amber-400"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(t.id, t.fullName)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-rose-400"
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
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xl font-black text-white font-outfit">
                {editingTeacher ? 'Edit Teacher Profile' : 'Add Volunteer Teacher'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Teacher ID *</label>
                  <input
                    type="text"
                    required
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Assigned Class *</label>
                  <select
                    value={assignedClass}
                    onChange={(e) => setAssignedClass(e.target.value)}
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
                  <label className="block text-slate-400 font-bold mb-1">Teaching Subject *</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Volunteer Status</label>
                  <select
                    value={volunteerStatus}
                    onChange={(e) => setVolunteerStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Full-time Volunteer">Full-time Volunteer</option>
                    <option value="Part-time Volunteer">Part-time Volunteer</option>
                    <option value="Weekend Volunteer">Weekend Volunteer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Photo URL</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-[11px]"
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
                  Save Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
