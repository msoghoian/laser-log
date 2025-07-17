/** @jsxImportSource @emotion/react */
import { Button, Grid, TextField, Typography } from '@mui/material';
import { css } from '@emotion/react';
import { type ReactElement, useState } from 'react';
import { EventType } from '../types.tsx';

interface Props {
  settingsError: boolean;
  lightburnPath: string;
}

const UserForm = ({ settingsError, lightburnPath }: Props): ReactElement => {
  const [name, setName] = useState<string>('');
  const [material, setMaterial] = useState<string>('');
  const inputColor = 'white'; // '#ac2217';

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

  const buttonStyles = css`
    color: white;

    &:hover {
      background-color: #1f3a7d;
    }

    &.Mui-disabled {
      background-color: #555;
      color: #888;
    }
  `;

  const submitLogEntry = () => {
    window.electronAPI.logEvent('jobs', EventType.userFormSubmit, {
      name,
      material,
    });
    window.electronAPI.logEvent('navigation', EventType.userFormSubmit, {
      name,
      material,
    });
    window.electronAPI.launchLightBurn(lightburnPath);
  };

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h6">Begin a new laser cutting session</Typography>
      </Grid>
      <Grid size={12}>
        <TextField
          id="name"
          label="What is your name?"
          placeholder="e.g. John Doe"
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setName(e.target.value)}
          disabled={settingsError}
          css={inputStyles}
        />
      </Grid>
      <Grid size={12}>
        <TextField
          id="material"
          label="What material are you cutting?"
          placeholder='e.g. 3mm black acrylic, 1/8" plywood, etc.'
          variant="outlined"
          fullWidth
          required
          onChange={(e) => setMaterial(e.target.value)}
          disabled={settingsError}
          css={inputStyles}
        />
      </Grid>
      <Grid size={12}>
        <Button
          variant="contained"
          disabled={!name || !material || settingsError}
          css={buttonStyles}
          onClick={submitLogEntry}
        >
          Launch LightBurn
        </Button>
      </Grid>
    </Grid>
  );
};

export { UserForm };
