const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs');
const { saveLightBurnPath, loadLightBurnPath } = require('./settings.cjs');
const writeLogEvent = require('./writeLogEvent.cjs');
const launchApp = require('./launchApp.cjs');

// __dirname workaround in ES module
const preloadPath = path.join(__dirname, 'preload.cjs');
const basePath = path.join(app.getPath('userData'), 'laser-log/');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 620,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
    },
  });

  // DEV mode
  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    win.loadFile(`file://${indexPath}`);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.handle('select-lightburn-exe', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Select LightBurn Application',
    properties:
      process.platform === 'darwin'
        ? ['openDirectory', 'treatPackageAsDirectory']
        : ['openFile'],
    filters:
      process.platform === 'win32'
        ? [{ name: 'Executable', extensions: ['exe'] }]
        : undefined,
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  let selectedPath = result.filePaths[0];

  if (process.platform === 'darwin' && selectedPath.endsWith('.app')) {
    selectedPath = path.join(selectedPath, 'Contents', 'MacOS', 'LightBurn');
  }

  saveLightBurnPath(selectedPath);

  return selectedPath;
});

ipcMain.handle('load-lightburn-path', async () => {
  return loadLightBurnPath();
});

ipcMain.on('log-event', (event, payload) => {
  writeLogEvent(payload.logType, payload.event, payload.details);
});

ipcMain.on('launch-lightburn', (event, payload) => {
  launchApp(payload.lightburnPath, (status) => {
    // Send status update to all windows
    BrowserWindow.getAllWindows().forEach((window) => {
      window.webContents.send('lightburn-status-change', status);
    });
  });
});

ipcMain.handle('exit-laser-log', () => {
  writeLogEvent('navigation', 'exit-laser-log', 'Exiting Laser Log');
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    writeLogEvent('navigation', 'quit-app');
    app.quit();
  }
});

app.on('before-quit', () => {
  writeLogEvent('navigation', 'before-quit', 'App quitting');
});

app.on('window-all-closed', () => {
  writeLogEvent('navigation', 'window-all-closed', 'All windows closed');
  if (process.platform !== 'darwin') app.quit();
});

process.on('exit', (code) => {
  writeLogEvent('navigation', 'exit', `Exited with code ${code}`);
});

process.on('SIGINT', () => {
  writeLogEvent('navigation', 'Signal', 'SIGINT received');
  app.quit();
});

ipcMain.on('open-logs-window', async (event, fileName) => {
  const logsWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    logsWindow.loadURL(`http://localhost:5173/#/logFile/${fileName}`);
  } else {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    logsWindow.loadFile(`file://${indexPath}#/logFile/${fileName}`);
  }
});

ipcMain.handle('list-log-files', () => {
  const logDir = path.join(basePath, 'logs');
  const files = fs.readdirSync(logDir);
  const laserJobLogFiles = files
    .filter((file) => file.startsWith('laser-log-jobs-'))
    .sort((a, b) => {
      const aDate = a.split('-')[1];
      const bDate = b.split('-')[1];
      return dayjs(aDate).isBefore(bDate) ? 1 : -1;
    });

  return laserJobLogFiles;
});

ipcMain.handle('open-log-file', (event, fileName) => {
  try {
    const filePath = path.join(basePath, 'logs', fileName);
    const contents = fs.readFileSync(filePath, 'utf-8');
    return contents
      .split('\n')
      .map((line) => {
        if (line) {
          return JSON.parse(line);
        }
        return null;
      })
      .filter((entry) => entry);
  } catch (error) {
    console.error('main.cjs - Error opening log file:', error);
  }
});
