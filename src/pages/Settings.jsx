import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Cpu, 
  Database,
  Sparkles,
  Info
} from 'lucide-react';

export default function Settings({ user, setUser, weights, setWeights }) {
  const [modelType, setModelType] = useState('bge-large-en');
  const [theme, setTheme] = useState('light');
  const [isSaved, setIsSaved] = useState(false);

  const defaultWeights = {
    semanticWeight: 0.25,
    skillsWeight: 0.20,
    experienceWeight: 0.15,
    careerWeight: 0.10,
    activityWeight: 0.15,
    qualityWeight: 0.10,
    confidenceWeight: 0.05
  };

  const handleResetWeights = () => {
    setWeights(defaultWeights);
    triggerSaveToast();
  };

  const triggerSaveToast = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    triggerSaveToast();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Platform Settings</h1>
          <p className="text-slate-500 text-sm">Configure TalentLens AI preferences, default scoring weights, and model parameters.</p>
        </div>
        
        {isSaved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-4 py-2 rounded-xl">
            Settings saved successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form settings */}
        <div className="lg:col-span-8 space-y-6">
          {/* Profile settings */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm tracking-wider uppercase border-b border-slate-50 pb-3">
              <User className="w-4.5 h-4.5 text-brand-500" />
              Recruiter Profile Settings
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Recruiter Name</label>
                <input 
                  type="text" 
                  value={user?.name || ''} 
                  onChange={(e) => setUser({...user, name: e.target.value})}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 text-slate-800 font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Work Email</label>
                <input 
                  type="email" 
                  value={user?.email || ''} 
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 text-slate-800 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Model selection configurations */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 font-bold text-slate-800 text-sm tracking-wider uppercase border-b border-slate-50 pb-3">
              <Cpu className="w-4.5 h-4.5 text-brand-500" />
              AI Model Configurations (Mock)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Dense Embedding Model</label>
                <select 
                  value={modelType}
                  onChange={(e) => setModelType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-55 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 text-slate-700 font-semibold"
                >
                  <option value="bge-large-en">BGE-Large-EN (High Accuracy)</option>
                  <option value="e5-base-v2">E5-Base-v2 (Balanced)</option>
                  <option value="sentence-transformers-all-mini">MiniLM-L6-v2 (Ultra Fast CPU)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Re-ranking Logic Mode</label>
                <select 
                  className="w-full px-3 py-2.5 bg-slate-55 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 text-slate-700 font-semibold"
                >
                  <option>Multi-Signal Rule-Based Ranker (Spec compliant)</option>
                  <option>XGBoost Learning-to-Rank Classifier</option>
                  <option>LLM Pairwise Evaluator (Offline only)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              type="submit"
              className="brand-gradient-bg px-6 py-3 rounded-xl text-xs font-bold hover:shadow-lg transition-all"
            >
              Save Configuration
            </button>
            <button 
              type="button"
              onClick={handleResetWeights}
              className="bg-white border border-slate-200 text-slate-650 hover:bg-slate-50 px-6 py-3 rounded-xl text-xs font-bold transition-all"
            >
              Reset Scoring Weights
            </button>
          </div>
        </div>

        {/* Right Column: DataSource Status info */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2 font-bold text-slate-800 text-sm tracking-wider uppercase">
            <Database className="w-4.5 h-4.5 text-brand-500" />
            Data Source Connections
          </div>

          <div className="space-y-4 text-xs font-semibold">
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500">candidates.jsonl</span>
              <span className="text-emerald-600">CONNECTED (100k rows)</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500">sample_candidates.json</span>
              <span className="text-emerald-600">CONNECTED (50 rows)</span>
            </div>
            <div className="flex justify-between border-b border-slate-50 pb-2">
              <span className="text-slate-500">Job Description (Senior AI)</span>
              <span className="text-emerald-600">LOADED</span>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 text-blue-750 text-[11px] leading-normal font-medium rounded-2xl flex items-start gap-1.5">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Theme settings is locked to <strong>Light Theme</strong> to comply with the project branding guidelines.</span>
          </div>
        </div>
      </form>
    </div>
  );
}
