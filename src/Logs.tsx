/** @jsxImportSource @emotion/react */

import { Box, Grid, Typography } from '@mui/material';
import { NavBar } from './components/NavBar.tsx';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { css } from '@emotion/react';
import { Article, OpenInNew } from '@mui/icons-material';
import { EventType } from './types.tsx';

interface LogListItem {
  fileName: string;
  year: number;
  month: number;
}
const Logs = () => {
  const [logFiles, setLogFiles] = useState<string[]>([]);
  const [logListItems, setLogListItems] = useState<LogListItem[]>([]);

  useEffect(() => {
    window.electronAPI.logEvent('navigation', EventType.logsPageLoad);
    (async () => {
      // setLogFiles(stubFiles);
      setLogFiles(await window.electronAPI.listLaserJobLogFiles());
    })();
  }, []);

  useEffect(() => {
    if (logFiles.length) {
      const logListItems: LogListItem[] = [];
      logFiles.forEach((file: string) => {
        // File name format: laser-log-jobs-YYYY-MM.json
        const fileNameParts: string[] = file.split('-');
        const year: number = parseInt(fileNameParts[3]);
        const month: number = parseInt(fileNameParts[4]);
        logListItems.push({
          fileName: file,
          year,
          month,
        });
      });
      setLogListItems(logListItems);
    }
  }, [logFiles]);

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 48px)">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid size={12}>
          {/*<Button onClick={() => window.electronAPI.openLogsWindow()}>*/}
          {/*  Open window*/}
          {/*</Button>*/}
          <Typography variant="h4">Log Files</Typography>
        </Grid>
        <Grid size={8}>
          <Box
            component="div"
            css={css`
              overflow-y: scroll;
              height: 400px;
            `}
          >
            {logListItems.length &&
              logListItems.map((logListItem: LogListItem) => (
                <Grid
                  container
                  spacing={1}
                  key={logListItem.fileName}
                  onClick={() =>
                    window.electronAPI.openLogsWindow(logListItem.fileName)
                  }
                  css={css`
                    border-bottom: 1px solid #3c4345;
                    font-size: 22px;
                    line-height: 22px;
                    padding-top: 5px;
                    padding-bottom: 10px;
                    font-family: 'Roboto Mono', monospace;
                    &:hover {
                      background-color: #3c4345;
                      color: white;
                      cursor: pointer;
                      & .MuiSvgIcon-root:last-child {
                        color: white;
                      }
                    }
                  `}
                >
                  <Grid size={12} textAlign="center">
                    <Article
                      css={css`
                        color: white;
                        font-size: 24px;
                        vertical-align: bottom;
                        margin-left: 24px;
                      `}
                    />{' '}
                    {dayjs(
                      `${logListItem.month}-01-${logListItem.year}`
                    ).format('MMM')}{' '}
                    {logListItem.year}{' '}
                    <OpenInNew
                      css={css`
                        color: transparent;
                        font-size: 18px;
                        vertical-align: middle;
                      `}
                    />
                  </Grid>
                </Grid>
              ))}
          </Box>
        </Grid>
      </Grid>

      <NavBar settingsError={false} />
    </Box>
  );
};

export { Logs };
