const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

const basePath = path.join(app.getPath('userData'), 'laser-log/');
const logDir = path.join(basePath, 'logs');
fs.mkdirSync(logDir, { recursive: true });

const writeLogEvent = (logType, event, details) => {
  // console.log('logType', logType);
  // console.log('event', event);
  // console.log('details', details);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const timestamp = dayjs()
    .tz('America/Los_Angeles')
    .format('YYYY-MM-DD HH:mm:ss');

  if (!logType) {
    throw new Error('Missing logType');
  }
  const logFilePath = path.join(
    logDir,
    `laser-log-${logType}-${dayjs().format('YYYY-MM')}.json`
  );
  const entry = {
    timestamp,
    event,
  };

  if (details) {
    entry.details = details;
  }

  fs.appendFile(logFilePath, JSON.stringify(entry) + '\n', (err) => {
    if (err) console.error('Failed to write log:', err);
  });
};

module.exports = writeLogEvent;
