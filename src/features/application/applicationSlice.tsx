import { createSlice } from '@reduxjs/toolkit';

import { appActions } from '../commonActions';

export const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    error: null as null | string,
    isInitialized: false,
  } as InitialStateType,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(appActions.setAppStatus, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(appActions.setAppError, (state, action) => {
        state.error = action.payload.error;
      });
  },
});

// types
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервисом
  status: StatusType;
  // если ошибка какая-то глобальная произойдет - мы запишем текст ошибки сюда
  error: string | null;
};
