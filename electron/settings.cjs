const fs = require('fs');
const path = require('path');
const { app } = require('electron');

const settingsPath = path.join(
  app.getPath('userData'),
  'laser-log/settings.json'
);

function saveLightBurnPath(lightburnPath) {
  const settings = { lightburnPath };
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
}

function loadLightBurnPath() {
  if (fs.existsSync(settingsPath)) {
    const raw = fs.readFileSync(settingsPath);
    try {
      return JSON.parse(raw).lightburnPath || null;
    } catch {
      return null;
    }
  }
  return null;
}

module.exports = { saveLightBurnPath, loadLightBurnPath };
