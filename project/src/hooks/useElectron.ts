import { useState, useEffect } from 'react';

interface ElectronAPI {
  downloadFile: (url: string, filename: string) => Promise<{
    success: boolean;
    message: string;
    path?: string;
  }>;
  runFile: (filePath: string) => Promise<{
    success: boolean;
    message?: string;
  }>;
  platform: string;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export const useElectron = () => {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    setIsElectron(!!window.electronAPI);
  }, []);

  return {
    isElectron,
    electronAPI: window.electronAPI
  };
};