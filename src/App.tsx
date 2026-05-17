import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { ProfileBuilderPage } from './pages/ProfileBuilderPage';
import { ResultsPage } from './pages/ResultsPage';
import { UniversityDetailsPage } from './pages/UniversityDetailsPage';
import { ScholarshipsPage } from './pages/ScholarshipsPage';
import { ProofOfFundsPage } from './pages/ProofOfFundsPage';
import { SopCvBuilderPage } from './pages/SopCvBuilderPage';
import { CommunityPage } from './pages/CommunityPage';
import { LoginPage } from './pages/LoginPage';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex min-h-[100dvh] flex-col selection:bg-primary-200 selection:text-primary-900">
      {!isLoginPage && <Navigation />}
      <main className="flex flex-1 flex-col">{children}</main>
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/build-profile" element={<ProfileBuilderPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/university/:id" element={<UniversityDetailsPage />} />
          <Route path="/scholarships" element={<ScholarshipsPage />} />
          <Route path="/proof-of-funds" element={<ProofOfFundsPage />} />
          <Route path="/sop-cv-builder" element={<SopCvBuilderPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
