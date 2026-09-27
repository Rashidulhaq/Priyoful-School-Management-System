export type UserRole = 'admin' | 'teacher' | 'guest';

export interface AdminUser {
  uid: string;
  email: string;
  name: string;
  role: 'admin';
  createdAt?: string;
}

export interface Teacher {
  id: string;
  teacherId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  assignedClass: string; // e.g. "Class 1", "Class 2"
  assignedClasses?: string[];
  subject: string;
  volunteerStatus: 'Full-time Volunteer' | 'Part-time Volunteer' | 'Weekend Volunteer';
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Archived';
  photoUrl: string;
  password?: string;
  notes?: string;
  createdAt: string;
}

export interface Student {
  id: string;
  studentId: string;
  fullName: string;
  nickname?: string;
  dateOfBirth: string;
  gender: 'Boy' | 'Girl' | 'Other';
  class: 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5';
  section: string;
  rollNumber: string;
  admissionDate: string;
  photoUrl: string;
  guardianName: string;
  guardianPhone: string;
  guardianAddress: string;
  emergencyContact: string;
  bloodGroup?: string;
  previousSchool?: string;
  status: 'Active' | 'Archived' | 'Transferred';
  notes?: string;
  createdAt: string;
}

export interface SchoolClass {
  id: string;
  classId: string;
  name: 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5';
  gradeLevel: number;
  assignedTeacher: string;
  assignedTeacherId: string;
  room: string;
  capacity: number;
  sections: string[];
  description: string;
  subjects: string[];
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  class: string;
  studentId: string;
  studentName: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  remark?: string;
  markedBy: string;
  createdAt: string;
}

export interface AcademicRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  subject: string;
  examType: 'First Term' | 'Mid Term' | 'Final Term' | 'Monthly Test' | 'Weekly Quiz';
  marks: number;
  maxMarks: number;
  grade: string;
  remarks: string;
  recordedBy: string;
  date: string;
}

export interface Book {
  id: string;
  bookId: string;
  name: string;
  author: string;
  category: 'Story' | 'Textbook' | 'Science & Nature' | 'Moral & Values' | 'Bangla Rhymes' | 'English Reader';
  class: string;
  quantity: number;
  availableQuantity: number;
  description: string;
  coverUrl: string;
  addedDate: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  class: string;
  subject: string;
  teacherName: string;
  teacherId: string;
  fileType: 'PDF Worksheet' | 'Practice Sheet' | 'Visual Chart' | 'Lesson Notes' | 'Audio Rhyme';
  fileUrl: string;
  uploadDate: string;
}

// STRICTLY ADMIN ACCESS
export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  amount: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Bank Transfer' | 'Cash' | 'Card';
  transactionId: string;
  message?: string;
  status: 'Verified' | 'Pending' | 'Cancelled';
  isAnonymous: boolean;
  date: string;
  createdAt: string;
}

// STRICTLY ADMIN ACCESS
export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  reference: string;
  date: string;
  recordedBy: string;
  notes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  target: 'All' | 'Teachers' | 'Public' | 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5';
  published: boolean;
  author: string;
  date: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  coverUrl: string;
  published: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  coverUrl: string;
  published: boolean;
  author: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: 'Classroom' | 'Sports & Fun' | 'Art & Creativity' | 'Food & Health' | 'Community';
  date: string;
  isFeatured: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  category: 'Students' | 'Teachers' | 'Classes' | 'Attendance' | 'Academics' | 'Books' | 'Finance' | 'Settings';
  performedBy: string;
  role: 'admin' | 'teacher';
  details: string;
  timestamp: string;
}

export interface SchoolSettings {
  id: string;
  schoolName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  bKashNumber: string;
  nagadNumber: string;
  bankDetails: string;
  activeAcademicYear: string;
  aboutMission: string;
  aboutVision: string;
  totalDonationTarget?: number;
  statsOverride?: {
    studentsCount?: number;
    teachersCount?: number;
    volunteersCount?: number;
    yearsOfService?: number;
  };
}
