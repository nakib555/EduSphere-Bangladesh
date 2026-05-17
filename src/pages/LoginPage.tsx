import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GraduationCap, Mail, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login, redirect to home
    navigate('/');
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[100dvh] bg-slate-50 lg:bg-white relative">
      {/* --- DESKTOP LEFT PANEL --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary-950 overflow-hidden flex-col justify-between p-12 lg:p-16 text-white">
        {/* Background Decorative Mesh/Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-primary-800 to-primary-500 blur-[100px] opacity-40 mix-blend-screen" />
          <div className="absolute bottom-[10%] right-[0%] w-[50%] h-[50%] rounded-full bg-gradient-to-bl from-accent-500 to-primary-700 blur-[80px] opacity-30 mix-blend-screen" />
        </div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 inline-flex">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-xl">
              <GraduationCap className="h-7 w-7" />
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              EduSphere<span className="text-primary-400">BD</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg mt-12 mb-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-primary-200 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 text-accent-500" />
            Smart University Matching
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
            Unlock your global academic potential.
          </h1>
          <p className="text-lg text-primary-200/90 leading-relaxed mb-10">
            Join thousands of Bangladeshi students discovering scholarships, tracking applications, and connecting with alumni worldwide.
          </p>

          <div className="space-y-4">
            {[
              "Personalized university recommendations",
              "Accurate proof of funds calculations",
              "Connect with alumni network"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 text-primary-50">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/20 text-primary-400">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="font-medium text-primary-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm text-primary-400/80 mt-12 border-t border-white/10 pt-6">
          <p>© {new Date().getFullYear()} EduSphere Bangladesh.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* --- MOBILE TOP HEADER --- */}
      <div className="lg:hidden w-full bg-primary-950 px-6 pt-6 pb-12 rounded-b-[32px] relative overflow-hidden z-0 shadow-sm shrink-0">
        {/* Mobile top decorative blur */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-700 rounded-full blur-[80px] opacity-60" />
        <div className="absolute top-20 -left-20 w-48 h-48 bg-accent-600 rounded-full blur-[80px] opacity-40" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-white mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white border border-white/10 shadow-lg">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight drop-shadow-md">
              EduSphere<span className="text-primary-400">BD</span>
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-sm">
            Welcome back!
          </h2>
        </div>
      </div>

      {/* --- RIGHT PANEL / MOBILE FORM CONTAINER --- */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 z-10 relative -mt-6 lg:mt-0 pb-4 lg:pb-0">
        <div className="mx-auto w-full max-w-[400px] lg:max-w-md bg-white rounded-3xl p-6 sm:p-8 lg:p-0 shadow-2xl shadow-slate-200/50 border border-slate-100/50 lg:shadow-none lg:border-none lg:bg-transparent">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8 hidden lg:block">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 mb-2">Sign in</h2>
              <p className="text-slate-500">
                Log in to access your matches and saved universities.
              </p>
            </div>

            <div className="mb-6 lg:hidden">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 mb-1">Sign in</h2>
              <p className="text-sm text-slate-500">
                Access your personalized profile.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    type="email" 
                    required 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 h-11 bg-slate-50/50 border-slate-200 focus:bg-white rounded-xl text-base transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input 
                    type="password" 
                    required 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-11 bg-slate-50/50 border-slate-200 focus:bg-white rounded-xl text-base transition-colors"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full text-base h-11 mt-2 rounded-xl shadow-lg shadow-primary-600/20 active:shadow-none hover:-translate-y-0.5 transition-all">
                Sign In
              </Button>
            </form>

            <div className="mt-5 flex items-center">
              <div className="flex-1 border-t border-slate-200" />
              <div className="px-4 text-xs tracking-wider uppercase font-semibold text-slate-400">Or continue with</div>
              <div className="flex-1 border-t border-slate-200" />
            </div>

            <div className="mt-5">
              <Button type="button" variant="outline" className="w-full h-11 bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-3 rounded-xl border-slate-200 transition-colors shadow-sm active:bg-slate-100">
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
                <span className="font-medium">Sign in with Google</span>
              </Button>
            </div>

            <p className="mt-5 text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <a href="#" className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors">
                Sign up for free
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

