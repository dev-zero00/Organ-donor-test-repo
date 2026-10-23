import React from 'react';
import { Activity, ShieldCheck, Heart, User, LogOut, Sparkles } from 'lucide-react';

export default function Navbar({ activeRole, setActiveRole, currentView, setCurrentView }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div 
            onClick={() => setCurrentView('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-teal-800 to-slate-900 bg-clip-text text-transparent">
                OrganEase
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-teal-600">
                Decision Support System
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'landing'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => {
                setActiveRole('hospital_admin');
                setCurrentView('admin_matching');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === 'admin_matching'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Admin Matching
            </button>
            <button
              onClick={() => {
                setActiveRole('donor');
                setCurrentView('donor_dashboard');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'donor_dashboard'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Donor Hub
            </button>
            <button
              onClick={() => {
                setActiveRole('recipient');
                setCurrentView('recipient_dashboard');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'recipient_dashboard'
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Recipient Waitlist
            </button>
          </nav>

          {/* Role Switcher & Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-xs">
              <span className="text-slate-400 font-medium">Role:</span>
              <select
                value={activeRole}
                onChange={(e) => {
                  const role = e.target.value;
                  setActiveRole(role);
                  if (role === 'hospital_admin') setCurrentView('admin_matching');
                  else if (role === 'donor') setCurrentView('donor_dashboard');
                  else if (role === 'recipient') setCurrentView('recipient_dashboard');
                }}
                className="bg-transparent font-semibold text-teal-800 focus:outline-none cursor-pointer"
              >
                <option value="hospital_admin">Hospital Admin</option>
                <option value="donor">Registered Donor</option>
                <option value="recipient">Waitlisted Recipient</option>
              </select>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ML Service: Active
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
