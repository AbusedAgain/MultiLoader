const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  downloadFile: (url, filename) => ipcRenderer.invoke('download-file', { url, filename }),
  runFile: (filePath) => ipcRenderer.invoke('run-file', filePath),
  platform: process.platform
});