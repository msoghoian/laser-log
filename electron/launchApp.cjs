const os = require('os');
const { spawn } = require('child_process');
const writeLogEvent = require('./writeLogEvent.cjs');

const launchApp = (lightburnPath, statusCallback = undefined) => {
  console.log('lightburnPath', lightburnPath);
  try {
    const platform = os.platform();

    const child = spawn(lightburnPath, [], {
      detached: false, // keep attached to track exit
      stdio: 'ignore',
    });

    // Log when the process starts
    child.on('spawn', () => {
      writeLogEvent('navigation', 'Launch', 'LightBurn process started');
      // Notify frontend that LightBurn is running
      if (statusCallback) {
        statusCallback({ running: true, exited: false });
      }
    });

    // Log on normal exit
    child.on('exit', (code, signal) => {
      writeLogEvent(
        'navigation',
        'Exit',
        `LightBurn exited with code ${code}, signal ${signal}`
      );
      if (statusCallback) {
        statusCallback({ running: false, exited: true });
      }
    });

    // Log if it errors on launch
    child.on('error', (err) => {
      writeLogEvent(
        'navigation',
        'Error',
        `LightBurn launch failed: ${err.message}`
      );
      if (statusCallback) {
        statusCallback({ running: false, exited: true });
      }
    });

    writeLogEvent('navigation', 'Launch', `Launched LightBurn on ${platform}`);
    return true;
  } catch (err) {
    writeLogEvent(
      'navigation',
      'Error',
      `Failed to launch LightBurn: ${err.message}`
    );
    return false;
  }
};

module.exports = launchApp;
