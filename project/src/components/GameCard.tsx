import React, { useState, useCallback, memo } from 'react';
import { Download } from 'lucide-react';
import { GameItem } from '../types';

interface GameCardProps {
  game: GameItem;
  onAction: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = memo(({ game, onAction }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAction = useCallback(() => {
    onAction(game.id);
  }, [game.id, onAction]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="flex items-center bg-slate-800/40 rounded p-3 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-700/30 hover:shadow-[0_0_16px_rgba(6,182,212,0.2)] hover:scale-[1.01] transition-all duration-200 group mb-2 relative overflow-hidden animate-slide-in"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
      {/* Game thumbnail and title */}
      <div className="flex flex-col items-center mr-4 relative z-10">
        <div className="relative overflow-hidden rounded mb-2 transform-gpu group-hover:scale-110 transition-transform duration-200 bg-slate-700/50" style={{ willChange: 'transform' }}>
          {!imageError ? (
            <img
              src={game.thumbnail}
              alt={game.title}
              width="64"
              height="48"
              className="w-16 h-12 object-cover rounded transform-gpu transition-all duration-200"
              onError={handleImageError}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              style={{
                imageRendering: 'crisp-edges',
                transform: 'translateZ(0)',
                willChange: 'filter',
                filter: isHovered ? 'brightness(1.1) saturate(1.2)' : 'none'
              }}
            />
          ) : (
            <div className="w-16 h-12 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded">
              <span className="text-cyan-400 text-xs font-bold">{game.title.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
        </div>
        <h3 className="text-white font-medium text-xs text-center leading-tight max-w-[64px] group-hover:text-cyan-400 transition-colors duration-200">{game.title}</h3>
      </div>
      
      {/* Launch and update info */}
      {game.isDownloading ? (
        <div className="flex-1 mr-4 relative z-10">
          <div className="bg-slate-600/50 rounded-full h-2 mb-2 w-32 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out relative shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              style={{ width: `${game.downloadProgress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <p className="text-xs text-cyan-400 font-medium">{game.downloadProgress}% complete</p>
        </div>
      ) : (
        <div className="flex-1 mr-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">Last update:</span>
            <span className="text-white text-xs">{game.lastUpdate}</span>
          </div>
        </div>
      )}
      
      {/* Action button */}
      <button
        onClick={handleAction}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-2 rounded transition-all duration-150 transform hover:scale-110 hover:rotate-3 flex items-center justify-center shadow-lg hover:shadow-[0_0_16px_rgba(6,182,212,0.6)] active:scale-95 relative z-10 overflow-hidden group/btn"
        style={{ willChange: 'transform' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500"></div>
        <Download className="w-4 h-4 relative z-10" />
      </button>
    </div>
  );
});

GameCard.displayName = 'GameCard';

export default GameCard;
