import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Calendar, BookOpen, Plus, Trash2, Edit, X, Bell, MapPin, Clock } from 'lucide-react';
import { SchoolEvent, NewsArticle } from '../../types';

export const AdminNewsEvents: React.FC = () => {
  const { events, addEvent, deleteEvent, news, addNews, deleteNews } = useSchool();
  const [activeTab, setActiveTab] = useState<'events' | 'news'>('events');

  // Event modal
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('2026-04-14');
  const [eventTime, setEventTime] = useState('10:00 AM - 2:00 PM');
  const [eventLocation, setEventLocation] = useState('Priyoful Courtyard, Mirpur');
  const [eventCover, setEventCover] = useState('https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&auto=format&fit=crop&q=80');

  // News modal
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsAuthor, setNewsAuthor] = useState('Priyoful Volunteer Team');
  const [newsDate, setNewsDate] = useState(new Date().toISOString().split('T')[0]);
  const [newsCover, setNewsCover] = useState('https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80');

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle) return;
    await addEvent({
      title: eventTitle,
      description: eventDesc,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      coverUrl: eventCover,
      published: true
    });
    setEventModalOpen(false);
    setEventTitle('');
    setEventDesc('');
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle) return;
    await addNews({
      title: newsTitle,
      summary: newsSummary,
      content: newsContent,
      date: newsDate,
      coverUrl: newsCover,
      published: true,
      author: newsAuthor
    });
    setNewsModalOpen(false);
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-outfit">News & Events Manager</h2>
          <p className="text-xs text-slate-400">Publish community news stories, book distribution dates, and school health camps.</p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab === 'events' ? (
            <button
              onClick={() => setEventModalOpen(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Create School Event
            </button>
          ) : (
            <button
              onClick={() => setNewsModalOpen(true)}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-xl text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Publish News Article
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'events' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Calendar Events ({events.length})
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'news' ? 'bg-rose-500 text-white font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
        >
          Published News ({news.length})
        </button>
      </div>

      {/* Events List */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden hover:border-amber-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img src={evt.coverUrl} alt={evt.title} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                    {evt.date}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-base text-white font-outfit">{evt.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{evt.description}</p>
                  <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{evt.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex justify-end">
                <button
                  onClick={() => deleteEvent(evt.id)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-rose-400"
                  title="Delete Event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News List */}
      {activeTab === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((n) => (
            <div
              key={n.id}
              className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 hover:border-rose-400/50 transition-all flex gap-4"
            >
              <img src={n.coverUrl} alt={n.title} className="w-24 h-24 rounded-2xl object-cover shrink-0" />
              <div className="grow min-w-0 space-y-1">
                <span className="text-[10px] text-rose-400 font-bold">{n.date} • By {n.author}</span>
                <h3 className="font-bold text-sm text-white font-outfit truncate">{n.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{n.summary}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => deleteNews(n.id)}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-rose-400"
                    title="Delete News"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Modal */}
      {eventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white font-outfit">Create School Event</h3>
              <button onClick={() => setEventModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Eye Screening Camp"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Time</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Location</label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={eventCover}
                  onChange={(e) => setEventCover(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEventModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* News Modal */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white font-outfit">Publish News Story</h3>
              <button onClick={() => setNewsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveNews} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 100% Literacy Milestone Reached"
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Summary / Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Author</label>
                <input
                  type="text"
                  value={newsAuthor}
                  onChange={(e) => setNewsAuthor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={newsCover}
                  onChange={(e) => setNewsCover(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-xl"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
