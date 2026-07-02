import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  Mail, 
  Phone, 
  Link, 
  GitBranch, 
  CheckCircle, 
  AlertTriangle,
  Award,
  Clock,
  Send,
  DollarSign
} from 'lucide-react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function CandidateDetail({ candidate, setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!candidate) {
    return (
      <div className="p-8 text-center text-slate-500">
        <p>No candidate selected. Please return to discovery page.</p>
        <button onClick={() => setCurrentPage('discovery')} className="text-brand-650 font-bold hover:underline mt-2">
          Back to Discovery
        </button>
      </div>
    );
  }

  const profile = candidate.profile || {};
  const careerHistory = candidate.career_history || [];
  const education = candidate.education || [];
  const skills = candidate.skills || [];
  const signals = candidate.redrob_signals || {};
  const certifications = candidate.certifications || [];
  const languages = candidate.languages || [];
  const analysis = candidate.matchAnalysis || {};

  // Formulate radar data
  const radarData = [
    { subject: 'Semantic Fit', score: analysis.scoreBreakdown.semantic, fullMark: 100 },
    { subject: 'Skills Relevance', score: analysis.scoreBreakdown.skills, fullMark: 100 },
    { subject: 'Experience Fit', score: analysis.scoreBreakdown.experience, fullMark: 100 },
    { subject: 'Career Stability', score: analysis.scoreBreakdown.career, fullMark: 100 },
    { subject: 'Activity Level', score: analysis.scoreBreakdown.activity, fullMark: 100 },
    { subject: 'Profile Quality', score: analysis.scoreBreakdown.quality, fullMark: 100 },
    { subject: 'Confidence', score: analysis.scoreBreakdown.confidence, fullMark: 100 }
  ];

  // Required vs Candidate Skills
  const reqSkillsList = [
    { name: 'Embeddings / Retrieval', status: skills.some(s => ['embeddings', 'retrieval', 'sentence-transformers'].some(k => s.name.toLowerCase().includes(k))) },
    { name: 'Vector DBs (Pinecone/Milvus)', status: skills.some(s => ['pinecone', 'milvus', 'qdrant', 'weaviate', 'vector database'].some(k => s.name.toLowerCase().includes(k))) },
    { name: 'Production Python', status: skills.some(s => s.name.toLowerCase() === 'python') },
    { name: 'Ranking Evaluation (NDCG/MAP)', status: skills.some(s => ['ndcg', 'map', 'mrr', 'evaluation'].some(k => s.name.toLowerCase().includes(k))) }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      {/* Back button */}
      <div>
        <button 
          onClick={() => setCurrentPage('discovery')}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
          Back to Candidate List
        </button>
      </div>

      {/* Main Candidate Header Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex items-start gap-5">
          {/* Avatar Placeholder */}
          <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-650 flex items-center justify-center font-bold text-2xl border border-brand-100 shadow-sm">
            {profile.anonymized_name ? profile.anonymized_name[0].toUpperCase() : 'C'}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{profile.anonymized_name}</h2>
              <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded">
                {candidate.candidate_id}
              </span>
              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                analysis.recommendation === 'Highly Recommended' 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  : analysis.recommendation === 'Recommended'
                  ? 'bg-brand-50 text-brand-700 border-brand-100'
                  : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                {analysis.recommendation}
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-650">
              {profile.current_title} at <span className="text-slate-800 font-bold">{profile.current_company}</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 font-medium">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-350" /> {profile.location}, {profile.country}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-slate-350" /> {profile.years_of_experience} Years Experience</span>
            </div>
          </div>
        </div>

        {/* Big Overall Match score badge */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/50 w-full lg:w-auto">
          <div className="text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">AI Match Score</span>
            <span className="text-3xl font-black text-brand-650">{Math.round(analysis.score * 100)}%</span>
          </div>
          <div className="w-px h-10 bg-slate-200"></div>
          <div className="text-xs text-slate-500 leading-normal max-w-[150px] font-semibold">
            {analysis.status} based on customized weights config
          </div>
        </div>
      </div>

      {/* Tabs navigation panel */}
      <div className="border-b border-slate-200 flex flex-wrap gap-2">
        {['overview', 'skills_experience', 'career_journey', 'behavioral_signals', 'ai_explanation'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-xs font-bold transition-all border-b-2 uppercase tracking-wide ${
              activeTab === tab 
                ? 'border-brand-500 text-brand-700 font-black' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.replace('_', ' & ')}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Professional Summary</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{profile.summary}</p>
              </div>

              {/* Education list */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Education</h3>
                <div className="space-y-4">
                  {education.map((edu, idx) => (
                    <div key={idx} className="flex gap-4 items-start border-b border-slate-50 last:border-0 pb-4 last:pb-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-800">{edu.institution}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {edu.degree} in {edu.field_of_study} ({edu.start_year} - {edu.end_year})
                        </p>
                        <span className="inline-block text-[9px] font-bold text-brand-700 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded">
                          {edu.tier ? edu.tier.replace('_', ' ').toUpperCase() : 'Unknown Tier'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Languages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Certifications</h3>
                  {certifications.length === 0 ? (
                    <p className="text-xs text-slate-400">No verified certifications listed.</p>
                  ) : (
                    <div className="space-y-2">
                      {certifications.map((c, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-650">
                          <Award className="w-4 h-4 text-amber-500" />
                          <span>{c.name} ({c.issuer})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((l, i) => (
                      <span key={i} className="text-xs font-bold bg-slate-55 border border-slate-100 text-slate-700 px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {l.language}: {l.proficiency}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS & EXPERIENCE */}
          {activeTab === 'skills_experience' && (
            <div className="space-y-6">
              {/* Skills overlap checker */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Required Skills Check</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reqSkillsList.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50/50 border border-slate-100 rounded-2xl">
                      {item.status ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      )}
                      <span className="text-xs font-semibold text-slate-700">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills breakdown table list */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">All Profile Skills</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-xs font-bold text-slate-400">
                        <th className="py-2.5 px-3">Skill Name</th>
                        <th className="py-2.5 px-3">Proficiency</th>
                        <th className="py-2.5 px-3">Duration Used</th>
                        <th className="py-2.5 px-3">Endorsements</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs text-slate-700 divide-y divide-slate-50">
                      {skills.map((skill, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="py-3 px-3 font-bold text-slate-850 uppercase tracking-wide">{skill.name}</td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              skill.proficiency === 'expert' ? 'bg-red-50 text-red-700' :
                              skill.proficiency === 'advanced' ? 'bg-indigo-50 text-indigo-700' :
                              'bg-slate-100 text-slate-600'
                            }`}>
                              {skill.proficiency}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-500 font-semibold">{skill.duration_months || 0} Months</td>
                          <td className="py-3 px-3 text-slate-450">{skill.endorsements || 0} Endorsements</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAREER JOURNEY */}
          {activeTab === 'career_journey' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Career Timeline</h3>
              
              <div className="relative border-l border-slate-200 pl-6 ml-4 space-y-8">
                {careerHistory.map((role, idx) => (
                  <div key={idx} className="relative">
                    {/* Bullet marker */}
                    <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-brand-500 shrink-0"></span>
                    
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-black text-slate-850">{role.title}</h4>
                          <p className="text-[11px] font-semibold text-slate-500">{role.company} · <span className="text-slate-400">{role.industry}</span></p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-450 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                          {role.duration_months} Mos ({role.start_date} to {role.end_date || 'Present'})
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{role.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BEHAVIORAL SIGNALS */}
          {activeTab === 'behavioral_signals' && (
            <div className="space-y-6">
              {/* Core activity scorecards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Response Likelihood</span>
                  <p className="text-lg font-black text-slate-800">{Math.round(signals.recruiter_response_rate * 100)}% Rate</p>
                  <p className="text-xs text-slate-500">Recruiter messages replied back on the platform.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">GitHub Activity</span>
                  <p className="text-lg font-black text-slate-800">{signals.github_activity_score}/100</p>
                  <p className="text-xs text-slate-500">Score of commits/PRs in past 12 months.</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Notice Period</span>
                  <p className="text-lg font-black text-slate-800">{signals.notice_period_days} Days</p>
                  <p className="text-xs text-slate-500">Declared notice timeframe before joining.</p>
                </div>
              </div>

              {/* Extended platform activity signals */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Platform Activity & Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-650">
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-semibold">Profile Completeness Score:</span>
                    <span className="font-bold text-slate-800">{signals.profile_completeness_score}%</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-semibold">Signup Date:</span>
                    <span className="font-bold text-slate-800">{signals.signup_date}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-semibold">Last Active Date:</span>
                    <span className="font-bold text-slate-800">{signals.last_active_date}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-semibold">Open to Work Flag:</span>
                    <span className={`font-bold ${signals.open_to_work_flag ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {signals.open_to_work_flag ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-semibold">Preferred Work Mode:</span>
                    <span className="font-bold text-slate-800 uppercase">{signals.preferred_work_mode}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-semibold">Willing to Relocate:</span>
                    <span className="font-bold text-slate-800">{signals.willing_to_relocate ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-semibold">Expected Salary Range:</span>
                    <span className="font-bold text-slate-800">INR {signals.expected_salary_range_inr_lpa?.min} - {signals.expected_salary_range_inr_lpa?.max} LPA</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-50 pb-2">
                    <span className="font-semibold">Offer Acceptance Rate:</span>
                    <span className="font-bold text-slate-800">{signals.offer_acceptance_rate >= 0 ? `${Math.round(signals.offer_acceptance_rate * 100)}%` : 'No history'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AI EXPLANATION */}
          {activeTab === 'ai_explanation' && (
            <div className="space-y-6">
              {/* Math formula */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Scoring Formula Breakdown</h3>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl font-mono text-[11px] text-brand-700 leading-relaxed">
                  Overall Match Score = <br />
                  &nbsp;&nbsp;(Semantic Fit × 25%) + (Skills Fit × 20%) + (Experience Fit × 15%) + <br />
                  &nbsp;&nbsp;(Career Fit × 10%) + (Behavioral Signals × 15%) + (Profile Quality × 10%) + <br />
                  &nbsp;&nbsp;(Confidence × 5%)
                </div>
              </div>

              {/* Strengths & warnings bullets */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">AI Reasoning Logs</h3>
                <div className="space-y-3 text-xs leading-normal">
                  {analysis.strengths.map((s, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-emerald-800 bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl font-medium">
                      <span className="font-bold text-base leading-none">✓</span>
                      {s}
                    </div>
                  ))}
                  {analysis.warnings.map((w, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-amber-800 bg-amber-50/50 border border-amber-100 p-3 rounded-xl font-medium">
                      <span className="font-bold text-base leading-none">⚠</span>
                      {w}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Radar score chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Match Radar Breakdown</h3>
          
          <div className="h-60 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" radius="70%" data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#e2e8f0" fontSize={8} />
                <Radar name="Candidate" dataKey="score" stroke="#0084ff" fill="#0084ff" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4 border-t border-slate-100 pt-6">
            <h4 className="font-bold text-slate-800 text-xs tracking-wider uppercase">Profile Verification Status</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400" /> Verified Email</span>
                <span className={`font-bold ${signals.verified_email ? 'text-emerald-600' : 'text-slate-400'}`}>{signals.verified_email ? 'YES' : 'NO'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-400" /> Verified Phone</span>
                <span className={`font-bold ${signals.verified_phone ? 'text-emerald-600' : 'text-slate-400'}`}>{signals.verified_phone ? 'YES' : 'NO'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><Link className="w-4 h-4 text-slate-400" /> LinkedIn connected</span>
                <span className={`font-bold ${signals.linkedin_connected ? 'text-emerald-600' : 'text-slate-400'}`}>{signals.linkedin_connected ? 'YES' : 'NO'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
