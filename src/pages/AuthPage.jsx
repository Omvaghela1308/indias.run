import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, Building, ArrowRight } from 'lucide-react';

export default function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('recruiter@talentlens.ai');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (email === 'recruiter@talentlens.ai' && password === 'password123') {
        onLoginSuccess({ name: 'Admin Recruiter', email, company: 'TalentLens AI' });
      } else if (email && password) {
        // Allow custom email logins too
        onLoginSuccess({ name: email.split('@')[0], email, company: company || 'TalentLens AI' });
      } else {
        setError('Please enter valid credentials.');
      }
    } else {
      if (email && password && name && company) {
        setIsLogin(true);
        setError('');
        alert('Account created successfully! Please log in.');
      } else {
        setError('Please fill in all fields.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-stretch select-none">
      {/* Form Panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white z-10">
        <div className="max-w-md w-full mx-auto space-y-8">
          {/* Brand header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl brand-gradient-bg flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="font-extrabold text-2xl text-slate-800 tracking-tight">TalentLens AI</h2>
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              {isLogin 
                ? "Discover candidate talent using semantic AI ranking." 
                : "Get started to analyze and discover the right candidates."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-650 text-xs font-semibold rounded-xl">
                {error}
              </div>
            )}

            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-all text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Company Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Acme Corp" 
                      value={company} 
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-all text-slate-800"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-all text-slate-800"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs text-brand-650 hover:underline">Forgot password?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-all text-slate-800"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full brand-gradient-bg py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-brand-500/20 transition-all duration-200 flex items-center justify-center gap-2 mt-6"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social login divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-xs font-medium">Or continue with</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <button 
            type="button" 
            onClick={() => onLoginSuccess({ name: 'Google User', email: 'google@recruiter.com', company: 'Google Partner' })}
            className="w-full bg-white border border-slate-200 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all text-slate-750 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Google account
          </button>

          <p className="text-center text-sm text-slate-500">
            {isLogin ? "New to TalentLens AI? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-brand-650 hover:underline font-bold"
            >
              {isLogin ? "Sign up free" : "Log in"}
            </button>
          </p>
        </div>
      </div>

      {/* Decorative Slide Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-brand-600 via-indigo-600 to-accent-violet p-16 flex-col justify-between text-white relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl"></div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-brand-200" />
          <span className="font-bold text-sm tracking-widest uppercase text-brand-100">Secure AI Authentication</span>
        </div>

        <div className="space-y-6 max-w-lg z-10">
          <blockquote className="text-3xl font-extrabold tracking-tight leading-snug">
            “Evaluating candidates based on multiple signals reduces time-to-hire by 70% while improving technical fit accuracy.”
          </blockquote>
          <div>
            <p className="font-bold text-base text-brand-200">Founder & Chief Recruiter</p>
            <p className="text-xs text-brand-300">Redrob AI Engineering Org</p>
          </div>
        </div>

        <p className="text-xs text-brand-200/60 z-10">
          © 2026 TalentLens AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
