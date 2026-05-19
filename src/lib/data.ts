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
  
  // High weight: Location match
  if (userProfile.studyDestination?.includes(university.country) || userProfile.studyDestination?.includes('Any')) {
    score += 2;
  } else if (userProfile.studyDestination && userProfile.studyDestination.length > 0 && !userProfile.studyDestination.includes(university.country)) {
    score -= 3;
  }

  // Budget vs Tuition
  const isBudgetFriendly = university.tuitionBDT <= userProfile.budgetBDT + 50000; // Small buffer
  if (isBudgetFriendly) {
    score += 2;
  } else if (userProfile.needsFunding && university.scholarshipsAvailable) {
    score += 1;
  } else {
    score -= 3; // Way too expensive
  }

  // GPA matching (if GPA exists for HSC)
  if (userProfile.hscGpa && university.requirements?.minGPA) {
    const gpaDiff = userProfile.hscGpa - university.requirements.minGPA;
    if (gpaDiff >= 0.5) score += 3;
    else if (gpaDiff >= 0) score += 1;
    else score -= 4; // GPA below requirement
  }

  // English Proficiency matching
  if (userProfile.englishTest === 'IELTS' && userProfile.englishScore && university.requirements?.minIELTS) {
    const ieltsDiff = userProfile.englishScore - university.requirements.minIELTS;
    if (ieltsDiff >= 0.5) score += 1;
    else if (ieltsDiff < 0) score -= 2; // Failed minimum English requirement
  }

  // Competitive Tier Weighting
  if (university.tier === 'Top Tier') {
    score -= 2; // Generally harder to get into
  }

  if (score >= 4) return 'Safe';
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
