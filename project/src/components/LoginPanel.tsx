import React, { useState, useEffect, useCallback, memo } from 'react';
import { ShoppingBag } from 'lucide-react';

interface LoginPanelProps {
  onLogin: (user: { username: string }) => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
}

const LoginPanel: React.FC<LoginPanelProps> = memo(({ onLogin, onMinimize, onMaximize, onClose, onMouseDown }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin({ username: 'Player' });
      setIsLoading(false);
    }, 100);
  }, [onLogin]);

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-lg border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_50%)] pointer-events-none"></div>
      <div
        className="absolute top-0 left-0 w-full h-16 cursor-grab active:cursor-grabbing z-10"
        onMouseDown={onMouseDown}
      />
      <div className="relative z-10 flex-1 flex flex-col justify-between p-8 pt-16">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-xl font-bold text-white mb-3 tracking-wider drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">NEXT LEVEL GAMING BEGINS HERE</h1>
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
          </div>

          <div className="flex justify-center mb-8 animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-2xl opacity-40 animate-pulse" style={{ width: '140px', height: '140px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}></div>
              <img
                src="/icon.png?v=2"
                alt="Surge Gaming Logo"
                className="w-36 h-36 object-contain transform-gpu relative z-10 animate-glow drop-shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <button
            onClick={handleClick}
            disabled={isLoading}
            className="w-full max-w-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3.5 px-8 rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform-gpu hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-200 flex items-center justify-center space-x-2 relative overflow-hidden group animate-scale-in"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -left-full group-hover:left-full transition-all duration-700"></div>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white transform-gpu"></div>
                <span>Enter the Vault</span>
              </>
            ) : (
              <span>Enter the Vault</span>
            )}
          </button>
        </div>

        <div className="text-center animate-fade-in pb-4" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          <p className="text-slate-400 text-sm mb-4">Follow us on social media</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.youtube.com/@SurgeService"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-700/50 rounded-full border border-slate-600 hover:border-cyan-500 hover:bg-cyan-500/20 hover:scale-110 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-200 group transform-gpu animate-scale-in"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <img
                src="https://images.vexels.com/media/users/3/137425/isolated/preview/f2ea1ded4d037633f687ee389a571086-youtube-icon-logo.png"
                alt="YouTube"
                className="w-6 h-6 group-hover:opacity-80 transition-opacity duration-200 transform-gpu"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://discord.gg/surgeservices"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-700/50 rounded-full border border-slate-600 hover:border-cyan-500 hover:bg-cyan-500/20 hover:scale-110 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-200 group transform-gpu animate-scale-in"
              style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            >
              <img
                src="https://www.freeiconspng.com/uploads/silver-discord-token-icon-16.png"
                alt="Discord"
                className="w-6 h-6 group-hover:opacity-80 transition-opacity duration-200 transform-gpu"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href="https://surgeservices.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-slate-700/50 rounded-full border border-slate-600 hover:border-cyan-500 hover:bg-cyan-500/20 hover:scale-110 hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all duration-200 group transform-gpu animate-scale-in flex items-center justify-center"
              style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
            >
              <ShoppingBag className="w-6 h-6 text-white group-hover:opacity-80 transition-opacity duration-200" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

LoginPanel.displayName = 'LoginPanel';

export default LoginPanel;