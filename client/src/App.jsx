import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import LandingPage from './pages/LandingPage';
import AdminMatchingView from './pages/AdminMatching';
import DonorDashboard from './pages/DonorDashboard';
import RecipientDashboard from './pages/RecipientDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState('admin_matching');
  const [activeRole, setActiveRole] = useState('hospital_admin');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'landing' && (
          <LandingPage setCurrentView={setCurrentView} setActiveRole={setActiveRole} />
        )}
        {currentView === 'admin_matching' && <AdminMatchingView />}
        {currentView === 'donor_dashboard' && <DonorDashboard />}
        {currentView === 'recipient_dashboard' && <RecipientDashboard />}
      </main>

      {/* Persistent Grounded RAG Chat Assistant */}
      <ChatWidget />

      {/* Clinical Disclaimer Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            OrganEase Prototype — Clinical Decision Support Platform
          </p>
          <p className="text-[11px] text-slate-400">
            Strictly for medical decision support and educational demonstration. Uses synthetic training data. Organ allocations require licensed transplant surgical sign-off.
          </p>
        </div>
      </footer>
    </div>
  );
}
