import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUniversities, usePrograms } from '../lib/useUniversities';
import { Button } from '../components/ui/Button';
import { GraduationCap, MapPin, Target, Award, ArrowLeft, Bookmark, Globe, Users, BookOpen, Search, Phone, Mail, ChevronRight, ChevronDown, Check, Scale, X } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
import { motion, AnimatePresence } from 'motion/react';
import { BD_PROGRAMS } from '../lib/bdData';

export function UniversityDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { universities, loading } = useUniversities();
  const { programs: dbPrograms } = usePrograms();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [expandedProgramName, setExpandedProgramName] = useState<string | null>(null);
  const [selectedProgramNames, setSelectedProgramNames] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const toggleCompare = (e: React.MouseEvent, programName: string) => {
    e.stopPropagation();
    setSelectedProgramNames(prev => {
      if (prev.includes(programName)) return prev.filter(name => name !== programName);
      if (prev.length >= 3) {
        alert("You can compare up to 3 programs at a time.");
        return prev;
      }
      return [...prev, programName];
    });
  };

  const uni = universities.find(u => u.id === id);

  const ALL_PROGRAMS = useMemo(() => {
    if (!uni) return [];

    let sourcePrograms = dbPrograms.length > 0 ? dbPrograms : BD_PROGRAMS;
    
    const realPrograms = sourcePrograms.filter(p => p.universityId === uni.id).map(p => ({
      name: p.courseName,
      level: p.degreeLevel,
      category: p.fieldOfStudy,
      rank: p.tags && p.tags.length > 0 ? p.tags[0] : 'Top 100 Globally',
      fees: {
        total: p.tuitionFees?.domestic?.amount * 4 || 0,
        tuition: p.tuitionFees?.domestic?.amount * 0.75 || 0,
        lab: p.tuitionFees?.domestic?.amount * 0.15 || 0,
        admin: p.tuitionFees?.domestic?.amount * 0.10 || 0
      }
    }));

    if (realPrograms.length > 0) return realPrograms;

    const basePrograms = [
      { name: "Computer Science", level: "Undergraduate", category: "Engineering", rank: "Top 10 Globally", multiplier: 1.1 },
      { name: "Artificial Intelligence", level: "Master's", category: "Engineering", rank: "Top 5 Globally", multiplier: 1.25 },
      { name: "Business Administration", level: "Undergraduate", category: "Business", rank: "Top 20 Globally", multiplier: 1.0 },
      { name: "MBA", level: "Master's", category: "Business", rank: "Top 15 Globally", multiplier: 1.3 },
      { name: "Biological Sciences", level: "Undergraduate", category: "Science", rank: "Top 50 Globally", multiplier: 0.95 },
      { name: "Data Science & Analytics", level: "Graduate", category: "Science", rank: "Top 25 Globally", multiplier: 1.15 },
      { name: "Physics", level: "PhD", category: "Science", rank: "Top 40 Globally", multiplier: 0.8 },
      { name: "Economics", level: "Undergraduate", category: "Social Sciences", rank: "Top 25 Globally", multiplier: 0.85 },
      { name: "Mechanical Engineering", level: "Undergraduate", category: "Engineering", rank: "Top 30 Globally", multiplier: 1.05 },
      { name: "Psychology", level: "Undergraduate", category: "Social Sciences", rank: "Top 50 Globally", multiplier: 0.9 },
    ];
    
    // Generate 1000 programs to demonstrate virtualization capability
    const generated = [];
    for (let i = 0; i < 1000; i++) {
      const base = basePrograms[i % basePrograms.length];
      const variant = Math.floor(i / basePrograms.length) + 1;
      
      const total = uni.tuitionBDT * base.multiplier * (1 + (variant * 0.01)); // Slight variation
      generated.push({
        ...base,
        name: i < basePrograms.length ? base.name : `${base.name} (Variant ${variant})`,
        fees: {
          total: total,
          tuition: total * 0.75,
          lab: total * 0.15,
          admin: total * 0.10
        }
      });
    }
    return generated;
  }, [uni]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-medium">Loading university details...</p>
      </div>
    );
  }

  if (!uni) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">University not found</h2>
          <Link to="/results">
            <Button>Back to Results</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(amount);
  };

  const levels = ['All', 'Undergraduate', 'Graduate', "Master's", 'PhD'];

  const filteredPrograms = ALL_PROGRAMS.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          program.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || program.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="flex-1 w-full bg-slate-50 pb-12 sm:pb-16">
      {/* Hero Section */}
      <div className="relative h-[65vh] sm:h-[50vh] min-h-[450px] w-full rounded-b-[2rem] sm:rounded-b-[3rem] overflow-hidden shadow-2xl">
        <img 
          src={uni.imageUrl} 
          alt={uni.name} 
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/10" />
        
        {/* Navigation & Actions */}
        <div className="absolute top-0 left-0 w-full p-4 sm:p-6 lg:p-8 flex justify-between items-start z-10 hidden md:flex">
          <Link to={-1 as any}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors border border-white/20">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          </Link>
        </div>
        
        {/* Mobile Back Button */}
        <div className="absolute top-4 left-4 md:hidden z-10">
          <Link to={-1 as any}>
            <button className="flex items-center justify-center h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors border border-white/20">
              <ArrowLeft className="h-5 w-5" />
            </button>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                <span className="inline-flex items-center rounded-md bg-primary-600 text-white px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-semibold shadow-sm">
                  {uni.tier}
                </span>
                <span className="inline-flex items-center rounded-md bg-white/20 backdrop-blur-md text-white border border-white/20 px-2 py-0.5 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium shadow-sm">
                  <MapPin className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-4 sm:w-4" /> {uni.location}, {uni.country}
                </span>
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg mb-2 sm:mb-3">
                {uni.name}
              </h1>
              <p className="text-slate-200 text-sm sm:text-xl flex items-center font-medium opacity-90">
                <GraduationCap className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                {uni.type} Institution
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex w-full md:w-auto gap-3 shrink-0 mt-3 md:mt-0"
            >
              <Button size="lg" className="flex-1 md:flex-none h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base rounded-xl shadow-xl shadow-primary-600/20">
                Start Application
              </Button>
              <Button size="lg" variant="outline" className="h-12 sm:h-14 w-12 sm:w-14 p-0 shrink-0 rounded-xl bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 shadow-xl">
                <Bookmark className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60"
            >
              <h3 className="font-heading text-2xl font-bold tracking-tight text-slate-900 mb-4">Overview</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {uni.name} is a prestigious {uni.type.toLowerCase()} institution offering world-class education with state-of-the-art facilities and a diverse international community. Renowned for its rigorous academic programs and exceptional faculty, it continuously ranks among the {uni.tier.toLowerCase()} universities globally.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-3">
                    <Target className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{uni.acceptanceRate}%</span>
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">Acceptance</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">24k+</span>
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">Students</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                    <Globe className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold text-slate-900">120+</span>
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-widest mt-1">Nationalities</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60"
            >
              <h3 className="font-heading text-2xl font-bold tracking-tight text-slate-900 mb-6 flex items-center">
                <BookOpen className="mr-3 h-6 w-6 text-primary-500" /> Academic Programs
              </h3>
              
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                  />
                </div>
                
                <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedLevel === level 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredPrograms.length > 0 ? (
                  <div className="min-h-[500px]">
                  <Virtuoso
                    useWindowScroll
                    data={filteredPrograms}
                    itemContent={(i, program) => {
                      const isExpanded = expandedProgramName === program.name;
                      const isSelected = selectedProgramNames.includes(program.name);
                      return (
                        <div className="pb-3">
                          <div className={`flex flex-col p-4 sm:p-5 rounded-2xl border transition-all ${isExpanded ? 'border-primary-200 bg-primary-50/30' : isSelected ? 'border-emerald-300 bg-emerald-50/30 shadow-md' : 'border-slate-100 bg-white hover:border-primary-200 hover:shadow-md'}`}>
                            <div 
                              onClick={() => setExpandedProgramName(isExpanded ? null : program.name)}
                              className="flex flex-col cursor-pointer group"
                            >
                              <div className="flex justify-between items-start gap-4 mb-3">
                                <h4 className={`font-semibold text-lg leading-tight transition-colors ${isSelected ? 'text-emerald-900' : 'text-slate-900 group-hover:text-primary-700'}`}>
                                  {program.name}
                                </h4>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-2 mb-4">
                                <button
                                  onClick={(e) => toggleCompare(e, program.name)}
                                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-md border transition-colors ${
                                    isSelected 
                                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200' 
                                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-800'
                                  }`}
                                >
                                  {isSelected ? 'Added to Compare' : '+ Compare'}
                                </button>
                                <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-md border border-slate-200/50">
                                  {program.level}
                                </span>
                                <span className="text-xs font-medium text-slate-500">
                                  {program.category}
                                </span>
                              </div>
                              
                              <div className="flex items-center justify-between pt-3 border-t border-slate-100/80">
                                <div className="text-xs font-medium text-primary-700 bg-primary-50 px-3 py-1.5 rounded-full border border-primary-100/50 whitespace-nowrap">
                                  {program.rank}
                                </div>
                                <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200/60 group-hover:bg-primary-100 transition-colors shrink-0">
                                  {isExpanded ? (
                                    <ChevronDown className="h-4 w-4 text-primary-600 transition-transform" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-primary-600 transition-transform" />
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-4 mt-4 border-t border-slate-100/60">
                                    <h5 className="text-sm font-semibold text-slate-900 mb-3">Yearly Fee Breakdown</h5>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <span className="block text-xs font-medium text-slate-500 mb-1">Tuition Proper</span>
                                        <span className="block text-sm font-semibold text-slate-900">{formatCurrency(program.fees.tuition)}</span>
                                      </div>
                                      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <span className="block text-xs font-medium text-slate-500 mb-1">Lab Fees</span>
                                        <span className="block text-sm font-semibold text-slate-900">{formatCurrency(program.fees.lab)}</span>
                                      </div>
                                      <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                        <span className="block text-xs font-medium text-slate-500 mb-1">Admin Charges</span>
                                        <span className="block text-sm font-semibold text-slate-900">{formatCurrency(program.fees.admin)}</span>
                                      </div>
                                      <div className="bg-primary-50 p-3 rounded-xl border border-primary-100 shadow-sm">
                                        <span className="block text-xs font-medium text-primary-700 mb-1">Total Fee</span>
                                        <span className="block text-sm font-bold text-primary-900">{formatCurrency(program.fees.total)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      )
                    }}
                  />
                </div>
              ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <BookOpen className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No programs found matching your criteria</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {setSearchTerm(''); setSelectedLevel('All');}}
                      className="mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
              <Button variant="outline" className="w-full mt-6 rounded-xl border-slate-200 hover:bg-slate-50 border-dashed text-slate-600">
                View All {ALL_PROGRAMS.length} Programs
              </Button>
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60"
            >
               <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900 mb-6">Estimated Financials</h3>
               
               <div className="space-y-6">
                 <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Tuition & Fees (Yearly)</p>
                    <p className="text-3xl font-bold text-slate-900">{formatCurrency(uni.tuitionBDT)}</p>
                 </div>
                 
                 <div className="h-px bg-slate-100 w-full" />
                 
                 <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Living Expenses (Yearly)</p>
                    <p className="text-3xl font-bold text-slate-900">~{formatCurrency(800000)}</p>
                    <p className="text-sm text-slate-500 mt-1">Estimate includes housing, food, and transport.</p>
                 </div>
               </div>
            </motion.div>

            {uni.scholarshipsAvailable && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-100"
              >
                <div className="h-12 w-12 bg-white rounded-xl shadow-sm border border-emerald-100 flex items-center justify-center mb-6">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-emerald-950 mb-3">Scholarships Available</h3>
                <p className="text-emerald-800 leading-relaxed mb-6">
                  This university offers merit-based and need-based financial aid for international students, which can cover up to 50% of the tuition costs.
                </p>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg shadow-emerald-600/20 border-none">
                  Check Eligibility
                </Button>
              </motion.div>
            )}
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm text-white"
            >
              <h3 className="font-heading text-xl font-bold tracking-tight mb-4">Application Deadlines</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-slate-800">
                  <span className="text-slate-300">Fall Semester</span>
                  <span className="font-semibold text-white">Dec 15, {new Date().getFullYear()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-800">
                  <span className="text-slate-300">Spring Semester</span>
                  <span className="font-semibold text-white">Oct 1, {new Date().getFullYear()}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/60"
            >
              <h3 className="font-heading text-xl font-bold tracking-tight text-slate-900 mb-6 flex items-center">
                Contact Admissions
              </h3>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-xl shrink-0">
                    <Globe className="h-5 w-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Official Website</p>
                    <a href="#" className="font-medium text-primary-600 hover:text-primary-700 hover:underline block truncate">
                      {uni.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-xl shrink-0">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Admissions Email</p>
                    <a href={`mailto:admissions@${uni.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu`} className="font-medium text-slate-900 hover:text-primary-600 transition-colors block truncate">
                      admissions@{uni.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-xl shrink-0">
                    <Phone className="h-5 w-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Line</p>
                    <a href="tel:+15551234567" className="font-medium text-slate-900 hover:text-primary-600 transition-colors block truncate">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
      {/* Floating Compare Bar */}
      <AnimatePresence>
        {selectedProgramNames.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-[100px] md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[96%] sm:w-auto max-w-xl mx-auto"
          >
            <div className="bg-slate-900 text-white rounded-2xl p-3 sm:p-4 shadow-2xl shadow-slate-900/20 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 sm:gap-4 flex-1">
                <div className="hidden sm:flex h-10 w-10 bg-emerald-600/20 text-emerald-400 rounded-full items-center justify-center shrink-0">
                  <Scale className="h-5 w-5" />
                </div>
                 <div className="pl-1 sm:pl-0">
                  <p className="font-semibold text-sm sm:text-base leading-tight">{selectedProgramNames.length} {selectedProgramNames.length === 1 ? 'Program' : 'Programs'} Selected</p>
                  <p className="text-[11px] sm:text-sm text-slate-400">Select up to 3</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <Button 
                  variant="ghost" 
                  className="text-slate-300 hover:text-white px-2 sm:px-4 text-xs sm:text-sm h-9 sm:h-10"
                  onClick={() => setSelectedProgramNames([])}
                >
                  Clear
                </Button>
                 <Button 
                  disabled={selectedProgramNames.length < 2}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-lg shadow-emerald-600/20 px-3 sm:px-4 text-xs sm:text-base h-9 sm:h-10"
                  onClick={() => setShowCompareModal(true)}
                >
                  Compare
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCompareModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900">Compare Programs</h2>
                   <p className="text-sm sm:text-base text-slate-500">{uni.name}</p>
                </div>
                <button 
                   onClick={() => setShowCompareModal(false)}
                   className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="overflow-auto p-4 sm:p-6 flex-1 bg-slate-50/50">
                <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible">
                  {selectedProgramNames.map(name => {
                     const program = ALL_PROGRAMS.find(p => p.name === name)!;
                     return (
                        <div key={name} className="flex-1 shrink-0 w-[85vw] sm:w-[320px] md:w-auto snap-center bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
                          <div className="p-5 sm:p-6 border-b border-slate-100">
                             <div className="flex justify-between items-start mb-3">
                               <span className="inline-flex items-center rounded-md bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs font-semibold border border-emerald-100">
                                  {program.level}
                               </span>
                               <button onClick={(e) => toggleCompare(e, program.name)} className="text-slate-300 hover:text-red-500 transition-colors">
                                  <X className="h-5 w-5" />
                               </button>
                             </div>
                             <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 leading-tight mb-2">{program.name}</h3>
                             <p className="text-sm font-medium text-slate-500">{program.category}</p>
                          </div>
                           
                          <div className="p-5 sm:p-6 space-y-5 flex-1">
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Total Yearly Fee</p>
                                <p className="text-xl sm:text-2xl font-bold text-primary-600">{formatCurrency(program.fees.total)}</p>
                              </div>

                              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Fee Breakdown</p>
                                <div className="space-y-3">
                                   <div className="flex justify-between items-center text-sm">
                                     <span className="text-slate-500">Tuition</span>
                                     <span className="font-semibold text-slate-900">{formatCurrency(program.fees.tuition)}</span>
                                   </div>
                                    <div className="flex justify-between items-center text-sm">
                                     <span className="text-slate-500">Lab Fees</span>
                                     <span className="font-semibold text-slate-900">{formatCurrency(program.fees.lab)}</span>
                                   </div>
                                    <div className="flex justify-between items-center text-sm">
                                     <span className="text-slate-500">Admin</span>
                                     <span className="font-semibold text-slate-900">{formatCurrency(program.fees.admin)}</span>
                                   </div>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Global Ranking</p>
                                <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                  <Award className="h-4 w-4 text-amber-500" />
                                  <span className="text-sm font-semibold text-slate-700">{program.rank}</span>
                                </div>
                              </div>
                          </div>
                           
                          <div className="p-4 border-t border-slate-100 mt-auto bg-slate-50/50 rounded-b-2xl">
                             <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-none h-11">
                               Apply Now
                             </Button>
                          </div>
                        </div>
                     )
                  })}
                  {selectedProgramNames.length < 3 && (
                    <div className="hidden md:flex flex-1 w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 items-center justify-center min-h-[400px]">
                      <div className="text-center p-6">
                         <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400">
                           <Scale className="h-6 w-6" />
                         </div>
                         <p className="text-sm font-medium text-slate-500">Add another program to compare</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
