/** @jsxImportSource @emotion/react */

import { type ReactElement, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { css } from '@emotion/react';
import { EventType } from '../types.tsx';

const EndSessionNotes = (): ReactElement => {
  const [notes, setNotes] = useState<string>('');
  const inputColor = 'white';

  const inputStyles = css`
    & label {
      color: ${inputColor};
    }

    & label.Mui-focused {
      color: ${inputColor};
    }

    & .MuiOutlinedInput-root {
      color: ${inputColor};
      background-color: #3c4345;

      & fieldset {
        border-color: ${inputColor};
      }

      &:hover fieldset {
        border-color: ${inputColor};
      }

      &.Mui-focused fieldset {
        border-color: ${inputColor};
      }

      /* ✅ Prevent hover styles when disabled */

      &:not(.Mui-disabled):hover fieldset {
        border-color: ${inputColor};
      }

      &.Mui-focused fieldset {
        border-color: ${inputColor};
      }

      &.Mui-disabled {
        color: #888;
        background-color: #2f3435;
      }

      &.Mui-disabled fieldset {
        border-color: #555;
      }
    }

    & input::placeholder {
      color: #aaa;
      opacity: 1; /* Make sure placeholder is visible */
    }
  `;

  const submitLogEntry = () => {
    window.electronAPI.logEvent('jobs', EventType.userEndSessionNotes, {
      notes,
    });
    window.electronAPI.logEvent('navigation', EventType.userEndSessionNotes, {
      notes,
    });
    window.electronAPI.exitLaserLog();
  };

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h6">LightBurn has exited</Typography>
      </Grid>

      <Grid size={12}>
        <Typography variant="body2">Session Notes (optional):</Typography>
      </Grid>
      <Grid size={12}>
        <TextField
          multiline={true}
          rows={4}
          fullWidth={true}
          css={inputStyles}
          placeholder="How did your cutting session go? Did you have any problems? Anything important for the lead to know?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Grid>
      <Grid size={12}>
        <Button variant="contained" onClick={submitLogEntry}>
          {notes ? 'Save & End Session' : 'End Session'}
        </Button>
      </Grid>
    </Grid>
  );
};

export { EndSessionNotes };
