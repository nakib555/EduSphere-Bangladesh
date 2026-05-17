import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Award, Globe, BookOpen, Search, Filter, CalendarDays, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '../components/ui/Input';

const scholarships = [
  {
    title: 'Fulbright Foreign Student Program',
    country: 'USA',
    type: 'Fully Funded',
    amount: 'Full Tuition + Stipend',
    description: 'Enables graduate students, young professionals and artists from abroad to study and conduct research in the United States.',
    forWho: "Master's & PhD",
    deadline: 'May - October',
    tags: ['Prestigious', 'All Fields']
  },
  {
    title: 'MEXT Scholarship',
    country: 'Japan',
    type: 'Fully Funded',
    amount: 'Full Tuition + ¥144,000/mo',
    description: 'The Ministry of Education, Culture, Sports, Science and Technology (MEXT) of Japan offers scholarships to international students.',
    forWho: "Undergrad, Master's, PhD",
    deadline: 'May - June',
    tags: ['Govt. Funded', 'Language Training']
  },
  {
    title: 'Erasmus+ Joint Master Degrees',
    country: 'Europe',
    type: 'Fully Funded',
    amount: 'Full Tuition + €1,000/mo',
    description: 'Prestigious, integrated, international study programmes, jointly delivered by an international consortium of higher education institutions.',
    forWho: "Master's",
    deadline: 'October - January',
    tags: ['Multi-country', 'High Stipend']
  },
  {
    title: 'Chevening Scholarships',
    country: 'UK',
    type: 'Fully Funded',
    amount: 'Full Tuition + Living Costs',
    description: 'The UK government’s international awards programme aimed at developing global leaders.',
    forWho: "Master's (Req. 2yrs work exp.)",
    deadline: 'November',
    tags: ['Leadership', 'Networking']
  },
  {
    title: 'Aga Khan Foundation Scholarship',
    country: 'Global',
    type: 'Partial/Loan',
    amount: '50% Grant + 50% Loan',
    description: 'Provides a limited number of scholarships each year for postgraduate studies to outstanding students from select developing countries.',
    forWho: "Master's & PhD",
    deadline: 'March',
    tags: ['Needs-based', 'Postgrad']
  },
  {
    title: 'Swedish Institute Scholarships',
    country: 'Sweden',
    type: 'Fully Funded',
    amount: 'Full Tuition + SEK 12,000/mo',
    description: 'For global professionals to study a master’s programme in Sweden with a focus on sustainable development.',
    forWho: "Master's",
    deadline: 'February',
    tags: ['Sustainability', 'Nordic']
  }
];

const categories = ['All', 'Fully Funded', 'Partial/Loan'];
const levels = ['All', 'Undergrad', "Master's", 'PhD'];

export function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filtered = scholarships.filter(s => {
    const matchSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        s.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = selectedType === 'All' || s.type === selectedType;
    const matchLevel = selectedLevel === 'All' || s.forWho.includes(selectedLevel);
    return matchSearch && matchType && matchLevel;
  });

  return (
    <div className="flex-1 w-full bg-slate-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary-950 py-16 lg:py-28 rounded-b-[2rem] lg:rounded-b-[4rem] shadow-xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[500px] sm:w-[1000px] h-[500px] sm:h-[1000px] rounded-full bg-primary-900/40 blur-3xl opacity-50" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full bg-primary-800/30 blur-3xl opacity-50" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full bg-primary-800/50 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-primary-200 border border-primary-700/50 mb-4 sm:mb-6 backdrop-blur-sm">
              <Award className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Database for BD Students
            </span>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight">
              Fund Your Dream Education <span className="text-primary-300">Worldwide</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-primary-100 max-w-2xl mx-auto leading-relaxed">
              Discover fully and partially funded opportunities. Filter by destination, degree level, and funding type to find your perfect match.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 md:p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:flex-1 space-y-2">
              <label className="text-sm font-medium text-slate-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="Search scholarships or countries..." 
                  className="pl-10 h-11 bg-slate-50 border-slate-200 focus:bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48 space-y-2">
              <label className="text-sm font-medium text-slate-700">Funding Type</label>
              <select 
                className="w-full h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="w-full md:w-48 space-y-2">
              <label className="text-sm font-medium text-slate-700">Study Level</label>
              <select 
                className="w-full h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filtered.map((scholarship, idx) => (
              <motion.div 
                key={scholarship.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
              >
                <div className="group h-full flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap shadow-sm ${
                      scholarship.type === 'Fully Funded' 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {scholarship.type}
                    </span>
                  </div>
                  
                  <div className="p-6 pt-10 flex-1 flex flex-col">
                    <div className="inline-flex items-center justify-center p-2.5 bg-slate-50 rounded-xl mb-4 self-start border border-slate-100 group-hover:scale-110 group-hover:bg-primary-50 group-hover:border-primary-100 transition-all">
                      <Globe className="h-5 w-5 text-slate-600 group-hover:text-primary-600" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-primary-700 transition-colors">
                      {scholarship.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mb-4 flex items-center">
                      <span className="mr-2">📍</span> {scholarship.country}
                    </p>
                    
                    <p className="text-slate-600 text-sm mb-6 flex-1 line-clamp-3">
                      {scholarship.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-start gap-2 text-sm">
                        <Award className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Coverage</span>
                          <span className="font-medium text-slate-700">{scholarship.amount}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <BookOpen className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Level</span>
                          <span className="font-medium text-slate-700">{scholarship.forWho}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Application Period</span>
                          <span className="font-medium text-slate-700">{scholarship.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {scholarship.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-inset ring-slate-200/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 pt-0">
                    <Button className="w-full group/btn relative overflow-hidden rounded-xl">
                      <span className="relative z-10 flex items-center justify-center font-medium">
                        View Details <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">No scholarships found</h3>
              <p className="text-slate-500">Try adjusting your filters or search terms.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={() => { setSearchTerm(''); setSelectedType('All'); setSelectedLevel('All'); }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
