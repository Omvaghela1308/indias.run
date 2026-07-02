import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  BrainCircuit, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Database,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function LandingPage({ setCurrentPage, isAuthenticated }) {
  const capabilities = [
    {
      title: "Deep Job Understanding",
      desc: "Interpret complex job descriptions, skills, responsibilities, seniority, notice periods, and more.",
      icon: BrainCircuit,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Semantic Candidate Matching",
      desc: "Go beyond simple keyword matching. Show semantic similarity between the job description and candidate profiles.",
      icon: Search,
      color: "from-indigo-500 to-violet-500"
    },
    {
      title: "Multi-Signal Intelligence",
      desc: "Integrate profile attributes, skills, experience, and critical behavioral activity signals.",
      icon: Layers,
      color: "from-cyan-500 to-blue-500"
    },
    {
      title: "Explainable AI Ranking",
      desc: "Provide transparent scoring breakdown and reasoning for every single candidate rank.",
      icon: ShieldCheck,
      color: "from-violet-500 to-purple-500"
    }
  ];

  const steps = [
    { num: "01", title: "Add Job Description", desc: "Paste or upload the role details" },
    { num: "02", title: "AI Extracts Requirements", desc: "Core & preferred skills identified" },
    { num: "03", title: "Candidate Data Analyzed", desc: "Profiles parsed and structured" },
    { num: "04", title: "Signals Are Weighted", desc: "Behavioral & capability metrics combined" },
    { num: "05", title: "Ranked Shortlist Ready", desc: "Top matching candidates ranked" }
  ];

  const handleCTA = () => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('auth');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-brand-200">
      {/* Top Header Navbar */}
      <nav className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('landing')}>
          <div className="w-9 h-9 rounded-lg brand-gradient-bg flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <span className="font-bold text-slate-800 text-lg">TalentLens AI</span>
        </div>
        <button
          onClick={handleCTA}
          className="brand-gradient-bg px-5 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-brand-500/20 transition-all duration-200"
        >
          {isAuthenticated ? "Go to Dashboard" : "Launch TalentLens AI"}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-650">
            <Sparkles className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
            Hackathon Proof of Concept
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-sans">
            Hire Smarter with <span className="brand-gradient-text">Intelligent Candidate Discovery</span>
          </h1>
          <p className="text-lg text-slate-650 max-w-xl font-normal leading-relaxed">
            TalentLens AI understands job requirements, evaluates candidate signals, and delivers explainable ranked shortlists in seconds. Discover the right talent beyond keywords.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={handleCTA}
              className="brand-gradient-bg px-7 py-3.5 rounded-full text-base font-semibold hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-200 flex items-center gap-2"
            >
              Start Candidate Discovery
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#how-it-works"
              className="bg-white border border-slate-200 text-slate-700 px-7 py-3.5 rounded-full text-base font-semibold hover:bg-slate-50 transition-all duration-200"
            >
              Explore How It Works
            </a>
          </div>
        </div>

        {/* Animated Visual Panel */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[380px]">
          {/* Radar background circle */}
          <div className="absolute w-80 h-80 border-2 border-brand-100 rounded-full animate-ping opacity-25"></div>
          <div className="absolute w-64 h-64 border border-indigo-100 rounded-full opacity-60"></div>
          <div className="absolute w-48 h-48 border border-cyan-100 rounded-full opacity-60"></div>

          {/* Floating Candidate Cards */}
          <div className="relative w-full space-y-4 max-w-sm z-15">
            <div className="bg-white/95 p-4 rounded-2xl border border-slate-100 shadow-xl flex items-center justify-between animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-slate-700">IV</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Ira Vora</h4>
                  <p className="text-xs text-slate-400">Backend Engineer</p>
                </div>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                99.2% Match
              </div>
            </div>

            <div className="bg-white/95 p-4 rounded-2xl border border-slate-100 shadow-xl flex items-center justify-between translate-x-6 animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-50 border border-cyan-100 flex items-center justify-center font-bold text-slate-700">AK</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Aarav Kumar</h4>
                  <p className="text-xs text-slate-400">ML Specialist</p>
                </div>
              </div>
              <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
                88.0% Match
              </div>
            </div>

            <div className="bg-white/95 p-4 rounded-2xl border border-slate-100 shadow-xl flex items-center justify-between -translate-x-4 animate-bounce" style={{ animationDuration: '5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-50 border border-violet-100 flex items-center justify-center font-bold text-slate-700">NS</div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Neha Sharma</h4>
                  <p className="text-xs text-slate-400">AI Platform Lead</p>
                </div>
              </div>
              <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                95.8% Match
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section A: Challenge Overview */}
      <section className="bg-white py-20 border-y border-slate-200/50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">Why traditional recruiting fails</h2>
          <p className="text-lg text-slate-650 leading-relaxed font-normal">
            Traditional recruiting software filters candidates strictly on simple keyword matching. This lets "keyword stuffers" easily bypass the system while hiding high-quality candidates who write their profiles differently. 
            <strong className="block mt-4 text-slate-800 font-semibold">
              TalentLens AI uses semantic candidate profiling, multi-signal intelligence, and deep job understanding to find actual product builders.
            </strong>
          </p>
        </div>
      </section>

      {/* Section B: Key Capabilities */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900">Key Capabilities</h2>
          <p className="text-slate-500">Intelligent screening powered by behavioral signals and semantic matching</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm glow-hover transition-all duration-300">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-6`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-3">{c.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section C: How It Works */}
      <section id="how-it-works" className="bg-slate-100/50 py-20 border-y border-slate-200/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">How It Works</h2>
            <p className="text-slate-500">The 5-step end-to-end intelligent matching journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
            {steps.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/50 relative shadow-sm">
                <span className="text-3xl font-extrabold text-brand-100 block mb-3 font-sans">{s.num}</span>
                <h4 className="font-bold text-sm text-slate-800 mb-1">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-normal">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section D: Why It Is Different */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900">The Next Generation of Recruitment</h2>
          <p className="text-slate-500">How TalentLens AI compares to traditional systems</p>
        </div>

        <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-5 text-sm font-bold text-slate-500">Feature</th>
                <th className="p-5 text-sm font-bold text-red-650 bg-red-50/30">Traditional ATS</th>
                <th className="p-5 text-sm font-bold text-brand-650 bg-brand-50/30">TalentLens AI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="p-5 font-semibold text-slate-800">Matching Mode</td>
                <td className="p-5 text-slate-500 flex items-center gap-1.5"><XCircle className="w-4.5 h-4.5 text-red-500 shrink-0" /> Simple Keyword Filtering</td>
                <td className="p-5 text-slate-800 font-medium bg-brand-50/10 flex items-center gap-1.5"><CheckCircle2 className="w-4.5 h-4.5 text-brand-500 shrink-0" /> Deep Semantic Match</td>
              </tr>
              <tr>
                <td className="p-5 font-semibold text-slate-800">Scoring Mechanism</td>
                <td className="p-5 text-slate-500"><div className="flex items-center gap-1.5"><XCircle className="w-4.5 h-4.5 text-red-500 shrink-0" /> Hidden / Blackbox score</div></td>
                <td className="p-5 text-slate-800 font-medium bg-brand-50/10"><div className="flex items-center gap-1.5"><CheckCircle2 className="w-4.5 h-4.5 text-brand-500 shrink-0" /> Multi-Signal Explainable AI</div></td>
              </tr>
              <tr>
                <td className="p-5 font-semibold text-slate-800">Anti-Cheat Checks</td>
                <td className="p-5 text-slate-500"><div className="flex items-center gap-1.5"><XCircle className="w-4.5 h-4.5 text-red-500 shrink-0" /> Vulnerable to keyword stuffing</div></td>
                <td className="p-5 text-slate-800 font-medium bg-brand-50/10"><div className="flex items-center gap-1.5"><CheckCircle2 className="w-4.5 h-4.5 text-brand-500 shrink-0" /> Honeypot & Timeline detection</div></td>
              </tr>
              <tr>
                <td className="p-5 font-semibold text-slate-800">Behavior Integration</td>
                <td className="p-5 text-slate-500"><div className="flex items-center gap-1.5"><XCircle className="w-4.5 h-4.5 text-red-500 shrink-0" /> Ignored activity state</div></td>
                <td className="p-5 text-slate-800 font-medium bg-brand-50/10"><div className="flex items-center gap-1.5"><CheckCircle2 className="w-4.5 h-4.5 text-brand-500 shrink-0" /> 23 Behavioral Signals parsed</div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section E: Dataset Intelligence */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-brand-500/25 border border-brand-500/30 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-300">
              <Database className="w-3.5 h-3.5" />
              Real Hackathon Data Source
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Structured Data & Validation</h2>
            <p className="text-slate-400 leading-relaxed font-normal text-sm lg:text-base">
              The platform incorporates mock analysis and validation built around the exact candidate dataset structure and rules in the official hackathon files. Ensure compliance with columns, rank, non-increasing score, and formatting checks before creating your final submission.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-slate-300 text-xs">
                <div className="w-5 h-5 rounded bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold">✓</div>
                candidates.jsonl integration
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs">
                <div className="w-5 h-5 rounded bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold">✓</div>
                submission_spec schema
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs">
                <div className="w-5 h-5 rounded bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold">✓</div>
                redrob_signals documentation
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs">
                <div className="w-5 h-5 rounded bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold">✓</div>
                validate_submission flow
              </div>
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700/50 space-y-4">
            <h4 className="font-bold text-slate-200 text-sm tracking-wider uppercase">Validation Sandbox Output</h4>
            <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-brand-300 space-y-2 border border-slate-900">
              <p className="text-slate-500">// Running validate_submission.py...</p>
              <p className="text-emerald-400">✓ Header columns validation: OK (candidate_id,rank,score,reasoning)</p>
              <p className="text-emerald-400">✓ Checked 100 rows: OK</p>
              <p className="text-emerald-400">✓ Score non-increasing rule: OK</p>
              <p className="text-emerald-400">✓ Honeypot threshold check: OK (0% detected)</p>
              <p className="text-emerald-400 font-bold">Submission is valid.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section F: CTA Footer */}
      <section className="bg-brand-50 py-20 text-center border-t border-brand-100">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">Ready to discover your next best hire?</h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm lg:text-base">
            Get started with TalentLens AI to analyze requirements, filter trap profiles, and discover premium candidates now.
          </p>
          <button
            onClick={handleCTA}
            className="brand-gradient-bg px-8 py-4 rounded-full text-base font-bold hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-200 inline-flex items-center gap-2"
          >
            Launch TalentLens AI
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
