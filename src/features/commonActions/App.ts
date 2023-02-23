import { createAction } from '@reduxjs/toolkit';

type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
const setAppStatus = createAction<{ status: StatusType }>('common/setAppStatus');
const setAppError = createAction<{ error: string | null }>('common/setAppError');

export const appActions = {
  setAppStatus,
  setAppError,
};
