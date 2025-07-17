/** @jsxImportSource @emotion/react */

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { EventType } from './types.tsx';
import { Box, Grid, Typography } from '@mui/material';
import { css } from '@emotion/react';

const LogFile = () => {
  const location = useLocation();
  const [fileContent, setFileContent] = useState<any | undefined>(undefined);
  const fileName = location.pathname.split('/').pop();

  useEffect(() => {
    if (!fileName) {
      console.error('No file name found in URL');
      return;
    }

    window.electronAPI.logEvent('navigation', EventType.logFileLoad, {
      fileName: fileName,
    });
    console.log('Opening file:', fileName);
    window.electronAPI
      .openLogFile(fileName)
      .then((content) => {
        console.log('File content:', content);
        if (!content) {
          console.error('File content is empty');
          return;
        }
        setFileContent(content);
      })
      .catch((error) => {
        console.error('Error opening file:', error);
      });
    console.log('File content:', fileContent);
  }, [fileName, fileContent]);

  const eventLabel = (event: string): string => {
    if (event === EventType.userFormSubmit) {
      return 'LightBurn session started by:';
    }
    if (event === EventType.userEndSessionNotes) {
      return 'Session Notes:';
    }

    return '';
  };

  const containerStyles = css`
    height: 100%;
    max-height: 100%;
    width: 100%;
    overflow: hidden;
  `;
  const gridRowStyles = css`
    border-bottom: 1px solid #3c4345;
    padding: 10px 0;
    margin: 0;
    font-size: 12px;
    color: #aaa;
    overflow: scroll;
  `;

  return (
    <Box display="flex" flexDirection="column" minHeight="calc(100vh - 48px)">
      <Typography variant="h5">{fileName}</Typography>
      <Grid container spacing={2} css={containerStyles}>
        <Grid size={12}>
          {fileContent?.length &&
            fileContent.map((entry: any, index: number) => {
              const timestamp: string = entry.timestamp
                ? dayjs(entry.timestamp).format('MMM D, YYYY h:mm:ss A')
                : '';
              const eventType: string = eventLabel(entry.event);
              const name: string = entry.details?.name || '';
              const material: string = entry.details?.material || '';
              const notes: string = entry.details?.notes || '';

              return (
                <Grid container key={index} css={gridRowStyles}>
                  <Grid size={2}>{timestamp}</Grid>
                  <Grid size={2}>{eventType}</Grid>
                  {entry.event === EventType.userFormSubmit && (
                    <Grid size={2}>{name}</Grid>
                  )}
                  {entry.event === EventType.userFormSubmit && (
                    <Grid size={2}>{material}</Grid>
                  )}
                  {entry.event === EventType.userEndSessionNotes && (
                    <Grid size={6}>{notes}</Grid>
                  )}
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Box>
  );
};

export { LogFile };
