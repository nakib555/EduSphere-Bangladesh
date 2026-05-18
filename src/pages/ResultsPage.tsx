import React, { useState, useMemo } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { UserProfile, categorizeMatch, University } from '../lib/data';
import { useUniversities } from '../lib/useUniversities';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { GraduationCap, MapPin, DollarSign, Target, Award, ArrowLeft, Bookmark, Filter, SortAsc, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { VirtuosoGrid } from 'react-virtuoso';

export function ResultsPage() {
  const location = useLocation();
  const profile = location.state?.profile as UserProfile | undefined;
  const { universities, loading } = useUniversities();
  const [sortBy, setSortBy] = useState<'relevance' | 'tuition_asc' | 'tuition_desc' | 'acceptance_desc'>('relevance');
  const [onlyScholarships, setOnlyScholarships] = useState(false);

  if (!profile) {
    return <Navigate to="/build-profile" />;
  }

  // Calculate matches
  const processedMatches = useMemo(() => {
    let filtered = universities.map(uni => ({
      university: uni,
      category: categorizeMatch(profile, uni)
    })).filter(match => {
      // Basic filtering based on destination
      if (profile.studyDestination?.length > 0 && !profile.studyDestination.includes('Bangladesh') && match.university.country === 'Bangladesh') {
         return profile.studyDestination.includes('Bangladesh');
      }
      if (profile.studyDestination?.length > 0 && profile.studyDestination.includes('Bangladesh') && profile.studyDestination.length === 1 && match.university.country !== 'Bangladesh') {
         return false;
      }
      if (onlyScholarships && !match.university.scholarshipsAvailable) {
         return false;
      }
      return true;
    });

    if (sortBy === 'tuition_asc') {
      filtered.sort((a, b) => a.university.tuitionBDT - b.university.tuitionBDT);
    } else if (sortBy === 'tuition_desc') {
      filtered.sort((a, b) => b.university.tuitionBDT - a.university.tuitionBDT);
    } else if (sortBy === 'acceptance_desc') {
      filtered.sort((a, b) => b.university.acceptanceRate - a.university.acceptanceRate);
    }

    return filtered;
  }, [universities, profile, sortBy, onlyScholarships]);

  const groupedMatches = {
    Target: processedMatches.filter(m => m.category === 'Target'),
    Safe: processedMatches.filter(m => m.category === 'Safe'),
    Reach: processedMatches.filter(m => m.category === 'Reach'),
  };

  const isGrouped = sortBy === 'relevance';

  const gridComponents = useMemo(() => ({
    List: React.forwardRef<HTMLDivElement, any>(({ style, children, ...props }, ref) => (
      <div
        ref={ref}
        {...props}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        style={style}
      >
        {children}
      </div>
    )),
    Item: ({ children, ...props }: any) => (
      <div {...props} className="flex h-full w-full">
        {children}
      </div>
    )
  }), []);


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
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-3 sm:p-4 mb-8 sm:mb-12 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
            <span className="text-sm font-medium text-slate-500 mr-2 flex items-center shrink-0">
              <SortAsc className="h-4 w-4 mr-1.5" /> Sort
            </span>
            {[
              { label: 'Relevance', value: 'relevance' },
              { label: 'Lowest Tuition', value: 'tuition_asc' },
              { label: 'Highest Acceptance', value: 'acceptance_desc' }
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value as any)}
                className={cn(
                  "px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors shrink-0 outline-none border",
                  sortBy === opt.value
                    ? "bg-primary-50 text-primary-700 border-primary-200 shadow-sm"
                    : "bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center shrink-0 w-full sm:w-auto px-1 sm:px-0 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={onlyScholarships} 
                  onChange={(e) => setOnlyScholarships(e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-slate-300 checked:border-primary-600 checked:bg-primary-600 transition-all focus:outline-none focus:ring-2 focus:ring-primary-600/20 focus:ring-offset-1"
                />
                <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                Scholarships Only
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-10 sm:space-y-16 relative z-10">
          {isGrouped ? (
            (['Target', 'Safe', 'Reach'] as const).map((category, idx) => {
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

                  <VirtuosoGrid
                    useWindowScroll
                    data={categoryMatches}
                    components={gridComponents}
                    itemContent={(index, match) => (
                      <UniversityCard uni={match.university} category={match.category} formatCurrency={formatCurrency} />
                    )}
                  />
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              {processedMatches.length > 0 ? (
                <VirtuosoGrid
                  useWindowScroll
                  data={processedMatches}
                  components={gridComponents}
                  itemContent={(index, match) => (
                    <UniversityCard uni={match.university} category={match.category} formatCurrency={formatCurrency} />
                  )}
                />
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">No Matches Found</h3>
                  <p className="text-slate-500">Try adjusting your filters to see more results.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

const UniversityCard: React.FC<{ uni: University, category?: string, formatCurrency: (n: number) => string }> = ({ uni, category, formatCurrency }) => {
  return (
    <Card className="group w-full overflow-hidden flex flex-col h-full border-slate-200/60 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300">
      <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
        <img 
          src={uni.imageUrl} 
          alt={uni.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          <button className="h-8 w-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-primary-600 transition-colors">
            <Bookmark className="h-4 w-4" />
          </button>
          {category && (
            <span className={cn(
              "px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md text-white backdrop-blur-md border border-white/10 shadow-sm",
              category === 'Safe' ? "bg-emerald-500/80" :
              category === 'Target' ? "bg-primary-600/80" : "bg-amber-500/80"
            )}>
              {category}
            </span>
          )}
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
