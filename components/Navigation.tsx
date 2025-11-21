import React from 'react';
import { Home, Activity, PieChart, MessageSquare, User } from 'lucide-react';
import { AppScreen } from '../types';

interface NavigationProps {
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, setScreen }) => {
  const navItems = [
    { screen: AppScreen.Dashboard, icon: Home, label: 'Home' },
    { screen: AppScreen.Analyze, icon: Activity, label: 'Analyze' },
    { screen: AppScreen.Insights, icon: PieChart, label: 'Insights' },
    { screen: AppScreen.Coach, icon: MessageSquare, label: 'Coach' },
    { screen: AppScreen.Profile, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-strong z-50 pb-6 pt-4 px-6 rounded-t-2xl border-t border-white/10">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.screen;
          return (
            <button
              key={item.label}
              onClick={() => setScreen(item.screen)}
              className={`flex flex-col items-center space-y-1 transition-colors duration-300 ${
                isActive ? 'text-[#6B4CFF]' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#6B4CFF] shadow-[0_0_8px_#6B4CFF]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
