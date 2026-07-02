import rawCandidates from './candidates.json';
import { calculateMatchScore } from '../utils/scoringEngine';

// Pre-calculate scores with default weights for easy display
export const candidates = rawCandidates.map(c => {
  const analysis = calculateMatchScore(c);
  return {
    ...c,
    matchAnalysis: analysis,
    overallScore: analysis.score
  };
}).sort((a, b) => b.overallScore - a.overallScore);

export { calculateMatchScore };
