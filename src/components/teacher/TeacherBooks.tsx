import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import { BookOpen, Plus, Search, Tag, X } from 'lucide-react';
import { Book } from '../../types';

export const TeacherBooks: React.FC = () => {
  const { books, addBook } = useSchool();
  const { teacherProfile } = useAuth();
  const assignedClass = teacherProfile?.assignedClass || 'Class 1';

  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<Book['category']>('Story');
  const [quantity, setQuantity] = useState(10);
  const [description, setDescription] = useState('');

  const filtered = books.filter(b => {
    if (searchQuery.trim()) {
      return b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.author.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !author) return;

    await addBook({
      bookId: `BK-${Math.floor(100 + Math.random() * 900)}`,
      name,
      author,
      category,
      class: assignedClass,
      quantity,
      availableQuantity: quantity,
      description,
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80'
    });

    setModalOpen(false);
    setName('');
    setAuthor('');
    setDescription('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 font-outfit">Library & Recommended Books</h2>
          <p className="text-xs text-slate-500">View school library catalog, check book availability, and recommend stories to children.</p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Recommend / Add Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="flex gap-4">
              <img
                src={b.coverUrl}
                alt={b.name}
                className="w-16 h-24 rounded-xl object-cover border border-slate-200 shrink-0 shadow-xs"
              />
              <div className="grow min-w-0 space-y-1 text-xs">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full inline-block">
                  {b.category}
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 truncate font-outfit">{b.name}</h3>
                <span className="text-slate-500 block">By {b.author}</span>
                <span className="text-[11px] text-slate-400 block">Target: {b.class}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-700">
                {b.availableQuantity} of {b.quantity} Available
              </span>
              <span className="text-slate-400 text-[11px] font-mono">{b.bookId}</span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 font-outfit">Add Classroom Book</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Book Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chhotoder Kishor Boi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Author *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Story">Story / Fables</option>
                    <option value="Bangla Rhymes">Bangla Rhymes</option>
                    <option value="Science & Nature">Science & Nature</option>
                    <option value="Moral & Values">Moral & Values</option>
                    <option value="English Reader">English Reader</option>
                    <option value="Textbook">Textbook</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Number of Copies</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Summary / Moral</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl"
                >
                  Save Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
