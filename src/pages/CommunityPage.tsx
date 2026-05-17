import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MessageSquare, Star, ShieldAlert, CheckCircle, Search, TrendingUp, ThumbsUp, MapPin, Users, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '../components/ui/Input';

const forumPosts = [
  { 
    id: 1, 
    author: "Faisal Rahman", 
    university: "TUM, Germany", 
    avatar: "https://i.pravatar.cc/150?u=faisal", 
    title: "How to open a Blocked Account from Bangladesh in 2024?", 
    content: "I just got my admit from TUM. What's the fastest way to open a blocked account? Fintiba or Expatrio? Also, how long does the money transfer from Sonali Bank take?",
    replies: 14, 
    upvotes: 45, 
    tags: ["Germany", "Finance"], 
    time: "2h ago" 
  },
  { 
    id: 2, 
    author: "Nusrat Jahan", 
    university: "Monash, Australia", 
    avatar: "https://i.pravatar.cc/150?u=nusrat", 
    title: "Part-time job situation in Melbourne for international students", 
    content: "Is it difficult to find part-time jobs in Melbourne right now? I will be moving there next intake and just wanted to prepare myself mentally.",
    replies: 28, 
    upvotes: 112, 
    tags: ["Australia", "Jobs"], 
    time: "5h ago",
    hot: true
  },
  { 
    id: 3, 
    author: "Tanvir Ahmed", 
    university: "Memorial, Canada", 
    avatar: "https://i.pravatar.cc/150?u=tanvir", 
    title: "Do you really need an agency for Canada? (Hint: No)", 
    content: "A detailed guide on how I applied for the visa myself, collected documents, and submitted the biometrics without paying any agency fees.",
    replies: 56, 
    upvotes: 340, 
    tags: ["Canada", "Visa Guide"], 
    time: "1d ago",
    hot: true
  },
  { 
    id: 4, 
    author: "Sabrina Hossain", 
    university: "UTA, USA", 
    avatar: "https://i.pravatar.cc/150?u=sabrina", 
    title: "F1 Visa Interview Experience - Dhaka Embassy (Approved)", 
    content: "Hey everyone! My visa got approved yesterday. Sharing my transcript here so it might help others preparing for their F1 interview.",
    replies: 42, 
    upvotes: 210, 
    tags: ["USA", "Visa Interview"], 
    time: "2d ago" 
  }
];

