export interface DbUniversity {
  id: string;
  name: string;
  shortName?: string;
  type: "Public" | "Private" | "Community College";
  description: string;
  establishedYear: number;
  
  location: {
    country: string;
    city: string;
    state: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };

  rankings: {
    qsWorld?: number;
    timesHigherEd?: number;
    national?: number;
  };

  media: {
    logoUrl?: string;
    coverImageUrl?: string;
    galleryUrls?: string[];
  };

  stats: {
    totalStudents: number;
    internationalStudentPercentage: number;
    acceptanceRate: number; // Percentage
    studentToFacultyRatio: number;
    estimatedLivingCostUSD: number; // Approximate yearly living expenses
  };

  facilities: string[];

  contactInfo: {
    website: string;
    admissionsEmail: string;
    phone: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface DbProgram {
  id: string;
  universityId: string;
  universityName: string; // Denormalized for faster UI rendering
  
  courseName: string;
  degreeLevel: "Bachelor" | "Master" | "PhD" | "Diploma";
  fieldOfStudy: string;
  discipline: string;

  format: "Full-time" | "Part-time" | "Online";
  duration: {
    value: number;
    unit: "Years" | "Months" | "Semesters";
  };

  tuitionFees: {
    international: {
      amount: number;
      currency: string;
      period: "Year" | "Semester" | "Total";
    };
    domestic: {
      amount: number;
      currency: string;
      period: "Year" | "Semester" | "Total";
    };
  };

  applicationInfo: {
    intakes: string[];
    nextDeadline: string; // ISO 8601 Date string
    applicationFee: {
      amount: number;
      currency: string;
    };
  };

  admissionRequirements: {
    academic: string;
    minimumGPA: number; // Standardized out of 4.0
    
    englishProficiencyMinimums: {
      ielts?: number;
      toefl?: number;
      duolingo?: number;
      pte?: number;
    };
    
    standardizedTests: {
      sat?: "Required" | "Optional" | "Not Required";
      gre?: "Required" | "Optional" | "Not Required";
    };
  };

  careerOutcomes?: {
    employmentRate?: number; // % employed within 6 months
    averageStartingSalaryUSD?: number;
  };

  tags: string[];
  
  createdAt: string;
  updatedAt: string;
}
