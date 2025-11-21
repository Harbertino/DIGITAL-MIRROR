import React, { useState, useEffect } from 'react';
import { AppScreen, AnalysisResult } from './types';
import { Navigation } from './components/Navigation';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { Analyze } from './pages/Analyze';
import { Insights } from './pages/Insights';
import { Coach } from './pages/Coach';
import { Profile } from './pages/Profile';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.Splash);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Splash Screen Effect
  useEffect(() => {
    if (screen === AppScreen.Splash) {
      const timer = setTimeout(() => {
        setScreen(AppScreen.Onboarding);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.Splash:
        return (
          <div className="h-screen flex flex-col items-center justify-center bg-[#0F0F15] relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 bg-gradient-to-b from-transparent via-white to-transparent h-full opacity-20 animate-pulse" />
             </div>
             <h1 className="text-4xl font-bold text-white z-10 neon-text tracking-tighter">DIGITAL MIRROR</h1>
             <p className="text-[#6B4CFF] tracking-[0.3em] text-xs mt-2 z-10 uppercase">Identity Reflected</p>
          </div>
        );
      case AppScreen.Onboarding:
        return <Onboarding setScreen={setScreen} />;
      case AppScreen.Dashboard:
        return <Dashboard latestAnalysis={analysisResult} setScreen={setScreen} />;
      case AppScreen.Analyze:
        return <Analyze onAnalysisComplete={setAnalysisResult} setScreen={setScreen} />;
      case AppScreen.Insights:
        return <Insights data={analysisResult} setScreen={setScreen} />;
      case AppScreen.Coach:
        return <Coach />;
      case AppScreen.Profile:
        return <Profile />;
      default:
        return <Dashboard latestAnalysis={analysisResult} setScreen={setScreen} />;
    }
  };

  const showNav = screen !== AppScreen.Splash && screen !== AppScreen.Onboarding && screen !== AppScreen.Login;

  return (
    <div className="min-h-screen bg-[#0F0F15] text-white selection:bg-[#6B4CFF] selection:text-white overflow-x-hidden">
      {/* App Content Container */}
      <div className="max-w-md mx-auto min-h-screen relative bg-[#0F0F15] shadow-2xl overflow-hidden">
        
        {/* Global Background Elements */}
        {showNav && (
          <>
            <div className="fixed top-[-200px] left-[-100px] w-[400px] h-[400px] bg-[#6B4CFF] rounded-full blur-[120px] opacity-10 pointer-events-none z-0" />
            <div className="fixed bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#0D9EFF] rounded-full blur-[100px] opacity-10 pointer-events-none z-0" />
          </>
        )}

        {/* Main Content */}
        <main className={`h-full z-10 relative ${showNav ? 'px-6 pt-8' : ''}`}>
          {renderScreen()}
        </main>

        {/* Bottom Navigation */}
        {showNav && <Navigation currentScreen={screen} setScreen={setScreen} />}
      </div>
    </div>
  );
}
