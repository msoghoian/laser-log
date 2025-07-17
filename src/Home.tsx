import { type ReactElement, useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { UserForm } from './components/UserForm.tsx';
import { hasValidSettingsSaved } from './utils/hasValidSettingsSaved.ts';
import { EndSessionNotes } from './components/EndSessionNotes.tsx';
import { NavBar } from './components/NavBar.tsx';
import { AppHeader } from './components/AppHeader.tsx';
import { EventType } from './types.tsx';

const Home = (): ReactElement => {
  useEffect(() => {
    window.electronAPI.logEvent('navigation', EventType.homePageLoad);
  }, []);

  const [settingsError, setSettingsError] = useState<boolean>(false);
  const [lightburnPath, setLightburnPath] = useState<string>('');
  const [lightburnRunning, setLightburnRunning] = useState<boolean>(false);
  const [lightburnExited, setLightburnExited] = useState<boolean>(false);
  // const blue = '#314DA1';

  useEffect(() => {
    (async () => {
      setSettingsError(!(await hasValidSettingsSaved()));
      setLightburnPath((await window.electronAPI.loadLightburnPath()) || '');
    })();
  }, []);

  // Listen for LightBurn status updates from the main process
  useEffect(() => {
    let handleLightburnStatusChange = (status: {
      running: boolean;
      exited: boolean;
    }) => {
      console.log('LightBurn status change:', status);
      setLightburnRunning(status.running);
      setLightburnExited(status.exited);
    };

    window.electronAPI.onLightburnStatusChange(handleLightburnStatusChange);

    // clean up
    handleLightburnStatusChange = undefined as any;
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 48px)">
      <AppHeader />
      <Grid container spacing={2}>
        <Grid size={12}>
          {!lightburnRunning && !lightburnExited && (
            <UserForm
              settingsError={settingsError}
              lightburnPath={lightburnPath}
            />
          )}
          {lightburnRunning && !lightburnExited && (
            <div>
              <h2>LightBurn is running</h2>
              <p>
                Please run your job and exit out of LightBurn when you are done.
              </p>
            </div>
          )}
          {!lightburnRunning && lightburnExited && (
            <div>
              <EndSessionNotes />
            </div>
          )}
        </Grid>
      </Grid>

      {!lightburnRunning && !lightburnExited && (
        <NavBar settingsError={settingsError} />
      )}
    </Box>
  );
};

export { Home };
