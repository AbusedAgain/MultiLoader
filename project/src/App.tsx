import React, { useState, useEffect } from 'react';
import { GameItem, User, Loader } from './types';
import LoginPanel from './components/LoginPanel';
import GameLibrary from './components/GameLibrary';
import LoaderPanel from './components/LoaderPanel';
import InstallPrompt from './components/InstallPrompt';
import { useElectron } from './hooks/useElectron';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [loadingMessage, setLoadingMessage] = useState('');
  const [games, setGames] = useState<GameItem[]>([]);
  const [loaders, setLoaders] = useState<Loader[]>([]);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const { isElectron, electronAPI } = useElectron();

  useEffect(() => {
    preloadImages();
    fetchGames();
    fetchLoaders();
  }, []);

  const preloadImages = () => {
    const imagesToPreload = [
      'https://cdn.discordapp.com/attachments/1294735755725504512/1442118660268490813/public.png?ex=69244529&is=6922f3a9&hm=2fdcff787d1b7c776da5fe90374c3fab2bb729d24f3d6712716e873844087e1f&'
    ];

    let loadedCount = 0;
    const totalImages = imagesToPreload.length;

    imagesToPreload.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesPreloaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesPreloaded(true);
        }
      };
      img.src = src;
    });
  };

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        return;
      }

      if (data && data.length > 0) {
        const formattedGames: GameItem[] = data.map((game: any) => ({
          id: game.id,
          title: game.title,
          thumbnail: game.image_url,
          lastUpdate: game.version || 'Latest',
          isDownloading: false,
          downloadProgress: 0,
          isReady: true,
          downloadUrl: game.install_path || ''
        }));
        setGames(formattedGames);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const fetchLoaders = async () => {
    try {
      const { data, error } = await supabase
        .from('loaders')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching loaders:', error);
        return;
      }

      if (data && data.length > 0) {
        setLoaders(data);
      }
    } catch (error) {
      console.error('Error fetching loaders:', error);
    }
  };

  const fallbackGames: GameItem[] = [
    {
      id: '1',
      title: 'Unlock All',
      thumbnail: 'https://i2-prod.mirror.co.uk/article32451983.ece/ALTERNATES/s1200d/1_Warzone-Season-3.jpg',
      lastUpdate: 'Latest',
      isDownloading: false,
      downloadProgress: 0,
      isReady: true,
      downloadUrl: 'https://github.com/AbusedAgain/Surge-Services/raw/main/UA.exe'
    },
    {
      id: '2',
      title: 'Unlock All V2',
      thumbnail: 'https://i2-prod.mirror.co.uk/article32451983.ece/ALTERNATES/s1200d/1_Warzone-Season-3.jpg',
      lastUpdate: 'Latest',
      isDownloading: false,
      downloadProgress: 0,
      isReady: true,
      downloadUrl: 'https://github.com/AbusedAgain/Surge-Services/raw/main/UAV2.exe'
    },
    {
      id: '3',
      title: 'Abused Chair',
      thumbnail: 'https://i2-prod.mirror.co.uk/article32451983.ece/ALTERNATES/s1200d/1_Warzone-Season-3.jpg',
      lastUpdate: 'Latest',
      isDownloading: false,
      downloadProgress: 0,
      isReady: true,
      downloadUrl: 'https://github.com/AbusedAgain/Surge-Services/raw/main/Abused.exe'
    },
    {
      id: '4',
      title: 'Abused External',
      thumbnail: 'https://i2-prod.mirror.co.uk/article32451983.ece/ALTERNATES/s1200d/1_Warzone-Season-3.jpg',
      lastUpdate: 'Latest',
      isDownloading: false,
      downloadProgress: 0,
      isReady: true,
      downloadUrl: 'https://github.com/AbusedAgain/Surge-Services/raw/main/AbusedExternal.exe'
    },
    {
      id: '5',
      title: 'Fortnite',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPtEk1fCnKwt2BjySD_OZwlGVWVxetMiNfgQ&s',
      lastUpdate: 'Latest',
      isDownloading: false,
      downloadProgress: 0,
      isReady: true,
      downloadUrl: 'https://github.com/AbusedAgain/Surge-Services/raw/main/Fortnite.exe'
    },
    {
      id: '6',
      title: 'Rust',
      thumbnail: 'https://www.allkeyshop.com/blog/wp-content/uploads/Rust-1.jpg',
      lastUpdate: 'Latest',
      isDownloading: false,
      downloadProgress: 0,
      isReady: true,
      downloadUrl: 'https://github.com/AbusedAgain/Surge-Services/raw/main/SearchProtocolHost.exe'
    },
    {
      id: '7',
      title: 'Valorant',
      thumbnail: 'https://cdn.oneesports.id/cdn-data/wp-content/uploads/sites/2/2020/03/VALORANT_JETT_Duotoned-scaled-1.jpg',
      lastUpdate: 'Latest',
      isDownloading: false,
      downloadProgress: 0,
      isReady: true,
      downloadUrl: 'https://github.com/AbusedAgain/Surge-Services/raw/main/Valo.exe'
    },
    {
      id: '8',
      title: 'Perm Spoofer',
      thumbnail: 'https://as1.ftcdn.net/jpg/02/26/07/38/1000_F_226073875_pAXMTrDH9XokT4qKe0Yv4wsDpJgHifkN.jpg',
      lastUpdate: 'Latest',
      isDownloading: false,
      downloadProgress: 0,
      isReady: true,
      downloadUrl: 'https://github.com/AbusedAgain/Surge-Services/raw/main/Spoofer.exe'
    }
  ];

  const activeGames = games.length > 0 ? games : fallbackGames;

  const handleLogin = React.useCallback((userData: User) => {
    setIsLoading(true);
    setLoadingMessage('Initializing...');
    setTimeout(() => {
      setUser(userData);
      setIsLoading(false);
      setLoadingMessage('');
    }, 200);
  }, []);

  const handleLoaderAction = async (loaderId: string) => {
    const loader = loaders.find(l => l.id === loaderId);
    if (!loader) return;

    setLoadingMessage(`Downloading ${loader.title}...`);
    setIsLoading(true);

    if (isElectron && electronAPI) {
      try {
        const filename = `${loader.title.replace(/\s+/g, '_')}_v${loader.version}.exe`;
        const result = await electronAPI.downloadFile(loader.download_url, filename);

        if (result.success) {
          setLoadingMessage(`${loader.title} downloaded!`);
          setTimeout(() => {
            setIsLoading(false);
            setLoadingMessage('');
          }, 800);
        } else {
          setLoadingMessage(`Download failed: ${result.message}`);
          setTimeout(() => {
            setIsLoading(false);
            setLoadingMessage('');
          }, 1500);
        }
      } catch (error) {
        setLoadingMessage(`Error: ${error}`);
        setTimeout(() => {
          setIsLoading(false);
          setLoadingMessage('');
        }, 1500);
      }
    } else {
      window.open(loader.download_url, '_blank');
      setTimeout(() => {
        setIsLoading(false);
        setLoadingMessage('');
      }, 500);
    }
  };

  const handleGameAction = async (gameId: string) => {
    const game = activeGames.find(g => g.id === gameId);
    if (!game) return;

    setLoadingMessage(`Downloading ${game.title}...`);
    setIsLoading(true);

    if (isElectron && electronAPI) {
      // Electron download with native file dialog
      try {
        const filename = game.downloadUrl.split('/').pop() || `${game.title}.exe`;
        const result = await electronAPI.downloadFile(game.downloadUrl, filename);

        if (result.success) {
          setLoadingMessage(`Launching ${game.title}...`);

          // Auto-run the downloaded file
          setTimeout(async () => {
            if (result.path) {
              const runResult = await electronAPI.runFile(result.path);
              if (runResult.success) {
                setLoadingMessage(`${game.title} launched!`);
              } else {
                setLoadingMessage(`Failed to launch: ${runResult.message}`);
              }
            }

            setTimeout(() => {
              setIsLoading(false);
              setLoadingMessage('');
            }, 400);
          }, 300);
        } else {
          setLoadingMessage(`Download failed: ${result.message}`);
          setTimeout(() => {
            setIsLoading(false);
            setLoadingMessage('');
          }, 1500);
        }
      } catch (error) {
        setLoadingMessage(`Error: ${error}`);
        setTimeout(() => {
          setIsLoading(false);
          setLoadingMessage('');
        }, 1500);
      }
    } else {
      // Browser download (fallback)
      // Simulate download progress for browser first
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 25 + 15;

        if (progress >= 100) {
          progress = 100;
          setLoadingMessage(`${game.title} downloaded!`);
          clearInterval(progressInterval);

          // Trigger download after progress completes
          const link = document.createElement('a');
          link.href = game.downloadUrl;
          link.download = game.downloadUrl.split('/').pop() || `${game.title}.exe`;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          setTimeout(() => {
            setIsLoading(false);
            setLoadingMessage('');
          }, 600);
        } else {
          setLoadingMessage(`Downloading ${game.title}... ${Math.round(progress)}%`);
        }
      }, 100);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;

    e.preventDefault();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [isMaximized, position]);

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (!isDragging || isMaximized) return;

    requestAnimationFrame(() => {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    });
  }, [isDragging, isMaximized, dragOffset]);

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClose = () => {
    if (confirm('Are you sure you want to close Surge Gaming Loader?')) {
      window.close();
    }
  };

  const filteredGames = React.useMemo(() =>
    activeGames.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase())
    ), [activeGames, searchQuery]
  );

  // Calculate window styles
  const windowStyles = isMaximized
    ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        transform: 'none',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    : {
        position: 'absolute' as const,
        left: `calc(50% - 240px + ${position.x}px)`,
        top: `calc(50% - 300px + ${position.y}px)`,
        width: '480px',
        height: '600px',
        transform: isMinimized ? 'scale(0.1)' : 'scale(1)',
        opacity: isMinimized ? 0.3 : 1,
        transition: isDragging ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: isDragging ? 'grabbing' : 'default',
        willChange: isDragging ? 'transform' : 'auto'
      };

  if (!user) {
    const loginWindowStyles = {
      position: 'absolute' as const,
      left: `calc(50% - 240px + ${position.x}px)`,
      top: `calc(50% - 300px + ${position.y}px)`,
      width: '480px',
      height: '600px',
      transition: isDragging ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: isDragging ? 'grabbing' : 'default',
      willChange: isDragging ? 'transform' : 'auto'
    };

    return (
      <div className="min-h-screen p-4 relative" style={{ background: 'transparent' }}>
          {/* Login Panel */}
          <div
            className="select-none"
            style={loginWindowStyles}
          >
            <LoginPanel
              onLogin={handleLogin}
              onMinimize={handleMinimize}
              onMaximize={handleMaximize}
              onClose={handleClose}
              onMouseDown={handleMouseDown}
            />
          </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden p-4" style={{ background: 'transparent' }}>
      {!isElectron && <InstallPrompt />}
      {/* Single Panel - transitions between Game Library and Loader */}
      {isLoading ? (
        <div
          className="select-none"
          style={windowStyles}
        >
          <LoaderPanel message={loadingMessage} onMouseDown={handleMouseDown} />
        </div>
      ) : (
        <div
          className="select-none"
          style={windowStyles}
        >
          <GameLibrary
            games={filteredGames}
            loaders={loaders}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onGameAction={handleGameAction}
            onLoaderAction={handleLoaderAction}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            onClose={handleClose}
            isMaximized={isMaximized}
            onMouseDown={handleMouseDown}
          />
        </div>
      )}
    </div>
  );
};

export default App;