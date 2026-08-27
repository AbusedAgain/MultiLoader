import React, { useState, useEffect, useCallback, memo } from 'react';
import { Search, Filter, ChevronUp, ChevronDown, ShoppingBag } from 'lucide-react';
import { GameItem, Loader } from '../types';
import GameCard from './GameCard';
import WindowControls from './WindowControls';

interface GameLibraryProps {
  games: GameItem[];
  loaders?: Loader[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onGameAction: (gameId: string) => void;
  onLoaderAction?: (loaderId: string) => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
  onMouseDown?: (e: React.MouseEvent) => void;
}

const GameLibrary: React.FC<GameLibraryProps> = memo(({
  games,
  loaders = [],
  searchQuery,
  onSearchChange,
  onGameAction,
  onLoaderAction,
  onMinimize,
  onMaximize,
  onClose,
  isMaximized = false,
  onMouseDown
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  const handleLogoError = useCallback(() => {
    setLogoError(true);
  }, []);

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-lg border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none"></div>
      <div className="relative z-10 flex flex-col h-full p-4">
      {/* Header with window controls */}
      <div
        className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/50 animate-slide-in cursor-grab active:cursor-grabbing"
        onMouseDown={onMouseDown}
      >
        <div className="flex items-center gap-3">
          {!logoError ? (
            <img
              src="/icon.png?v=2"
              alt="Surge Logo"
              width="36"
              height="36"
              className="w-9 h-9 object-contain transform-gpu animate-rotate-y pointer-events-none"
              onError={handleLogoError}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{
                transform: 'translateZ(0)',
                filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))',
                willChange: 'transform'
              }}
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg transform-gpu animate-rotate-y pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))' }}>
              <span className="text-white font-black text-sm">S</span>
            </div>
          )}
          <div className="flex flex-col pointer-events-none">
            <h2 className="text-lg font-black text-white tracking-[0.2em] leading-tight drop-shadow-sm">LOADER</h2>
            <h2 className="text-lg font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-[0.2em] leading-tight animate-glow">LIBRARY</h2>
          </div>
          <div className="flex items-center space-x-2 ml-3 pointer-events-auto">
            <a
              href="https://www.youtube.com/@SurgeService"
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1.5 bg-slate-700/50 rounded-full border border-slate-600 hover:border-red-500 hover:bg-red-500/20 hover:scale-110 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all duration-200 group animate-scale-in"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              <img
                src="https://images.vexels.com/media/users/3/137425/isolated/preview/f2ea1ded4d037633f687ee389a571086-youtube-icon-logo.png"
                alt="YouTube"
                className="w-4 h-4 group-hover:opacity-80 transition-opacity duration-200 transform-gpu"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                style={{
                  imageRendering: 'crisp-edges',
                  transform: 'translateZ(0)'
                }}
              />
            </a>
            <a
              href="https://discord.gg/surgeservices"
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1.5 bg-slate-700/50 rounded-full border border-slate-600 hover:border-blue-500 hover:bg-blue-500/20 hover:scale-110 hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] transition-all duration-200 group animate-scale-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              <img
                src="https://www.freeiconspng.com/uploads/silver-discord-token-icon-16.png"
                alt="Discord"
                className="w-4 h-4 group-hover:opacity-80 transition-opacity duration-200 transform-gpu"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                style={{
                  imageRendering: 'crisp-edges',
                  transform: 'translateZ(0)'
                }}
              />
            </a>
            <a
              href="https://surgeservices.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseDown={(e) => e.stopPropagation()}
              className="p-1.5 bg-slate-700/50 rounded-full border border-slate-600 hover:border-cyan-500 hover:bg-cyan-500/20 hover:scale-110 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-200 group animate-scale-in flex items-center justify-center"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              <ShoppingBag className="w-4 h-4 text-white group-hover:opacity-80 transition-opacity duration-200" />
            </a>
          </div>
        </div>
        <WindowControls 
          onMinimize={onMinimize} 
          onMaximize={onMaximize}
          onClose={onClose}
          isMaximized={isMaximized}
        />
      </div>
      
      {/* Search Bar */}
      <div className="flex gap-2 mb-3 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search games..."
            className="w-full bg-slate-800/60 border border-slate-600/60 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-slate-700/60 focus:shadow-[0_0_16px_rgba(6,182,212,0.3)] transition-all duration-200 text-sm shadow-inner"
          />
        </div>
        <button className="bg-slate-800/60 border border-slate-600/60 rounded-lg px-4 py-3 text-gray-400 hover:text-cyan-400 hover:border-cyan-500 hover:bg-slate-700/60 hover:shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all duration-200 shadow-inner">
          <Filter className="w-4 h-4" />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 relative min-h-0 animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
        <div className="scroll-fade-top"></div>
        <div className="scroll-fade-bottom"></div>
        <div className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
          <div className="space-y-4">
            {/* Loaders Section */}
            {loaders.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-cyan-400 tracking-wider px-1 mb-2">MODDING TOOLS</h3>
                {loaders.map((loader) => (
                  <div
                    key={loader.id}
                    className="bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-slate-600/60 rounded-lg p-3 hover:border-cyan-500 hover:shadow-[0_0_16px_rgba(6,182,212,0.2)] transition-all duration-200 cursor-pointer group"
                    onClick={() => onLoaderAction?.(loader.id)}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={loader.image_url}
                        alt={loader.title}
                        className="w-12 h-12 rounded-lg object-cover border border-slate-600 group-hover:border-cyan-500 transition-colors"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm group-hover:text-cyan-400 transition-colors">{loader.title}</h4>
                        <p className="text-gray-400 text-xs line-clamp-1">{loader.description}</p>
                        <p className="text-cyan-400 text-xs mt-0.5">v{loader.version}</p>
                      </div>
                      <button
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg text-xs font-semibold transition-colors shadow-lg hover:shadow-cyan-500/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLoaderAction?.(loader.id);
                        }}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Games Section */}
            {games.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-blue-400 tracking-wider px-1 mb-2">GAMES</h3>
                {games.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onAction={onGameAction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
});

GameLibrary.displayName = 'GameLibrary';

export default GameLibrary;