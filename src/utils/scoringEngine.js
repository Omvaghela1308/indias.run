// Scoring and Ranking engine for TalentLens AI

const CONSULTING_COMPANIES = ['tcs', 'infosys', 'wipro', 'accenture', 'cognizant', 'capgemini', 'tata consultancy services'];

/**
 * Parses date string or returns default
 */
function parseDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr);
}

/**
 * Calculates months between two dates
 */
function getMonthsBetween(d1, d2) {
  const date1 = new Date(d1);
  const date2 = d2 ? new Date(d2) : new Date('2026-07-02'); // Current date context is July 2026
  return (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth());
}

/**
 * Evaluates a candidate against the Senior AI Engineer role.
 */
export function calculateMatchScore(candidate, weights = {}) {
  const {
    semanticWeight = 0.25,
    skillsWeight = 0.20,
    experienceWeight = 0.15,
    careerWeight = 0.10,
    activityWeight = 0.15,
    qualityWeight = 0.10,
    confidenceWeight = 0.05
  } = weights;

  const profile = candidate.profile || {};
  const careerHistory = candidate.career_history || [];
  const skillsList = candidate.skills || [];
  const signals = candidate.redrob_signals || {};
  const education = candidate.education || [];

  const explanations = [];
  const warnings = [];
  const strengths = [];

  // ==========================================
  // 1. ELIMINATION & TRAP CHECK (Ground Truth & Honeypots)
  // ==========================================
  let isHoneypot = false;
  let isPureConsulting = false;
  let isInactiveTrap = false;

  // Consulting firm check
  const companiesWorked = careerHistory.map(c => (c.company || '').toLowerCase());
  const hasConsulting = companiesWorked.some(comp => CONSULTING_COMPANIES.some(cc => comp.includes(cc)));
  const hasProductCompany = careerHistory.some(c => {
    const comp = (c.company || '').toLowerCase();
    const isConsulting = CONSULTING_COMPANIES.some(cc => comp.includes(cc));
    return !isConsulting && c.industry && !c.industry.toLowerCase().includes('consulting') && !c.industry.toLowerCase().includes('it services');
  });

  if (hasConsulting && !hasProductCompany) {
    isPureConsulting = true;
    warnings.push("Consulting-only background: Candidate has only worked in large service consulting firms (TCS, Infosys, etc.) with no product-company exposure.");
  }

  // Honeypot check: Impossible profiles
  // Trap A: Expert in many skills with 0 months used
  const expertZeroDur = skillsList.filter(s => s.proficiency === 'expert' && (s.duration_months === 0 || !s.duration_months));
  if (expertZeroDur.length >= 4) {
    isHoneypot = true;
    warnings.push(`Honeypot Trap Detected: Candidate claims 'expert' proficiency in ${expertZeroDur.length} skills with 0 months of usage.`);
  }

  // Trap B: Timeline overlap anomaly (e.g. worked somewhere before it existed, or overlapping concurrent fulltime roles)
  let timelineAnomalies = false;
  for (let i = 0; i < careerHistory.length; i++) {
    const role = careerHistory[i];
    if (role.duration_months > 60 && role.company_size === '1-10') {
      // Small company for long duration, might be fine, but check dates
    }
    // Check if total years of experience is much smaller than actual career history duration sum
    const totalHistoryMonths = careerHistory.reduce((sum, r) => sum + (r.duration_months || 0), 0);
    const totalHistoryYears = totalHistoryMonths / 12;
    if (profile.years_of_experience > 0 && totalHistoryYears > profile.years_of_experience + 5) {
      timelineAnomalies = true;
    }
  }
  if (timelineAnomalies) {
    isHoneypot = true;
    warnings.push("Honeypot Trap Detected: Inconsistent experience timeline (career history total exceeds declared years of experience).");
  }

  // Inactive candidate downweighting
  const lastActive = parseDate(signals.last_active_date);
  const currentDate = new Date('2026-07-02');
  const inactiveMonths = lastActive ? (currentDate.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24 * 30.4) : 12;
  
  if (inactiveMonths > 6 && signals.recruiter_response_rate < 0.15) {
    isInactiveTrap = true;
    warnings.push("Inactive Profile: Haven't logged in for 6+ months and response rate is extremely low (under 15%).");
  }

  // ==========================================
  // 2. SCORING COMPONENT CALCULATIONS
  // ==========================================

  // A. Semantic Job Fit (Max: 100)
  let semanticScore = 0;
  const headline = (profile.headline || '').toLowerCase();
  const currentTitle = (profile.current_title || '').toLowerCase();
  const summary = (profile.summary || '').toLowerCase();
  
  // Semantic matches for AI Engineer role
  const matchesTitle = currentTitle.includes('ai') || currentTitle.includes('machine learning') || currentTitle.includes('ml') || currentTitle.includes('nlp') || currentTitle.includes('information retrieval') || currentTitle.includes('search');
  const matchesProductRole = careerHistory.some(r => {
    const desc = (r.description || '').toLowerCase();
    return desc.includes('ranking') || desc.includes('retrieval') || desc.includes('vector') || desc.includes('search') || desc.includes('recommendation') || desc.includes('rag');
  });

  if (matchesTitle) semanticScore += 50;
  if (matchesProductRole) {
    semanticScore += 40;
    strengths.push("Hands-on experience shipping ranking, search, or recommendation systems in a product role.");
  } else if (summary.includes('ranking') || summary.includes('retrieval') || summary.includes('search')) {
    semanticScore += 20;
    strengths.push("Mentions search/retrieval paradigms in profile summary.");
  }
  
  if (headline.includes('senior') || currentTitle.includes('senior') || headline.includes('founding') || headline.includes('lead')) {
    semanticScore += 10;
  }
  semanticScore = Math.min(100, Math.max(0, semanticScore));
  explanations.push(`Semantic alignment: ${matchesTitle ? 'Excellent title match' : 'Title lacks direct AI/ML keyword'} and ${matchesProductRole ? 'shows search/retrieval background' : 'limited search/retrieval history'}.`);

  // B. Skills Fit (Max: 100)
  let skillsScore = 0;
  const reqSkills = ['embeddings', 'sentence-transformers', 'vector database', 'pinecone', 'weaviate', 'qdrant', 'milvus', 'opensearch', 'elasticsearch', 'faiss', 'python', 'ndcg', 'mrr', 'map', 'evaluation', 'retrieval'];
  const prefSkills = ['lora', 'qlora', 'peft', 'xgboost', 'learning to rank', 'fine-tuning', 'distributed systems'];

  const candidateSkillsMap = new Map(skillsList.map(s => [s.name.toLowerCase(), s]));

  let matchedReq = 0;
  let matchedPref = 0;

  reqSkills.forEach(skill => {
    if (candidateSkillsMap.has(skill) || Array.from(candidateSkillsMap.keys()).some(k => k.includes(skill))) {
      matchedReq++;
    }
  });

  prefSkills.forEach(skill => {
    if (candidateSkillsMap.has(skill) || Array.from(candidateSkillsMap.keys()).some(k => k.includes(skill))) {
      matchedPref++;
    }
  });

  // Calculate score based on required/preferred matching
  skillsScore = (matchedReq / 8) * 70 + (matchedPref / 4) * 30;
  skillsScore = Math.min(100, skillsScore);

  if (matchedReq >= 4) {
    strengths.push(`Matches ${matchedReq} core required technical skills including vector search/evaluation concepts.`);
  } else {
    warnings.push("Missing core skills related to evaluation frameworks or hybrid retrieval.");
  }
  explanations.push(`Skills overlap: Matches ${matchedReq} required and ${matchedPref} preferred skills.`);

  // C. Experience Relevance (Max: 100)
  let expScore = 0;
  const yoe = profile.years_of_experience || 0;
  if (yoe >= 5 && yoe <= 9) {
    expScore = 100;
    strengths.push(`Experience of ${yoe} years falls perfectly into the target 5-9 years range.`);
  } else if (yoe >= 4 && yoe < 5) {
    expScore = 80;
    explanations.push(`Years of experience (${yoe} yrs) is slightly below the target 5-9 range, but still strong.`);
  } else if (yoe > 9 && yoe <= 12) {
    expScore = 85;
    explanations.push(`Years of experience (${yoe} yrs) exceeds target range but adds seniority.`);
  } else {
    expScore = Math.max(30, 100 - Math.abs(yoe - 7) * 10);
    warnings.push(`Years of experience (${yoe} yrs) deviates significantly from the target 5-9 range.`);
  }

  // D. Career Progression (Max: 100)
  let careerScore = 80; // default base
  // Check average duration in company
  if (careerHistory.length > 0) {
    const avgDuration = careerHistory.reduce((sum, r) => sum + (r.duration_months || 0), 0) / careerHistory.length;
    if (avgDuration < 18) {
      careerScore -= 20;
      warnings.push("Frequent job changes: Average job duration is less than 1.5 years.");
    } else if (avgDuration >= 36) {
      careerScore += 20;
      strengths.push("High career stability: Average job tenure exceeds 3 years.");
    }
  }
  careerScore = Math.min(100, Math.max(10, careerScore));

  // E. Activity & Behavioral Signals (Max: 100)
  let activityScore = 0;
  const responseRate = signals.recruiter_response_rate || 0;
  const openToWork = signals.open_to_work_flag ? 20 : 0;
  
  // Calculate activity score
  activityScore = (responseRate * 50) + openToWork + (signals.profile_completeness_score * 0.3);
  activityScore = Math.min(100, Math.max(0, activityScore));
  
  if (responseRate > 0.8) {
    strengths.push("Excellent recruiter response rate of " + Math.round(responseRate * 100) + "%.");
  }

  // F. Profile Quality (Max: 100)
  let qualityScore = 0;
  if (signals.verified_email) qualityScore += 30;
  if (signals.verified_phone) qualityScore += 30;
  if (signals.linkedin_connected) qualityScore += 30;
  qualityScore += Math.min(10, (signals.profile_views_received_30d || 0) / 5);
  qualityScore = Math.min(100, qualityScore);

  // G. Confidence / Trust (Max: 100)
  let confidenceScore = 50; // base
  const github = signals.github_activity_score || 0;
  if (github > 50) {
    confidenceScore += 20;
    strengths.push("Active GitHub profile with high activity score.");
  }
  const assessmentsCount = Object.keys(signals.skill_assessment_scores || {}).length;
  if (assessmentsCount > 0) {
    confidenceScore += 15;
    strengths.push(`Completed ${assessmentsCount} verified skill assessments on Redrob.`);
  }
  confidenceScore = Math.min(100, confidenceScore);

  // ==========================================
  // 3. FINAL COMPOSITE SCORE CALCULATION
  // ==========================================
  let overallScore = (
    semanticScore * semanticWeight +
    skillsScore * skillsWeight +
    expScore * experienceWeight +
    careerScore * careerWeight +
    activityScore * activityWeight +
    qualityScore * qualityWeight +
    confidenceScore * confidenceWeight
  );

  // Apply penalties/multipliers based on trap flags
  if (isHoneypot) {
    overallScore = overallScore * 0.1; // downweight to near 0
  } else if (isPureConsulting) {
    overallScore = overallScore * 0.3; // heavily penalize consulting-only profiles
  } else if (isInactiveTrap) {
    overallScore = overallScore * 0.4; // penalize inactive candidates
  }

  // Convert to 0.0 - 1.0 range
  const normalizedScore = Number((overallScore / 100).toFixed(4));

  // Determine Match Status
  let status = "Low Match";
  if (normalizedScore >= 0.85) status = "Excellent Match";
  else if (normalizedScore >= 0.70) status = "Strong Match";
  else if (normalizedScore >= 0.50) status = "Potential Match";

  // Recommendation Badge
  let recommendation = "Low Priority";
  if (normalizedScore >= 0.85 && !isHoneypot && !isPureConsulting) recommendation = "Highly Recommended";
  else if (normalizedScore >= 0.70 && !isHoneypot && !isPureConsulting) recommendation = "Recommended";
  else if (normalizedScore >= 0.50 && !isHoneypot && !isPureConsulting) recommendation = "Consider";

  return {
    score: normalizedScore,
    status,
    recommendation,
    isHoneypot,
    isPureConsulting,
    isInactiveTrap,
    scoreBreakdown: {
      semantic: Math.round(semanticScore),
      skills: Math.round(skillsScore),
      experience: Math.round(expScore),
      career: Math.round(careerScore),
      activity: Math.round(activityScore),
      quality: Math.round(qualityScore),
      confidence: Math.round(confidenceScore)
    },
    strengths,
    warnings,
    explanations
  };
}
