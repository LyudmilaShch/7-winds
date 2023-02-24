import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appReducer, tableRowsReducer } from 'features';

export const rootReducer = combineReducers({
  rows: tableRowsReducer,
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
