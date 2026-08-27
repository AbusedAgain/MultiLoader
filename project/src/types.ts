export interface User {
  username: string;
  avatar?: string;
}

export interface GameItem {
  id: string;
  title: string;
  thumbnail: string;
  lastUpdate: string;
  isDownloading: boolean;
  downloadProgress: number;
  isReady: boolean;
  downloadUrl: string;
}

export interface LoaderState {
  isLoading: boolean;
  message: string;
  progress: number;
}

export interface Loader {
  id: string;
  title: string;
  description: string;
  image_url: string;
  download_url: string;
  version: string;
  sort_order: number;
  is_active: boolean;
}