import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`glass rounded-xl p-5 text-white transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-white/10 active:scale-95' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
