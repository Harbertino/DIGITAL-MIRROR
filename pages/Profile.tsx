import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { Shield, Download, Settings, LogOut, CreditCard } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <div className="space-y-6 pb-24">
      <h1 className="text-2xl font-bold text-white">Identity Settings</h1>

      <GlassCard className="flex items-center space-x-4">
        <img src="https://picsum.photos/100/100" alt="User" className="w-16 h-16 rounded-full border-2 border-[#6B4CFF]" />
        <div>
          <h3 className="text-lg font-bold text-white">Alex Sterling</h3>
          <span className="px-2 py-1 bg-[#6B4CFF]/20 border border-[#6B4CFF]/50 text-[#6B4CFF] text-[10px] font-bold uppercase rounded-md">
            Pro Member
          </span>
        </div>
      </GlassCard>

      <div className="space-y-3">
        <h4 className="text-xs uppercase text-gray-500 font-semibold tracking-widest ml-1">Account</h4>
        
        <GlassCard className="flex items-center justify-between py-4 hover:bg-white/10 cursor-pointer">
          <div className="flex items-center space-x-3">
            <CreditCard size={20} className="text-gray-300" />
            <span className="text-sm font-medium">Subscription Plan</span>
          </div>
          <span className="text-xs text-gray-400">Manage</span>
        </GlassCard>

        <GlassCard className="flex items-center justify-between py-4 hover:bg-white/10 cursor-pointer">
          <div className="flex items-center space-x-3">
            <Settings size={20} className="text-gray-300" />
            <span className="text-sm font-medium">Preferences</span>
          </div>
        </GlassCard>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs uppercase text-gray-500 font-semibold tracking-widest ml-1">Data & Privacy</h4>
        
        <GlassCard className="flex items-center justify-between py-4 hover:bg-white/10 cursor-pointer">
          <div className="flex items-center space-x-3">
            <Download size={20} className="text-[#0D9EFF]" />
            <span className="text-sm font-medium">Export PDF Report</span>
          </div>
        </GlassCard>

        <GlassCard className="flex items-center justify-between py-4 hover:bg-white/10 cursor-pointer">
          <div className="flex items-center space-x-3">
            <Shield size={20} className="text-green-400" />
            <span className="text-sm font-medium">Privacy Controls</span>
          </div>
        </GlassCard>
        
        <GlassCard className="flex items-center justify-between py-4 hover:bg-red-900/20 border-red-500/20 cursor-pointer group">
          <div className="flex items-center space-x-3">
            <LogOut size={20} className="text-red-400 group-hover:text-red-300" />
            <span className="text-sm font-medium text-red-400 group-hover:text-red-300">Sign Out</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
