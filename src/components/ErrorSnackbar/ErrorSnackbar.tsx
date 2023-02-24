import React, { SyntheticEvent } from 'react';

import MuiAlert from '@mui/material/Alert/Alert';
import Snackbar from '@mui/material/Snackbar/Snackbar';
import { useSelector } from 'react-redux';

import { errorSelector } from 'app/selectors';
import { appActions } from 'features';
import { useActions } from 'utils';

export function ErrorSnackbar() {
  const error = useSelector(errorSelector);

  const { setAppError } = useActions(appActions);

  const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAppError({ error: null });
  };

  const isOpen = error !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity="error" elevation={6} variant="filled">
        {error}
      </MuiAlert>
    </Snackbar>
  );
}
