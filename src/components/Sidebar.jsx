import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Briefcase, 
  Users, 
  BrainCircuit, 
  FileSpreadsheet, 
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage, onLogout }) {
  const menuItems = [
    { id: 'dashboard', name: 'Overview', icon: LayoutDashboard },
    { id: 'discovery', name: 'Candidate Discovery', icon: Search },
    { id: 'workspace', name: 'Job Workspace', icon: Briefcase },
    { id: 'insights', name: 'AI Insights', icon: BrainCircuit },
    { id: 'reports', name: 'Reports & Export', icon: FileSpreadsheet },
    { id: 'settings', name: 'Settings', icon: SettingsIcon },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col justify-between select-none">
      <div className="p-6">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => setCurrentPage('landing')}>
          <div className="w-10 h-10 rounded-xl brand-gradient-bg flex items-center justify-center shadow-md shadow-brand-500/20">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">TalentLens AI</h1>
            <span className="text-xs font-semibold text-brand-600 tracking-wider uppercase">Founding Team</span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-650' : 'text-slate-400'}`} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer / User Logout */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 text-red-400" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
