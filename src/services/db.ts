import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
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
import {
  INITIAL_SETTINGS,
  INITIAL_CLASSES,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_BOOKS,
  INITIAL_MATERIALS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_EVENTS,
  INITIAL_NEWS,
  INITIAL_GALLERY,
  INITIAL_DONATIONS,
  INITIAL_TRANSACTIONS,
  INITIAL_ACADEMIC_RECORDS
} from '../data/seedData';

// Helper for local caching to guarantee instant load & offline resilience
function getLocal<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(`priyoful_${key}`);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`priyoful_${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn('LocalStorage save error', e);
  }
}

// Log audit trail
export async function recordAuditLog(
  action: string,
  category: AuditLog['category'],
  performedBy: string,
  role: 'admin' | 'teacher',
  details: string
): Promise<void> {
  const log: AuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    action,
    category,
    performedBy,
    role,
    details,
    timestamp: new Date().toISOString()
  };

  const logs = getLocal<AuditLog[]>('audit_logs', []);
  setLocal('audit_logs', [log, ...logs].slice(0, 200));

  try {
    await addDoc(collection(db, 'auditLogs'), log);
  } catch {
    // Firestore security rules might restrict non-admins, local log saved
  }
}

// Database initial seeding check
let isSeeded = false;
export async function initializeDatabase(): Promise<{
  settings: SchoolSettings;
  classes: SchoolClass[];
  teachers: Teacher[];
  students: Student[];
  books: Book[];
  materials: StudyMaterial[];
  announcements: Announcement[];
  events: SchoolEvent[];
  news: NewsArticle[];
  gallery: GalleryItem[];
  academicRecords: AcademicRecord[];
  donations: Donation[];
  transactions: FinancialTransaction[];
  messages: ContactMessage[];
  auditLogs: AuditLog[];
}> {
  // Load from local storage cache or fallback to initial seed
  const settings = getLocal<SchoolSettings>('settings', INITIAL_SETTINGS);
  const classes = getLocal<SchoolClass[]>('classes', INITIAL_CLASSES);
  const teachers = getLocal<Teacher[]>('teachers', INITIAL_TEACHERS);
  const students = getLocal<Student[]>('students', INITIAL_STUDENTS);

  // Books: merge initial books if stored count is less
  let books = getLocal<Book[]>('books', INITIAL_BOOKS);
  if (books.length < INITIAL_BOOKS.length) {
    const existingIds = new Set(books.map(b => b.id));
    const toAdd = INITIAL_BOOKS.filter(b => !existingIds.has(b.id));
    books = [...books, ...toAdd];
    setLocal('books', books);
  }

  // Materials: merge initial materials if stored count is less
  let materials = getLocal<StudyMaterial[]>('materials', INITIAL_MATERIALS);
  if (materials.length < INITIAL_MATERIALS.length) {
    const existingIds = new Set(materials.map(m => m.id));
    const toAdd = INITIAL_MATERIALS.filter(m => !existingIds.has(m.id));
    materials = [...materials, ...toAdd];
    setLocal('materials', materials);
  }

  const announcements = getLocal<Announcement[]>('announcements', INITIAL_ANNOUNCEMENTS);
  const events = getLocal<SchoolEvent[]>('events', INITIAL_EVENTS);
  const news = getLocal<NewsArticle[]>('news', INITIAL_NEWS);
  let gallery = getLocal<GalleryItem[]>('gallery', INITIAL_GALLERY);
  // Ensure the latest authentic school photos are prepended
  const priorityPhotos = ['gal-pic1', 'gal-pic2', 'gal-pic3', 'gal-prioful'];
  for (const pid of [...priorityPhotos].reverse()) {
    const item = INITIAL_GALLERY.find(g => g.id === pid);
    if (item && !gallery.some(g => g.id === pid || g.imageUrl === item.imageUrl)) {
      gallery = [item, ...gallery];
    }
  }
  setLocal('gallery', gallery);
  const academicRecords = getLocal<AcademicRecord[]>('academic', INITIAL_ACADEMIC_RECORDS);
  const donations = getLocal<Donation[]>('donations', INITIAL_DONATIONS);
  const transactions = getLocal<FinancialTransaction[]>('transactions', INITIAL_TRANSACTIONS);
  const messages = getLocal<ContactMessage[]>('messages', []);
  const auditLogs = getLocal<AuditLog[]>('audit_logs', [
    {
      id: 'log-init',
      action: 'System Initialized',
      category: 'Settings',
      performedBy: 'System / Admin',
      role: 'admin',
      details: 'Priyoful School database initialized with Class 1-5 curriculum.',
      timestamp: new Date().toISOString()
    }
  ]);

  if (!isSeeded) {
    isSeeded = true;
    // Attempt background sync to Firestore for public collections
    try {
      const snap = await getDocs(collection(db, 'classes'));
      if (snap.empty) {
        // Seed classes
        for (const cls of INITIAL_CLASSES) {
          await setDoc(doc(db, 'classes', cls.id), cls);
        }
        for (const ann of INITIAL_ANNOUNCEMENTS) {
          await setDoc(doc(db, 'announcements', ann.id), ann);
        }
        for (const evt of INITIAL_EVENTS) {
          await setDoc(doc(db, 'events', evt.id), evt);
        }
        for (const nw of INITIAL_NEWS) {
          await setDoc(doc(db, 'news', nw.id), nw);
        }
        for (const gal of INITIAL_GALLERY) {
          await setDoc(doc(db, 'gallery', gal.id), gal);
        }
      }

      // Sync existing contact messages from Firestore
      try {
        const msgSnap = await getDocs(collection(db, 'contactMessages'));
        if (!msgSnap.empty) {
          const cloudMessages: ContactMessage[] = [];
          msgSnap.forEach(d => {
            cloudMessages.push(d.data() as ContactMessage);
          });
          const cloudIds = new Set(cloudMessages.map(m => m.id));
          const merged = [...cloudMessages, ...messages.filter(m => !cloudIds.has(m.id))];
          merged.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
          messages.length = 0;
          messages.push(...merged);
          setLocal('messages', messages);
        }
      } catch {}

      // Sync gallery items from Firestore
      try {
        const galSnap = await getDocs(collection(db, 'gallery'));
        if (!galSnap.empty) {
          const cloudGallery: GalleryItem[] = [];
          galSnap.forEach(d => {
            cloudGallery.push(d.data() as GalleryItem);
          });
          const cloudIds = new Set(cloudGallery.map(g => g.id));
          const merged = [...cloudGallery, ...gallery.filter(g => !cloudIds.has(g.id))];
          gallery.length = 0;
          gallery.push(...merged);
          setLocal('gallery', gallery);
        }
      } catch {}
    } catch {
      // offline or unauthenticated fallback
    }
  }

  return {
    settings,
    classes,
    teachers,
    students,
    books,
    materials,
    announcements,
    events,
    news,
    gallery,
    academicRecords,
    donations,
    transactions,
    messages,
    auditLogs
  };
}

export { getLocal, setLocal };
