import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { Button } from './ui/Button';
import { GraduationCap, Home, BookOpen, Search, Users, Banknote } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Navigation() {
  const location = useLocation();

  return (
    <>
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-[60px] max-w-md items-center justify-between px-4 sm:max-w-7xl sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 transition-transform active:scale-95">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-100 text-primary-700">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
              Edu<span className="text-primary-600">BD</span>
            </span>
          </Link>
          
          {/* Desktop Nav - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/scholarships" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Scholarships</Link>
            <Link to="/proof-of-funds" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Funds</Link>
            <Link to="/community" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Community</Link>
            <div className="h-4 w-px bg-slate-200" />
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Sign in</Link>
            <Link to="/build-profile">
              <Button size="sm">Find Match</Button>
            </Link>
          </div>

          {/* Mobile Login Button */}
          <div className="sm:hidden">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-primary-600">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16 px-2">
          <MobileNavItem to="/" icon={<Home className="h-5 w-5" />} label="Home" active={location.pathname === '/'} />
          <MobileNavItem to="/build-profile" icon={<Search className="h-5 w-5" />} label="Match" active={location.pathname === '/build-profile' || location.pathname === '/results'} />
          <MobileNavItem to="/scholarships" icon={<BookOpen className="h-5 w-5" />} label="Grants" active={location.pathname === '/scholarships'} />
          <MobileNavItem to="/proof-of-funds" icon={<Banknote className="h-5 w-5" />} label="Funds" active={location.pathname === '/proof-of-funds'} />
          <MobileNavItem to="/community" icon={<Users className="h-5 w-5" />} label="Forum" active={location.pathname === '/community'} />
        </div>
      </div>
    </>
  );
}

function MobileNavItem({ to, icon, label, active }: { to: string, icon: React.ReactNode, label: string, active: boolean }) {
  return (
    <Link to={to} className="flex flex-col items-center justify-center w-full h-full pt-1">
      <div className={cn("flex flex-col items-center transition-all duration-200", active ? "text-primary-600" : "text-slate-500")}>
        {icon}
        <span className="text-[10px] font-medium leading-tight mt-0.5">{label}</span>
      </div>
      <div className="h-1 mt-1">
        {active && (
          <motion.div layoutId="mobile-nav-indicator" className="w-1 h-1 rounded-full bg-primary-600" />
        )}
      </div>
    </Link>
  );
}
