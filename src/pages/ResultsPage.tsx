import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { UserProfile, categorizeMatch, University } from '../lib/data';
import { useUniversities } from '../lib/useUniversities';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { GraduationCap, MapPin, DollarSign, Target, Award, ArrowLeft, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function ResultsPage() {
  const location = useLocation();
  const profile = location.state?.profile as UserProfile | undefined;
  const { universities, loading } = useUniversities();

  if (!profile) {
    return <Navigate to="/build-profile" />;
  }

  // Calculate matches
  const matches = universities.map(uni => ({
    university: uni,
    category: categorizeMatch(profile, uni)
  })).filter(match => {
    // Basic filtering based on destination
    if (profile.studyDestination?.length > 0 && !profile.studyDestination.includes('Bangladesh') && match.university.country === 'Bangladesh') {
       return profile.studyDestination.includes('Bangladesh'); // if not looking for BD, hide BD
    }
    if (profile.studyDestination?.length > 0 && profile.studyDestination.includes('Bangladesh') && profile.studyDestination.length === 1 && match.university.country !== 'Bangladesh') {
       return false; // only looking for bd
    }
    return true;
  });

  const groupedMatches = {
    Safe: matches.filter(m => m.category === 'Safe'),
    Target: matches.filter(m => m.category === 'Target'),
    Reach: matches.filter(m => m.category === 'Reach'),
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="flex-1 w-full bg-slate-50 pb-12 sm:pb-16">
      {/* Header */}
      <div className="bg-primary-950 pb-12 pt-6 sm:pb-16 sm:pt-8 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 sm:w-64 h-48 sm:h-64 bg-primary-800 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-10 w-32 sm:w-40 h-32 sm:h-40 bg-primary-600 rounded-full blur-3xl opacity-20" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/build-profile" className="inline-flex items-center text-primary-200 hover:text-white transition-colors mb-4 sm:mb-6 text-sm font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" /> Edit Profile
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Your University Matches
              </h1>
              <p className="mt-2 text-primary-200 text-sm sm:text-lg">
                Based on your {profile.educationLevel} and {profile.englishTest !== 'None' ? profile.englishScore + ' in ' + profile.englishTest : 'preferences'}.
              </p>
            </div>
            <div className="flex flex-row bg-primary-900/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 gap-4 sm:gap-6 lg:gap-8 backdrop-blur-md border border-primary-800 shadow-xl shadow-primary-950/20 shrink-0">
              <div className="flex-1 sm:flex-none">
                <p className="text-[10px] sm:text-xs text-primary-300 font-medium uppercase tracking-wider mb-1.5 flex items-center">
                  <DollarSign className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Budget
                </p>
                <p className="font-heading font-semibold text-white text-base sm:text-lg">{formatCurrency(profile.budgetBDT)}/yr</p>
              </div>
              <div className="w-px bg-primary-800/50" />
              <div className="flex-1 sm:flex-none">
                <p className="text-[10px] sm:text-xs text-primary-300 font-medium uppercase tracking-wider mb-1.5 flex items-center">
                  <Target className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" /> Major
                </p>
                <p className="font-heading font-semibold text-white text-base sm:text-lg line-clamp-1">{profile.intendedMajor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-10 sm:space-y-16 relative z-10">
          {(['Target', 'Safe', 'Reach'] as const).map((category, idx) => {
            const categoryMatches = groupedMatches[category];
            if (categoryMatches.length === 0) return null;

            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm",
                    category === 'Safe' ? "bg-emerald-500" :
                    category === 'Target' ? "bg-primary-600" : "bg-amber-500"
                  )}>
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-slate-900">{category} Matches</h2>
                    <p className="text-sm text-slate-500">
                      {category === 'Safe' ? "You exceed historical requirements." :
                       category === 'Target' ? "You perfectly align with the typical accepted profile." :
                       "Competitive, but possible with strong SOP and extracurriculars."}
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryMatches.map(({ university }) => (
                    <UniversityCard key={university.id} uni={university} formatCurrency={formatCurrency} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const UniversityCard: React.FC<{ uni: University, formatCurrency: (n: number) => string }> = ({ uni, formatCurrency }) => {
  return (
    <Card className="group overflow-hidden flex flex-col h-full border-slate-200/60 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
        <img 
          src={uni.imageUrl} 
          alt={uni.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
        <div className="absolute top-3 right-3">
          <button className="h-8 w-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-primary-600 transition-colors">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex gap-2">
            <span className="inline-flex items-center rounded-md bg-white/20 backdrop-blur-md px-2 py-1 text-xs font-medium text-white border border-white/10">
              <MapPin className="mr-1 h-3 w-3" /> {uni.location}, {uni.country}
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="flex-1 p-5 flex flex-col">
        <div className="mb-4">
          <h3 className="font-heading text-lg font-bold leading-tight text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-1">
            {uni.name}
          </h3>
          <p className="text-sm text-slate-500 mt-1 flex items-center">
            <GraduationCap className="mr-1.5 h-3.5 w-3.5" />
            {uni.type} • {uni.tier}
          </p>
        </div>
        
        <div className="space-y-3 mb-6 mt-auto">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 flex items-center"><DollarSign className="mr-1.5 h-4 w-4 text-slate-400"/> Tuition/yr</span>
            <span className="font-medium text-slate-900">{formatCurrency(uni.tuitionBDT)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500 flex items-center"><Target className="mr-1.5 h-4 w-4 text-slate-400"/> Acceptance</span>
            <span className="font-medium text-slate-900">{uni.acceptanceRate}%</span>
          </div>
          {uni.scholarshipsAvailable && (
            <div className="flex items-center text-sm text-emerald-600 bg-emerald-50 px-2 py-1.5 rounded-md">
              <Award className="mr-1.5 h-4 w-4" /> Scholarships Available
            </div>
          )}
        </div>
        
        <Link to={`/university/${uni.id}`} className="mt-auto block">
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
