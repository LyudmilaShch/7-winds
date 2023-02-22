import React from 'react';

import { Alert, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';

import { errorSelector } from '../../app/selectors';
import { appActions } from '../../features/commonActions/App';
import { useActions } from '../../utils/redux-utils';

export function ErrorSnackbar() {
  const error = useSelector(errorSelector);

  const { setAppError } = useActions(appActions);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAppError({ error: null });
  };

  const isOpen = error !== null;

  return (
    <Snackbar open={isOpen} autoHideDuration={3000}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}
