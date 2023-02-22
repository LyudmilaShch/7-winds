import { useMemo } from 'react';

import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { AppDispatchType } from './types';

import { store } from 'app/store';


export const useAppDispatch = () => useDispatch<AppDispatchType>();

export type AppDispatch = typeof store.dispatch;

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch();
  const boundActions = useMemo(() => bindActionCreators(actions, dispatch), []);

  return boundActions;
}
