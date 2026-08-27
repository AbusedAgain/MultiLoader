import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed top-4 right-4 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 shadow-2xl z-50 max-w-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <img 
            src="https://cdn.discordapp.com/attachments/1294735755725504512/1411090536416284702/image.png?ex=68b4b578&is=68b363f8&hm=ad484d640b3a0706f42fdbdc4ef6037735c528b20602bb81a51be5681ba56f2e&"
            alt="Bellatrix Logo"
            className="w-6 h-6 rounded"
          />
          <h3 className="text-white font-bold text-sm">Install Bellatrix</h3>
          <h3 className="text-white font-bold text-sm">Install Surge</h3>
        </div>
        <button 
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-gray-300 text-xs mb-4">
        Install Surge Gaming Loader for quick access and offline functionality.
      </p>
      
      <div className="flex gap-2">
        <button
          onClick={handleInstall}
          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-xs font-medium py-2 px-3 rounded transition-all duration-300 flex items-center justify-center gap-1"
        >
          <Download className="w-3 h-3" />
          Install
        </button>
        <button
          onClick={handleDismiss}
          className="px-3 py-2 text-gray-400 hover:text-white text-xs transition-colors"
        >
          Later
        </button>
      </div>
    </div>
  );
};

export default InstallPrompt;