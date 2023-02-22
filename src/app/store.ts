import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import { appReducer } from '../features/application';
import { tableRowsReducer } from '../features/projectWorks';

export const rootReducer = combineReducers({
  rows: tableRowsReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
