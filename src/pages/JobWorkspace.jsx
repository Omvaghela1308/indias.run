import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  HelpCircle, 
  Info, 
  Check, 
  Sliders, 
  Briefcase,
  Lightbulb
} from 'lucide-react';

const PRELOADED_JD = `Job Description: Senior AI Engineer — Founding Team
Company: Redrob AI (Series A AI-native talent intelligence platform)
Location: Pune/Noida, India (Hybrid — flexible cadence) | Open to relocation candidates from Tier-1 Indian cities
Employment Type: Full-time
Experience Required: 5–9 years

We are building a new AI Engineering org from scratch. We need someone who is simultaneously comfortable with deep technical depth in modern ML systems (embeddings, retrieval, ranking, LLMs, fine-tuning) and a scrappy product-engineering attitude.

Things you absolutely need:
- Production experience with embeddings-based retrieval systems (sentence-transformers, OpenAI, BGE, E5)
- Production experience with vector databases or hybrid search infrastructure (Pinecone, Weaviate, Qdrant, Milvus, OpenSearch, FAISS)
- Strong Python skills
- Hands-on experience designing evaluation frameworks for ranking systems (NDCG, MRR, MAP)

Things we'd like you to have:
- LLM fine-tuning experience (LoRA, QLoRA, PEFT)
- Experience with learning-to-rank models (XGBoost, neural)
- Prior exposure to HR-tech or marketplace products
- distributed systems or large-scale inference optimization

Exclusions:
- Title-chasers (switching every 1.5 yrs)
- Pure consulting firm employees (TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini) without prior product experience
- Pure computer vision/speech without NLP exposure`;

