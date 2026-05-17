import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BookOpen, FileText, Download, CheckCircle2, ArrowRight, Lightbulb, AlertCircle, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function SopCvBuilderPage() {
  const [activeTab, setActiveTab] = useState<'sop' | 'cv'>('sop');

  return (
    <div className="flex-1 w-full bg-slate-50 pb-12 sm:pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary-950 py-20 lg:py-28 rounded-b-[2.5rem] lg:rounded-b-[4rem] shadow-xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary-900/40 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-primary-800/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center border-b border-white/10 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center rounded-full bg-primary-800/50 px-3 py-1.5 text-sm font-medium text-primary-200 border border-primary-700/50 mb-6 backdrop-blur-sm">
              <FileText className="mr-2 h-4 w-4" /> Application Essentials
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
              Craft the Perfect <span className="text-primary-300">Application</span>
            </h1>
            <p className="mt-6 text-lg text-primary-100 max-w-2xl mx-auto leading-relaxed">
              Tailored guidance and proven structures for Bangladeshi students applying to top global universities.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 mb-10 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab('sop')}
            className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === 'sop' 
                ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <BookOpen className="mr-2 h-5 w-5" /> Statement of Purpose
          </button>
          <button
            onClick={() => setActiveTab('cv')}
            className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === 'cv' 
                ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <FileText className="mr-2 h-5 w-5" /> Europass CV
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'sop' && (
            <motion.div
              key="sop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid gap-8 lg:grid-cols-12"
            >
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
                  <div className="mb-8 border-b border-slate-100 pb-6">
                    <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">The Winning SOP Formula</h2>
                    <p className="text-slate-500">A proven 5-paragraph structure designed specifically for US, Canada, and Australia applications.</p>
                  </div>

                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[2.25rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                    {[
                      { 
                        title: "The Hook & Introduction", 
                        desc: "Start with a compelling story or 'eureka' moment that sparked your interest in the field. Don't start with 'My name is...' or 'I am applying for...'.",
                        example: "While growing up in Dhaka, experiencing frequent power cuts sparked my curiosity about renewable energy..." 
                      },
                      { 
                        title: "Academic Background (Context)", 
                        desc: "Highlight your achievements during your Bachelor's or HSC. If applicable, mention any thesis, major projects, or how your coursework prepared you.",
                        example: "During my undergrad at BUET, my final year thesis challenged me to..." 
                      },
                      { 
                        title: "Professional/Research Exp.", 
                        desc: "Detail your job, internship, or research experience. Focus on 'What I did, what I achieved, and what I learned'. Quantify your impact if possible.",
                        example: "At XYZ Corp, I optimized the database queries, reducing load times by 40%..." 
                      },
                      { 
                        title: "Why This Specific University?", 
                        desc: "Name drop professors you want to work with, specific labs, or unique courses. Show you've done your research. Don't use a generic paragraph.",
                        example: "I am specifically drawn to Prof. Smith's AI Lab at your university because..." 
                      },
                      { 
                        title: "Long-term Goals & Conclusion", 
                        desc: "Where do you see yourself in 5-10 years? Reiterate how the program bridges the gap between your current skills and future goals.",
                        example: "Ultimately, I plan to return home to lead infrastructural AI projects..." 
                      }
                    ].map((step, idx) => (
                      <div key={idx} className="relative flex items-start group">
                        <div className="absolute left-0 h-10 w-10 flex items-center justify-center rounded-full border-4 border-white bg-primary-100 text-primary-700 font-bold shadow-sm md:left-4 z-10 transition-transform group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-primary-600/30">
                          {idx + 1}
                        </div>
                        <div className="ml-14 md:ml-20 bg-slate-50 border border-slate-100 rounded-2xl p-6 w-full shadow-sm group-hover:border-primary-200 group-hover:shadow-md transition-all">
                          <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                          <p className="text-slate-600 mb-4">{step.desc}</p>
                          <div className="bg-white rounded-xl p-4 border border-slate-200 italic text-slate-500 relative">
                            {/* Dummy icon for now as we don't have Quote imported */}
                            <span className="block text-sm">Example: "{step.example}"</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                <Card className="border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl overflow-hidden">
                  <div className="bg-primary-50 py-4 px-6 border-b border-primary-100 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary-600" />
                    <h3 className="font-bold text-primary-900">Expert Tips</h3>
                  </div>
                  <CardContent className="p-6 space-y-5">
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      </div>
                      <p className="text-sm text-slate-600 pt-1">Keep it under 1000 words (usually 2 pages limit).</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      </div>
                      <p className="text-sm text-slate-600 pt-1">Explain any gap years objectively. Focus on skills learned (courses/freelancing) during session jams.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      </div>
                      <p className="text-sm text-slate-600 pt-1">Use active voice and energetic verbs. "I optimized X" rather than "X was optimized by me".</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-100 shadow-xl shadow-slate-200/40 rounded-3xl overflow-hidden">
                  <div className="bg-red-50 py-4 px-6 border-b border-red-100 flex items-center gap-2">
                    <h3 className="font-bold text-red-900">What NOT to do</h3>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      <li className="flex gap-2 items-start text-sm text-slate-600">
                        <span className="text-red-500 font-bold mt-0.5">✕</span> Avoid overly emotional sob stories unless highly relevant to your academics.
                      </li>
                      <li className="flex gap-2 items-start text-sm text-slate-600">
                        <span className="text-red-500 font-bold mt-0.5">✕</span> Don't copy templates blindly (universities use plagiarism checkers).
                      </li>
                      <li className="flex gap-2 items-start text-sm text-slate-600">
                        <span className="text-red-500 font-bold mt-0.5">✕</span> Don't complain about BD's education system; focus on what you made of it.
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Button className="w-full h-14 text-base rounded-xl bg-primary-600 hover:bg-primary-700 text-white">
                  <Download className="mr-2 h-5 w-5" /> Download Standard Template
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === 'cv' && (
            <motion.div
              key="cv"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="max-w-4xl mx-auto">
                <Card className="border-slate-100 shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden">
                  <div className="bg-slate-900 px-8 py-10 md:py-16 text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 text-blue-400 mb-6 border border-blue-500/30">
                      <FileText className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-bold font-heading text-white mb-4">Master the Europass CV</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                      Mandatory format for most European Universities (Erasmus+, Germany, Italy) and widely accepted in Canada.
                    </p>
                  </div>
                  
                  <CardContent className="p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">The Global Standard</h3>
                        <p className="text-slate-600">
                          The Europass CV strictly focuses on professional and academic competencies. Unlike typical South Asian corporate CVs, it eliminates personal bias points and focuses on your timeline of achievements.
                        </p>
                        
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                          <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
                            Things to EXCLUDE:
                          </h4>
                          <ul className="space-y-2">
                            {["Marital Status, Religion, Blood Group", "Father's and Mother's names", "Irrelevant hobbies (e.g. 'browsing internet')", "Heavy colors, complex column layouts"].map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-amber-800 text-sm font-medium">
                                <span className="text-amber-500 mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" /> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col justify-center items-center text-center">
                        <div className="mb-6 relative">
                          <div className="h-32 w-24 bg-white shadow-md border border-slate-200 rounded-lg absolute -left-12 -top-4 rotate-[-10deg] opacity-70 flex flex-col p-2 gap-1.5">
                            <div className="h-2 w-10 bg-slate-200 rounded" />
                            <div className="h-1 w-full bg-slate-100 rounded" />
                            <div className="h-1 w-full bg-slate-100 rounded" />
                            <div className="h-4 w-4 bg-slate-200 rounded-full mt-2" />
                          </div>
                          <div className="h-40 w-32 bg-white shadow-xl border border-slate-200 rounded-lg relative z-10 p-3 flex flex-col gap-2">
                            <div className="h-2 w-12 bg-primary-200 rounded" />
                            <div className="h-1.5 w-full bg-slate-100 rounded mt-2" />
                            <div className="h-1.5 w-3/4 bg-slate-100 rounded" />
                            <div className="h-3 w-16 bg-blue-100 rounded mt-2" />
                            <div className="h-1.5 w-full bg-slate-100 rounded" />
                            <div className="h-1.5 w-full bg-slate-100 rounded" />
                          </div>
                        </div>
                        
                        <h4 className="font-bold text-slate-900 mb-2">Build Online Safely</h4>
                        <p className="text-sm text-slate-500 mb-6">Create it directly on the official European Union interface and export as PDF.</p>
                        
                        <Button 
                          size="lg" 
                          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20" 
                          onClick={() => window.open('https://europa.eu/europass/en/create-europass-cv', '_blank')}
                        >
                          Official Europass portal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
