import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { useAuth } from '../../context/AuthContext';
import {
  DollarSign,
  Plus,
  Download,
  Search,
  Filter,
  Trash2,
  TrendingUp,
  TrendingDown,
  Lock,
  Calendar,
  CreditCard,
  Tag,
  ShieldCheck,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { FinancialTransaction } from '../../types';

export const AdminFinances: React.FC = () => {
  const { transactions, addTransaction, deleteTransaction, stats } = useSchool();
  const { canAccessFinancials, adminProfile } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Form
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('Educational Materials & Books');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number | ''>('');
  const [paymentMethod, setPaymentMethod] = useState('bKash');
  const [reference, setReference] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  // STRICT SECURITY CHECK
  if (!canAccessFinancials) {
    return (
      <div className="p-12 text-center bg-slate-900 border border-rose-900/60 rounded-3xl space-y-4">
        <Lock className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-xl font-black text-rose-400 font-outfit">Access Restricted</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Financial data, school income, expenses, and donation amounts are strictly restricted to Main Administrators. Teacher accounts do not have permission to view or query financial records.
        </p>
      </div>
    );
  }

  const filteredTransactions = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.reference.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenAdd = () => {
    setType('expense');
    setCategory('Educational Materials & Books');
    setDescription('');
    setAmount('');
    setPaymentMethod('bKash');
    setReference(`VOUCH-${Math.floor(1000 + Math.random() * 9000)}`);
    setDate(new Date().toISOString().split('T')[0]);
    setNotes('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0 || !description) return;

    await addTransaction({
      type,
      category,
      description,
      amount: Number(amount),
      paymentMethod,
      reference,
      date,
      recordedBy: adminProfile?.name || 'Administrator',
      notes
    });

    setModalOpen(false);
  };

  const exportToCSV = () => {
    const headers = ['Date,Type,Category,Description,Amount (BDT),Payment Method,Reference,Recorded By'];
    const rows = filteredTransactions.map(t =>
      `"${t.date}","${t.type.toUpperCase()}","${t.category}","${t.description.replace(/"/g, '""')}","${t.amount}","${t.paymentMethod}","${t.reference}","${t.recordedBy}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `priyoful_financial_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-white font-outfit">Financial Management & Ledger</h2>
            <span className="bg-rose-500/20 text-rose-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-rose-500/30 uppercase tracking-wider">
              Main Admin Only
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Track volunteer contributions, community donations, classroom rent, supplies, and child meals.
          </p>
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
            Record Transaction
          </button>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-800/80 border border-emerald-500/30 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span>Total Inflow (Income)</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-outfit">
            ৳{stats.totalIncome.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">Donations + Volunteer Contributions</p>
        </div>

        <div className="bg-slate-800/80 border border-rose-500/30 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-rose-400 text-xs font-bold uppercase tracking-wider">
            <span>Total Outflow (Expenses)</span>
            <TrendingDown className="w-4 h-4" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400 font-outfit">
            ৳{stats.totalExpense.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">Rent, Books, Nutrition, Utilities</p>
        </div>

        <div className="bg-slate-800/80 border border-amber-500/30 rounded-2xl p-5 space-y-1">
          <div className="flex items-center justify-between text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span>Current Net Reserve</span>
            <DollarSign className="w-4 h-4" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-outfit ${stats.currentBalance >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
            ৳{stats.currentBalance.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">Available bank & cash balance</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative grow sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search description, reference, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-xs focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              filterType === 'all' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Ledger
          </button>
          <button
            onClick={() => setFilterType('income')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              filterType === 'income' ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Income Only
          </button>
          <button
            onClick={() => setFilterType('expense')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
              filterType === 'expense' ? 'bg-rose-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Expenses Only
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 uppercase font-mono text-[11px] text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-3">Method & Ref</th>
                <th className="py-3 px-4 text-right">Amount (BDT)</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No transactions found for the selected filter.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-700/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">{tx.date}</td>
                    
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                        tx.type === 'income'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {tx.type}
                      </span>
                    </td>

                    <td className="py-3 px-3 font-semibold text-slate-200 whitespace-nowrap">{tx.category}</td>
                    
                    <td className="py-3 px-4 text-slate-300 max-w-xs truncate">{tx.description}</td>
                    
                    <td className="py-3 px-3 text-slate-400 whitespace-nowrap">
                      <span className="block text-slate-200">{tx.paymentMethod}</span>
                      <span className="text-[10px] font-mono text-slate-400">{tx.reference}</span>
                    </td>

                    <td className="py-3 px-4 text-right font-black font-mono text-sm whitespace-nowrap">
                      <span className={tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}>
                        {tx.type === 'income' ? '+' : '-'}৳{tx.amount.toLocaleString()}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                        title="Delete Entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Transaction Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 text-slate-200">
            <h3 className="text-xl font-black text-white font-outfit">Record Financial Transaction</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Transaction Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                  >
                    <option value="expense">Expense (Outflow)</option>
                    <option value="income">Income (Inflow)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Amount (BDT ৳) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 5000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : '')}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                >
                  {type === 'expense' ? (
                    <>
                      <option value="School Room Rent">School Room Rent</option>
                      <option value="Educational Materials & Books">Educational Materials & Books</option>
                      <option value="Food & Nutrition Snacks">Food & Nutrition Snacks</option>
                      <option value="Electricity & Drinking Water">Electricity & Drinking Water</option>
                      <option value="Transportation / Logistics">Transportation / Logistics</option>
                      <option value="Medical & Hygiene Kits">Medical & Hygiene Kits</option>
                      <option value="Maintenance & Furniture">Maintenance & Furniture</option>
                      <option value="Other Expense">Other Expense</option>
                    </>
                  ) : (
                    <>
                      <option value="Online Donation">Online Donation</option>
                      <option value="Volunteer Contribution">Volunteer Pooled Contribution</option>
                      <option value="Bank Donation">Bank Transfer Donation</option>
                      <option value="Cash Donation">Cash Donation</option>
                      <option value="Other Income">Other Income</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Description *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Purchased 40 exercise notebooks for Class 2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Cash">Cash Handover</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Reference / Voucher No.</label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
                  Record Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
