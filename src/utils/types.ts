import { rootReducer, store } from '../app/store';

export type FieldErrorType = { field: string; error: string };
export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors?: Array<FieldErrorType>;
  data: D;
};
export type AppDispatchType = typeof store.dispatch;

export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<RootReducerType>;
export type ThunkError = {
  rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> };
};
