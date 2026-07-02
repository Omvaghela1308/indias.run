import React from 'react';
import { 
  Users, 
  Briefcase, 
  Sparkles, 
  Gauge, 
  FilePlus2, 
  ArrowRight,
  ShieldAlert,
  Flame,
  UserCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export default function Dashboard({ candidates, setCurrentPage, setSelectedCandidate }) {
  // Calculate basic metrics from candidates
  const totalPool = 100000; // Simulated full pool
  const analyzedCount = candidates.length;
  const excellentMatches = candidates.filter(c => c.matchAnalysis.score >= 0.85).length;
  const avgScore = Math.round((candidates.reduce((sum, c) => sum + c.overallScore, 0) / analyzedCount) * 100);

  // Distribution chart data
  const distributionData = [
    { name: '90%+', count: candidates.filter(c => c.overallScore >= 0.9).length },
    { name: '80-89%', count: candidates.filter(c => c.overallScore >= 0.8 && c.overallScore < 0.9).length },
    { name: '70-79%', count: candidates.filter(c => c.overallScore >= 0.7 && c.overallScore < 0.8).length },
    { name: '60-69%', count: candidates.filter(c => c.overallScore >= 0.6 && c.overallScore < 0.7).length },
    { name: '50-59%', count: candidates.filter(c => c.overallScore >= 0.5 && c.overallScore < 0.6).length },
    { name: 'Below 50%', count: candidates.filter(c => c.overallScore < 0.5).length },
  ];

  // Dynamic skills count calculation
  const skillsCountMap = {};
  candidates.flatMap(c => (c.skills || []).map(s => s.name)).forEach(s => {
    let name = s;
    if (s.toLowerCase().includes('python')) name = 'Python';
    else if (s.toLowerCase().includes('embedding')) name = 'Embeddings';
    else if (s.toLowerCase().includes('vector') || s.toLowerCase().includes('pinecone') || s.toLowerCase().includes('milvus') || s.toLowerCase().includes('weaviate')) name = 'Vector DBs';
    else if (s.toLowerCase().includes('rag')) name = 'RAG';
    else if (s.toLowerCase().includes('eval') || s.toLowerCase().includes('ndcg') || s.toLowerCase().includes('map')) name = 'NDCG / Eval';
    else if (s.toLowerCase().includes('fine') || s.toLowerCase().includes('lora')) name = 'Fine-tuning';

    skillsCountMap[name] = (skillsCountMap[name] || 0) + 1;
  });

  const skillsData = Object.entries(skillsCountMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Dynamic Pipeline funnel data
  const semanticCount = candidates.filter(c => c.matchAnalysis.scoreBreakdown.semantic >= 50).length;
  const passedTrapCount = candidates.filter(c => !c.matchAnalysis.isHoneypot && !c.matchAnalysis.isPureConsulting && !c.matchAnalysis.isInactiveTrap).length;
  const topShortlistedCount = candidates.filter(c => c.matchAnalysis.score >= 0.70).length;

  const pipelineData = [
    { stage: 'Total Candidates', value: candidates.length, percentage: 100 },
    { stage: 'Semantic Matched', value: semanticCount, percentage: Math.round((semanticCount / candidates.length) * 100) },
    { stage: 'Passed Trap-Check', value: passedTrapCount, percentage: Math.round((passedTrapCount / candidates.length) * 100) },
    { stage: 'Top Shortlisted', value: topShortlistedCount, percentage: Math.round((topShortlistedCount / candidates.length) * 100) }
  ];

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setCurrentPage('detail');
  };

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-50 via-indigo-50/50 to-white p-8 rounded-3xl border border-brand-100 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome to TalentLens AI Dashboard</h1>
          <p className="text-slate-600 text-sm">Ready to find the best founding AI engineering talent today?</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setCurrentPage('workspace')}
            className="brand-gradient-bg px-5 py-3 rounded-2xl text-xs font-bold hover:shadow-lg hover:shadow-brand-500/20 transition-all flex items-center gap-2"
          >
            <FilePlus2 className="w-4 h-4" />
            Analyze Job Role
          </button>
          <button 
            onClick={() => setCurrentPage('discovery')}
            className="bg-white border border-slate-200 text-slate-700 px-5 py-3 rounded-2xl text-xs font-bold hover:bg-slate-50 transition-all"
          >
            Explore Candidate Pool
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Analyzed Pool</span>
            <h3 className="text-2xl font-black text-slate-900">{totalPool.toLocaleString()}</h3>
            <span className="text-[10px] text-brand-650 font-semibold bg-brand-50 px-2 py-0.5 rounded-full">All Available Records</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Workspace Roles</span>
            <h3 className="text-2xl font-black text-slate-900">1</h3>
            <span className="text-[10px] text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded-full">Senior AI Engineer</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">High Match Candidates</span>
            <h3 className="text-2xl font-black text-slate-900">{excellentMatches}</h3>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">Score &gt;= 85%</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Match Score</span>
            <h3 className="text-2xl font-black text-slate-900">{avgScore}%</h3>
            <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">Of 50 sample profiles</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Gauge className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match score distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2 space-y-4">
          <div>
            <h3 className="font-bold text-slate-800">Match Distribution</h3>
            <p className="text-xs text-slate-400">Score segmentation of the parsed sample candidate profiles</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={distributionData}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0084ff" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0084ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#0084ff" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills count */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-800">Key Skills Demand</h3>
            <p className="text-xs text-slate-400">Occurrence of required technologies in top profiles</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 8, 8, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Insights Card & Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funnel Pipeline */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 lg:col-span-1">
          <div>
            <h3 className="font-bold text-slate-800">Candidate Pipeline</h3>
            <p className="text-xs text-slate-400">Ingestion and filtering stages breakdown</p>
          </div>
          <div className="space-y-4 pt-2">
            {pipelineData.map((p, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{p.stage}</span>
                  <span className="text-slate-400">{p.value.toLocaleString()} ({p.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${idx % 2 === 0 ? 'from-brand-500 to-indigo-500' : 'from-indigo-500 to-violet-500'}`}
                    style={{ width: `${Math.max(2, p.percentage)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight details */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2 space-y-5">
          <div className="flex items-center gap-2 text-brand-650 font-bold text-sm">
            <Sparkles className="w-5 h-5 text-brand-500 fill-brand-100" />
            TalentLens AI Recruiter Insights
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                Honeypot Trap Detected
              </div>
              <p className="text-xs text-slate-600 leading-normal">
                Several profiles matched AI keywords but were flagged for impossible skill duration claims (e.g. 5+ expert skills with 0 months experience).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-800">
                <Flame className="w-4 h-4 text-brand-500" />
                Strong Semantic Fits Found
              </div>
              <p className="text-xs text-slate-600 leading-normal">
                Top candidates showing strong vector search, scoring evaluation, and custom LLM deployments are currently ranked at the top.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total sample candidates processed: {analyzedCount}</span>
            <button 
              onClick={() => setCurrentPage('discovery')}
              className="text-brand-650 font-bold hover:underline flex items-center gap-1"
            >
              Analyze ranked list
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Top Candidates Preview List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800">Top Recommended Profiles</h3>
            <p className="text-xs text-slate-400">Highest matching candidates before behavior adjustment weights</p>
          </div>
          <button 
            onClick={() => setCurrentPage('discovery')}
            className="text-xs font-bold text-brand-650 hover:underline flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-450">
                <th className="py-3 px-4">Candidate ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Current Title</th>
                <th className="py-3 px-4">Experience</th>
                <th className="py-3 px-4">Match Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs">
              {candidates.slice(0, 5).map((candidate) => (
                <tr key={candidate.candidate_id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-4 font-mono font-semibold text-slate-400">{candidate.candidate_id}</td>
                  <td className="py-4 px-4 font-bold text-slate-800">{candidate.profile.anonymized_name}</td>
                  <td className="py-4 px-4 text-slate-600">{candidate.profile.current_title}</td>
                  <td className="py-4 px-4 text-slate-500 font-semibold">{candidate.profile.years_of_experience} Yrs</td>
                  <td className="py-4 px-4 font-extrabold text-brand-650">{Math.round(candidate.overallScore * 100)}%</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      candidate.matchAnalysis.status === 'Excellent Match' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    }`}>
                      {candidate.matchAnalysis.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={() => handleViewProfile(candidate)}
                      className="text-slate-500 hover:text-brand-650 hover:bg-slate-100 px-3 py-1.5 rounded-lg font-bold transition-all"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
