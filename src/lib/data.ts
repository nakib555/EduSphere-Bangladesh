import { BD_UNIVERSITIES } from './bdData';

export interface University {
  id: string;
  name: string;
  location: string;
  country: string;
  type: string;
  tier: string;
  tuitionBDT: number;
  acceptanceRate: number;
  requirements: {
    minGPA?: number;
    minIELTS?: number;
    acceptsMOI?: boolean;
    satRecommended?: boolean;
  };
  scholarshipsAvailable: boolean;
  imageUrl: string;
}

// Convert the new BD_UNIVERSITIES to the existing University format for the rest of the app to use
export const UNIVERSITIES: University[] = BD_UNIVERSITIES.map(u => ({
  id: u.id,
  name: u.name,
  location: u.location.city,
  country: u.location.country,
  type: u.type,
  tier: u.rankings.national <= 3 ? 'Top Tier' : 'Mid Tier',
  tuitionBDT: u.stats.estimatedLivingCostUSD * 110, // Assuming 1 USD = 110 BDT
  acceptanceRate: u.stats.acceptanceRate,
  requirements: { minGPA: 4.0 }, 
  scholarshipsAvailable: true,
  imageUrl: u.media.coverImageUrl
}));

export function categorizeMatch(userProfile: UserProfile, university: University): 'Safe' | 'Target' | 'Reach' {

  let score = 0;
  
  // Basic mock logic for matches
  if (!userProfile.hscGpa) return 'Target';

  const gpaDiff = userProfile.hscGpa - (university.requirements.minGPA || 3.0);
  if (gpaDiff >= 0.5) score += 2;
  else if (gpaDiff >= 0) score += 1;
  else score -= 2;

  if (university.tuitionBDT > userProfile.budgetBDT && !userProfile.needsFunding && userProfile.budgetBDT > 0) {
    score -= 3; // Way too expensive without funding requirement
  }

  if (score >= 2) return 'Safe';
  if (score >= 0) return 'Target';
  return 'Reach';
}

export interface UserProfile {
  name: string;
  educationLevel: 'HSC' | 'A-Levels' | 'Bachelors';
  hscGpa?: number;
  studyDestination: string[];
  intendedMajor: string;
  budgetBDT: number;
  needsFunding: boolean;
  englishTest: 'IELTS' | 'TOEFL' | 'Duolingo' | 'None';
  englishScore?: number;
}
