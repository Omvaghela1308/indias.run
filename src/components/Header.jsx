import React, { useState } from 'react';
import { Bell, Search, ChevronDown, User, Sparkles } from 'lucide-react';

export default function Header({ user, setCurrentPage }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, text: "Top Match CAND_0004989 score recalculated: 0.992", time: "2 min ago" },
    { id: 2, text: "Job Description analysis complete for Senior AI Engineer", time: "1 hour ago" },
    { id: 3, text: "Trap candidate CAND_0000003 flagged as Honeypot", time: "3 hours ago" }
  ];

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between">
      {/* Search Input */}
      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 w-80">
        <Search className="w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Quick search candidates..." 
          className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 w-full"
          onFocus={() => setCurrentPage('discovery')}
        />
      </div>

      {/* Action Buttons & Profile */}
      <div className="flex items-center gap-4">
        {/* Active Role Quick Stats */}
        <div className="hidden lg:flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 text-xs font-semibold text-amber-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          Active: Senior AI Engineer
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-slate-100 relative transition-all"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 glass-card">
              <h3 className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                Notifications
              </h3>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(n => (
                  <div key={n.id} className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors">
                    <p className="text-xs text-slate-700 leading-normal">{n.text}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
          >
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-650 flex items-center justify-center font-bold text-sm">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 glass-card">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-800">{user?.name || "Admin Recruiter"}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email || "recruiter@talentlens.ai"}</p>
              </div>
              <button 
                onClick={() => { setShowProfile(false); setCurrentPage('settings'); }}
                className="w-full text-left px-4 py-2 text-xs text-slate-650 hover:bg-slate-50 transition-colors"
              >
                Account Settings
              </button>
              <button 
                onClick={() => { setShowProfile(false); setCurrentPage('workspace'); }}
                className="w-full text-left px-4 py-2 text-xs text-slate-650 hover:bg-slate-50 transition-colors"
              >
                Active Job Workspace
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
