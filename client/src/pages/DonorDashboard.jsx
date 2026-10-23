import React, { useState } from 'react';
import { Heart, CheckCircle2, Shield, AlertCircle, FileCheck, MapPin, User, Activity } from 'lucide-react';

export default function DonorDashboard() {
  const [pledgedOrgans, setPledgedOrgans] = useState(['Kidney', 'Liver', 'Corneas']);
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [hlaA, setHlaA] = useState('02, 24');
  const [hlaB, setHlaB] = useState('07, 44');
  const [hlaDR, setHlaDR] = useState('04, 15');
  const [consentGiven, setConsentGiven] = useState(true);
  const [saveStatus, setSaveStatus] = useState(false);

  const availableOrgans = ['Kidney', 'Liver', 'Heart', 'Lungs', 'Pancreas', 'Corneas', 'Bone Marrow'];

  const toggleOrgan = (organ) => {
    setPledgedOrgans(prev => 
      prev.includes(organ) ? prev.filter(o => o !== organ) : [...prev, organ]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Profile Summary */}
      <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <User className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Rohan Deshmukh</h1>
                <span className="bg-teal-500/30 border border-teal-400/40 text-teal-200 text-xs px-2.5 py-0.5 rounded-full font-semibold">
                  Donor ID: DON-9041
                </span>
              </div>
              <p className="text-teal-200/80 text-sm mt-0.5">NOTTO Pledge Status: Legally Active & Verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center min-w-24">
              <span className="text-[10px] uppercase font-bold text-teal-200 block">Blood Group</span>
              <span className="text-xl font-black text-white">{bloodGroup}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-center min-w-24">
              <span className="text-[10px] uppercase font-bold text-teal-200 block">Pledged Organs</span>
              <span className="text-xl font-black text-emerald-300">{pledgedOrgans.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Registration & Consent Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Donor Medical Specifications & Loci Typing</h2>
          <p className="text-xs text-slate-500">Provide accurate clinical serology and HLA antigens for our NOTTO/SOTTO matching pipeline.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">ABO Blood Group & Rh Factor</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              <option value="O+">O Positive (Universal Red Cell Donor Tier)</option>
              <option value="O-">O Negative (Universal Strict Donor)</option>
              <option value="A+">A Positive</option>
              <option value="A-">A Negative</option>
              <option value="B+">B Positive</option>
              <option value="B-">B Negative</option>
              <option value="AB+">AB Positive</option>
              <option value="AB-">AB Negative</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Primary Residence / Hospital Linkage</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                defaultValue="Gurugram, Haryana (Fortis Memorial Research Institute)"
                className="w-full text-sm bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 font-medium text-slate-800 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Organs Willing to Donate */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Select Organs & Tissues Authorized for Donation
          </label>
          <div className="flex flex-wrap gap-2.5">
            {availableOrgans.map(organ => {
              const isSelected = pledgedOrgans.includes(organ);
              return (
                <button
                  type="button"
                  key={organ}
                  onClick={() => toggleOrgan(organ)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-teal-50 border-teal-600 text-teal-800 shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isSelected ? 'text-teal-600 fill-teal-600' : 'text-slate-400'}`} />
                  {organ}
                </button>
              );
            })}
          </div>
        </div>

        {/* HLA Typing Inputs */}
        <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/70 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              HLA Antigen Typing (Serological Loci)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">0-6 Antigen Matching Inputs</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">HLA-A Alleles</label>
              <input
                type="text"
                value={hlaA}
                onChange={(e) => setHlaA(e.target.value)}
                placeholder="e.g. 02, 24"
                className="w-full text-xs font-mono bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">HLA-B Alleles</label>
              <input
                type="text"
                value={hlaB}
                onChange={(e) => setHlaB(e.target.value)}
                placeholder="e.g. 07, 44"
                className="w-full text-xs font-mono bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">HLA-DR Alleles</label>
              <input
                type="text"
                value={hlaDR}
                onChange={(e) => setHlaDR(e.target.value)}
                placeholder="e.g. 04, 15"
                className="w-full text-xs font-mono bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Informed Consent Checkbox */}
        <div className="p-4 rounded-xl border border-teal-200/80 bg-teal-50/50 flex items-start gap-3">
          <input
            type="checkbox"
            id="donorConsent"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="mt-1 w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
          />
          <label htmlFor="donorConsent" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
            <strong className="text-slate-900 block font-semibold">Legally Binding Informed Anatomical Consent (THOTA 1994)</strong>
            I hereby reaffirm my voluntary pledge to donate the designated organs/tissues for clinical transplantation or life-saving therapy under the Transplantation of Human Organs and Tissues Act (THOTA). Matching calculations comply with NOTTO procurement ethics.
          </label>
        </div>

        {/* Save & Confirm Button */}
        <div className="flex items-center justify-between pt-2">
          {saveStatus ? (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Donor profile synchronized with OrganEase National Registry!
            </span>
          ) : (
            <span className="text-xs text-slate-400">All data encrypted under clinical privacy protocols.</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-md shadow-teal-700/20 transition-all hover:scale-102"
          >
            Update Donor Pledge
          </button>
        </div>
      </form>
    </div>
  );
}
