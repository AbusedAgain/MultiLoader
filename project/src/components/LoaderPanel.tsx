import React, { useMemo, memo } from 'react';
import WindowControls from './WindowControls';

interface LoaderPanelProps {
  message?: string;
  onMouseDown?: (e: React.MouseEvent) => void;
}

const LoaderPanel: React.FC<LoaderPanelProps> = memo(({ message = 'Ready to launch', onMouseDown }) => {
  const particles = useMemo(() =>
    Array.from({ length: 10 }).map((_, i) => ({
      key: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2
    })), []
  );

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-lg border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none"></div>
      {particles.map((particle) => (
        <div
          key={particle.key}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            willChange: 'transform, opacity'
          }}
        />
      ))}
      {/* Draggable header area */}
      <div
        className="absolute top-0 left-0 w-full h-16 cursor-grab active:cursor-grabbing z-10"
        onMouseDown={onMouseDown}
      />
      {/* Header */}
      <div className="p-3 relative z-20 animate-slide-in">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white tracking-wider drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">SURGE</h2>
          <WindowControls />
        </div>
      </div>

      {/* Loader Content */}
      <div className="flex-1 p-4 flex flex-col items-center justify-center transform-gpu relative z-10">
        <div className="relative w-20 h-20 mb-6 will-change-transform transform-gpu animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

          {/* Static background ring */}
          <svg className="absolute inset-0 will-change-transform" width="80" height="80">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="rgb(71, 85, 105)"
              strokeWidth="4"
              fill="transparent"
            />
          </svg>

          {/* Spinning progress ring */}
          <svg className="absolute inset-0 will-change-transform animate-spin" width="80" height="80" style={{
            animationDuration: '2s',
            animationTimingFunction: 'linear'
          }}>
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="url(#loaderGradient)"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray="226.19"
              strokeDashoffset="56.55"
              strokeLinecap="round"
              className="transition-all duration-300 ease-out will-change-transform"
            />
            <defs>
              <linearGradient id="loaderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse will-change-transform shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
          </div>
        </div>

        <div className="text-center transform-gpu animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <p className="text-white text-sm font-semibold mb-1 tracking-wide drop-shadow-[0_0_6px_rgba(6,182,212,0.3)]">{message}</p>
          <p className="text-cyan-400 text-xs font-medium tracking-wider animate-pulse">PROCESSING...</p>
        </div>
      </div>
    </div>
  );
});

LoaderPanel.displayName = 'LoaderPanel';

export default LoaderPanel;