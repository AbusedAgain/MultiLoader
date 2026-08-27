import React, { useMemo, memo } from 'react';

interface CircularLoaderProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const CircularLoader: React.FC<CircularLoaderProps> = memo(({
  progress,
  size = 120,
  strokeWidth = 8,
  className = ''
}) => {
  const { radius, circumference, strokeDashoffset } = useMemo(() => {
    const r = (size - strokeWidth) / 2;
    const c = r * 2 * Math.PI;
    const offset = c - (progress / 100) * c;
    return { radius: r, circumference: c, strokeDashoffset: offset };
  }, [size, strokeWidth, progress]);

  return (
    <div className={`relative will-change-transform ${className}`}>
      <svg
        className="transform -rotate-90 will-change-transform"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgb(55, 65, 81)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out will-change-transform"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
      </div>
    </div>
  );
});

CircularLoader.displayName = 'CircularLoader';

export default CircularLoader;