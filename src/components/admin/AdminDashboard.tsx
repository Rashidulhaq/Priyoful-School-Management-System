import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  GraduationCap,
  Layers,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Heart,
  PlusCircle,
  ArrowUpRight,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Calendar,
  Clock
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (section: string) => void;
  onOpenQuickAction: (action: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onOpenQuickAction }) => {
  const { stats, students, teachers, auditLogs, transactions, donations } = useSchool();

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Top Welcome & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-linear-to-r from-slate-800 to-slate-900 border border-slate-700/80 p-6 rounded-3xl shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <span>🌻 Priyoful Management Console</span>
            <span className="text-slate-500">•</span>
            <span>Mirpur Community School</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-outfit">
            School Administrative Overview
          </h2>
          <p className="text-xs text-slate-400">
            Real-time enrollment, teacher assignments, daily attendance, and transparent financial records.
          </p>
        </div>

        {/* Quick Add Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpenQuickAction('add-student')}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Add Student
          </button>
          <button
            onClick={() => onOpenQuickAction('add-expense')}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Add Expense
          </button>
          <button
            onClick={() => onOpenQuickAction('add-donation')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <PlusCircle className="w-4 h-4" />
            Record Donation
          </button>
        </div>
      </div>

      {/* 8 Primary Cards: Academic & Financial (Admin Only) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1: Students */}
        <div
          onClick={() => onNavigate('students')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-4.5 cursor-pointer transition-all hover:border-amber-400/50 group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Students</span>
            <Users className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-outfit">
            {stats.totalStudents}
          </div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-semibold">
            Active in Class 1 to 5
          </span>
        </div>

        {/* Card 2: Active Teachers */}
        <div
          onClick={() => onNavigate('teachers')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-4.5 cursor-pointer transition-all hover:border-emerald-400/50 group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Teachers</span>
            <GraduationCap className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-outfit">
            {stats.activeTeachers}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Dedicated volunteers
          </span>
        </div>

        {/* Card 3: Classes */}
        <div
          onClick={() => onNavigate('classes')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-4.5 cursor-pointer transition-all hover:border-sky-400/50 group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Classes (1-5)</span>
            <Layers className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-outfit">
            5 Classes
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            {stats.totalBooks} Library Books
          </span>
        </div>

        {/* Card 4: Attendance Rate */}
        <div
          onClick={() => onNavigate('attendance')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl p-4.5 cursor-pointer transition-all hover:border-teal-400/50 group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Today's Attendance</span>
            <CalendarCheck className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-teal-300 font-outfit">
            {stats.todayAttendanceRate}%
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Across active sections
          </span>
        </div>

        {/* Card 5: Total Income (Strictly Admin) */}
        <div
          onClick={() => onNavigate('finances')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-emerald-500/30 rounded-2xl p-4.5 cursor-pointer transition-all hover:border-emerald-400 group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Income</span>
            <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-outfit">
            ৳{stats.totalIncome.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Donations + Self-fund
          </span>
        </div>

        {/* Card 6: Total Expenses (Strictly Admin) */}
        <div
          onClick={() => onNavigate('finances')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-rose-500/30 rounded-2xl p-4.5 cursor-pointer transition-all hover:border-rose-400 group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Total Expenses</span>
            <TrendingDown className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-rose-400 font-outfit">
            ৳{stats.totalExpense.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Rent, Books, Nutrition
          </span>
        </div>

        {/* Card 7: Current Balance (Strictly Admin) */}
        <div
          onClick={() => onNavigate('finances')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 rounded-2xl p-4.5 cursor-pointer transition-all hover:border-amber-400 group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Current Balance</span>
            <DollarSign className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className={`text-xl sm:text-2xl font-black font-outfit ${stats.currentBalance >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
            ৳{stats.currentBalance.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            Operating reserve
          </span>
        </div>

        {/* Card 8: Total Donations (Strictly Admin) */}
        <div
          onClick={() => onNavigate('donations')}
          className="bg-slate-800/80 hover:bg-slate-800 border border-indigo-500/30 rounded-2xl p-4.5 cursor-pointer transition-all hover:border-indigo-400 group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Verified Donations</span>
            <Heart className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-indigo-300 font-outfit">
            ৳{stats.totalDonations.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 block mt-1">
            From community & well-wishers
          </span>
        </div>

      </div>

      {/* Two Column Section: Financial Breakdown & Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Financial Transparency & Health (Admin Only) */}
        <div className="lg:col-span-7 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-lg font-black text-white font-outfit flex items-center gap-2">
                <span>Operating Budget Distribution</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                  Class 1-5 Operation
                </span>
              </h3>
              <p className="text-xs text-slate-400">Monthly breakdown of income vs expenses</p>
            </div>
            <button
              onClick={() => onNavigate('finances')}
              className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              Ledger →
            </button>
          </div>

          {/* Visual Budget Progress Bars */}
          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>School Facility Rent & Utilities</span>
                <span className="font-bold text-white">৳19,200 (45%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Child Mid-Day Nutrition & Milk</span>
                <span className="font-bold text-white">৳8,200 (24%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Textbooks, Notebooks & Art Colors</span>
                <span className="font-bold text-white">৳6,500 (19%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '19%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 font-medium mb-1">
                <span>Emergency Child Medical & Soap Kits</span>
                <span className="font-bold text-white">৳2,500 (12%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>

          {/* Recent Financial Transactions Table */}
          <div className="pt-2 border-t border-slate-700/60">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400 mb-3">
              Latest Ledger Entries
            </h4>
            <div className="space-y-2">
              {transactions.slice(0, 4).map((tx) => (
                <div
                  key={tx.id}
                  className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/40 flex items-center justify-between text-xs"
                >
                  <div className="grow min-w-0 pr-2">
                    <span className="text-[10px] text-slate-400 block">{tx.date} • {tx.category}</span>
                    <strong className="text-slate-200 block truncate">{tx.description}</strong>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`font-black font-mono text-sm block ${
                      tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}৳{tx.amount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400">{tx.paymentMethod}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: System Audit Log & Quick Links */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Roster Links */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-4">
            <h3 className="text-lg font-black text-white font-outfit">Quick Management Actions</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('students')}
                className="p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-700/60 rounded-xl text-left font-bold text-slate-200 transition-colors"
              >
                👥 Manage Students
              </button>
              <button
                onClick={() => onNavigate('teachers')}
                className="p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-700/60 rounded-xl text-left font-bold text-slate-200 transition-colors"
              >
                🎓 Volunteer Teachers
              </button>
              <button
                onClick={() => onNavigate('attendance')}
                className="p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-700/60 rounded-xl text-left font-bold text-slate-200 transition-colors"
              >
                📅 Mark Attendance
              </button>
              <button
                onClick={() => onNavigate('academics')}
                className="p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-700/60 rounded-xl text-left font-bold text-slate-200 transition-colors"
              >
                📝 Academic Records
              </button>
              <button
                onClick={() => onNavigate('books')}
                className="p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-700/60 rounded-xl text-left font-bold text-slate-200 transition-colors"
              >
                📚 Library Catalog
              </button>
              <button
                onClick={() => onNavigate('settings')}
                className="p-3 bg-slate-900/80 hover:bg-slate-900 border border-slate-700/60 rounded-xl text-left font-bold text-slate-200 transition-colors"
              >
                ⚙️ School Settings
              </button>
            </div>
          </div>

          {/* Audit Activity Feed */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-black text-white font-outfit">Audit Activity Trail</h3>
              </div>
              <button
                onClick={() => onNavigate('audit-logs')}
                className="text-xs text-amber-400 hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 text-xs">
              {auditLogs.slice(0, 6).map((log) => (
                <div key={log.id} className="border-l-2 border-amber-500 pl-3 py-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-200 font-bold">{log.action}</strong>
                    <span className="text-[10px] text-slate-400">
                      {log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{log.details}</p>
                  <span className="text-[10px] text-amber-300/80 font-medium">By {log.performedBy} ({log.role})</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