export default function JobWorkspace({ weights, setWeights }) {
  const [jdText, setJdText] = useState(PRELOADED_JD);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(true);

  const handleWeightChange = (key, value) => {
    const newWeights = { ...weights, [key]: Number(value) };
    const sum = Object.values(newWeights).reduce((a, b) => a + b, 0);
    // Let users adjust, show error if sum != 100
    setWeights(newWeights);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);
    }, 1500);
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Job Workspace</h1>
        <p className="text-slate-500 text-sm">Define your requirements and customize the AI scoring weights for candidate discovery.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Input & Text */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Job Description</h3>
              <button 
                onClick={() => setJdText('')}
                className="text-xs text-brand-650 font-bold hover:underline"
              >
                Clear
              </button>
            </div>
            
            <textarea
              className="w-full h-96 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-750 font-mono focus:outline-none focus:border-brand-500 focus:bg-white transition-all resize-none leading-relaxed"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste job description here..."
            />

            <div className="flex items-center gap-3">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-grow brand-gradient-bg py-3 rounded-2xl text-xs font-bold hover:shadow-lg hover:shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
                    Extracting Requirements...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Analyze Job with AI
                  </>
                )}
              </button>
              
              <button className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all">
                <Upload className="w-4.5 h-4.5 text-slate-550" />
              </button>
            </div>
          </div>

          {/* Scoring Weight Controls */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm tracking-wider uppercase">
                <Sliders className="w-4 h-4 text-brand-500" />
                Scoring Weights Configuration
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                totalWeight === 100 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-650'
              }`}>
                Total: {totalWeight}%
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Semantic Job Fit</span>
                  <span>{weights.semanticWeight * 100}%</span>
                </div>
                <input 
                  type="range" min="0" max="0.5" step="0.05"
                  value={weights.semanticWeight}
                  onChange={(e) => handleWeightChange('semanticWeight', e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Skills Relevance</span>
                  <span>{weights.skillsWeight * 100}%</span>
                </div>
                <input 
                  type="range" min="0" max="0.4" step="0.05"
                  value={weights.skillsWeight}
                  onChange={(e) => handleWeightChange('skillsWeight', e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Experience Relevance</span>
                  <span>{weights.experienceWeight * 100}%</span>
                </div>
                <input 
                  type="range" min="0" max="0.3" step="0.05"
                  value={weights.experienceWeight}
                  onChange={(e) => handleWeightChange('experienceWeight', e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Career Stability</span>
                  <span>{weights.careerWeight * 100}%</span>
                </div>
                <input 
                  type="range" min="0" max="0.2" step="0.05"
                  value={weights.careerWeight}
                  onChange={(e) => handleWeightChange('careerWeight', e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Activity / Behavioral Signals</span>
                  <span>{weights.activityWeight * 100}%</span>
                </div>
                <input 
                  type="range" min="0" max="0.3" step="0.05"
                  value={weights.activityWeight}
                  onChange={(e) => handleWeightChange('activityWeight', e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Profile Quality</span>
                  <span>{weights.qualityWeight * 100}%</span>
                </div>
                <input 
                  type="range" min="0" max="0.2" step="0.05"
                  value={weights.qualityWeight}
                  onChange={(e) => handleWeightChange('qualityWeight', e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Confidence / Trust</span>
                  <span>{weights.confidenceWeight * 100}%</span>
                </div>
                <input 
                  type="range" min="0" max="0.1" step="0.05"
                  value={weights.confidenceWeight}
                  onChange={(e) => handleWeightChange('confidenceWeight', e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>
            </div>

            {totalWeight !== 100 && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-650 text-[11px] font-medium rounded-xl flex items-center gap-1.5">
                <Info className="w-4 h-4 shrink-0" />
                Scoring weights must sum up to exactly 100% (currently {totalWeight}%).
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Extracted Requirements */}
        <div className="lg:col-span-7 space-y-6">
          {analysisDone ? (
            <div className="space-y-6">
              {/* Job Title & Summary */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Extracted Role Info</span>
                    <h2 className="text-2xl font-black text-slate-800">Senior AI Engineer — Founding Team</h2>
                  </div>
                  <span className="bg-brand-50 text-brand-650 px-3 py-1 rounded-full text-xs font-bold border border-brand-100">
                    High Fit Certainty
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The AI model extracted this role as a founding software/infrastructure role centered on search, information retrieval, and system scoring. It requires a balance of product-led shipping mindset over purely academic NLP research.
                </p>
              </div>

              {/* Requirement Priority Panel */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
                <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Extracted Requirements</h3>
                
                <div className="space-y-4">
                  {/* Must have */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider">Must-Have (Technical)</span>
                    <div className="flex flex-wrap gap-2">
                      {['Embeddings Systems', 'Vector Databases', 'FAISS/Milvus/Pinecone', 'Python Production Code', 'Scoring Metrics (NDCG, MAP)', 'Hybrid Search'].map((req, i) => (
                        <span key={i} className="flex items-center gap-1 bg-slate-55 border border-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-full font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Good to have */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">Good-to-Have (Preferred)</span>
                    <div className="flex flex-wrap gap-2">
                      {['LoRA / QLoRA / PEFT', 'Learning-to-Rank Models', 'HR-Tech Experience', 'Distributed Inference'].map((req, i) => (
                        <span key={i} className="flex items-center gap-1 bg-slate-55 border border-slate-200 text-slate-750 text-xs px-3 py-1.5 rounded-full font-medium">
                          <Check className="w-3.5 h-3.5 text-indigo-500" />
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Exclusions */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase tracking-wider">Explicit Exclusions</span>
                    <div className="flex flex-wrap gap-2">
                      {['Title Chasers (< 1.5 yr tenure)', 'Pure Consulting Only (TCS/Wipro etc.)', 'CV/Speech only (No NLP)'].map((req, i) => (
                        <span key={i} className="flex items-center gap-1 bg-red-50 border border-red-100 text-red-700 text-xs px-3 py-1.5 rounded-full font-medium">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Extra Meta Data info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Target Experience</span>
                  <p className="text-sm font-bold text-slate-800">5 – 9 Years</p>
                  <p className="text-xs text-slate-500">Flexible for exceptional candidates with strong product background.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Notice Period Preferences</span>
                  <p className="text-sm font-bold text-slate-800">Sub 30 Days Preferred</p>
                  <p className="text-xs text-slate-500">Relocation options supported from major Tier-1 cities in India.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center h-full min-h-[300px] space-y-3">
              <Lightbulb className="w-10 h-10 text-brand-300" />
              <h3 className="font-bold text-slate-800">No Job Extracted Yet</h3>
              <p className="text-xs text-slate-450 max-w-sm">Paste a job description on the left and click "Analyze Job with AI" to extract structured keywords, seniority details, and weights.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
