import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { UserProfile } from '../lib/data';
import { ChevronRight, ArrowLeft, GraduationCap, Award, Map, User, Check, Globe2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function ProfileBuilderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    educationLevel: 'HSC',
    englishTest: 'None',
    needsFunding: false,
    studyDestination: [],
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleNext = () => { setStep((s) => Math.min(s + 1, 4)); scrollToTop(); };
  const handlePrev = () => { setStep((s) => Math.max(s - 1, 1)); scrollToTop(); };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      handleNext();
    } else {
      navigate('/results', { state: { profile: profile as UserProfile } });
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const destinations = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'Malaysia', 'Bangladesh'];
  
  const stepIcons = [User, GraduationCap, Award, Map];

  return (
    <div className="flex-1 w-full bg-slate-50 pb-12 sm:pb-16 relative">
      
      {/* Decorative Top Background */}
      <div className="absolute top-0 left-0 right-0 h-72 sm:h-96 bg-primary-950 overflow-hidden rounded-b-[2rem] sm:rounded-b-[3rem] shadow-2xl shadow-primary-900/20 z-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary-900/40 blur-3xl opacity-60" />
          <div className="absolute top-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary-800/30 blur-3xl opacity-60" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6 pt-4 sm:pt-12 lg:pt-16">
        
        {/* Header & Progress */}
        <div className="mb-4 sm:mb-10 text-center">
           <span className="inline-flex items-center rounded-full bg-white/10 px-2 sm:px-3 py-1 font-medium text-primary-200 border border-white/20 mb-2 sm:mb-4 backdrop-blur-md text-[10px] sm:text-sm">
             <Globe2 className="mr-1.5 h-3 w-3 sm:h-4 sm:w-4" /> Global Admissions
           </span>
           <h1 className="text-xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4 sm:mb-8">
             Build Your Profile
           </h1>
           
           {/* Custom Progress Bar */}
           <div className="flex justify-between items-center relative max-w-[280px] sm:max-w-md mx-auto">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-white/20 rounded-full" />
             <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-400 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${((step - 1) / 3) * 100}%` }} 
             />
             
             {[1, 2, 3, 4].map((i) => {
               const Icon = stepIcons[i-1];
               const isActive = step === i;
               const isCompleted = step > i;
               return (
                 <div key={i} className="relative z-10 flex flex-col items-center">
                   <div className={cn(
                     "h-8 w-8 sm:h-12 sm:w-12 rounded-full flex items-center justify-center border-2 sm:border-4 transition-all duration-300",
                     isActive ? "bg-primary-500 border-primary-950 text-white shadow-lg shadow-primary-500/30 scale-110" : 
                     isCompleted ? "bg-primary-400 border-primary-950 text-primary-950" : 
                     "bg-primary-900 border-primary-950 text-primary-400"
                   )}>
                     {isCompleted ? <Check className="h-4 w-4 sm:h-6 sm:w-6" /> : <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />}
                   </div>
                 </div>
               );
             })}
           </div>
        </div>

        {/* Floating Form Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -20, y: -10 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
          >
            <Card className="border-0 shadow-2xl shadow-slate-200/60 rounded-3xl overflow-hidden bg-white/95 backdrop-blur-xl">
              <form onSubmit={handleSubmit}>
                <div className="bg-slate-50/50 px-5 sm:px-8 py-4 sm:py-6 border-b border-slate-100 flex items-center justify-between">
                  <Button type="button" variant="ghost" size="sm" onClick={() => step > 1 ? handlePrev() : navigate('/')} className="text-slate-500 hover:bg-slate-200/50 -ml-2 rounded-xl">
                    <ArrowLeft className="mr-1.5 h-4 w-4" /> Back
                  </Button>
                  <span className="text-[10px] sm:text-sm font-bold text-slate-400 tracking-widest uppercase">Step {step} of 4</span>
                </div>

                <CardHeader className="px-5 sm:px-8 pt-5 sm:pt-8 pb-2 sm:pb-4">
                  <CardTitle className="text-lg sm:text-3xl font-bold font-heading text-slate-800">
                    {step === 1 && "Let's get to know you"}
                    {step === 2 && "Academic Background"}
                    {step === 3 && "English Proficiency"}
                    {step === 4 && "Preferences & Budget"}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-base text-slate-500 mt-1 sm:mt-2">
                    {step === 1 && "What's your name and current education level?"}
                    {step === 2 && "Help us understand your latest academic standing."}
                    {step === 3 && "Universities need to know your English skills."}
                    {step === 4 && "Where do you want to go and what's your budget?"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="px-5 sm:px-8 pb-5 sm:pb-8 space-y-4 sm:space-y-8">
                  {step === 1 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="mb-1.5 block text-xs sm:text-sm font-bold text-slate-700">Full Name</label>
                        <Input 
                          required 
                          placeholder="e.g. Asif Rahman" 
                          value={profile.name || ''} 
                          onChange={(e) => updateProfile({ name: e.target.value })} 
                          className="h-12 sm:h-14 bg-slate-50 border-slate-200 text-sm sm:text-lg rounded-xl sm:rounded-2xl focus:bg-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-bold text-slate-700">Latest Education Level</label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {['HSC', 'A-Levels', 'Bachelors'].map((level) => (
                            <div
                              key={level}
                              onClick={() => updateProfile({ educationLevel: level as any })}
                              className={cn(
                                "cursor-pointer rounded-xl sm:rounded-2xl border-2 p-2 sm:p-4 text-center transition-all flex items-center justify-center",
                                profile.educationLevel === level 
                                  ? "border-primary-600 bg-primary-50 text-primary-900 shadow-md transform scale-[1.02]" 
                                  : "border-slate-100 bg-white hover:border-slate-200 text-slate-600 hover:bg-slate-50"
                              )}
                            >
                              <span className="font-bold text-xs sm:text-base">{level === 'Bachelors' ? 'Bachelor' : level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-bold text-slate-700">
                          {profile.educationLevel === 'HSC' ? 'HSC GPA' : profile.educationLevel === 'Bachelors' ? 'CGPA' : 'Best 3 A-Level Grades'}
                        </label>
                        {profile.educationLevel !== 'A-Levels' ? (
                          <Input 
                            required 
                            type="number" 
                            step="0.01" 
                            placeholder={profile.educationLevel === 'HSC' ? "e.g. 5.00" : "e.g. 3.84"} 
                            value={profile.hscGpa || ''} 
                            onChange={(e) => updateProfile({ hscGpa: parseFloat(e.target.value) })}
                            className="h-12 sm:h-14 bg-slate-50 border-slate-200 text-sm sm:text-lg rounded-xl sm:rounded-2xl focus:bg-white"
                          />
                        ) : (
                          <Input placeholder="e.g. A*AA" className="h-12 sm:h-14 bg-slate-50 border-slate-200 text-sm sm:text-lg rounded-xl sm:rounded-2xl focus:bg-white" />
                        )}
                      </div>
                      <div>
                        <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-bold text-slate-700">Intended Major / Program</label>
                        <Input 
                          required 
                          placeholder="e.g. Computer Science, BBA" 
                          value={profile.intendedMajor || ''} 
                          onChange={(e) => updateProfile({ intendedMajor: e.target.value })}
                          className="h-12 sm:h-14 bg-slate-50 border-slate-200 text-sm sm:text-lg rounded-xl sm:rounded-2xl focus:bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-bold text-slate-700">Have you taken an English Test?</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                          {['IELTS', 'TOEFL', 'Duolingo', 'None'].map((test) => (
                            <div
                              key={test}
                              onClick={() => updateProfile({ englishTest: test as any })}
                              className={cn(
                                "cursor-pointer rounded-xl sm:rounded-2xl border-2 p-2 sm:p-3 text-center transition-all flex items-center justify-center",
                                profile.englishTest === test 
                                  ? "border-primary-600 bg-primary-50 text-primary-900 shadow-md transform scale-[1.02]" 
                                  : "border-slate-100 bg-white hover:border-slate-200 text-slate-600"
                              )}
                            >
                              <span className="font-bold text-xs sm:text-sm tracking-wide">{test}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {profile.englishTest !== 'None' && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-2">
                            <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-bold text-slate-700">Overall Score</label>
                            <Input 
                              required 
                              type="number" 
                              step="0.5" 
                              placeholder="e.g. 7.5" 
                              value={profile.englishScore || ''} 
                              onChange={(e) => updateProfile({ englishScore: parseFloat(e.target.value) })}
                              className="h-12 sm:h-14 bg-slate-50 border-slate-200 text-sm sm:text-lg rounded-xl sm:rounded-2xl focus:bg-white w-full sm:w-1/2"
                            />
                          </motion.div>
                        )}
                        {profile.englishTest === 'None' && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                            <p className="text-xs sm:text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200 p-3 sm:p-4 rounded-xl sm:rounded-2xl mt-4">
                              Don't worry! We'll show you universities that accept MOI (Medium of Instruction) or give conditional offers.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4 sm:space-y-8">
                      <div>
                        <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-bold text-slate-700">Yearly Budget (in BDT)</label>
                        <Input 
                          required 
                          type="number" 
                          placeholder="e.g. 1500000" 
                          value={profile.budgetBDT || ''} 
                          onChange={(e) => updateProfile({ budgetBDT: parseFloat(e.target.value) })}
                          className="h-12 sm:h-14 bg-slate-50 border-slate-200 text-sm sm:text-lg font-semibold rounded-xl sm:rounded-2xl focus:bg-white"
                        />
                      </div>
                      
                      <div>
                        <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-bold text-slate-700">Preferred Destinations</label>
                        <div className="flex flex-wrap gap-2 sm:gap-2.5">
                          {destinations.map(dest => {
                            const isSelected = (profile.studyDestination || []).includes(dest);
                            return (
                              <div
                                key={dest}
                                onClick={() => {
                                  const current = profile.studyDestination || [];
                                  const updated = isSelected 
                                    ? current.filter(d => d !== dest)
                                    : [...current, dest];
                                  updateProfile({ studyDestination: updated });
                                }}
                                className={cn(
                                  "cursor-pointer rounded-full border-2 px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm font-bold transition-all",
                                  isSelected
                                    ? "border-primary-600 bg-primary-600 text-white shadow-md shadow-primary-600/30 transform scale-[1.02]"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                )}
                              >
                                {isSelected && <Check className="inline-block w-3 sm:w-4 h-3 sm:h-4 mr-1 sm:mr-1.5 -mt-0.5" />}
                                {dest}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border-2 border-primary-100 bg-primary-50 p-3 sm:p-5 cursor-pointer hover:border-primary-300 transition-colors" onClick={() => updateProfile({ needsFunding: !profile.needsFunding })}>
                        <div className="relative flex items-center mt-0.5">
                          <input
                            type="checkbox"
                            checked={profile.needsFunding}
                            onChange={(e) => updateProfile({ needsFunding: e.target.checked })}
                            className="peer h-5 sm:h-6 w-5 sm:w-6 cursor-pointer appearance-none rounded border-2 border-primary-300 checked:border-primary-600 checked:bg-primary-600 transition-all bg-white"
                          />
                          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 sm:h-4 w-3 sm:w-4 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <label className="cursor-pointer font-bold text-sm sm:text-base text-primary-900 select-none block">
                            Looking for Scholarships
                          </label>
                          <p className="text-xs sm:text-sm text-primary-700 mt-0.5 sm:mt-1">We'll prioritize universities with high acceptance rates for funded programs.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 sm:pt-8 border-t border-slate-100">
                    <Button type="submit" size="lg" className="w-full text-base sm:text-lg h-12 sm:h-14 rounded-xl sm:rounded-2xl group relative overflow-hidden shadow-xl shadow-primary-500/20">
                      <span className="relative z-10 flex items-center">
                        {step === 4 ? "Find My Matches" : "Continue to Next Step"}
                        {step < 4 && <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </div>
                </CardContent>
              </form>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
