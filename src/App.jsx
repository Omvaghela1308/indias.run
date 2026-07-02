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

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [compareList, setCompareList] = useState([]);

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
          />
        );
      case 'workspace':
        return (
          <JobWorkspace 
            weights={weights} 
            setWeights={setWeights} 
          />
        );
      case 'detail':
        return (
          <CandidateDetail 
            candidate={selectedCandidate} 
            setCurrentPage={setCurrentPage} 
          />
        );
      case 'compare':
        return (
          <CandidateComparison 
            compareList={compareList} 
            setCompareList={setCompareList}
            setCurrentPage={setCurrentPage} 
          />
        );
      case 'insights':
        return (
          <AIInsights 
            candidates={candidates} 
          />
        );
      case 'reports':
        return (
          <ReportsExport 
            candidates={candidates} 
          />
        );
      case 'settings':
        return (
          <Settings 
            user={user} 
            setUser={setUser} 
            weights={weights} 
            setWeights={setWeights} 
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
    <div className="flex bg-slate-50 min-h-screen text-slate-800">
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
    </div>
  );
}
