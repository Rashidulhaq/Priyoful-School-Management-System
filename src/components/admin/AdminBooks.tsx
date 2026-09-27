import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { BookOpen, Plus, Search, Edit, Trash2, X, CheckCircle, Tag } from 'lucide-react';
import { Book } from '../../types';

export const AdminBooks: React.FC = () => {
  const { books, addBook, updateBook, deleteBook } = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form State
  const [bookId, setBookId] = useState('');
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState<Book['category']>('Story');
  const [bookClass, setBookClass] = useState('All');
  const [quantity, setQuantity] = useState(10);
  const [availableQuantity, setAvailableQuantity] = useState(8);
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  const filteredBooks = books.filter(b => {
    if (selectedCategory !== 'All' && b.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return b.name.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.bookId.toLowerCase().includes(q);
    }
    return true;
  });

  const handleOpenAdd = () => {
    setEditingBook(null);
    const nextNum = books.length + 1;
    setBookId(`BK-${String(nextNum).padStart(3, '0')}`);
    setName('');
    setAuthor('');
    setCategory('Story');
    setBookClass('Class 1');
    setQuantity(12);
    setAvailableQuantity(10);
    setDescription('');
    setCoverUrl('https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80');
    setModalOpen(true);
  };

  const handleOpenEdit = (b: Book) => {
    setEditingBook(b);
    setBookId(b.bookId);
    setName(b.name);
    setAuthor(b.author);
    setCategory(b.category);
    setBookClass(b.class);
    setQuantity(b.quantity);
    setAvailableQuantity(b.availableQuantity);
    setDescription(b.description);
    setCoverUrl(b.coverUrl);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !bookId) return;

    const payload = {
      bookId,
      name,
      author,
      category,
      class: bookClass,
      quantity,
      availableQuantity,
      description,
      coverUrl: coverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80',
    };

    if (editingBook) {
      await updateBook(editingBook.id, payload);
    } else {
      await addBook(payload);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove book: ${name}?`)) {
      await deleteBook(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-outfit">Library & Book Inventory</h2>
          <p className="text-xs text-slate-400">Manage NCTB textbooks, Bengali illustrated rhymes, moral fables, and lending stock.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Book to Library
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative grow sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search book title, author, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-1.5 focus:ring-amber-500"
          >
            <option value="All">All Categories</option>
            <option value="Bangla Rhymes">Bangla Rhymes</option>
            <option value="Story">Story / Fables</option>
            <option value="Science & Nature">Science & Nature</option>
            <option value="Moral & Values">Moral & Values</option>
            <option value="English Reader">English Reader</option>
            <option value="Textbook">Textbook</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((b) => (
          <div
            key={b.id}
            className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 hover:border-amber-400/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex gap-4">
                <img
                  src={b.coverUrl}
                  alt={b.name}
                  className="w-20 h-28 rounded-xl object-cover border border-slate-600 shrink-0 shadow-md"
                />
                <div className="grow min-w-0 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 bg-slate-900 px-2 py-0.5 rounded font-bold">
                    {b.bookId}
                  </span>
                  <h3 className="font-extrabold text-sm text-white font-outfit truncate mt-1">
                    {b.name}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">By {b.author}</p>
                  <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded-full inline-block mt-1">
                    {b.category} • {b.class}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                {b.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-400 text-[11px] block">Availability:</span>
                <strong className="text-emerald-400 font-bold">
                  {b.availableQuantity} available (of {b.quantity})
                </strong>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(b)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-amber-400"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(b.id, b.name)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-rose-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white font-outfit">
                {editingBook ? 'Edit Book Details' : 'Add Book to Catalog'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Book ID *</label>
                  <input
                    type="text"
                    required
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Target Class</label>
                  <select
                    value={bookClass}
                    onChange={(e) => setBookClass(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="All">All Classes</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Book Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Author Name *</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Total Copies</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Available Copies</label>
                  <input
                    type="number"
                    min="0"
                    max={quantity}
                    value={availableQuantity}
                    onChange={(e) => setAvailableQuantity(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
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
