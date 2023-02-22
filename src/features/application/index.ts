import * as appSelectors from '../../app/selectors';

import { slice } from './applicationSlice';

const appReducer = slice.reducer;

export { appSelectors, appReducer };
