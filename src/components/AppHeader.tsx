/** @jsxImportSource @emotion/react */

import { Grid } from '@mui/material';
import ideaWorksLogo from '../assets/ideaworks-logo.png';
import laserLogTitle from '../assets/laser-log-title.png';
import { css } from '@emotion/react';

const AppHeader = () => {
  return (
    <Grid container spacing={1} marginBottom={1}>
      <Grid size={2}>
        <img src={ideaWorksLogo} alt="IdeaWorks Logo" height={72} />
      </Grid>
      <Grid
        size={10}
        css={css`
          text-align: left;
        `}
      >
        <img
          src={laserLogTitle}
          alt="Laser Log"
          height={83}
          css={css`
            margin-top: 12px;
          `}
        />
      </Grid>
    </Grid>
  );
};

export { AppHeader };
