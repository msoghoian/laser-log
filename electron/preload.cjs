// import { contextBridge, ipcRenderer } from 'electron';
const { contextBridge, ipcRenderer } = require('electron');

// Expose safe APIs to your React app:
contextBridge.exposeInMainWorld('electronAPI', {
  selectLightburnExe: () => ipcRenderer.invoke('select-lightburn-exe'),
  loadLightburnPath: () => ipcRenderer.invoke('load-lightburn-path'),
  logEvent: (logType, event, details) => {
    ipcRenderer.send('log-event', { logType, event, details });
  },
  launchLightBurn: (lightburnPath) => {
    ipcRenderer.send('launch-lightburn', { lightburnPath });
  },
  onLightburnStatusChange: (callback) => {
    ipcRenderer.on('lightburn-status-change', (_, status) => callback(status));
  },
  exitLaserLog: () => ipcRenderer.invoke('exit-laser-log'),
  openLogsWindow: (fileName) => ipcRenderer.send('open-logs-window', fileName),
  listLaserJobLogFiles: () => ipcRenderer.invoke('list-log-files'),
  openLogFile: (fileName) => ipcRenderer.invoke('open-log-file', fileName),
});
