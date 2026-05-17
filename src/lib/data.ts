export interface University {
  id: string;
  name: string;
  location: string;
  country: string;
  type: 'Public' | 'Private';
  tier: 'Top Tier' | 'Mid Tier' | 'Standard';
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

export const UNIVERSITIES: University[] = [
  // Local BD Universities
  {
    id: 'du',
    name: 'University of Dhaka',
    location: 'Dhaka',
    country: 'Bangladesh',
    type: 'Public',
    tier: 'Top Tier',
    tuitionBDT: 25000,
    acceptanceRate: 5,
    requirements: { minGPA: 5.0 },
    scholarshipsAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'nsu',
    name: 'North South University',
    location: 'Dhaka',
    country: 'Bangladesh',
    type: 'Private',
    tier: 'Top Tier',
    tuitionBDT: 1200000,
    acceptanceRate: 35,
    requirements: { minGPA: 4.0 },
    scholarshipsAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'brac',
    name: 'BRAC University',
    location: 'Dhaka',
    country: 'Bangladesh',
    type: 'Private',
    tier: 'Top Tier',
    tuitionBDT: 1100000,
    acceptanceRate: 40,
    requirements: { minGPA: 4.0 },
    scholarshipsAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=800'
  },
  // Global - Target/Dream Universities
  {
    id: 'harvard',
    name: 'Harvard University',
    location: 'Cambridge, MA',
    country: 'USA',
    type: 'Private',
    tier: 'Top Tier',
    tuitionBDT: 6500000,
    acceptanceRate: 4,
    requirements: { minGPA: 5.0, minIELTS: 7.5, satRecommended: true },
    scholarshipsAvailable: true, // Need-blind
    imageUrl: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mun',
    name: 'Memorial University of Newfoundland',
    location: "St. John's",
    country: 'Canada',
    type: 'Public',
    tier: 'Standard',
    tuitionBDT: 1800000,
    acceptanceRate: 65,
    requirements: { minGPA: 4.0, minIELTS: 6.5 },
    scholarshipsAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1519452319086-4e5b72224da1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tum',
    name: 'Technical University of Munich',
    location: 'Munich',
    country: 'Germany',
    type: 'Public',
    tier: 'Top Tier',
    tuitionBDT: 400000, // Very low tuition in Germany
    acceptanceRate: 8,
    requirements: { minGPA: 4.5, minIELTS: 6.5, acceptsMOI: true },
    scholarshipsAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1592303531474-bb20b72ebf8a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'monash',
    name: 'Monash University',
    location: 'Melbourne',
    country: 'Australia',
    type: 'Public',
    tier: 'Top Tier',
    tuitionBDT: 3500000,
    acceptanceRate: 40,
    requirements: { minGPA: 4.5, minIELTS: 6.5 },
    scholarshipsAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1531234799389-dcb7651eb0a2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'utm',
    name: 'Universiti Teknologi Malaysia',
    location: 'Johor Bahru',
    country: 'Malaysia',
    type: 'Public',
    tier: 'Mid Tier',
    tuitionBDT: 800000,
    acceptanceRate: 60,
    requirements: { minGPA: 3.5, minIELTS: 6.0, acceptsMOI: true },
    scholarshipsAvailable: false,
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800'
  }
];

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
