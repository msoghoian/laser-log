/** @jsxImportSource @emotion/react */
import 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  Input,
  List,
  ListItem,
  ListItemIcon,
  type Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import { type ReactElement, useEffect, useState } from 'react';
import {
  CheckCircle,
  Folder,
  ReportProblem,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { css } from '@emotion/react';
import { NavBar } from './components/NavBar.tsx';
import { EventType } from './types.tsx';

const Settings = (): ReactElement => {
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    window.electronAPI.logEvent('navigation', EventType.settingsPageLoad);

    window.electronAPI.loadLightburnPath().then((path) => {
      if (path) setFileName(path);
    });
  }, []);

  const filePathInputStyles = css`
    &.MuiInputBase-root {

      &.Mui-disabled {
        & input {
          color: white;
          -webkit-text-fill-color: lightgray;
          font-size: 11px;
        }
        &.MuiInput-underline:before {
          border-bottom-color: #888888;
        }

        &.MuiInput-underline:after {
          border-bottom-color: #888888;
        }
      }
  `;

  const handleBrowse = async () => {
    window.electronAPI.logEvent('navigation', EventType.browseForLightBurn);
    const path = await window.electronAPI.selectLightburnExe();
    if (path) {
      console.log('LightBurn path:', path);
      window.electronAPI.logEvent('navigation', EventType.lightBurnPathSet, {
        path,
      });
      setFileName(path);
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 48px)">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid size={12} alignItems="center" justifyContent="center">
          <Typography
            variant="h4"
            gutterBottom
            css={css`
              align-items: center;
            `}
          >
            <SettingsIcon css={{ marginRight: '8px' }} />
            Settings
          </Typography>
          <Divider />
        </Grid>
        <Grid size={12}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Folder
                  sx={(theme: Theme) => ({
                    color: theme.palette.primary.main,
                    fontSize: '40px',
                  })}
                />
              </ListItemIcon>
              <Box width="100%">
                <Box component="div" width="100%">
                  <Typography variant="subtitle2" lineHeight="120%">
                    LightBurn Path
                    {fileName ? (
                      <CheckCircle
                        css={css`
                          margin-left: 5px;
                          vertical-align: top;
                          font-size: 15px;
                          color: limegreen;
                        `}
                      />
                    ) : (
                      ''
                    )}
                    {!fileName && (
                      <Tooltip
                        title={`LightBurn path not set
                    Click the 'Browse for LightBurn' button to set it.`}
                      >
                        <ReportProblem
                          css={css`
                            margin-left: 5px;
                            vertical-align: top;
                            font-size: 15px;
                            color: orange;
                          `}
                        />
                      </Tooltip>
                    )}
                  </Typography>
                </Box>
                <Box component="div" width="100%">
                  <Input
                    type="text"
                    value={fileName}
                    readOnly
                    fullWidth
                    placeholder="Path not set"
                    css={filePathInputStyles}
                    disabled
                  />
                </Box>
              </Box>
            </ListItem>
          </List>
        </Grid>
        <Grid size={12}>
          <Button variant="contained" size="small" onClick={handleBrowse}>
            Browse for LightBurn
          </Button>
        </Grid>
      </Grid>

      <NavBar settingsError={false} />
    </Box>
  );
};

export { Settings };
