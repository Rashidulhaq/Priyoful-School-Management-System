import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  Teacher,
  SchoolClass,
  AttendanceRecord,
  AcademicRecord,
  Book,
  StudyMaterial,
  Donation,
  FinancialTransaction,
  Announcement,
  SchoolEvent,
  NewsArticle,
  GalleryItem,
  ContactMessage,
  AuditLog,
  SchoolSettings
} from '../types';
import { initializeDatabase, getLocal, setLocal, recordAuditLog } from '../services/db';
import { useAuth } from './AuthContext';
import { collection, addDoc, doc, setDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';

interface SchoolContextType {
  // Selected class for public drilldown
  selectedClassForDetail: string | null;
  setSelectedClassForDetail: (clsName: string | null) => void;

  // Public & Shared Data
  settings: SchoolSettings;
  updateSettings: (newSettings: Partial<SchoolSettings>) => Promise<void>;
  classes: SchoolClass[];
  addClass: (cls: Omit<SchoolClass, 'id'>) => Promise<void>;
  updateClass: (id: string, cls: Partial<SchoolClass>) => Promise<void>;
  
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id' | 'createdAt'>) => Promise<void>;
  updateTeacher: (id: string, teacher: Partial<Teacher>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;

  students: Student[];
  addStudent: (student: Omit<Student, 'id' | 'createdAt'>) => Promise<void>;
  updateStudent: (id: string, student: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;

  attendance: AttendanceRecord[];
  recordAttendance: (records: Omit<AttendanceRecord, 'id' | 'createdAt'>[]) => Promise<void>;
  getAttendanceForDateAndClass: (date: string, className: string) => AttendanceRecord[];

  academicRecords: AcademicRecord[];
  addAcademicRecord: (record: Omit<AcademicRecord, 'id'>) => Promise<void>;
  updateAcademicRecord: (id: string, record: Partial<AcademicRecord>) => Promise<void>;
  deleteAcademicRecord: (id: string) => Promise<void>;

  books: Book[];
  addBook: (book: Omit<Book, 'id' | 'addedDate'>) => Promise<void>;
  updateBook: (id: string, book: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;

  materials: StudyMaterial[];
  addMaterial: (material: Omit<StudyMaterial, 'id' | 'uploadDate'>) => Promise<void>;
  deleteMaterial: (id: string) => Promise<void>;

  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;

  events: SchoolEvent[];
  addEvent: (event: Omit<SchoolEvent, 'id'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<SchoolEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  news: NewsArticle[];
  addNews: (newsItem: Omit<NewsArticle, 'id'>) => Promise<void>;
  updateNews: (id: string, newsItem: Partial<NewsArticle>) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;

  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  messages: ContactMessage[];
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => Promise<void>;
  deleteContactMessage: (id: string) => Promise<void>;

  // STRICTLY ADMIN ACCESS
  donations: Donation[];
  submitDonation: (donation: Omit<Donation, 'id' | 'createdAt'>) => Promise<Donation>;
  updateDonationStatus: (id: string, status: Donation['status']) => Promise<void>;

  transactions: FinancialTransaction[];
  addTransaction: (tx: Omit<FinancialTransaction, 'id'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;

  auditLogs: AuditLog[];

  // Statistics
  stats: {
    totalStudents: number;
    activeTeachers: number;
    totalClasses: number;
    totalBooks: number;
    todayAttendanceRate: number;
    // Strict Admin Financials
    totalIncome: number;
    totalExpense: number;
    currentBalance: number;
    totalDonations: number;
  };

  isReady: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { role, canAccessFinancials, adminProfile, teacherProfile } = useAuth();

  const [settings, setSettings] = useState<SchoolSettings>(() => getLocal('settings', {} as SchoolSettings));
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => getLocal('attendance', []));
  const [academicRecords, setAcademicRecords] = useState<AcademicRecord[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  // Private Financials
  const [donations, setDonations] = useState<Donation[]>([]);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  const [isReady, setIsReady] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedClassForDetail, setSelectedClassForDetail] = useState<string | null>(null);

  const currentUserName = adminProfile?.name || teacherProfile?.fullName || 'Anonymous / Guest';

  useEffect(() => {
    async function loadData() {
      const data = await initializeDatabase();
      setSettings(data.settings);
      setClasses(data.classes);
      setTeachers(data.teachers);
      setStudents(data.students);
      setBooks(data.books);
      setMaterials(data.materials);
      setAnnouncements(data.announcements);
      setEvents(data.events);
      setNews(data.news);
      setGallery(data.gallery);
      setAcademicRecords(data.academicRecords);
      setDonations(data.donations);
      setTransactions(data.transactions);
      setMessages(data.messages);
      setAuditLogs(data.auditLogs);
      setIsReady(true);
    }
    loadData();

    // Attach live Firestore listeners so messages from public form and gallery updates reflect immediately
    const unsubscribeMessages = onSnapshot(
      collection(db, 'contactMessages'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items: ContactMessage[] = [];
          snapshot.forEach((docSnap) => {
            items.push(docSnap.data() as ContactMessage);
          });
          items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          setMessages(items);
          setLocal('messages', items);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'contactMessages');
      }
    );

    const unsubscribeGallery = onSnapshot(
      collection(db, 'gallery'),
      (snapshot) => {
        if (!snapshot.empty) {
          const items: GalleryItem[] = [];
          snapshot.forEach((docSnap) => {
            items.push(docSnap.data() as GalleryItem);
          });
          items.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
          setGallery(items);
          setLocal('gallery', items);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'gallery');
      }
    );

    return () => {
      unsubscribeMessages();
      unsubscribeGallery();
    };
  }, []);

  // Update Settings
  const updateSettings = async (newSettings: Partial<SchoolSettings>) => {
    if (!canAccessFinancials) return;
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    setLocal('settings', updated);
    await recordAuditLog('Settings Updated', 'Settings', currentUserName, 'admin', 'School configurations and payment info updated.');
    try {
      await setDoc(doc(db, 'settings', 'main'), updated);
    } catch (error) {
      console.warn('Could not sync settings to cloud Firestore:', error);
    }
  };

  // Class Management
  const addClass = async (cls: Omit<SchoolClass, 'id'>) => {
    const newClass: SchoolClass = { ...cls, id: `cls-${Date.now()}` };
    const updated = [...classes, newClass];
    setClasses(updated);
    setLocal('classes', updated);
    await recordAuditLog(`Created Class ${cls.name}`, 'Classes', currentUserName, 'admin', `Assigned teacher: ${cls.assignedTeacher}`);
    try {
      await setDoc(doc(db, 'classes', newClass.id), newClass);
    } catch {}
  };

  const updateClass = async (id: string, cls: Partial<SchoolClass>) => {
    const updated = classes.map(c => c.id === id ? { ...c, ...cls } : c);
    setClasses(updated);
    setLocal('classes', updated);
    await recordAuditLog('Updated Class Details', 'Classes', currentUserName, 'admin', `Modified details for class ID: ${id}`);
    try {
      await updateDoc(doc(db, 'classes', id), cls);
    } catch {}
  };

  // Teacher Management
  const addTeacher = async (teacher: Omit<Teacher, 'id' | 'createdAt'>) => {
    const newTeacher: Teacher = {
      ...teacher,
      id: `tch-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newTeacher, ...teachers];
    setTeachers(updated);
    setLocal('teachers', updated);
    await recordAuditLog(`Added Teacher: ${teacher.fullName}`, 'Teachers', currentUserName, 'admin', `Assigned to ${teacher.assignedClass}`);
    try {
      await setDoc(doc(db, 'teachers', newTeacher.id), newTeacher);
    } catch {}
  };

  const updateTeacher = async (id: string, teacher: Partial<Teacher>) => {
    const updated = teachers.map(t => t.id === id ? { ...t, ...teacher } : t);
    setTeachers(updated);
    setLocal('teachers', updated);
    await recordAuditLog(`Updated Teacher: ${teacher.fullName || id}`, 'Teachers', currentUserName, 'admin', 'Modified teacher profile');
    try {
      await updateDoc(doc(db, 'teachers', id), teacher);
    } catch {}
  };

  const deleteTeacher = async (id: string) => {
    const target = teachers.find(t => t.id === id);
    const updated = teachers.filter(t => t.id !== id);
    setTeachers(updated);
    setLocal('teachers', updated);
    await recordAuditLog(`Archived Teacher: ${target?.fullName || id}`, 'Teachers', currentUserName, 'admin', 'Teacher removed/archived');
    try {
      await deleteDoc(doc(db, 'teachers', id));
    } catch {}
  };

  // Student Management
  const addStudent = async (student: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent: Student = {
      ...student,
      id: `stu-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newStudent, ...students];
    setStudents(updated);
    setLocal('students', updated);
    await recordAuditLog(`Enrolled Student: ${student.fullName}`, 'Students', currentUserName, role === 'admin' ? 'admin' : 'teacher', `Enrolled into ${student.class} with ID ${student.studentId}`);
    try {
      await setDoc(doc(db, 'students', newStudent.id), newStudent);
    } catch {}
  };

  const updateStudent = async (id: string, student: Partial<Student>) => {
    const updated = students.map(s => s.id === id ? { ...s, ...student } : s);
    setStudents(updated);
    setLocal('students', updated);
    await recordAuditLog(`Updated Student: ${student.fullName || id}`, 'Students', currentUserName, role === 'admin' ? 'admin' : 'teacher', 'Student profile updated');
    try {
      await updateDoc(doc(db, 'students', id), student);
    } catch {}
  };

  const deleteStudent = async (id: string) => {
    const target = students.find(s => s.id === id);
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    setLocal('students', updated);
    await recordAuditLog(`Archived Student: ${target?.fullName || id}`, 'Students', currentUserName, 'admin', 'Student record archived');
    try {
      await deleteDoc(doc(db, 'students', id));
    } catch {}
  };

  // Attendance
  const recordAttendance = async (records: Omit<AttendanceRecord, 'id' | 'createdAt'>[]) => {
    const newRecords: AttendanceRecord[] = records.map(r => ({
      ...r,
      id: `att-${Date.now()}-${r.studentId}`,
      createdAt: new Date().toISOString()
    }));

    // Remove existing records for same date + students
    const keysToRemove = new Set(newRecords.map(r => `${r.date}_${r.studentId}`));
    const filtered = attendance.filter(a => !keysToRemove.has(`${a.date}_${a.studentId}`));
    const updated = [...newRecords, ...filtered];

    setAttendance(updated);
    setLocal('attendance', updated);
    if (records.length > 0) {
      await recordAuditLog(
        `Recorded Attendance for ${records[0].class}`,
        'Attendance',
        currentUserName,
        role === 'admin' ? 'admin' : 'teacher',
        `Date: ${records[0].date}. Total marked: ${records.length}`
      );
    }
    // Attempt firestore writes
    try {
      for (const rec of newRecords) {
        await setDoc(doc(db, 'attendance', rec.id), rec);
      }
    } catch {}
  };

  const getAttendanceForDateAndClass = (date: string, className: string) => {
    return attendance.filter(a => a.date === date && a.class === className);
  };

  // Academic Records
  const addAcademicRecord = async (record: Omit<AcademicRecord, 'id'>) => {
    const newRec: AcademicRecord = {
      ...record,
      id: `acad-${Date.now()}`
    };
    const updated = [newRec, ...academicRecords];
    setAcademicRecords(updated);
    setLocal('academic', updated);
    await recordAuditLog(
      `Logged Marks for ${record.studentName}`,
      'Academics',
      currentUserName,
      role === 'admin' ? 'admin' : 'teacher',
      `Subject: ${record.subject}, Exam: ${record.examType}, Marks: ${record.marks}/${record.maxMarks}`
    );
    try {
      await setDoc(doc(db, 'academicRecords', newRec.id), newRec);
    } catch {}
  };

  const updateAcademicRecord = async (id: string, record: Partial<AcademicRecord>) => {
    const updated = academicRecords.map(r => r.id === id ? { ...r, ...record } : r);
    setAcademicRecords(updated);
    setLocal('academic', updated);
    try {
      await updateDoc(doc(db, 'academicRecords', id), record);
    } catch {}
  };

  const deleteAcademicRecord = async (id: string) => {
    const updated = academicRecords.filter(r => r.id !== id);
    setAcademicRecords(updated);
    setLocal('academic', updated);
    try {
      await deleteDoc(doc(db, 'academicRecords', id));
    } catch {}
  };

  // Books
  const addBook = async (book: Omit<Book, 'id' | 'addedDate'>) => {
    const newBook: Book = {
      ...book,
      id: `bk-${Date.now()}`,
      addedDate: new Date().toISOString().split('T')[0]
    };
    const updated = [newBook, ...books];
    setBooks(updated);
    setLocal('books', updated);
    await recordAuditLog(`Added Book: ${book.name}`, 'Books', currentUserName, role === 'admin' ? 'admin' : 'teacher', `Author: ${book.author}, Qty: ${book.quantity}`);
    try {
      await setDoc(doc(db, 'books', newBook.id), newBook);
    } catch {}
  };

  const updateBook = async (id: string, book: Partial<Book>) => {
    const updated = books.map(b => b.id === id ? { ...b, ...book } : b);
    setBooks(updated);
    setLocal('books', updated);
    try {
      await updateDoc(doc(db, 'books', id), book);
    } catch {}
  };

  const deleteBook = async (id: string) => {
    const updated = books.filter(b => b.id !== id);
    setBooks(updated);
    setLocal('books', updated);
    try {
      await deleteDoc(doc(db, 'books', id));
    } catch {}
  };

  // Materials
  const addMaterial = async (material: Omit<StudyMaterial, 'id' | 'uploadDate'>) => {
    const newMat: StudyMaterial = {
      ...material,
      id: `mat-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    const updated = [newMat, ...materials];
    setMaterials(updated);
    setLocal('materials', updated);
    await recordAuditLog(`Uploaded Material: ${material.title}`, 'Academics', currentUserName, role === 'admin' ? 'admin' : 'teacher', `Class: ${material.class}, Subject: ${material.subject}`);
    try {
      await setDoc(doc(db, 'materials', newMat.id), newMat);
    } catch {}
  };

  const deleteMaterial = async (id: string) => {
    const updated = materials.filter(m => m.id !== id);
    setMaterials(updated);
    setLocal('materials', updated);
    try {
      await deleteDoc(doc(db, 'materials', id));
    } catch {}
  };

  // Announcements
  const addAnnouncement = async (announcement: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = { ...announcement, id: `ann-${Date.now()}` };
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    setLocal('announcements', updated);
    try {
      await setDoc(doc(db, 'announcements', newAnn.id), newAnn);
    } catch {}
  };

  const deleteAnnouncement = async (id: string) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    setLocal('announcements', updated);
    try {
      await deleteDoc(doc(db, 'announcements', id));
    } catch {}
  };

  // Events
  const addEvent = async (event: Omit<SchoolEvent, 'id'>) => {
    const newEvt: SchoolEvent = { ...event, id: `evt-${Date.now()}` };
    const updated = [newEvt, ...events];
    setEvents(updated);
    setLocal('events', updated);
    try {
      await setDoc(doc(db, 'events', newEvt.id), newEvt);
    } catch {}
  };

  const updateEvent = async (id: string, event: Partial<SchoolEvent>) => {
    const updated = events.map(e => e.id === id ? { ...e, ...event } : e);
    setEvents(updated);
    setLocal('events', updated);
    try {
      await updateDoc(doc(db, 'events', id), event);
    } catch {}
  };

  const deleteEvent = async (id: string) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    setLocal('events', updated);
    try {
      await deleteDoc(doc(db, 'events', id));
    } catch {}
  };

  // News
  const addNews = async (item: Omit<NewsArticle, 'id'>) => {
    const newArticle: NewsArticle = { ...item, id: `news-${Date.now()}` };
    const updated = [newArticle, ...news];
    setNews(updated);
    setLocal('news', updated);
    try {
      await setDoc(doc(db, 'news', newArticle.id), newArticle);
    } catch {}
  };

  const updateNews = async (id: string, item: Partial<NewsArticle>) => {
    const updated = news.map(n => n.id === id ? { ...n, ...item } : n);
    setNews(updated);
    setLocal('news', updated);
    try {
      await updateDoc(doc(db, 'news', id), item);
    } catch {}
  };

  const deleteNews = async (id: string) => {
    const updated = news.filter(n => n.id !== id);
    setNews(updated);
    setLocal('news', updated);
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch {}
  };

  // Gallery
  const addGalleryItem = async (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...item, id: `gal-${Date.now()}` };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    setLocal('gallery', updated);
    try {
      await setDoc(doc(db, 'gallery', newItem.id), newItem);
    } catch {}
  };

  const deleteGalleryItem = async (id: string) => {
    const updated = gallery.filter(g => g.id !== id);
    setGallery(updated);
    setLocal('gallery', updated);
    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch {}
  };

  // Public Contact Message
  const submitContactMessage = async (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      status: 'Unread',
      createdAt: new Date().toISOString()
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    setLocal('messages', updated);
    try {
      await setDoc(doc(db, 'contactMessages', newMsg.id), newMsg);
    } catch {}
  };

  const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    if (!canAccessFinancials) return;
    const updated = messages.map(m => m.id === id ? { ...m, status } : m);
    setMessages(updated);
    setLocal('messages', updated);
    try {
      await updateDoc(doc(db, 'contactMessages', id), { status });
    } catch {}
  };

  const deleteContactMessage = async (id: string) => {
    if (!canAccessFinancials) return;
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    setLocal('messages', updated);
    try {
      await deleteDoc(doc(db, 'contactMessages', id));
    } catch {}
  };

  // STRICTLY ADMIN: Donations
  const submitDonation = async (donation: Omit<Donation, 'id' | 'createdAt'>): Promise<Donation> => {
    const newDonation: Donation = {
      ...donation,
      id: `don-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    // Public donor can create donation, stored in local cache & firestore
    const updatedDonations = [newDonation, ...donations];
    setDonations(updatedDonations);
    setLocal('donations', updatedDonations);

    // Also auto-record a financial income entry for verified donations
    if (newDonation.status === 'Verified') {
      const newTx: FinancialTransaction = {
        id: `txn-${Date.now()}`,
        type: 'income',
        category: 'Online Donation',
        description: `Donation from ${newDonation.isAnonymous ? 'Anonymous Donor' : newDonation.donorName}`,
        amount: newDonation.amount,
        paymentMethod: newDonation.paymentMethod,
        reference: newDonation.transactionId,
        date: newDonation.date,
        recordedBy: 'Online System'
      };
      const updatedTx = [newTx, ...transactions];
      setTransactions(updatedTx);
      setLocal('transactions', updatedTx);
    }

    try {
      await setDoc(doc(db, 'donations', newDonation.id), newDonation);
    } catch {}

    return newDonation;
  };

  const updateDonationStatus = async (id: string, status: Donation['status']) => {
    if (!canAccessFinancials) return;
    const target = donations.find(d => d.id === id);
    const updated = donations.map(d => d.id === id ? { ...d, status } : d);
    setDonations(updated);
    setLocal('donations', updated);

    // If marked verified, ensure ledger has it
    if (status === 'Verified' && target && target.status !== 'Verified') {
      const newTx: FinancialTransaction = {
        id: `txn-don-${target.id}`,
        type: 'income',
        category: 'Online Donation',
        description: `Verified donation from ${target.isAnonymous ? 'Anonymous Donor' : target.donorName}`,
        amount: target.amount,
        paymentMethod: target.paymentMethod,
        reference: target.transactionId,
        date: target.date,
        recordedBy: currentUserName
      };
      setTransactions(prev => [newTx, ...prev]);
      setLocal('transactions', [newTx, ...transactions]);
    }

    await recordAuditLog(`Updated Donation Status`, 'Finance', currentUserName, 'admin', `Donation ${id} set to ${status}`);
    try {
      await updateDoc(doc(db, 'donations', id), { status });
    } catch {}
  };

  // STRICTLY ADMIN: Financial transactions
  const addTransaction = async (tx: Omit<FinancialTransaction, 'id'>) => {
    if (!canAccessFinancials) {
      throw new Error('Unauthorized: Only Main Admin can record financial transactions.');
    }
    const newTx: FinancialTransaction = {
      ...tx,
      id: `txn-${Date.now()}`
    };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    setLocal('transactions', updated);
    await recordAuditLog(
      `Recorded ${tx.type.toUpperCase()}: ${tx.category}`,
      'Finance',
      currentUserName,
      'admin',
      `Amount: BDT ${tx.amount}. Ref: ${tx.reference}. Desc: ${tx.description}`
    );
    try {
      await setDoc(doc(db, 'financial', newTx.id), newTx);
    } catch {}
  };

  const deleteTransaction = async (id: string) => {
    if (!canAccessFinancials) return;
    const target = transactions.find(t => t.id === id);
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    setLocal('transactions', updated);
    await recordAuditLog(
      `Removed Transaction`,
      'Finance',
      currentUserName,
      'admin',
      `Deleted entry: ${target?.description || id}`
    );
    try {
      await deleteDoc(doc(db, 'financial', id));
    } catch {}
  };

  // Stats calculation
  const totalStudents = students.filter(s => s.status === 'Active').length || settings.statsOverride?.studentsCount || 145;
  const activeTeachers = teachers.filter(t => t.status === 'Active').length || settings.statsOverride?.teachersCount || 12;
  const totalClasses = classes.length || 5;
  const totalBooks = books.reduce((acc, b) => acc + (b.quantity || 0), 0) || 68;

  // Today attendance
  const todayStr = new Date().toISOString().split('T')[0];
  const todayRecords = attendance.filter(a => a.date === todayStr);
  const presentCount = todayRecords.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const todayAttendanceRate = todayRecords.length > 0 ? Math.round((presentCount / todayRecords.length) * 100) : 94;

  // STRICT ADMIN Financials: If Teacher or Guest, values evaluate to 0 to prevent data leakage
  const safeTransactions = canAccessFinancials ? transactions : [];
  const safeDonations = canAccessFinancials ? donations : [];

  const totalIncome = safeTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = safeTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const currentBalance = totalIncome - totalExpense;
  const totalDonations = safeDonations.filter(d => d.status === 'Verified').reduce((sum, d) => sum + d.amount, 0);

  return (
    <SchoolContext.Provider
      value={{
        settings,
        updateSettings,
        classes,
        addClass,
        updateClass,
        teachers,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        attendance,
        recordAttendance,
        getAttendanceForDateAndClass,
        academicRecords,
        addAcademicRecord,
        updateAcademicRecord,
        deleteAcademicRecord,
        books,
        addBook,
        updateBook,
        deleteBook,
        materials,
        addMaterial,
        deleteMaterial,
        announcements,
        addAnnouncement,
        deleteAnnouncement,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        news,
        addNews,
        updateNews,
        deleteNews,
        gallery,
        addGalleryItem,
        deleteGalleryItem,
        messages,
        submitContactMessage,
        updateMessageStatus,
        deleteContactMessage,
        // STRICTLY ADMIN:
        donations: safeDonations,
        submitDonation,
        updateDonationStatus,
        transactions: safeTransactions,
        addTransaction,
        deleteTransaction,
        auditLogs: canAccessFinancials ? auditLogs : [],
        stats: {
          totalStudents,
          activeTeachers,
          totalClasses,
          totalBooks,
          todayAttendanceRate,
          totalIncome: canAccessFinancials ? totalIncome : 0,
          totalExpense: canAccessFinancials ? totalExpense : 0,
          currentBalance: canAccessFinancials ? currentBalance : 0,
          totalDonations: canAccessFinancials ? totalDonations : 0,
        },
        isReady,
        activeTab,
        setActiveTab,
        selectedClassForDetail,
        setSelectedClassForDetail,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
