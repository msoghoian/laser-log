/** @jsxImportSource @emotion/react */

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { css } from '@emotion/react';
import { Help, Home, Settings, WebStories } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

interface Props {
  settingsError: boolean;
}

const paperStyles = css`
  position: fixed;
  bottom: 16px;
  left: 16px;
  right: 16px;
  background-image: none;
  box-shadow: none;
`;

const bottomNavStyles = css`
  background-color: #3e3a3a;
  border-radius: 24px;
`;

const pulseGlowBadge = css`
  &.MuiBottomNavigationAction-root {
    animation: pulse-glow 1.5s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
    }
    70% {
      transform: scale(1.4);
      box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
    }
  }
`;

const NavBar = ({ settingsError }: Props) => {
  return (
    <Paper elevation={3} css={paperStyles}>
      <BottomNavigation css={bottomNavStyles}>
        <BottomNavigationAction
          showLabel
          label="Home"
          icon={<Home />}
          component={NavLink}
          to="/"
          value="/"
        />
        <BottomNavigationAction
          showLabel
          label="Help"
          icon={<Help />}
          component={NavLink}
          to="/help"
          value="/help"
        />
        <BottomNavigationAction
          showLabel
          label="Logs"
          icon={<WebStories />}
          component={NavLink}
          to="/logs"
          value="/logs"
        />
        <BottomNavigationAction
          showLabel
          label="Settings"
          icon={<Settings />}
          component={NavLink}
          to="/settings"
          value="/settings"
          css={settingsError ? pulseGlowBadge : undefined}
        />
      </BottomNavigation>
    </Paper>
  );
};

export { NavBar };
