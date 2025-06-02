import { contextBridge, ipcRenderer } from 'electron'

// Expose safe APIs to your React app:
contextBridge.exposeInMainWorld('electronAPI', {
  // Example future API placeholders:

  // Launch Lightburn
  openLightburn: () => ipcRenderer.invoke('open-lightburn'),

  // Write log entry
  writeLog: (entry) => ipcRenderer.send('write-log', entry),

  // Read logs (could be async)
  readLogs: () => ipcRenderer.invoke('read-logs'),
})
