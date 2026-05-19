import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Heart, Database } from 'lucide-react';
import { BD_PROGRAMS, BD_UNIVERSITIES } from '../lib/bdData';
import { doc, writeBatch } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Button } from './ui/Button';

export function Footer() {
  const [isSeeding, setIsSeeding] = useState(false);

  const seedDatabase = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in as admin to seed data");
      return;
    }
    
    setIsSeeding(true);
    try {
      const batch = writeBatch(db);
      
      BD_UNIVERSITIES.forEach(uni => {
        batch.set(doc(db, 'universities', uni.id), uni);
      });
      
      BD_PROGRAMS.forEach(prog => {
        batch.set(doc(db, 'programs', prog.id), prog);
      });
      
      await batch.commit();
      alert("Successfully seeded Bangladesh universities and programs to database!");
    } catch (error: any) {
      console.error(error);
      alert("Failed to seed: " + error.message);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <footer className="bg-slate-900 pt-16 pb-24 sm:pb-8 text-slate-300">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary-500" />
              <span className="font-heading text-2xl font-bold text-white tracking-tight">
                EduSphere<span className="text-primary-500">BD</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-xs leading-relaxed">
              The ultimate platform dedicated to helping Bangladeshi students achieve their dreams of studying abroad without the guesswork.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            
            {/* Admin Seed Button */}
            <div className="pt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={seedDatabase}
                disabled={isSeeding}
                className="bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white text-xs gap-2"
              >
                <Database className="h-3 w-3" />
                {isSeeding ? 'Seeding...' : 'Seed Database'}
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Platform</h3>
            <ul className="space-y-4">
              <li><Link to="/build-profile" className="text-slate-400 hover:text-primary-400 transition-colors">University Matcher</Link></li>
              <li><Link to="/scholarships" className="text-slate-400 hover:text-primary-400 transition-colors">Scholarships</Link></li>
              <li><Link to="/proof-of-funds" className="text-slate-400 hover:text-primary-400 transition-colors">Proof of Funds Calculator</Link></li>
              <li><Link to="/sop-cv-builder" className="text-slate-400 hover:text-primary-400 transition-colors">SOP & CV Builder</Link></li>
              <li><Link to="/community" className="text-slate-400 hover:text-primary-400 transition-colors">Student Community</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Destinations</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Study in USA</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Study in Canada</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Study in UK</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Study in Australia</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary-400 transition-colors">Study in Europe</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EduSphereBD. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center">
            Made with <Heart className="h-4 w-4 text-rose-500 mx-1 fill-rose-500" /> for Bangladeshi Students
          </p>
        </div>
      </div>
    </footer>
  );
}
