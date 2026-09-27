import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Settings, Save, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useSchool();

  const [bKashNumber, setBKashNumber] = useState(settings.bKashNumber || '+880 1712-345678');
  const [nagadNumber, setNagadNumber] = useState(settings.nagadNumber || '+880 1812-345678');
  const [bankDetails, setBankDetails] = useState(settings.bankDetails || '');
  const [academicYear, setAcademicYear] = useState(settings.activeAcademicYear || '2026');
  const [targetDonation, setTargetDonation] = useState(settings.totalDonationTarget || 250000);

  // Gateway abstraction fields (SSLCommerz / Payment Gateway config)
  const [gatewayStoreId, setGatewayStoreId] = useState('priyoful_live_gw');
  const [gatewayApiKey, setGatewayApiKey] = useState('••••••••••••••••••••••••');
  const [isSandbox, setIsSandbox] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      bKashNumber,
      nagadNumber,
      bankDetails,
      activeAcademicYear: academicYear,
      totalDonationTarget: targetDonation
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-outfit">System & Payment Gateway Settings</h2>
          <p className="text-xs text-slate-400">Configure Bangladesh mobile banking channels, bank transfer coordinates, and academic year settings.</p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Save System Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          Configuration saved and active across public donation gateways!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 text-xs text-slate-200 shadow-xl">
        
        {/* Bangladesh Payment Channels */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span>Bangladesh Mobile Banking & Donation Receivers</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold mb-1">bKash Merchant / Personal Number</label>
              <input
                type="text"
                value={bKashNumber}
                onChange={(e) => setBKashNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Displayed on public donation page</span>
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Nagad Number</label>
              <input
                type="text"
                value={nagadNumber}
                onChange={(e) => setNagadNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Displayed on public donation page</span>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-400 font-bold mb-1">Bank Account Instructions</label>
              <textarea
                rows={2}
                value={bankDetails}
                onChange={(e) => setBankDetails(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Future Payment Gateway Abstraction */}
        <div className="space-y-4 pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
              Payment Gateway Abstraction (SSLCommerz / Shurjopay)
            </h3>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">
              Ready for Integration
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Merchant Store ID</label>
              <input
                type="text"
                value={gatewayStoreId}
                onChange={(e) => setGatewayStoreId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Store Secret Password / API Key</label>
              <input
                type="password"
                value={gatewayApiKey}
                onChange={(e) => setGatewayApiKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-300">
            <input
              type="checkbox"
              checked={isSandbox}
              onChange={(e) => setIsSandbox(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-500"
            />
            <span>Enable Sandbox / Test Mode for Online Gateway</span>
          </label>
        </div>

        {/* Academic Settings */}
        <div className="space-y-4 pt-4 border-t border-slate-700">
          <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
            Academic Calendar & Target
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Active Academic Year</label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Annual Budget Target (BDT ৳)</label>
              <input
                type="number"
                value={targetDonation}
                onChange={(e) => setTargetDonation(parseInt(e.target.value) || 250000)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-700">
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-md transition-all active:scale-95"
          >
            Save All Configurations
          </button>
        </div>

      </form>
    </div>
  );
};
