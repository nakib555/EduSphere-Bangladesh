import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { motion, AnimatePresence } from 'motion/react';
import { DollarSign, Info, Banknote, ShieldAlert, CheckCircle2, TrendingUp, HelpCircle, Users, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import currencyFormatter from 'currency.js';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export function ProofOfFundsPage() {
  const [country, setCountry] = useState('Canada');
  const [tuition, setTuition] = useState<number | ''>('');
  const [dependents, setDependents] = useState(0);

  const [rates, setRates] = useState<Record<string, { currency: string, rateToBdt: number, livingExp: number, dependentCost: number, name: string, flag: string }>>({
    'Canada': { name: 'Canada', flag: '🇨🇦', currency: 'CAD', rateToBdt: 86, livingExp: 20635, dependentCost: 5055 },
    'USA': { name: 'United States', flag: '🇺🇸', currency: 'USD', rateToBdt: 110, livingExp: 18000, dependentCost: 4000 },
    'UK': { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', rateToBdt: 142, livingExp: 12006, dependentCost: 6120 },
    'Australia': { name: 'Australia', flag: '🇦🇺', currency: 'AUD', rateToBdt: 74, livingExp: 24505, dependentCost: 7362 },
    'Germany': { name: 'Germany', flag: '🇩🇪', currency: 'EUR', rateToBdt: 120, livingExp: 11208, dependentCost: 0 },
  });

  useEffect(() => {
    // Fetch live currency rates using ExchangeRate-API (Free tier, no key required)
    fetch('https://open.er-api.com/v6/latest/BDT')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setRates(prev => ({
            ...prev,
            'Canada': { ...prev['Canada'], rateToBdt: Math.round(1 / data.rates.CAD) },
            'USA': { ...prev['USA'], rateToBdt: Math.round(1 / data.rates.USD) },
            'UK': { ...prev['UK'], rateToBdt: Math.round(1 / data.rates.GBP) },
            'Australia': { ...prev['Australia'], rateToBdt: Math.round(1 / data.rates.AUD) },
            'Germany': { ...prev['Germany'], rateToBdt: Math.round(1 / data.rates.EUR) },
          }));
        }
      })
      .catch(err => console.error("Could not fetch latest rates:", err));
  }, []);

  const selectedRate = rates[country];
  const tuitionValue = typeof tuition === 'number' ? tuition : 0;
  
  // Germany uses a blocked account. Others usually require 1 year tuition + 1 year living + dependants
  const baseLiving = selectedRate.livingExp;
  const depLiving = dependents * selectedRate.dependentCost;
  const totalLiving = baseLiving + depLiving;
  const totalForeign = tuitionValue + totalLiving;
  const safeBufferForeign = totalForeign * 0.10; // 10% buffer
  const finalForeign = totalForeign + safeBufferForeign;
  
  const totalBdt = finalForeign * selectedRate.rateToBdt;

  const formatBdt = (amount: number) => {
    return currencyFormatter(amount, { symbol: '৳', precision: 0, separator: ',' }).format();
  };

  const formatForeign = (amount: number) => {
    const symbolMap: Record<string, string> = { 'USD': '$', 'CAD': 'C$', 'GBP': '£', 'AUD': 'A$', 'EUR': '€' };
    return currencyFormatter(amount, { symbol: symbolMap[selectedRate.currency] || '$', precision: 0, separator: ',' }).format();
  };

  return (
    <div className="flex-1 w-full bg-slate-50 pb-12 sm:pb-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary-950 py-16 lg:py-28 rounded-b-[2rem] lg:rounded-b-[4rem] shadow-xl">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full bg-primary-900/40 blur-3xl opacity-60" />
          <div className="absolute top-1/2 -left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-primary-800/30 blur-3xl opacity-60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center border-b border-white/10 pb-12 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-flex items-center rounded-full bg-primary-800/50 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-primary-200 border border-primary-700/50 mb-4 sm:mb-6 backdrop-blur-sm">
              <Banknote className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" /> Financial Planning
            </span>
            <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight">
              Sponsor Funds <span className="text-primary-300">Calculator</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-primary-100 max-w-2xl mx-auto leading-relaxed">
              Determine the exact bank balance needed to satisfy embassy requirements and secure your student visa from Bangladesh.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Calculator Inputs */}
          <Card className="lg:col-span-7 border-slate-100 shadow-2xl shadow-slate-200/50 rounded-3xl overflow-hidden bg-white">
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold font-heading text-slate-900">Your Profile</CardTitle>
                <CardDescription>Enter details to estimate required funds</CardDescription>
              </div>
            </div>
            
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center">
                  1. Study Destination <HelpCircle className="h-4 w-4 ml-2 text-slate-400" />
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.keys(rates).map((c) => (
                    <div
                      key={c}
                      onClick={() => setCountry(c)}
                      className={`cursor-pointer rounded-2xl border-2 p-4 flex flex-col items-center justify-center transition-all ${
                        country === c 
                          ? "border-primary-600 bg-primary-50 ring-2 ring-primary-600/20 shadow-md transform scale-[1.02]" 
                          : "border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-2xl mb-2">{rates[c].flag}</span>
                      <span className={`font-semibold text-sm text-center ${country === c ? 'text-primary-900' : 'text-slate-600'}`}>{rates[c].name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                 <label className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center">
                  2. 1st Year Tuition Fee <HelpCircle className="h-4 w-4 ml-2 text-slate-400" />
                </label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${tuitionValue > 0 ? 'text-primary-600' : 'text-slate-400'}`}>
                    <span className="font-bold">{selectedRate.currency}</span>
                  </div>
                  <Input 
                    type="number" 
                    placeholder="e.g. 15000"
                    value={tuition}
                    onChange={(e) => setTuition(e.target.value ? parseFloat(e.target.value) : '')}
                    className="pl-16 h-16 text-xl font-semibold rounded-2xl bg-slate-50 border-slate-200 focus:bg-white shadow-inner transition-all"
                  />
                  {country === 'Germany' && (
                     <p className="text-xs text-emerald-600 font-medium absolute -bottom-6 left-0">
                       *Public universities in Germany usually have €0 tuition. Enter semester contribution if any.
                     </p>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {country !== 'Germany' && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     className="space-y-4 pt-8 border-t border-slate-100"
                   >
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center">
                      3. Accompanying Family <HelpCircle className="h-4 w-4 ml-2 text-slate-400" />
                    </label>
                    <div className="flex gap-2">
                       {[0, 1, 2, 3].map(num => (
                         <button
                           key={num}
                           onClick={() => setDependents(num)}
                           className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all border-2 ${
                             dependents === num 
                              ? "bg-slate-900 border-slate-900 text-white shadow-md" 
                              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                           }`}
                         >
                           {num === 0 ? "Just Me" : `+ ${num}`}
                         </button>
                       ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Results Ticket */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-none shadow-2xl rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-32 bg-white opacity-[0.03] rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2" />
              
              <CardContent className="p-8 relative z-10">
                <div className="mb-8">
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-2">Target Bank Balance</p>
                  <motion.div
                    key={totalBdt}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col"
                  >
                    <span className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 break-all">
                      {tuition === '' && country !== 'Germany' ? "৳ ---" : formatBdt(totalBdt)}
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1.5" /> ≈ {tuition === '' && country !== 'Germany' ? "---" : formatForeign(finalForeign)}
                    </span>
                  </motion.div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-700/50">
                  <div className="h-48 w-full mt-4 -mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Tuition', value: tuitionValue },
                            { name: country === 'Germany' ? 'Blocked Account' : 'Living Exp', value: baseLiving },
                            ...(dependents > 0 && country !== 'Germany' ? [{ name: 'Dependents', value: depLiving }] : []),
                            { name: 'Safe Buffer', value: safeBufferForeign },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          <Cell fill="#3b82f6" /> {/* Blue for Tuition */}
                          <Cell fill="#8b5cf6" /> {/* Purple for Living */}
                          {dependents > 0 && country !== 'Germany' && <Cell fill="#ec4899" />} {/* Pink for Dependents */}
                          <Cell fill="#10b981" /> {/* Emerald for Buffer */}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => formatForeign(value)}
                          contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#f8fafc' }}
                          itemStyle={{ color: '#f8fafc' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex justify-between items-center text-slate-300 p-3 rounded-xl bg-slate-800/50">
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-blue-500 mr-2 shrink-0"></span>
                      <BookOpen className="h-4 w-4 mr-2 text-slate-400" /> Tuition (1 Yr)
                    </span>
                    <span className="font-bold text-white">{tuition === '' ? '---' : formatForeign(tuitionValue)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-slate-300 p-3 rounded-xl bg-slate-800/50">
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-purple-500 mr-2 shrink-0"></span>
                      <Banknote className="h-4 w-4 mr-2 text-slate-400" /> 
                      {country === 'Germany' ? 'Blocked Account' : 'Living Expenses'}
                    </span>
                    <span className="font-bold text-white">{formatForeign(baseLiving)}</span>
                  </div>

                  {dependents > 0 && country !== 'Germany' && (
                    <div className="flex justify-between items-center text-slate-300 p-3 rounded-xl bg-slate-800/50">
                      <span className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-pink-500 mr-2 shrink-0"></span>
                        <Users className="h-4 w-4 mr-2 text-slate-400" /> Dependents Cost
                      </span>
                      <span className="font-bold text-white">{formatForeign(depLiving)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-emerald-300 p-3 rounded-xl bg-emerald-900/20 border border-emerald-800/30">
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2 shrink-0"></span>
                      <ShieldAlert className="h-4 w-4 mr-2 text-emerald-400" /> Safe Buffer (10%)
                    </span>
                    <span className="font-bold">{formatForeign(safeBufferForeign)}</span>
                  </div>
                </div>
              </CardContent>
              <div className="bg-black/20 p-4 border-t border-white/5 text-center text-xs text-slate-400">
                Current est. rate: 1 {selectedRate.currency} = ৳{selectedRate.rateToBdt}
              </div>
            </Card>

            <Card className="border-amber-200 bg-amber-50 shadow-sm rounded-3xl">
              <CardContent className="p-6 flex gap-4">
                <Info className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <p className="font-bold mb-1">Important Visa Tip</p>
                  <p className="opacity-90 leading-relaxed">
                    Embassies want to see "liquid funds" (savings accounts, FDRs). Property valuation or gold cannot be used as primary proof of funds. The money should ideally be 28 to 6-months old depending on the country.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}

function Users({className}: {className?: string}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function BookOpen({className}: {className?: string}) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
}
