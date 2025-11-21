import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { AnalysisResult, AppScreen } from '../types';
import { Sparkles, ArrowUpRight, Zap, Activity } from 'lucide-react';

interface DashboardProps {
  latestAnalysis: AnalysisResult | null;
  setScreen: (screen: AppScreen) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ latestAnalysis, setScreen }) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Hello, Traveler</h1>
          <p className="text-gray-400 text-sm">Your digital resonance is active.</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6B4CFF] to-[#0D9EFF] p-[2px]">
          <img src="https://picsum.photos/100/100" alt="Profile" className="rounded-full w-full h-full object-cover border-2 border-[#0F0F15]" />
        </div>
      </div>

      {/* Persona Ring / Main Status */}
      <div className="relative flex justify-center py-8">
        <div className="absolute inset-0 bg-[#6B4CFF] opacity-20 blur-[80px] rounded-full transform scale-75" />
        <div className="relative w-64 h-64 rounded-full glass-strong flex flex-col items-center justify-center border-4 border-[#6B4CFF]/20 shadow-[0_0_30px_rgba(107,76,255,0.2)]">
           {/* Animated Rings */}
           <div className="absolute inset-0 border border-white/10 rounded-full animate-pulse" />
           
           <div className="text-center z-10 px-4">
             <span className="text-xs uppercase tracking-widest text-gray-400">Current Persona</span>
             <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mt-1 mb-2">
               {latestAnalysis ? latestAnalysis.personaName : "Unidentified"}
             </h2>
             {latestAnalysis ? (
               <div className="flex items-center justify-center space-x-2">
                 <span className="text-[#0D9EFF] text-lg font-semibold">{latestAnalysis.scores.professionalism}%</span>
                 <span className="text-xs text-gray-400">Professionalism</span>
               </div>
             ) : (
               <button 
                onClick={() => setScreen(AppScreen.Analyze)}
                className="mt-2 px-4 py-2 bg-[#6B4CFF] text-white text-xs rounded-full hover:bg-[#5a3dd8] transition"
               >
                 Start Analysis
               </button>
             )}
           </div>
        </div>
      </div>

      {/* Daily Insight */}
      <GlassCard className="border-l-4 border-l-[#0D9EFF]">
        <div className="flex items-start space-x-3">
          <Sparkles className="text-[#0D9EFF] flex-shrink-0 mt-1" size={18} />
          <div>
            <h3 className="text-sm font-semibold text-white mb-1">Daily Mirror Insight</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {latestAnalysis 
                ? latestAnalysis.insight 
                : "Your digital footprint is waiting to be mapped. Run your first analysis to unlock daily insights about your online presence."}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard>
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-white/5 rounded-lg">
              <Zap size={16} className="text-yellow-400" />
            </div>
            <span className="text-xs text-green-400 flex items-center">
              +12% <ArrowUpRight size={12} />
            </span>
          </div>
          <div className="text-2xl font-bold text-white">
             {latestAnalysis ? latestAnalysis.scores.empathy : "--"}
          </div>
          <div className="text-xs text-gray-400">Empathy Score</div>
        </GlassCard>

        <GlassCard>
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-white/5 rounded-lg">
              <Activity size={16} className="text-[#6B4CFF]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
             {latestAnalysis ? latestAnalysis.scores.clarity : "--"}
          </div>
          <div className="text-xs text-gray-400">Clarity Index</div>
        </GlassCard>
      </div>

       {/* FAB for Analyze */}
       {!latestAnalysis && (
         <button 
          onClick={() => setScreen(AppScreen.Analyze)}
          className="w-full py-4 bg-gradient-to-r from-[#6B4CFF] to-[#0D9EFF] rounded-xl text-white font-semibold shadow-lg shadow-[#6B4CFF]/30 active:scale-[0.98] transition-transform"
         >
           Analyze Digital Footprint
         </button>
       )}
    </div>
  );
};