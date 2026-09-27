import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  ArrowUpDown,
  Phone,
  MapPin,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Student } from '../../types';

export const AdminStudents: React.FC = () => {
  const { students, classes, addStudent, updateStudent, deleteStudent, academicRecords, attendance } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortField, setSortField] = useState<'rollNumber' | 'fullName' | 'class'>('class');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  // Form state
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [dob, setDob] = useState('2018-05-10');
  const [gender, setGender] = useState<'Boy' | 'Girl' | 'Other'>('Boy');
  const [studentClass, setStudentClass] = useState<'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5'>('Class 1');
  const [section, setSection] = useState('A');
  const [rollNumber, setRollNumber] = useState('01');
  const [admissionDate, setAdmissionDate] = useState(new Date().toISOString().split('T')[0]);
  const [photoUrl, setPhotoUrl] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianAddress, setGuardianAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [previousSchool, setPreviousSchool] = useState('');
  const [status, setStatus] = useState<'Active' | 'Archived' | 'Transferred'>('Active');
  const [notes, setNotes] = useState('');

  // Filtered & Sorted
  const filteredStudents = students
    .filter(s => {
      if (selectedClass !== 'All' && s.class !== selectedClass) return false;
      if (selectedStatus !== 'All' && s.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          s.fullName.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q) ||
          s.guardianName.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortField === 'rollNumber') return parseInt(a.rollNumber || '0') - parseInt(b.rollNumber || '0');
      if (sortField === 'class') return a.class.localeCompare(b.class);
      return a.fullName.localeCompare(b.fullName);
    });

  const handleOpenAdd = () => {
    setEditingStudent(null);
    const nextNum = students.length + 1;
    setStudentId(`PF-2026-${String(nextNum).padStart(3, '0')}`);
    setFullName('');
    setNickname('');
    setDob('2018-05-10');
    setGender('Boy');
    setStudentClass('Class 1');
    setSection('A');
    setRollNumber(String(nextNum));
    setAdmissionDate(new Date().toISOString().split('T')[0]);
    setPhotoUrl('https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&auto=format&fit=crop&q=80');
    setGuardianName('');
    setGuardianPhone('+880 17');
    setGuardianAddress('Mirpur 11 Settlement, Dhaka');
    setEmergencyContact('+880 17');
    setBloodGroup('B+');
    setPreviousSchool('None (First time school)');
    setStatus('Active');
    setNotes('');
    setModalOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setStudentId(student.studentId);
    setFullName(student.fullName);
    setNickname(student.nickname || '');
    setDob(student.dateOfBirth);
    setGender(student.gender);
    setStudentClass(student.class);
    setSection(student.section);
    setRollNumber(student.rollNumber);
    setAdmissionDate(student.admissionDate);
    setPhotoUrl(student.photoUrl);
    setGuardianName(student.guardianName);
    setGuardianPhone(student.guardianPhone);
    setGuardianAddress(student.guardianAddress);
    setEmergencyContact(student.emergencyContact);
    setBloodGroup(student.bloodGroup || 'B+');
    setPreviousSchool(student.previousSchool || '');
    setStatus(student.status);
    setNotes(student.notes || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !studentId) return;

    const payload = {
      studentId,
      fullName,
      nickname,
      dateOfBirth: dob,
      gender,
      class: studentClass,
      section,
      rollNumber,
      admissionDate,
      photoUrl: photoUrl || 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&auto=format&fit=crop&q=80',
      guardianName,
      guardianPhone,
      guardianAddress,
      emergencyContact,
      bloodGroup,
      previousSchool,
      status,
      notes,
    };

    if (editingStudent) {
      await updateStudent(editingStudent.id, payload);
    } else {
      await addStudent(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to archive student: ${name}?`)) {
      await deleteStudent(id);
    }
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = ['Student ID,Full Name,Class,Section,Roll,Gender,DOB,Admission Date,Guardian,Phone,Address,Status'];
    const rows = filteredStudents.map(s =>
      `"${s.studentId}","${s.fullName}","${s.class}","${s.section}","${s.rollNumber}","${s.gender}","${s.dateOfBirth}","${s.admissionDate}","${s.guardianName}","${s.guardianPhone}","${s.guardianAddress}","${s.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `priyoful_students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-outfit">Student Management Registry</h2>
          <p className="text-xs text-slate-400">Class 1 to 5 enrollment, guardian records, and academic profiles.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportToCSV}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors border border-slate-700"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Enroll New Student
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative grow sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search student name, ID or guardian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold">Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-2.5 py-1.5 focus:ring-amber-500"
            >
              <option value="All">All Classes (1-5)</option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-2.5 py-1.5 focus:ring-amber-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
              <option value="Transferred">Transferred</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold">Sort:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as any)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-2.5 py-1.5 focus:ring-amber-500"
            >
              <option value="class">By Class</option>
              <option value="rollNumber">By Roll #</option>
              <option value="fullName">By Name</option>
            </select>
          </div>
        </div>

      </div>

      {/* Students Data Table */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 uppercase font-mono text-[11px] text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-3">Class & Roll</th>
                <th className="py-3 px-3">Guardian Info</th>
                <th className="py-3 px-3">Admission</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No students found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-700/40 transition-colors">
                    
                    {/* Student Name & ID */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={s.photoUrl}
                          alt={s.fullName}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-600 shrink-0"
                        />
                        <div className="min-w-0">
                          <strong className="text-white font-bold block truncate">{s.fullName}</strong>
                          <span className="text-[10px] font-mono text-amber-400 block">{s.studentId}</span>
                        </div>
                      </div>
                    </td>

                    {/* Class & Roll */}
                    <td className="py-3 px-3">
                      <span className="bg-slate-900 text-amber-300 font-bold px-2 py-0.5 rounded-sm inline-block">
                        {s.class} (Sec {s.section})
                      </span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Roll: #{s.rollNumber}</span>
                    </td>

                    {/* Guardian Info */}
                    <td className="py-3 px-3">
                      <span className="text-slate-200 font-medium block truncate max-w-[180px]">{s.guardianName}</span>
                      <span className="text-[11px] text-slate-400 block truncate max-w-[180px]">{s.guardianPhone}</span>
                    </td>

                    {/* Admission Date */}
                    <td className="py-3 px-3 text-slate-400">
                      <span>{s.admissionDate}</span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-700 text-slate-300'
                      }`}>
                        {s.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingStudent(s)}
                          title="View Profile"
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-sky-400 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(s)}
                          title="Edit Student"
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-amber-400 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.fullName)}
                          title="Archive"
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-3 bg-slate-900/60 border-t border-slate-700 text-slate-400 text-xs flex justify-between">
          <span>Showing {filteredStudents.length} of {students.length} students</span>
          <span>Class 1 to 5</span>
        </div>
      </div>

      {/* ADD / EDIT STUDENT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white font-outfit">
                {editingStudent ? 'Edit Student Record' : 'Enroll New Student'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Student ID *</label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-bold mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Class *</label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Section</label>
                  <input
                    type="text"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Boy">Boy</option>
                    <option value="Girl">Girl</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Admission Date</label>
                  <input
                    type="date"
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3">
                <span className="text-[11px] font-black uppercase text-amber-400 block mb-2">
                  Guardian & Community Contact Info
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Guardian Name *</label>
                    <input
                      type="text"
                      required
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-bold mb-1">Guardian Phone *</label>
                    <input
                      type="tel"
                      required
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 font-bold mb-1">Settlement Residential Address</label>
                    <input
                      type="text"
                      value={guardianAddress}
                      onChange={(e) => setGuardianAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Student Photo URL</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-[11px] focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Special Notes / Medical / Care Guidance</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-amber-500"
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
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl shadow-md transition-all active:scale-95"
                >
                  {editingStudent ? 'Save Changes' : 'Enroll Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT PROFILE VIEW DRAWER */}
      {viewingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={viewingStudent.photoUrl}
                  alt={viewingStudent.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500"
                />
                <div>
                  <h3 className="text-xl font-black text-white font-outfit">{viewingStudent.fullName}</h3>
                  <span className="text-xs font-mono text-amber-400">{viewingStudent.studentId} • {viewingStudent.class} (Roll #{viewingStudent.rollNumber})</span>
                </div>
              </div>
              <button onClick={() => setViewingStudent(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Date of Birth</span>
                <strong className="text-white">{viewingStudent.dateOfBirth} ({viewingStudent.gender})</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Admission Date</span>
                <strong className="text-white">{viewingStudent.admissionDate}</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Blood Group</span>
                <strong className="text-white">{viewingStudent.bloodGroup || 'Not Tested'}</strong>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Status</span>
                <strong className="text-emerald-400">{viewingStudent.status}</strong>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-amber-400 block">Guardian & Address:</span>
              <p className="text-slate-200"><strong>Name:</strong> {viewingStudent.guardianName}</p>
              <p className="text-slate-200"><strong>Contact Phone:</strong> {viewingStudent.guardianPhone}</p>
              <p className="text-slate-200"><strong>Community Address:</strong> {viewingStudent.guardianAddress}</p>
              {viewingStudent.notes && (
                <p className="text-slate-400 italic pt-1 border-t border-slate-800">
                  Notes: "{viewingStudent.notes}"
                </p>
              )}
            </div>

            {/* Academic History Snippet */}
            <div className="text-xs">
              <span className="font-bold text-slate-300 block mb-2">Recent Academic Assessments:</span>
              {academicRecords.filter(a => a.studentId === viewingStudent.studentId).length === 0 ? (
                <p className="text-slate-500 italic">No term exam marks entered yet for this student.</p>
              ) : (
                <div className="space-y-1.5">
                  {academicRecords.filter(a => a.studentId === viewingStudent.studentId).map(ar => (
                    <div key={ar.id} className="flex justify-between bg-slate-950 p-2 rounded-lg border border-slate-800">
                      <span>{ar.subject} ({ar.examType})</span>
                      <strong className="text-amber-400">{ar.marks}/{ar.maxMarks} (Grade {ar.grade})</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setViewingStudent(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
