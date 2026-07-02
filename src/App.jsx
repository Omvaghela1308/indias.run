import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import JobWorkspace from './pages/JobWorkspace';
import CandidateDiscovery from './pages/CandidateDiscovery';
import CandidateDetail from './pages/CandidateDetail';
import CandidateComparison from './pages/CandidateComparison';
import AIInsights from './pages/AIInsights';
import ReportsExport from './pages/ReportsExport';
import Settings from './pages/Settings';
import { candidates } from './data/candidatesData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Global Weights configuration
  const [weights, setWeights] = useState({
    semanticWeight: 0.25,
    skillsWeight: 0.20,
    experienceWeight: 0.15,
    careerWeight: 0.10,
    activityWeight: 0.15,
    qualityWeight: 0.10,
    confidenceWeight: 0.05
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('landing');
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            candidates={candidates} 
            setCurrentPage={setCurrentPage} 
            setSelectedCandidate={setSelectedCandidate} 
            showToast={showToast}
          />
        );
      case 'discovery':
        return (
          <CandidateDiscovery 
            candidates={candidates} 
            weights={weights}
            setCurrentPage={setCurrentPage} 
            setSelectedCandidate={setSelectedCandidate}
            compareList={compareList}
            setCompareList={setCompareList}
            showToast={showToast}
          />
        );
      case 'workspace':
        return (
          <JobWorkspace 
            weights={weights} 
            setWeights={setWeights} 
            showToast={showToast}
          />
        );
      case 'detail':
        return (
          <CandidateDetail 
            candidate={selectedCandidate} 
            setCurrentPage={setCurrentPage} 
            showToast={showToast}
          />
        );
      case 'compare':
        return (
          <CandidateComparison 
            compareList={compareList} 
            setCompareList={setCompareList}
            setCurrentPage={setCurrentPage} 
            showToast={showToast}
          />
        );
      case 'insights':
        return (
          <AIInsights 
            candidates={candidates} 
            showToast={showToast}
          />
        );
      case 'reports':
        return (
          <ReportsExport 
            candidates={candidates} 
            showToast={showToast}
          />
        );
      case 'settings':
        return (
          <Settings 
            user={user} 
            setUser={setUser} 
            weights={weights} 
            setWeights={setWeights} 
            showToast={showToast}
          />
        );
      default:
        return (
          <LandingPage 
            setCurrentPage={setCurrentPage} 
            isAuthenticated={isAuthenticated} 
          />
        );
    }
  };

  // Auth pages and Landing Page render outside the main layout shell
  if (currentPage === 'landing' || currentPage === 'auth') {
    if (currentPage === 'auth') {
      return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    }
    return <LandingPage setCurrentPage={setCurrentPage} isAuthenticated={isAuthenticated} />;
  }

  // Dashboard / Workspace layout shell
  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 relative">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onLogout={handleLogout} 
      />

      {/* Main panel container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with Search and Profile status */}
        <Header user={user} setCurrentPage={setCurrentPage} />
        
        {/* Active Page View Content */}
        <main className="flex-1 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Global success checkmark/toast alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-2.5 z-[9999] animate-bounce font-sans font-semibold text-xs border border-emerald-400">
          <CheckCircle2 className="w-4.5 h-4.5 text-white shrink-0" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
