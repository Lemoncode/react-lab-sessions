import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { SessionContext } from 'core';

export const AppLayout: React.FunctionComponent = props => {
  const { children } = props;
  const { login } = React.useContext(SessionContext);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton color="inherit" aria-label="Menu">
            <AccountCircle />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {login}
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};
