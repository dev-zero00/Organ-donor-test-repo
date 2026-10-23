import React, { useState } from 'react';
import { 
  Users, UserCheck, AlertTriangle, CheckCircle2, XCircle, 
  Search, SlidersHorizontal, ArrowUpDown, Shield, Clock,
  FileText, Activity, MapPin, Stethoscope, ChevronRight
} from 'lucide-react';
import FactorBar from '../components/FactorBar';
import { 
  INITIAL_RECIPIENTS, 
  INITIAL_DONORS, 
  checkAboCompatibility, 
  calculateRecipientPriority,
  computeMatchExplanation 
} from '../data/medicalData';

export default function AdminMatchingView() {
  const [selectedRecipientId, setSelectedRecipientId] = useState(INITIAL_RECIPIENTS[0].id);
  const [auditLogs, setAuditLogs] = useState([
    {
      id: "LOG-1029",
      timestamp: "10:48 AM",
      action: "MATCH_REVIEWED",
      actor: "Dr. K. Aris (Transplant Coordinator)",
      details: "Approved provisional crossmatch for REC-2026-081 with DON-9041 (Kidney)"
    },
    {
      id: "LOG-1028",
      timestamp: "09:30 AM",
      action: "PRIORITY_REFRESH",
      actor: "System ML Daemon",
      details: "Recalculated national waitlist priority scores (3 active recipients)"
    }
  ]);
  const [matchStatus, setMatchStatus] = useState({});
  const [filterOrgan, setFilterOrgan] = useState('All');

  const selectedRecipient = INITIAL_RECIPIENTS.find(r => r.id === selectedRecipientId) || INITIAL_RECIPIENTS[0];
  const priorityScore = calculateRecipientPriority(selectedRecipient.urgency, selectedRecipient.waitlistMonths);

  // Evaluate and rank all donors for the selected recipient
  const evaluatedDonors = INITIAL_DONORS.map(donor => {
    const analysis = computeMatchExplanation(donor, selectedRecipient);
    return {
      donor,
      analysis
    };
  }).sort((a, b) => {
    // Compatible first, then by match score descending
    if (a.analysis.compatible && !b.analysis.compatible) return -1;
    if (!a.analysis.compatible && b.analysis.compatible) return 1;
    return b.analysis.score - a.analysis.score;
  });

  const handleDecision = (donorId, decision) => {
    setMatchStatus(prev => ({ ...prev, [`${selectedRecipient.id}_${donorId}`]: decision }));
    const newLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      action: decision === 'approved' ? 'MATCH_PROVISIONALLY_APPROVED' : 'MATCH_DECLINED',
      actor: 'Staff Clinical Lead (You)',
      details: `${decision.toUpperCase()} donor ${donorId} for recipient ${selectedRecipient.id} (${selectedRecipient.organNeeded}). Recorded in audit log.`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Top Clinical Decision Banner */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/40 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-amber-900 tracking-wide uppercase">
              Clinical Decision Support Framework
            </h3>
            <p className="text-xs text-amber-800/90 mt-0.5">
              Machine learning rankings and SHAP factor contributions are advisory. Final allocation requires surgical multidisciplinary review and secondary crossmatching.
            </p>
          </div>
        </div>
        <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 bg-amber-100/70 border border-amber-300/60 px-3 py-1.5 rounded-full shrink-0">
          <Activity className="w-3.5 h-3.5" />
          Protocol Compliance Active
        </span>
      </div>

      {/* Recipient Selection Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recipient Profile Card */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">Active Recipient</span>
              <h2 className="text-lg font-bold text-slate-900">{selectedRecipient.name}</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              {selectedRecipient.id}
            </span>
          </div>

          {/* Quick Selector Dropdown */}
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">Switch Recipient Candidate:</label>
            <select
              value={selectedRecipientId}
              onChange={(e) => setSelectedRecipientId(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {INITIAL_RECIPIENTS.map(rec => (
                <option key={rec.id} value={rec.id}>
                  {rec.name} — {rec.organNeeded} ({rec.bloodGroup})
                </option>
              ))}
            </select>
          </div>

          {/* Clinical Vital Parameters */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Needed Organ</span>
              <span className="font-bold text-slate-800 text-sm">{selectedRecipient.organNeeded}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Blood Group</span>
              <span className="font-bold text-teal-700 text-sm">{selectedRecipient.bloodGroup}</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Urgency Rating</span>
              <span className="font-bold text-rose-600 text-sm">{selectedRecipient.urgency} / 10</span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Waitlist Time</span>
              <span className="font-bold text-slate-800 text-sm">{selectedRecipient.waitlistMonths} months</span>
            </div>
          </div>

          {/* Computed Recipient Priority Index */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/60 rounded-xl p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-800">UNOS Standard Priority Index</span>
                <p className="text-[11px] text-teal-700">0.6×Urgency + 0.4×WaitMonths</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-teal-800">{priorityScore}</span>
                <span className="text-[11px] text-teal-600 font-semibold block">/ 100</span>
              </div>
            </div>
          </div>

          {/* HLA Antigens Profile */}
          <div className="space-y-1.5 text-xs">
            <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider block">
              Recipient HLA Antigens
            </span>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 font-mono text-[11px] space-y-1 text-slate-700">
              <div><strong className="text-teal-700">HLA-A:</strong> {selectedRecipient.hlaTyping.A}</div>
              <div><strong className="text-teal-700">HLA-B:</strong> {selectedRecipient.hlaTyping.B}</div>
              <div><strong className="text-teal-700">HLA-DR:</strong> {selectedRecipient.hlaTyping.DR}</div>
            </div>
          </div>

          <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {selectedRecipient.hospital} ({selectedRecipient.location})
            </p>
          </div>
        </div>

        {/* Candidate Matching Bench & SHAP Explainability */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-700" />
                  Matched Donor Candidates (Ranked)
                </h3>
                <p className="text-xs text-slate-500">
                  Screened through Hard ABO & Organ Rule Filter, then ranked with XGBoost + SHAP analysis
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Candidates:</span>
                <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full">
                  {evaluatedDonors.length} evaluated
                </span>
              </div>
            </div>

            {/* Candidate Cards */}
            <div className="divide-y divide-slate-100 mt-2">
              {evaluatedDonors.map(({ donor, analysis }, idx) => {
                const decisionKey = `${selectedRecipient.id}_${donor.id}`;
                const currentDecision = matchStatus[decisionKey];

                return (
                  <div key={donor.id} className="py-4 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          analysis.compatible 
                            ? 'bg-teal-100 text-teal-800' 
                            : 'bg-rose-100 text-rose-700'
                        }`}>
                          #{idx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{donor.name}</h4>
                            <span className="font-mono text-[11px] text-slate-400">({donor.id})</span>
                            <span className="clinical-badge bg-slate-100 text-slate-700 border border-slate-200">
                              Blood: {donor.bloodGroup}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                            <span>Age {donor.age} ({donor.gender})</span>
                            <span>•</span>
                            <span>{donor.distanceKm} km away</span>
                            <span>•</span>
                            <span>{donor.location}</span>
                          </p>
                        </div>
                      </div>

                      {/* Score Indicator */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                        {analysis.compatible ? (
                          <div className="text-right">
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-black text-teal-700">{analysis.score}</span>
                              <span className="text-xs text-slate-400 font-semibold">/ 100</span>
                            </div>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Top Recommended Match
                            </span>
                          </div>
                        ) : (
                          <span className="clinical-badge bg-rose-50 text-rose-700 border border-rose-200">
                            Rule Incompatible
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Breakdown or Incompatibility Note */}
                    {analysis.compatible ? (
                      <div className="bg-slate-50/70 rounded-xl p-3.5 border border-slate-200/60 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 uppercase tracking-wider pb-1 border-b border-slate-200/50">
                          <span>SHAP Feature Attribution (Why this candidate scored {analysis.score})</span>
                          <span className="text-teal-700 font-mono">94.8% ML Confidence</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                          {analysis.breakdown.map((item, bIdx) => (
                            <FactorBar
                              key={bIdx}
                              factor={item.factor}
                              percentage={item.percentage}
                              value={item.value}
                              impact={item.impact}
                              color={item.color}
                            />
                          ))}
                        </div>

                        {/* Medical Coordinator Actions */}
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/60">
                          <span className="text-[11px] text-slate-500 font-medium">
                            Procurement: {donor.procurementStatus}
                          </span>
                          <div className="flex items-center gap-2">
                            {currentDecision ? (
                              <span className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                                currentDecision === 'approved' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-rose-100 text-rose-800'
                              }`}>
                                {currentDecision === 'approved' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                Decision: {currentDecision.toUpperCase()}
                              </span>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleDecision(donor.id, 'rejected')}
                                  className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
                                >
                                  Decline Candidate
                                </button>
                                <button
                                  onClick={() => handleDecision(donor.id, 'approved')}
                                  className="px-3.5 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Approve Provisional Crossmatch
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/60 text-xs text-rose-800 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span><strong>Pre-Model Clinical Filter Exclusion:</strong> {analysis.reason}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Audit & Governance Trail */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-bold text-slate-900">Hospital Transplant Allocation Audit Trail</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Immutable Compliance Log</span>
        </div>
        <div className="divide-y divide-slate-100">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-slate-400">{log.timestamp}</span>
                <span className="font-semibold text-slate-800">{log.action}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">{log.details}</span>
              </div>
              <span className="text-[11px] text-teal-700 font-medium bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100 w-fit">
                {log.actor}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