const agencies = [
  { name: "Global EduCare BD", rating: 4.8, status: "Verified", reviews: 142, location: "Banani, Dhaka", desc: "Very transparent with fees. They helped with my UK visa process. The counselors were knowledgeable about the latest PSW rules." },
  { name: "StudyAbroad Solutions Dhaka", rating: 2.1, status: "Warning", reviews: 45, location: "Dhanmondi, Dhaka", desc: "Promised guaranteed scholarship but asked for hidden charges later. Avoid! They also held onto my original transcripts for 2 weeks." },
  { name: "NextGen Consultants", rating: 4.5, status: "Verified", reviews: 89, location: "Gulshan, Dhaka", desc: "Good for Malaysia and Australia processing. No hidden fees. The visa team is very responsive on WhatsApp." },
  { name: "VisaFast Track", rating: 1.5, status: "Scam Alert", reviews: 67, location: "Mirpur, Dhaka", desc: "Showed fake bank statements to the embassy, resulted in a 5-year visa ban for my cousin. Extremely risky operations." },
  { name: "Pioneer Education", rating: 4.2, status: "Verified", reviews: 112, location: "Sylhet", desc: "Great for UK applications. They even helped me set up my accommodation in London before I arrived." },
];

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'forum' | 'agencies'>('forum');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex-1 w-full bg-slate-50 pb-12 sm:pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary-950 py-20 lg:py-28 rounded-b-[2.5rem] lg:rounded-b-[4rem] shadow-xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary-900/40 blur-3xl" />
          <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary-800/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center rounded-full bg-primary-800/50 px-3 py-1.5 text-sm font-medium text-primary-200 border border-primary-700/50 mb-6 backdrop-blur-sm">
              <Users className="mr-2 h-4 w-4" /> The Largest BD Student Network
            </span>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto">
              Community & <span className="text-primary-300">Trust</span>
            </h1>
            <p className="mt-6 text-lg text-primary-100 max-w-2xl mx-auto leading-relaxed">
              Connect with senior BD students abroad, share knowledge, and verify educational agencies to avoid scams.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 mb-10 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('forum')}
            className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === 'forum' 
                ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <MessageSquare className="mr-2 h-5 w-5" /> Alumni Connect Forum
          </button>
          <button
            onClick={() => setActiveTab('agencies')}
            className={`flex-1 flex items-center justify-center py-3 px-6 rounded-xl font-medium transition-all ${
              activeTab === 'agencies' 
                ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <ShieldAlert className="mr-2 h-5 w-5" /> Agency Reviews
          </button>
        </div>

        {/* Global Search (optional per tab) */}
        <div className="mb-8 relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder={activeTab === 'forum' ? "Search discussions (e.g. F1 Visa, Part-time jobs)..." : "Search agency names or locations..."}
            className="pl-12 h-14 rounded-2xl bg-white border-slate-200 shadow-sm text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Forum View */}
        <AnimatePresence mode="wait">
          {activeTab === 'forum' && (
            <motion.div 
              key="forum"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-slate-900">Latest Discussions</h2>
                <Button size="sm">Start a Discussion</Button>
              </div>

              {forumPosts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post) => (
                <Card key={post.id} className="overflow-hidden hover:border-primary-300 transition-colors cursor-pointer group shadow-sm bg-white border-slate-100">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Left Side: Upvotes */}
                      <div className="hidden sm:flex flex-col items-center justify-start bg-slate-50 p-4 border-r border-slate-100 min-w-[80px]">
                        <button className="text-slate-400 hover:text-primary-600 transition-colors p-1">
                          <ThumbsUpIcon className="h-5 w-5" />
                        </button>
                        <span className="font-bold text-slate-700 my-1">{post.upvotes}</span>
                      </div>
                      
                      {/* Right Side: Content */}
                      <div className="p-5 flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full border border-slate-200 bg-slate-100" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">{post.author}</p>
                            <p className="text-xs text-slate-500">{post.university} • {post.time}</p>
                          </div>
                          {post.hot && (
                            <span className="ml-auto inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700 border border-orange-200">
                              <TrendingUp className="mr-1 h-3 w-3" /> Trending
                            </span>
                          )}
                        </div>

                        <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                          {post.content}
                        </p>

                        <div className="flex justify-between items-center sm:hidden mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <div className="flex items-center gap-1.5 text-slate-600 font-medium text-sm">
                            <ThumbsUpIcon className="h-4 w-4" /> {post.upvotes} votes
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {post.tags.map(tag => (
                              <span key={tag} className="inline-flex items-center rounded bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center text-slate-500 text-sm font-medium bg-slate-50 px-3 py-1.5 rounded-lg">
                            <MessageSquare className="h-4 w-4 mr-1.5" />
                            {post.replies} <span className="hidden sm:inline">&nbsp;replies</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="text-center pt-4">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">Load More Discussions</Button>
              </div>
            </motion.div>
          )}

          {/* Agencies View */}
          {activeTab === 'agencies' && (
            <motion.div 
              key="agencies"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-bold text-slate-900">Agency Directory</h2>
                <Button size="sm" variant="outline">Write a Review</Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {agencies.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())).map((agency, i) => (
                  <Card key={i} className="h-full flex flex-col hover:border-primary-300 transition-colors shadow-sm bg-white border-slate-100 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4">
                        {agency.status === 'Verified' && (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200 shadow-sm">
                            <CheckCircle className="mr-1 h-3 w-3" /> Verified
                          </span>
                        )}
                        {agency.status === 'Warning' && (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 border border-amber-200 shadow-sm">
                            <ShieldAlert className="mr-1 h-3 w-3" /> Use Caution
                          </span>
                        )}
                        {agency.status === 'Scam Alert' && (
                          <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 border border-red-200 shadow-sm">
                            <AlertTriangle className="mr-1 h-3 w-3" /> Scam Alert
                          </span>
                        )}
                    </div>

                    <CardHeader className="pb-4 border-b border-slate-100">
                      <div className="pr-24">
                        <CardTitle className="text-xl font-bold mb-2">{agency.name}</CardTitle>
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-2">
                          <Star className="h-4 w-4 text-amber-400 fill-amber-400" /> 
                          {agency.rating} <span className="text-slate-400 font-normal">({agency.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center text-xs text-slate-500">
                          <MapPin className="h-3 w-3 mr-1" /> {agency.location}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4 flex-1 flex flex-col justify-between">
                      <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                        <p className="text-sm text-slate-700 italic">"{agency.desc}"</p>
                      </div>
                      <Button variant="outline" className="w-full">Read all reviews</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ThumbsUpIcon({ className }: { className?: string }) {
  return <ThumbsUp className={className} />;
}
