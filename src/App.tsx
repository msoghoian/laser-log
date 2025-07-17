import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Help } from './Help';
import { Settings } from './Settings';
import type { ReactElement } from 'react';
import { Logs } from './Logs.tsx';
import { LogFile } from './LogFile.tsx';
import { EventType } from './types.tsx';

function App(): ReactElement {
  window.electronAPI.logEvent('navigation', EventType.appStarted);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="logFile/:filename" element={<LogFile />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
