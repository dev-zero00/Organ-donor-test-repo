import React, { useState } from 'react';
import { Activity, Clock, Hospital, AlertCircle, FileText, Calendar, CheckCircle2 } from 'lucide-react';
import { INITIAL_RECIPIENTS, calculateRecipientPriority } from '../data/medicalData';

export default function RecipientDashboard() {
  const [recipient, setRecipient] = useState(INITIAL_RECIPIENTS[0]);
  const [urgency, setUrgency] = useState(recipient.urgency);
  const [waitlistMonths, setWaitlistMonths] = useState(recipient.waitlistMonths);

  const priorityScore = calculateRecipientPriority(urgency, waitlistMonths);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Recipient Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {recipient.id}
              </span>
              <span className="text-xs text-slate-300">Waitlist Registered</span>
            </div>
            <h1 className="text-2xl font-bold mt-1">{recipient.name}</h1>
            <p className="text-xs text-teal-200 mt-0.5 flex items-center gap-2">
              <span>{recipient.hospital}</span>
              <span>•</span>
              <span>Status: Active Waitlist Candidate</span>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-44">
            <span className="text-[11px] uppercase font-bold text-teal-200 block">Current Priority Index</span>
            <div className="flex items-baseline justify-center gap-1 mt-1">
              <span className="text-3xl font-black text-white">{priorityScore}</span>
              <span className="text-xs text-teal-300 font-bold">/ 100</span>
            </div>
            <span className="text-[10px] text-teal-200/80 block mt-1">Computed by Clinical Urgency Formula</span>
          </div>
        </div>
      </div>

      {/* Recipient Details & Urgency Simulator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Clinical Summary */}
        <div className="md:col-span-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Medical Profile</h2>
          
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Organ Needed:</span>
              <span className="font-bold text-slate-800">{recipient.organNeeded}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Blood Group:</span>
              <span className="font-bold text-teal-700">{recipient.bloodGroup}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Candidate Age:</span>
              <span className="font-bold text-slate-800">{recipient.age} yrs</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Registration Date:</span>
              <span className="font-mono text-slate-700">Nov 14, 2023</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Recipient HLA Typing</span>
            <p className="text-xs font-mono text-slate-700">HLA-A: {recipient.hlaTyping.A}</p>
            <p className="text-xs font-mono text-slate-700">HLA-B: {recipient.hlaTyping.B}</p>
            <p className="text-xs font-mono text-slate-700">HLA-DR: {recipient.hlaTyping.DR}</p>
          </div>
        </div>

        {/* Priority Computation & Interactive Simulation */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">National Priority Index Calibration</h2>
            <p className="text-xs text-slate-500">
              Calculated dynamically via standard UNOS formula: <code className="bg-slate-100 px-1 py-0.5 rounded text-teal-800 font-mono text-[11px]">0.6 × (Urgency / 10) + 0.4 × min(WaitMonths / 60, 1.0)</code>
            </p>
          </div>

          {/* Urgency Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <label className="text-slate-700">Clinical Urgency Tier (1 - 10):</label>
              <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Tier {urgency} (Weight: {((0.6 * (urgency / 10)) * 100).toFixed(0)} pts)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={urgency}
              onChange={(e) => setUrgency(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>1 (Stable Maintenance)</span>
              <span>5 (Moderate Decline)</span>
              <span>10 (Immediate Critical Status)</span>
            </div>
          </div>

          {/* Waitlist Months Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <label className="text-slate-700">Waitlist Accrual Duration (Months):</label>
              <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {waitlistMonths} months (Weight: {((0.4 * Math.min(waitlistMonths / 60, 1)) * 100).toFixed(0)} pts)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="72"
              value={waitlistMonths}
              onChange={(e) => setWaitlistMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>0 months</span>
              <span>30 months</span>
              <span>60+ months (Max waitlist tier cap)</span>
            </div>
          </div>

          {/* Clinical Status Note */}
          <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/70 flex items-start gap-3 text-xs text-teal-900">
            <Activity className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">OrganEase Clinical Matching Notice:</p>
              <p className="text-teal-800/90 mt-0.5">
                Whenever a donor is pledged with matching ABO and organ parameters, the system triggers the ML ranking pipeline and alerts the supervising hospital transplant board.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
