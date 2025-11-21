import React, { useState } from 'react';
import { AnalysisResult, AppScreen } from '../types';
import { GlassCard } from '../components/GlassCard';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Share2, X, Check, Copy, Shield } from 'lucide-react';

interface InsightsProps {
  data: AnalysisResult | null;
  setScreen: (screen: AppScreen) => void;
}

export const Insights: React.FC<InsightsProps> = ({ data, setScreen }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [isAnonymized, setIsAnonymized] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h2 className="text-xl font-bold text-white">No Data Available</h2>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">Analyze your footprint to generate your digital personality map.</p>
        <button 
          onClick={() => setScreen(AppScreen.Analyze)}
          className="px-6 py-3 bg-[#6B4CFF] text-white rounded-full font-medium"
        >
          Go to Analyze
        </button>
      </div>
    );
  }

  const chartData = [
    { subject: 'Empathy', A: data.scores.empathy, fullMark: 100 },
    { subject: 'Toxicity', A: data.scores.toxicity, fullMark: 100 },
    { subject: 'Authenticity', A: data.scores.authenticity, fullMark: 100 },
    { subject: 'Professional', A: data.scores.professionalism, fullMark: 100 },
    { subject: 'Clarity', A: data.scores.clarity, fullMark: 100 },
    { subject: 'Consistency', A: data.scores.consistency, fullMark: 100 },
  ];

  const generateShareText = () => {
    const persona = isAnonymized ? "A Hidden Identity" : data.personaName;
    const insight = data.insight;
    
    return `Digital Mirror Analysis:\nPersona: ${persona}\n\n"${insight}"\n\nEmpathy: ${data.scores.empathy}%\nProfessionalism: ${data.scores.professionalism}%\n\nDiscover your digital footprint energy. #DigitalMirror`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Digital Mirror Analysis',
          text: generateShareText(),
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-6 pb-24 relative">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Insights</h1>
          <p className="text-gray-400 text-sm">{data.personaName}</p>
        </div>
        <button 
          onClick={() => setShowShareModal(true)}
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <Share2 size={20} className="text-[#0D9EFF]" />
        </button>
      </div>

      {/* Radar Chart */}
      <div className="h-80 w-full -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#DADBE2', fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Score"
              dataKey="A"
              stroke="#6B4CFF"
              strokeWidth={2}
              fill="#6B4CFF"
              fillOpacity={0.4}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0F0F15', borderColor: '#333', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Key Dimensions</h3>
        
        {Object.entries(data.scores).map(([key, value]) => (
          <GlassCard key={key} className="flex items-center justify-between py-4">
            <div className="flex flex-col">
              <span className="capitalize text-white font-medium">{key}</span>
              <div className="w-32 h-1 bg-white/10 rounded-full mt-2">
                <div 
                  className={`h-full rounded-full ${
                    key === 'toxicity' && (value as number) > 50 ? 'bg-red-500' : 'bg-gradient-to-r from-[#6B4CFF] to-[#0D9EFF]'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
            <span className="text-xl font-bold text-white">{value}</span>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="border border-[#0D9EFF]/30 bg-[#0D9EFF]/5">
        <h3 className="text-[#0D9EFF] font-bold mb-2">AI Summary</h3>
        <p className="text-sm text-gray-300 italic">"{data.insight}"</p>
      </GlassCard>

      {/* Share Modal Overlay */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowShareModal(false)} />
          
          <div className="relative w-full max-w-sm bg-[#0F0F15] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transform transition-all scale-100">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Share Analysis</h3>
              <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Preview Card (Visual representation of what is being shared) */}
            <div className="p-6 bg-gradient-to-br from-[#1A1A24] to-[#0F0F15]">
              <div className="border border-white/10 rounded-xl p-5 relative overflow-hidden group shadow-xl">
                 {/* Abstract Background within card */}
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#6B4CFF] rounded-full blur-[50px] opacity-20" />
                 <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#0D9EFF] rounded-full blur-[50px] opacity-20" />
                 
                 <div className="relative z-10">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Digital Persona</p>
                        <h2 className="text-xl font-bold text-white leading-tight">
                          {isAnonymized ? "Hidden Identity" : data.personaName}
                        </h2>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B4CFF] to-[#0D9EFF] flex items-center justify-center shadow-lg shadow-[#6B4CFF]/30">
                        <Shield size={14} className="text-white" />
                      </div>
                   </div>

                   <div className="space-y-2 mb-4">
                     <div className="flex justify-between text-sm">
                       <span className="text-gray-400">Empathy</span>
                       <span className="text-white font-mono">{data.scores.empathy}%</span>
                     </div>
                     <div className="w-full h-1 bg-white/10 rounded-full">
                       <div className="h-full bg-[#6B4CFF] rounded-full" style={{ width: `${data.scores.empathy}%` }} />
                     </div>
                     
                     <div className="flex justify-between text-sm mt-2">
                       <span className="text-gray-400">Professionalism</span>
                       <span className="text-white font-mono">{data.scores.professionalism}%</span>
                     </div>
                     <div className="w-full h-1 bg-white/10 rounded-full">
                        <div className="h-full bg-[#0D9EFF] rounded-full" style={{ width: `${data.scores.professionalism}%` }} />
                     </div>
                   </div>
                   
                   <p className="text-xs text-gray-300 italic leading-relaxed border-l-2 border-[#6B4CFF] pl-3 py-1">
                     "{data.insight}"
                   </p>
                 </div>
              </div>
              
              <p className="text-center text-xs text-gray-500 mt-4">Preview of shared card</p>
            </div>

            {/* Controls */}
            <div className="p-4 space-y-4 bg-[#13131C]">
              
              {/* Anonymize Toggle */}
              <div 
                onClick={() => setIsAnonymized(!isAnonymized)}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isAnonymized ? 'bg-[#6B4CFF] border-[#6B4CFF]' : 'border-gray-500'}`}>
                    {isAnonymized && <Check size={12} className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-200">Anonymize Identity</span>
                </div>
                <Shield size={16} className={isAnonymized ? "text-[#6B4CFF]" : "text-gray-500"} />
              </div>

              {/* Share Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleCopy}
                  className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>
                
                <button 
                  onClick={handleNativeShare}
                  className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-[#6B4CFF] hover:bg-[#5a3dd8] text-white text-sm font-medium transition-colors shadow-lg shadow-[#6B4CFF]/20"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
