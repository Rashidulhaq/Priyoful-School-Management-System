import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { ShieldAlert, Search, Filter, Clock, UserCheck } from 'lucide-react';

export const AdminAuditLogs: React.FC = () => {
  const { auditLogs } = useSchool();
  const [filterCat, setFilterCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    if (filterCat !== 'All' && log.category !== filterCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        log.action.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.performedBy.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h2 className="text-2xl font-black text-white font-outfit">System Audit Trail & History</h2>
        <p className="text-xs text-slate-400">
          Immutable log of administrative and teacher actions, record additions, financial changes, and enrollment updates.
        </p>
      </div>

      {/* Filter and search */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative grow sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search action, user, or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold">Category:</span>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-1.5 focus:ring-amber-500"
          >
            <option value="All">All Categories</option>
            <option value="Students">Students</option>
            <option value="Teachers">Teachers</option>
            <option value="Classes">Classes</option>
            <option value="Attendance">Attendance</option>
            <option value="Academics">Academics</option>
            <option value="Books">Books</option>
            <option value="Finance">Finance</option>
            <option value="Settings">Settings</option>
          </select>
        </div>
      </div>

      {/* Log list */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-900/90 border-b border-slate-700 text-xs font-bold text-slate-300 flex justify-between">
          <span>Action Log Record</span>
          <span>{filteredLogs.length} Events</span>
        </div>

        <div className="divide-y divide-slate-700/60">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No audit logs found matching criteria.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-700/30 transition-colors text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm font-outfit">{log.action}</span>
                    <span className="bg-slate-900 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-700">
                      {log.category}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{log.details}</p>
                  <span className="text-[11px] text-slate-500 block">
                    Triggered by: <strong className="text-slate-300">{log.performedBy}</strong> ({log.role})
                  </span>
                </div>

                <div className="text-right shrink-0 font-mono text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
