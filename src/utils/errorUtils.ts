import { AxiosError } from 'axios';

import { appActions } from 'features/commonActions/App';

type thunkAPIType = {
  dispatch: (action: any) => any;
  rejectWithValue: Function;
};
export const handleAsyncServerNetworkError = (
  error: AxiosError,
  thunkAPI: thunkAPIType,
  showError = true,
) => {
  if (showError) {
    thunkAPI.dispatch(
      appActions.setAppError({
        error: error.message ? error.message : 'Some error occurred',
      }),
    );
  }
  thunkAPI.dispatch(appActions.setAppStatus({ status: 'failed' }));

  return thunkAPI.rejectWithValue({
    errors: [error.message],
    fieldsErrors: undefined,
  });
};
