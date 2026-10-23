import React from 'react';
import { Heart, Activity, ShieldCheck, ArrowRight, BrainCircuit, Users, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LandingPage({ setCurrentView, setActiveRole }) {
  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-teal-900 via-slate-900 to-slate-950 text-white p-8 sm:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            AI-Augmented Medical Allocation Support
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Transparent, Ethical Organ Matching Powered by <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Explainable ML</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            OrganEase pairs strict clinical eligibility rules with XGBoost ranking and SHAP explainability, empowering transplant surgeons and hospital boards to allocate life-saving donor gifts with speed and clarity.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                setActiveRole('hospital_admin');
                setCurrentView('admin_matching');
              }}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
            >
              Open Hospital Admin Workbench
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveRole('donor');
                setCurrentView('donor_dashboard');
              }}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3 rounded-xl text-sm transition-all"
            >
              Register as Donor
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10 text-xs">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold text-sm">Hard Clinical Pre-Filter</strong>
              <span className="text-slate-400">Strict ABO isotype compatibility & organ pledges run before inference.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <BrainCircuit className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold text-sm">Explainable SHAP Output</strong>
              <span className="text-slate-400">Every score is dissected into biological, geographical, and urgency weights.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Activity className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white font-semibold text-sm">Audited Decision Support</strong>
              <span className="text-slate-400">Physicians retain full governance; actions recorded in immutable audit logs.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Role Access Cards */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Explore Interactive Role Dashboards</h2>
          <p className="text-xs text-slate-500">Test how donors pledge, recipients track priority, and clinical staff evaluate matches.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Card */}
          <div 
            onClick={() => {
              setActiveRole('hospital_admin');
              setCurrentView('admin_matching');
            }}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-teal-500 transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Hospital Admin Matching
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Run cross-candidate ML rankings, inspect SHAP factor percentages, and approve or decline provisional transplant matches.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-teal-700 flex items-center gap-1">
              Launch Matching Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Donor Card */}
          <div 
            onClick={() => {
              setActiveRole('donor');
              setCurrentView('donor_dashboard');
            }}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-teal-500 transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Donor Pledge Portal
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Register organs willing to donate, input 0-6 locus HLA typing (A, B, DR), set location, and confirm legal consent.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-teal-700 flex items-center gap-1">
              Manage Donor Pledge <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Recipient Card */}
          <div 
            onClick={() => {
              setActiveRole('recipient');
              setCurrentView('recipient_dashboard');
            }}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-teal-500 transition-all cursor-pointer space-y-4"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                Recipient Waitlist Index
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Monitor waitlist progression, simulate medical urgency scores (0.6×Urgency + 0.4×WaitMonths), and view hospital linkage.
              </p>
            </div>
            <div className="pt-2 text-xs font-bold text-teal-700 flex items-center gap-1">
              View Recipient Waitlist <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
