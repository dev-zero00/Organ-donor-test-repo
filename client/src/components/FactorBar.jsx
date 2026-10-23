import React from 'react';
import { HelpCircle, ChevronRight, Info } from 'lucide-react';

export default function FactorBar({ factor, percentage, value, impact, color = 'bg-teal-500' }) {
  return (
    <div className="space-y-1.5 py-1.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-800">{factor}</span>
          <span className="text-slate-400 font-mono text-[11px]">({value})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            impact.includes('+') 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
              : impact.includes('-')
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-slate-100 text-slate-600'
          }`}>
            {impact}
          </span>
          <span className="font-mono font-semibold text-slate-700 text-xs w-9 text-right">
            {percentage}%
          </span>
        </div>
      </div>
      
      {/* Progress track */}
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
        <div 
          className={`h-full rounded-full ${color} transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(100, Math.max(8, percentage))}%` }}
        />
      </div>
    </div>
  );
}
