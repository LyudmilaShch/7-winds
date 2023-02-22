import { AppRootStateType } from '../utils/types';

export const statusSelector = (state: AppRootStateType) => state.app.status;

export const errorSelector = (state: AppRootStateType) => state.app.error;

export const rowsDataSelector = (state: AppRootStateType) => state.rows.rows;
