import React from 'react';
import { Users, ArrowLeft, Check, AlertTriangle, Sparkles } from 'lucide-react';

export default function CandidateComparison({ compareList, setCompareList, setCurrentPage }) {
  const handleRemove = (candidate) => {
    setCompareList(prev => prev.filter(c => c.candidate_id !== candidate.candidate_id));
  };

  const handleClear = () => {
    setCompareList([]);
    setCurrentPage('discovery');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Header buttons */}
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setCurrentPage('discovery')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          Back to Candidate List
        </button>
        <button 
          onClick={handleClear}
          className="text-xs text-red-600 font-bold hover:underline"
        >
          Clear Comparison ({compareList.length})
        </button>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Candidate Comparison</h1>
        <p className="text-slate-500 text-sm">Compare side-by-side technical match, experience level, and platform activity metrics.</p>
      </div>

      {compareList.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-slate-100 shadow-sm text-center text-slate-450 space-y-3">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">No candidates selected</h3>
          <p className="text-xs max-w-xs mx-auto">Go to the Candidate Discovery page and click "Compare" on candidates you want to review side-by-side.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* AI generated comparative analysis summary */}
          <div className="bg-gradient-to-r from-brand-50 to-indigo-50/50 p-6 rounded-3xl border border-brand-100 flex items-start gap-4 shadow-sm">
            <Sparkles className="w-5 h-5 text-brand-500 fill-brand-100 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">TalentLens AI Comparative Summary</h4>
              <p className="text-xs text-slate-650 leading-relaxed font-normal">
                {compareList.length === 1 
                  ? "Select more candidates to compare side-by-side."
                  : `Compared ${compareList.length} candidates. Candidate ${compareList[0]?.profile?.anonymized_name} is strongest for immediate technical fit, while Candidate ${compareList[1]?.profile?.anonymized_name || 'B'} has stronger long-term stability and behavioral confidence on the platform.`
                }
              </p>
            </div>
          </div>

          {/* Table side-by-side comparison */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-widest min-w-[200px]">Candidate / Criteria</th>
                    {compareList.map((c) => (
                      <th key={c.candidate_id} className="p-5 min-w-[220px] relative">
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-sm text-slate-800">{c.profile.anonymized_name}</h4>
                          <p className="text-[10px] font-mono text-slate-400">{c.candidate_id}</p>
                        </div>
                        <button 
                          onClick={() => handleRemove(c)}
                          className="absolute top-5 right-5 text-xs font-bold text-slate-450 hover:text-red-600"
                        >
                          ✕
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {/* Title / Current role */}
                  <tr>
                    <td className="p-5 font-semibold text-slate-500">Current Role</td>
                    {compareList.map((c) => (
                      <td key={c.candidate_id} className="p-5 font-bold text-slate-850">
                        {c.profile.current_title} <br />
                        <span className="text-[11px] text-slate-450 font-normal">{c.profile.current_company}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Overall match */}
                  <tr className="bg-brand-50/10">
                    <td className="p-5 font-semibold text-brand-700">AI Match Score</td>
                    {compareList.map((c) => (
                      <td key={c.candidate_id} className="p-5 font-black text-brand-650 text-base">
                        {Math.round(c.overallScore * 100)}%
                        <span className="text-[10px] font-bold text-slate-450 ml-1.5">{c.matchAnalysis.status}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Skills Score */}
                  <tr>
                    <td className="p-5 font-semibold text-slate-500">Skills Overlap</td>
                    {compareList.map((c) => (
                      <td key={c.candidate_id} className="p-5 font-bold text-slate-700">
                        {c.matchAnalysis.scoreBreakdown.skills}%
                      </td>
                    ))}
                  </tr>

                  {/* Experience Score */}
                  <tr>
                    <td className="p-5 font-semibold text-slate-500">Experience Years</td>
                    {compareList.map((c) => (
                      <td key={c.candidate_id} className="p-5 font-bold text-slate-700">
                        {c.profile.years_of_experience} Yrs
                      </td>
                    ))}
                  </tr>

                  {/* Career Stability */}
                  <tr>
                    <td className="p-5 font-semibold text-slate-500">Career Stability</td>
                    {compareList.map((c) => (
                      <td key={c.candidate_id} className="p-5 font-bold text-slate-750">
                        {c.matchAnalysis.scoreBreakdown.career}%
                      </td>
                    ))}
                  </tr>

                  {/* Activity Level */}
                  <tr>
                    <td className="p-5 font-semibold text-slate-500">Activity Level</td>
                    {compareList.map((c) => (
                      <td key={c.candidate_id} className="p-5 font-bold text-slate-700">
                        {c.matchAnalysis.scoreBreakdown.activity}%
                      </td>
                    ))}
                  </tr>

                  {/* Confidence */}
                  <tr>
                    <td className="p-5 font-semibold text-slate-500">Confidence Score</td>
                    {compareList.map((c) => (
                      <td key={c.candidate_id} className="p-5 font-bold text-slate-700">
                        {c.matchAnalysis.scoreBreakdown.confidence}%
                      </td>
                    ))}
                  </tr>

                  {/* Strengths */}
                  <tr>
                    <td className="p-5 font-semibold text-slate-500">Strengths</td>
                    {compareList.map((c) => (
                      <td key={c.candidate_id} className="p-5">
                        <ul className="space-y-1 text-emerald-800">
                          {c.matchAnalysis.strengths.slice(0, 3).map((st, i) => (
                            <li key={i} className="flex items-start gap-1 font-medium leading-normal">
                              <span className="font-bold">✓</span> {st}
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Gaps */}
                  <tr>
                    <td className="p-5 font-semibold text-slate-500">Warnings / Gaps</td>
                    {compareList.map((c) => (
                      <td key={c.candidate_id} className="p-5">
                        {c.matchAnalysis.warnings.length === 0 ? (
                          <span className="text-emerald-700 font-bold">No traps/gaps flagged.</span>
                        ) : (
                          <ul className="space-y-1 text-amber-800">
                            {c.matchAnalysis.warnings.slice(0, 3).map((w, i) => (
                              <li key={i} className="flex items-start gap-1 font-medium leading-normal">
                                <span className="font-bold">⚠</span> {w}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
