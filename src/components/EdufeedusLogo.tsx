import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  lightText?: boolean;
}

export const EdufeedusLogo: React.FC<LogoProps> = ({ 
  className = "h-10 w-auto", 
  size,
  showText = false,
  lightText = false
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <img 
        src="/logo.svg" 
        alt="Edufeedus Group of Institutes Logo" 
        className="object-contain"
        style={{ height: size ? (typeof size === 'number' ? `${size}px` : size) : '2.5rem', width: 'auto' }}
      />
      {showText && (
        <div className="flex flex-col">
          <span className={`text-xl font-black tracking-tight leading-tight ${lightText ? 'text-white' : 'text-slate-900'}`}>
            Edufeedus
          </span>
          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest leading-none">
            Group of Institutes
          </span>
        </div>
      )}
    </div>
  );
};

export default EdufeedusLogo;
