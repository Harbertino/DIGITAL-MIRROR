import React, { useState } from 'react';
import { AppScreen } from '../types';
import { ArrowRight } from 'lucide-react';

interface OnboardingProps {
  setScreen: (screen: AppScreen) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ setScreen }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Discover Your Digital Self",
      desc: "Your digital energy reveals who you're becoming. We analyze the patterns you can't see.",
      image: "https://picsum.photos/400/400?random=1"
    },
    {
      title: "AI-Powered Identity Mapping",
      desc: "Understand your empathy, toxicity, and professionalism scores across all platforms.",
      image: "https://picsum.photos/400/400?random=2"
    },
    {
      title: "Private. Secure. Yours.",
      desc: "You have full control over your data. Improve your online presence with confidence.",
      image: "https://picsum.photos/400/400?random=3"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setScreen(AppScreen.Dashboard);
    }
  };

  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-[#6B4CFF] blur-[100px] opacity-30 rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[30%] bg-[#0D9EFF] blur-[100px] opacity-30 rounded-full" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10">
        <div className="w-64 h-64 mb-8 relative">
           <div className="absolute inset-0 bg-gradient-to-tr from-[#6B4CFF] to-[#0D9EFF] rounded-full blur-xl opacity-40"></div>
           <img 
            src={steps[step].image} 
            alt="Illustration" 
            className="relative w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl grayscale contrast-125" 
           />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4 h-20 flex items-center justify-center">
          {steps[step].title}
        </h1>
        <p className="text-gray-400 leading-relaxed max-w-xs">
          {steps[step].desc}
        </p>
      </div>

      <div className="flex-none p-8 flex justify-between items-center z-10">
        <div className="flex space-x-2">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-[#6B4CFF]' : 'w-2 bg-gray-600'}`} 
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};
