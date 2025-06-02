const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // optional
    },
  })

  // During development:
  win.loadURL('http://localhost:5173') // or 3000 if CRA

  // In production:
  // win.loadFile('dist/index.html')
}

app.whenReady().then(createWindow)
