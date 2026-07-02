import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  HelpCircle, 
  Check, 
  AlertCircle,
  Sparkles,
  RefreshCw,
  Plus,
  Users
} from 'lucide-react';
import { calculateMatchScore } from '../utils/scoringEngine';

export default function CandidateDiscovery({ 
  candidates, 
  weights, 
  setCurrentPage, 
  setSelectedCandidate,
  compareList,
  setCompareList,
  showToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [experienceRange, setExperienceRange] = useState('all');
  const [matchFilter, setMatchFilter] = useState('all');
  const [noticeFilter, setNoticeFilter] = useState('all');
  const [workModeFilter, setWorkModeFilter] = useState('all');
  
  const [expandedReason, setExpandedReason] = useState({});
  const [shortlist, setShortlist] = useState(new Set());

  // Dynamically recalculate scores if weights change
  const processedCandidates = useMemo(() => {
    return candidates.map(c => {
      const analysis = calculateMatchScore(c, weights);
      return {
        ...c,
        matchAnalysis: analysis,
        overallScore: analysis.score
      };
    }).sort((a, b) => {
      // Sort by score descending. If tie, sort by candidate_id ascending (per hackathon specs)
      if (b.overallScore !== a.overallScore) {
        return b.overallScore - a.overallScore;
      }
      return a.candidate_id.localeCompare(b.candidate_id);
    });
  }, [candidates, weights]);

  // Apply filters
  const filteredCandidates = useMemo(() => {
    return processedCandidates.filter(c => {
      const p = c.profile || {};
      const s = c.redrob_signals || {};
      
      // Search text match
      const nameMatch = p.anonymized_name.toLowerCase().includes(searchTerm.toLowerCase());
      const titleMatch = p.current_title.toLowerCase().includes(searchTerm.toLowerCase());
      const skillsMatch = (c.skills || []).some(sk => sk.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSearch = nameMatch || titleMatch || skillsMatch;

      // Experience filter
      let matchesExp = true;
      if (experienceRange === 'under-5') matchesExp = p.years_of_experience < 5;
      else if (experienceRange === '5-9') matchesExp = p.years_of_experience >= 5 && p.years_of_experience <= 9;
      else if (experienceRange === 'over-9') matchesExp = p.years_of_experience > 9;

      // Match filter
      let matchesScore = true;
      if (matchFilter === 'excellent') matchesScore = c.overallScore >= 0.85;
      else if (matchFilter === 'strong') matchesScore = c.overallScore >= 0.70 && c.overallScore < 0.85;
      else if (matchFilter === 'potential') matchesScore = c.overallScore >= 0.50 && c.overallScore < 0.70;
      else if (matchFilter === 'low') matchesScore = c.overallScore < 0.50;

      // Notice period filter
      let matchesNotice = true;
      if (noticeFilter === 'immediate') matchesNotice = s.notice_period_days === 0;
      else if (noticeFilter === 'sub-30') matchesNotice = s.notice_period_days <= 30;
      else if (noticeFilter === 'over-30') matchesNotice = s.notice_period_days > 30;

      // Work mode filter
      let matchesWorkMode = true;
      if (workModeFilter !== 'all') matchesWorkMode = s.preferred_work_mode === workModeFilter;

      return matchesSearch && matchesExp && matchesScore && matchesNotice && matchesWorkMode;
    });
  }, [processedCandidates, searchTerm, experienceRange, matchFilter, noticeFilter, workModeFilter]);

  const toggleReason = (id) => {
    setExpandedReason(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleShortlist = (candidate) => {
    setShortlist(prev => {
      const next = new Set(prev);
      if (next.has(candidate.candidate_id)) {
        next.delete(candidate.candidate_id);
        if (showToast) showToast(`Removed ${candidate.profile.anonymized_name} from shortlist.`);
      } else {
        next.add(candidate.candidate_id);
        if (showToast) showToast(`Added ${candidate.profile.anonymized_name} to shortlist!`);
      }
      return next;
    });
  };

  const toggleCompare = (candidate) => {
    setCompareList(prev => {
      const index = prev.findIndex(c => c.candidate_id === candidate.candidate_id);
      if (index !== -1) {
        if (showToast) showToast(`Removed ${candidate.profile.anonymized_name} from comparison.`);
        return prev.filter(c => c.candidate_id !== candidate.candidate_id);
      } else {
        if (prev.length >= 4) {
          if (showToast) showToast("⚠️ Can compare up to 4 candidates.");
          return prev;
        }
        if (showToast) showToast(`Added ${candidate.profile.anonymized_name} to comparison!`);
        return [...prev, candidate];
      }
    });
  };

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setCurrentPage('detail');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Page Title & Quick Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Candidate Discovery</h1>
          <p className="text-slate-500 text-sm">Review, rank, and shortlist matching candidates using custom AI signals.</p>
        </div>
        <div className="flex items-center gap-2">
          {compareList.length > 0 && (
            <button 
              onClick={() => setCurrentPage('compare')}
              className="bg-brand-50 border border-brand-200 text-brand-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-100 transition-all flex items-center gap-1.5"
            >
              <Users className="w-4 h-4" />
              Compare Candidates ({compareList.length})
            </button>
          )}
          <button 
            onClick={() => setCurrentPage('reports')}
            className="brand-gradient-bg px-4 py-2 rounded-xl text-xs font-bold hover:shadow-md transition-all"
          >
            Export Shortlist CSV
          </button>
        </div>
      </div>

      {/* Interactive Filters Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
          <SlidersHorizontal className="w-4.5 h-4.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Search & Filter Controls</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Search bar */}
          <div className="relative col-span-1 sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-55 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:bg-white text-slate-750"
            />
          </div>

          {/* Exp range */}
          <div>
            <select
              value={experienceRange}
              onChange={(e) => setExperienceRange(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-55 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 text-slate-700"
            >
              <option value="all">All Experience Levels</option>
              <option value="under-5">Under 5 Years</option>
              <option value="5-9">Target (5-9 Years)</option>
              <option value="over-9">Over 9 Years</option>
            </select>
          </div>

          {/* Match rating */}
          <div>
            <select
              value={matchFilter}
              onChange={(e) => setMatchFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-55 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 text-slate-700"
            >
              <option value="all">All Match Scores</option>
              <option value="excellent">Excellent Match (85%+)</option>
              <option value="strong">Strong Match (70-84%)</option>
              <option value="potential">Potential Match (50-69%)</option>
              <option value="low">Low Match (&lt;50%)</option>
            </select>
          </div>

          {/* Notice period */}
          <div>
            <select
              value={noticeFilter}
              onChange={(e) => setNoticeFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-55 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 text-slate-700"
            >
              <option value="all">All Notice Periods</option>
              <option value="immediate">Immediate Joiners</option>
              <option value="sub-30">Sub-30 Days</option>
              <option value="over-30">Over 30 Days</option>
            </select>
          </div>

          {/* Work Mode */}
          <div>
            <select
              value={workModeFilter}
              onChange={(e) => setWorkModeFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-55 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 text-slate-700"
            >
              <option value="all">All Work Modes</option>
              <option value="remote">Remote Preferred</option>
              <option value="hybrid">Hybrid Preferred</option>
              <option value="onsite">Onsite</option>
            </select>
          </div>
        </div>
      </div>

      {/* Candidate List / Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <span className="text-xs font-bold text-slate-500 uppercase">Showing {filteredCandidates.length} Profiles</span>
          <span className="text-[10px] text-slate-400 font-medium">Scoring automatically includes Trap & Honeypot detection checks</span>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="p-16 text-center text-slate-450 space-y-2">
            <AlertCircle className="w-10 h-10 text-slate-350 mx-auto" />
            <h3 className="font-bold text-slate-800">No candidates match filters</h3>
            <p className="text-xs max-w-xs mx-auto">Try widening search criteria or adjusting notice periods in the dropdown filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredCandidates.map((c, index) => {
              const analysis = c.matchAnalysis;
              const isExpanded = expandedReason[c.candidate_id];
              const isInShortlist = shortlist.has(c.candidate_id);
              const isComparing = compareList.some(comp => comp.candidate_id === c.candidate_id);
              
              // Score styling
              let scoreColor = 'text-red-650 bg-red-50/50';
              if (analysis.status === 'Excellent Match') scoreColor = 'text-emerald-700 bg-emerald-50';
              else if (analysis.status === 'Strong Match') scoreColor = 'text-brand-650 bg-brand-50';
              else if (analysis.status === 'Potential Match') scoreColor = 'text-indigo-700 bg-indigo-50';

              return (
                <div key={c.candidate_id} className="p-6 hover:bg-slate-50/20 transition-all space-y-4">
                  {/* Summary Card Info Row */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Rank Indicator */}
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center shrink-0 border border-slate-200">
                        {index + 1}
                      </div>

                      {/* Details */}
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 
                            onClick={() => handleViewProfile(c)}
                            className="font-extrabold text-slate-800 text-base hover:text-brand-650 cursor-pointer"
                          >
                            {c.profile.anonymized_name}
                          </h3>
                          <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            {c.candidate_id}
                          </span>
                          
                          {analysis.isHoneypot && (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded">
                              Honeypot Trap
                            </span>
                          )}
                          {analysis.isPureConsulting && (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded">
                              Consulting Firm Profile
                            </span>
                          )}
                          {analysis.isInactiveTrap && (
                            <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-500 text-white px-2 py-0.5 rounded">
                              Inactive Profile
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 mt-1 font-medium">
                          {c.profile.current_title} at <span className="text-slate-800 font-semibold">{c.profile.current_company}</span> ({c.profile.years_of_experience} yrs experience)
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {c.skills.slice(0, 5).map((skill, si) => (
                            <span key={si} className="text-[10px] font-bold bg-slate-100 text-slate-650 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                              {skill.name}
                            </span>
                          ))}
                          {c.skills.length > 5 && (
                            <span className="text-[10px] font-medium text-slate-400 px-1 py-0.5">
                              +{c.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right side ratings & CTAs */}
                    <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                      {/* Overall score circle badge */}
                      <div className={`px-4 py-2 rounded-2xl border font-black text-sm flex items-center gap-1.5 ${scoreColor}`}>
                        <Sparkles className="w-4 h-4 shrink-0 fill-current opacity-70" />
                        {Math.round(c.overallScore * 100)}%
                        <span className="text-[10px] font-bold opacity-60">Match</span>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewProfile(c)}
                          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                        >
                          View Detail
                        </button>
                        
                        <button 
                          onClick={() => toggleCompare(c)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                            isComparing 
                              ? 'bg-indigo-50 border-indigo-200 text-indigo-750' 
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {isComparing ? "Comparing" : "Compare"}
                        </button>

                        <button 
                          onClick={() => toggleShortlist(c)}
                          className={`p-2.5 rounded-xl border transition-all ${
                            isInShortlist 
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Score breakdown bar details */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 bg-slate-50/50 p-3 rounded-2xl border border-slate-100 text-[10px] font-semibold text-slate-500 text-center">
                    <div>Semantic: <span className="text-slate-700 font-bold">{analysis.scoreBreakdown.semantic}%</span></div>
                    <div>Skills: <span className="text-slate-700 font-bold">{analysis.scoreBreakdown.skills}%</span></div>
                    <div>Exp: <span className="text-slate-700 font-bold">{analysis.scoreBreakdown.experience}%</span></div>
                    <div>Career Stability: <span className="text-slate-700 font-bold">{analysis.scoreBreakdown.career}%</span></div>
                    <div>Activity: <span className="text-slate-700 font-bold">{analysis.scoreBreakdown.activity}%</span></div>
                    <div>Profile Quality: <span className="text-slate-700 font-bold">{analysis.scoreBreakdown.quality}%</span></div>
                    <div>Confidence: <span className="text-slate-700 font-bold">{analysis.scoreBreakdown.confidence}%</span></div>
                  </div>

                  {/* Expand/Collapse Explanations */}
                  <div className="border-t border-slate-50 pt-2">
                    <button 
                      onClick={() => toggleReason(c.candidate_id)}
                      className="flex items-center gap-1 text-[11px] font-bold text-brand-650 hover:underline"
                    >
                      {isExpanded ? "Hide AI Reasoning" : "Why this candidate?"}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="mt-3 p-4 bg-slate-50/80 border border-slate-100 rounded-2xl space-y-2 text-xs">
                        <div className="font-bold text-slate-800">AI Explanation:</div>
                        <ul className="space-y-1.5 list-disc pl-4 text-slate-650 leading-relaxed">
                          {analysis.strengths.map((str, idx) => (
                            <li key={idx} className="text-emerald-700 font-medium">✓ {str}</li>
                          ))}
                          {analysis.warnings.map((warn, idx) => (
                            <li key={idx} className="text-amber-700 font-medium">⚠ {warn}</li>
                          ))}
                          {analysis.explanations.map((exp, idx) => (
                            <li key={idx} className="text-slate-500">{exp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
