/** @jsxImportSource @emotion/react */
import 'react';
import { Box, Grid, Link, Tooltip, Typography } from '@mui/material';
import { type Theme } from '@mui/material/styles';
import { type ReactElement, useEffect } from 'react';
import { GitHub, Lightbulb } from '@mui/icons-material';
import { css } from '@emotion/react';
import { NavBar } from './components/NavBar.tsx';
import { EventType } from './types.tsx';

const Help = (): ReactElement => {
  useEffect(() => {
    window.electronAPI.logEvent('navigation', EventType.helpPageLoad);
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 48px)">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid size={12}>
          <Typography variant="h5">What is the Laser Log?</Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="body1" textAlign="justify">
            The Laser Log app helps us track how and when the laser cutter is
            being used. Simply enter your name, the materials you are cutting,
            and then launch
            <Tooltip
              title={
                <>
                  LightBurn is the software used to design your
                  <br />
                  projects and send them to the laser cutter.
                </>
              }
              placement="bottom-end"
              arrow
            >
              <Box
                component="span"
                color="info"
                sx={(theme: Theme) => ({
                  borderBottom: `1px dotted ${theme.palette.info.main}`,
                  color: theme.palette.info.main,
                  cursor: 'help',
                })}
              >
                {' '}
                LightBurn{' '}
              </Box>
            </Tooltip>
            directly from the app.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="body1" textAlign="justify">
            Accurately logging your laser jobs helps us keep the laser cutter
            maintained, operational and most importantly, safe for everyone.
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="body2" textAlign="justify">
            <Lightbulb
              css={css`
                color: yellow;
                font-size: 14px;
                vertical-align: text-top;
                padding-right: 3px;
              `}
            />
            <strong
              css={css`
                font-weight: bolder;
              `}
            >
              Tip:
            </strong>{' '}
            If you are cutting multiple materials, you can enter them separated
            by commas (e.g., "3mm black acrylic, 1/8" plywood"). Be as
            descriptive as possible to help us track usage accurately.
          </Typography>
        </Grid>
        <Grid size={12} textAlign="justify">
          <Typography variant="body2">
            Go talk to the shop steward on duty if you have any questions or
            problems with the laser cutter. Always remember, safety first!
          </Typography>
        </Grid>
        <Grid size={12}>
          <Typography variant="subtitle2" textAlign="justify">
            Developer contact:{' '}
            <Link
              sx={(theme: Theme) => ({
                color: theme.palette.info.main,
              })}
              href="mailto:mattsoghoian@gmail.com?subject=Laser%20Log%20Help"
            >
              mattsoghoian@gmail.com
            </Link>
            <br />
            <Link
              href="https://github.com/msoghoian/laser-log"
              target="_blank"
              sx={(theme: Theme) => ({
                color: theme.palette.info.main,
              })}
            >
              https://github.com/msoghoian/laser-log
            </Link>
          </Typography>
        </Grid>
      </Grid>

      <NavBar settingsError={false} />
    </Box>
  );
};

export { Help };
