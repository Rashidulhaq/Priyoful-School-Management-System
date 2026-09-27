import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import {
  Heart,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Search,
  Filter,
  Lock,
  MessageCircle,
  Check,
  UserCheck
} from 'lucide-react';

export const AdminDonations: React.FC = () => {
  const { donations, updateDonationStatus, stats } = useSchool();
  const { canAccessFinancials } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Verified' | 'Pending' | 'Cancelled'>('All');

  // STRICT GUARANTEE: If teacher or guest, completely block view
  if (!canAccessFinancials) {
    return (
      <div className="p-12 text-center bg-slate-900 border border-rose-900/60 rounded-3xl space-y-4">
        <Lock className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-xl font-black text-rose-400 font-outfit">Access Restricted</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Donation records and donor financial details are restricted exclusively to Main Administrators.
        </p>
      </div>
    );
  }

  const filteredDonations = donations.filter(d => {
    if (statusFilter !== 'All' && d.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        d.donorName.toLowerCase().includes(q) ||
        d.transactionId.toLowerCase().includes(q) ||
        d.donorEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportCSV = () => {
    const headers = ['Donation ID,Date,Donor Name,Amount (BDT),Payment Method,Transaction ID,Status,Anonymous,Message'];
    const rows = filteredDonations.map(d =>
      `"${d.id}","${d.date}","${d.isAnonymous ? 'Anonymous' : d.donorName}","${d.amount}","${d.paymentMethod}","${d.transactionId}","${d.status}","${d.isAnonymous}","${(d.message || '').replace(/"/g, '""')}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `priyoful_donations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-white font-outfit">Donations Management</h2>
            <span className="bg-rose-500/20 text-rose-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-rose-500/30 uppercase tracking-wider">
              Admin Confidential
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Verify transactions submitted by donors via bKash, Nagad, and Bank Transfers.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors border border-slate-700 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Export Donations CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5">
          <span className="text-xs uppercase font-bold text-slate-400">Total Verified Donations</span>
          <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-outfit mt-1">
            ৳{stats.totalDonations.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Deposited into school fund</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5">
          <span className="text-xs uppercase font-bold text-slate-400">Total Donors</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-outfit mt-1">
            {donations.length} Contributions
          </div>
          <span className="text-[11px] text-slate-400">Across all channels</span>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5">
          <span className="text-xs uppercase font-bold text-slate-400">Pending Verification</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-outfit mt-1">
            {donations.filter(d => d.status === 'Pending').length} Pending
          </div>
          <span className="text-[11px] text-slate-400">Awaiting Trx verification</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative grow sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search donor name, email or TrxID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {(['All', 'Verified', 'Pending', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                statusFilter === st ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 uppercase font-mono text-[11px] text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Donor Details</th>
                <th className="py-3 px-3">Method & TrxID</th>
                <th className="py-3 px-3 text-right">Amount (BDT)</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filteredDonations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No donation records found.
                  </td>
                </tr>
              ) : (
                filteredDonations.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-700/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">{d.date}</td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <strong className="text-white font-bold block">
                          {d.isAnonymous ? 'Anonymous Donor' : d.donorName}
                        </strong>
                        {d.isAnonymous && (
                          <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 rounded-sm">Anon</span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block">{d.donorEmail} • {d.donorPhone}</span>
                      {d.message && (
                        <p className="text-[11px] text-amber-300/80 italic mt-0.5 line-clamp-1">
                          "{d.message}"
                        </p>
                      )}
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-slate-200 font-bold block">{d.paymentMethod}</span>
                      <span className="font-mono text-amber-400 text-[11px] block">{d.transactionId}</span>
                    </td>

                    <td className="py-3 px-3 text-right font-black font-mono text-emerald-400 text-sm whitespace-nowrap">
                      ৳{d.amount.toLocaleString()}
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        d.status === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : d.status === 'Pending'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {d.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      {d.status === 'Pending' ? (
                        <button
                          onClick={() => updateDonationStatus(d.id, 'Verified')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 shadow-xs"
                        >
                          <Check className="w-3 h-3" />
                          Mark Verified
                        </button>
                      ) : (
                        <span className="text-slate-500 text-[11px] flex items-center justify-end gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          Ledger Linked
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
