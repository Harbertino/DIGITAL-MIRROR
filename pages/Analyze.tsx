import React, { useState, useRef } from 'react';
import { analyzeFootprint } from '../services/geminiService';
import { AnalysisResult, AppScreen } from '../types';
import { GlassCard } from '../components/GlassCard';
import { Upload, Link, FileText, Loader2, X } from 'lucide-react';

interface AnalyzeProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  setScreen: (screen: AppScreen) => void;
}

export const Analyze: React.FC<AnalyzeProps> = ({ onAnalysisComplete, setScreen }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data url prefix for Gemini API
        const base64Data = base64String.split(',')[1];
        setSelectedImage(base64Data);
        setMimeType(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText && !selectedImage) return;

    setIsLoading(true);
    try {
      const result = await analyzeFootprint(inputText, selectedImage || undefined, mimeType || undefined);
      onAnalysisComplete(result);
      setScreen(AppScreen.Insights);
    } catch (error) {
      alert("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Analyze Footprint</h1>
        <p className="text-gray-400 text-sm">Input social posts, bios, or upload screenshots.</p>
      </div>

      {/* Text Input */}
      <div className="relative">
        <textarea
          className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#6B4CFF] transition resize-none"
          placeholder="Paste your recent tweets, LinkedIn posts, or bio here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-500">
          {inputText.length} chars
        </div>
      </div>

      {/* Image Upload Preview */}
      {selectedImage && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
           <img src={`data:${mimeType};base64,${selectedImage}`} alt="Preview" className="w-full h-full object-cover opacity-80" />
           <button 
            onClick={() => { setSelectedImage(null); setMimeType(null); }}
            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white"
           >
             <X size={16} />
           </button>
        </div>
      )}

      {/* Input Methods */}
      <div className="grid grid-cols-3 gap-3">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
        
        <GlassCard onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center py-4 space-y-2 hover:bg-white/10">
          <Upload size={20} className="text-[#0D9EFF]" />
          <span className="text-xs font-medium">Upload Image</span>
        </GlassCard>

        <GlassCard className="flex flex-col items-center justify-center py-4 space-y-2 opacity-50 cursor-not-allowed">
          <Link size={20} className="text-[#6B4CFF]" />
          <span className="text-xs font-medium">Link Profile</span>
        </GlassCard>

        <GlassCard className="flex flex-col items-center justify-center py-4 space-y-2 opacity-50 cursor-not-allowed">
          <FileText size={20} className="text-pink-500" />
          <span className="text-xs font-medium">Import PDF</span>
        </GlassCard>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleAnalyze}
        disabled={isLoading || (!inputText && !selectedImage)}
        className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center space-x-2 transition-all ${
          isLoading || (!inputText && !selectedImage)
            ? 'bg-gray-700 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-[#6B4CFF] to-[#0D9EFF] shadow-lg shadow-[#6B4CFF]/30'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Processing Neural Data...</span>
          </>
        ) : (
          <span>Begin Analysis</span>
        )}
      </button>
      
      {isLoading && (
         <div className="text-center text-xs text-gray-500 animate-pulse">
           Connecting to Gemini v2.5... Mapping patterns...
         </div>
      )}
    </div>
  );
};
