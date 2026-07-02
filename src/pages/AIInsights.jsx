import React, { useState } from 'react';
import { Sparkles, Send, BrainCircuit, Search, HelpCircle, User, Bot } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AIInsights({ candidates }) {
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { role: 'bot', text: "Hello! I am your TalentLens AI Copilot. Ask me any question about the candidate dataset, rankings, or talent distributions." }
  ]);

  const stats = {
    hardToFind: ['NDCG / MAP Evaluation', 'Production Vector Index Refresh', 'LoRA / QLoRA PEFT', 'Learning-to-Rank'],
    common: ['Python', 'SQL', 'Git', 'Machine Learning Basics', 'HTML/CSS'],
    locations: [
      { name: 'Noida/NCR', value: 18 },
      { name: 'Pune', value: 12 },
      { name: 'Hyderabad', value: 8 },
      { name: 'Bangalore', value: 6 },
      { name: 'Other', value: 6 }
    ]
  };

  const COLORS = ['#0084ff', '#6366f1', '#8b5cf6', '#06b6d4', '#cbd5e1'];

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatLog(prev => [...prev, { role: 'user', text: userText }]);
    setChatInput('');

    // Generate mock response based on prompt text
    setTimeout(() => {
      let botResponse = "I can help search the pool. Try asking: 'Why is CAND_0004989 ranked higher than CAND_0001195?' or 'Which candidates are immediate joiners?'";
      
      const lowerText = userText.toLowerCase();
      if (lowerText.includes('why') && lowerText.includes('ranked higher')) {
        botResponse = "CAND_0004989 ranks 1st because they have an active product background building search ranking algorithms and a recruiter response rate of 76%. In contrast, adjacent candidates have lower response rates or lacks direct evaluations experience.";
      } else if (lowerText.includes('python') && lowerText.includes('experience')) {
        botResponse = "I found 12 candidates with strong Python skills and 5+ years of experience. Top candidates include Ira Vora (CAND_0000001, 6.9 yrs) and Aarav Kumar (CAND_0000002).";
      } else if (lowerText.includes('immediate') || lowerText.includes('joining') || lowerText.includes('joiners')) {
        botResponse = "The candidates with 0 days notice period are: CAND_0000339 (Content Writer, 8.3 Yrs, 96.8% match) and CAND_0001082 (HR Manager, 5.0 Yrs, 96% match).";
      } else if (lowerText.includes('missing') || lowerText.includes('skills')) {
        botResponse = "The most common missing preferred skills in the pool are 'LoRA/QLoRA Fine-tuning' (only 12% profiles list it) and 'NDCG/Evaluation' (only 18% profiles list it).";
      }

      setChatLog(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  const handlePredefinedQuestion = (q) => {
    setChatInput(q);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 select-none">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Insights & Copilot</h1>
        <p className="text-slate-500 text-sm">Explore market demographics and query candidate intelligence using natural language.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Market Insights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Hard-to-Find Skills</h3>
              <div className="space-y-2">
                {stats.hardToFind.map((skill, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-3 bg-red-50/50 border border-red-100 rounded-xl font-semibold text-red-800">
                    <span>{skill}</span>
                    <span className="text-[10px] bg-red-105 px-2 py-0.5 rounded">&lt;15% profiles</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Abundant Skills</h3>
              <div className="space-y-2">
                {stats.common.map((skill, i) => (
                  <div key={i} className="flex items-center justify-between text-xs p-3 bg-brand-50/50 border border-brand-100 rounded-xl font-semibold text-brand-850">
                    <span>{skill}</span>
                    <span className="text-[10px] bg-brand-100 px-2 py-0.5 rounded">&gt;80% profiles</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location distribution chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-sm tracking-wider uppercase">Location Demographics</h3>
            <div className="h-64 flex flex-col md:flex-row items-center gap-6">
              <div className="h-full w-full md:w-1/2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.locations}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.locations.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs w-full md:w-1/2 font-semibold">
                {stats.locations.map((loc, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-650">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                    <span>{loc.name}: {loc.value} candidates</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Copilot Panel */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-[500px]">
          <div className="space-y-4 flex-grow flex flex-col">
            <div className="flex items-center gap-2 font-bold text-brand-700 text-sm tracking-wider uppercase border-b border-slate-100 pb-3">
              <BrainCircuit className="w-5 h-5 text-brand-500 fill-brand-50" />
              Recruiter Copilot
            </div>

            {/* Chat output */}
            <div className="flex-grow overflow-y-auto space-y-4 max-h-[300px] pr-2">
              {chatLog.map((chat, idx) => (
                <div key={idx} className={`flex items-start gap-2.5 ${chat.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    chat.role === 'user' ? 'bg-indigo-100 text-indigo-700' : 'bg-brand-50 text-brand-650'
                  }`}>
                    {chat.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                    chat.role === 'user' ? 'bg-indigo-50 text-indigo-900 rounded-tr-none' : 'bg-slate-50 text-slate-700 rounded-tl-none'
                  }`}>
                    {chat.text}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick recommendations & prompt input */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex flex-wrap gap-1.5">
              {[
                "Why is CAND_0004989 ranked higher than CAND_0001195?",
                "Which candidates are immediate joiners?",
                "What skills are missing?"
              ].map((q, i) => (
                <button 
                  key={i} 
                  onClick={() => handlePredefinedQuestion(q)}
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 text-[10px] font-bold px-2 py-1 rounded-lg transition-all"
                >
                  {q.slice(0, 35)}...
                </button>
              ))}
            </div>

            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask your AI Recruiter Copilot..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-brand-500 focus:bg-white text-slate-800"
              />
              <button 
                type="submit"
                className="brand-gradient-bg p-2 rounded-xl text-white hover:shadow-md transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
