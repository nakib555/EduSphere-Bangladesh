import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { motion } from 'motion/react';
import { Globe, BookOpen, Calculator, Search, CheckCircle2, ChevronDown, MapPin, Award, ArrowRight, UserCircle2, MessageSquare, Plus } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-6 w-6 text-primary-600" />,
    title: 'Smart Matching Engine',
    description: 'We understand HSC, SSC, O/A Levels, and National University CGPA to find your perfect fit.'
  },
  {
    icon: <Globe className="h-6 w-6 text-primary-600" />,
    title: 'Local & Global DB',
    description: 'Compare Top 50 BD universities and Top 100 Global universities in one place.'
  },
  {
    icon: <Calculator className="h-6 w-6 text-primary-600" />,
    title: 'Proof of Funds Calc',
    description: 'Instantly calculate the required bank balance for visa applications by country.'
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary-600" />,
    title: 'SOP & CV Builder',
    description: 'Access templates specifically designed for Bangladeshi students applying abroad.'
  }
];

const destinations = [
  { name: 'United States', code: 'US', universities: 156, color: 'bg-blue-100', textCode: 'US' },
  { name: 'Canada', code: 'CA', universities: 84, color: 'bg-red-100', textCode: 'CA' },
  { name: 'United Kingdom', code: 'UK', universities: 120, color: 'bg-indigo-100', textCode: 'UK' },
  { name: 'Australia', code: 'AU', universities: 43, color: 'bg-emerald-100', textCode: 'AU' },
  { name: 'Germany', code: 'DE', universities: 62, color: 'bg-yellow-100', textCode: 'DE' },
  { name: 'Bangladesh', code: 'BD', universities: 50, color: 'bg-green-100', textCode: 'BD' },
];

const testimonials = [
  {
    quote: "EduSphereBD accurately converted my National University CGPA and found me a full-ride scholarship in the US. I couldn't have done it without their tool.",
    author: "Rafiqul Islam",
    role: "MSc in CS, Texas Tech University",
    score: "IELTS: 7.5 | CGPA: 3.2"
  },
  {
    quote: "The Proof of Funds calculator saved me from a visa rejection. It showed me exactly how much I needed to show according to current conversion rates.",
    author: "Sadia Rahman",
    role: "BBA, University of Toronto",
    score: "HSC: GPA 5.0 | IELTS: 7.0"
  },
  {
    quote: "As an English medium student, I was confused about local vs international options. The matchmaking engine gave me the best of both worlds.",
    author: "Tahmid Hasan",
    role: "A-Levels: 3A* 1A",
    score: "Applying for Fall 2024"
  }
];

const faqs = [
  {
    question: "How does the CGC/GPA conversion work?",
    answer: "We use standardized conversion formulas accepted by major universities. For National University students, we map your percentage and CGPA to the US 4.0 scale accurately."
  },
  {
    question: "Is this platform free for students?",
    answer: "Yes! Our core features including the matching engine, proof of funds calculator, and basic SOP templates are 100% free for Bangladeshi students."
  },
  {
    question: "Do you help with visa processing?",
    answer: "We are not an agency, so we don't process visas ourselves. However, we provide you with all the necessary tools and calculators to prepare your finances and documents properly."
  },
  {
    question: "Can I find scholarships through this platform?",
    answer: "Yes, our database includes destination-specific and university-specific scholarships. You can filter by 'Full Ride', 'Partial', and 'Need-based' funding."
  }
];

const FaqItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden mb-4 bg-white transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
      >
        <span className="font-semibold text-slate-900 pr-4">{question}</span>
        <div className={`shrink-0 h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45 bg-slate-50' : 'bg-white'}`}>
          <Plus className="h-4 w-4 text-slate-500" />
        </div>
      </button>
      <div 
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '240px' : '0', opacity: isOpen ? 1 : 0 }}
      >
        <p className="px-6 pb-5 text-slate-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="flex flex-1 flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-12 sm:pt-24 sm:pb-20">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] sm:h-[500px] bg-gradient-to-b from-primary-50/80 to-transparent rounded-full blur-3xl opacity-70 pointer-events-none" />
        
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs sm:text-sm font-medium text-primary-800 border border-primary-200/50 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2 animate-pulse"></span>
              The #1 Platform for BD Students
            </div>
            
            <h1 className="mb-6 sm:mb-8 font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Your Journey to the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Perfect University</span>
            </h1>
            
            <p className="mb-8 sm:mb-10 text-base text-slate-600 sm:text-xl max-w-2xl mx-auto leading-relaxed">
              We natively understand the Bangladeshi education system. Input your stats once, and let our matchmaking engine find your Safe, Target, and Dream universities worldwide.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/build-profile" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-xl shadow-primary-500/20 hover:-translate-y-0.5 transition-transform group">
                  Find Your Match
                  <Search className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base bg-white">
                  How it works
                </Button>
              </a>
            </div>

            <div className="mt-10 sm:mt-14 pt-8 border-t border-slate-100 text-center">
              <p className="text-xs sm:text-sm font-medium text-slate-400 mb-6 uppercase tracking-widest">Trusted by students exploring</p>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center space-x-1.5 sm:space-x-2"><Globe className="w-5 h-5 sm:w-6 sm:h-6"/> <span className="font-bold text-sm sm:text-lg">Top 100 Global</span></div>
                <div className="flex items-center space-x-1.5 sm:space-x-2"><Award className="w-5 h-5 sm:w-6 sm:h-6"/> <span className="font-bold text-sm sm:text-lg">Ivy League</span></div>
                <div className="flex items-center space-x-1.5 sm:space-x-2"><BookOpen className="w-5 h-5 sm:w-6 sm:h-6"/> <span className="font-bold text-sm sm:text-lg">Russell Group</span></div>
                <div className="flex items-center space-x-1.5 sm:space-x-2"><CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6"/> <span className="font-bold text-sm sm:text-lg">Local BD Top 50</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
                Explore Top Destinations
              </h2>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
                Discover requirements, scholarships, and opportunities in the most popular countries for Bangladeshi international students.
              </p>
            </div>
            <Link to="/results" className="hidden md:inline-flex items-center font-medium text-primary-600 hover:text-primary-700 transition-colors">
              Explore all <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6">
            {destinations.map((dest, i) => (
              <motion.div 
                key={dest.code}
                whileHover={{ y: -5 }}
                className="group relative bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-6 text-center cursor-pointer overflow-hidden transition-all hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300"
              >
                <div className="flex justify-center mb-3 sm:mb-4 transform transition-transform group-hover:scale-110">
                  <div className={`shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full ${dest.color} flex items-center justify-center font-bold text-xl text-slate-700/80`}>
                    {dest.textCode}
                  </div>
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-slate-900 mb-1 leading-tight">{dest.name}</h3>
                <p className="text-xs font-medium text-slate-500">{dest.universities}+ Unis</p>
              </motion.div>
            ))}
          </div>
          <Link to="/results" className="mt-8 flex md:hidden items-center justify-center font-medium text-primary-600 hover:text-primary-700 transition-colors w-full bg-primary-50 py-3 rounded-xl border border-primary-100">
            Explore all destinations <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-primary-50 rounded-l-[100px] opacity-50 pointer-events-none hidden sm:block" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
              Built Specifically for BD Aspirants
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              From translating local CGPAs to international standards, to calculating MOI exemptions and IELTS needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <Card className="h-full border-slate-100 bg-white hover:border-primary-100 hover:shadow-xl hover:shadow-primary-100/50 transition-all duration-300 rounded-3xl">
                  <CardContent className="p-6 sm:pt-8 text-center sm:text-left">
                    <div className="mb-4 sm:mb-6 inline-flex sm:inline-block items-center justify-center rounded-2xl bg-primary-50 p-3 sm:p-4 ring-4 sm:ring-8 ring-white shadow-sm">
                      {feature.icon}
                    </div>
                    <h3 className="mb-2 sm:mb-3 font-heading text-lg sm:text-xl font-bold text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance">
              Loved by Students
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              See how our platform has helped thousands clarify their path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((test, i) => (
              <Card key={i} className="bg-slate-50 border-none rounded-3xl p-1 sm:p-2 relative">
                <div className="absolute top-6 left-6 text-4xl text-primary-200 font-serif leading-none">"</div>
                <CardContent className="pt-10 pb-6 px-6 sm:pt-12 sm:pb-8 sm:px-8 relative z-10 flex flex-col h-full">
                  <p className="text-slate-700 italic mb-6 sm:mb-8 text-sm sm:text-base grow">
                    {test.quote}
                  </p>
                  <div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{test.author}</div>
                    <div className="text-xs text-primary-600 font-medium mb-2 mt-0.5">{test.role}</div>
                    <div className="text-xs text-slate-500 bg-slate-200/50 inline-block px-2 py-1 rounded w-fit">{test.score}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-600">
              Everything you need to know about the platform.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats CTA */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-950 rounded-3xl sm:rounded-[40px] overflow-hidden relative shadow-2xl">
            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 bg-primary-800 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-24 -left-24 w-48 sm:w-64 h-48 sm:h-64 bg-accent-600 rounded-full blur-3xl opacity-30" />
            
            <div className="relative z-10 px-6 py-12 sm:px-12 md:py-20 lg:px-20 text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">
                Ready to find your match?
              </h2>
              <p className="text-primary-100 text-base sm:text-xl mb-8 sm:mb-10 leading-relaxed">
                Join thousands of students who found scholarships, waived application fees, and successfully enrolled in their dream universities through EduSphereBD.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link to="/build-profile" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base bg-white text-primary-900 hover:bg-slate-100 shadow-xl border-none">
                    Create Free Profile <ArrowRight className="ml-2 w-5 h-5"/>
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base border border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent">
                    Log in account
                  </Button>
                </Link>
              </div>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-primary-200/70">
                No credit card required. Free basic matching.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
