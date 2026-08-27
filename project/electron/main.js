const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const { pathToFileURL } = require('url');

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false,
    transparent: false,
    frame: false,
    backgroundColor: '#111827',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false
    },
    icon: path.join(__dirname, '../public/icon.png')
  });

  // Clear cache on startup to ensure fresh content
  mainWindow.webContents.session.clearCache();

  // Load the app
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // Use file:// protocol for better ES module support
    const indexPath = path.join(__dirname, '../dist/index.html');
    mainWindow.loadURL(pathToFileURL(indexPath).href);
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus the window
    if (mainWindow) {
      mainWindow.focus();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Handle navigation errors
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    console.error('Failed to load:', errorDescription, validatedURL);
  });

  // Handle console messages for debugging
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    if (level >= 2) { // Only log warnings and errors
      console.log(`Console ${level}: ${message} at ${sourceId}:${line}`);
    }
  });
}

// Handle file downloads
ipcMain.handle('download-file', async (event, { url, filename }) => {
  try {
    // Use temp directory for silent downloads
    const tempPath = os.tmpdir();
    const filePath = path.join(tempPath, filename);

    // Download the file
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));

    return { 
      success: true, 
      message: 'Download completed',
      path: filePath 
    };
  } catch (error) {
    return { 
      success: false, 
      message: `Download failed: ${error.message}` 
    };
  }
});

// Handle running downloaded files
ipcMain.handle('run-file', async (event, filePath) => {
  try {
    if (process.platform === 'win32') {
      spawn('cmd', ['/c', 'start', '""', filePath], { detached: true });
    } else if (process.platform === 'darwin') {
      spawn('open', [filePath], { detached: true });
    } else {
      spawn('xdg-open', [filePath], { detached: true });
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});