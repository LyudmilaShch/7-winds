import { fetchTableRows, slice } from './tableRowsSlice';

export { ProjectWorks } from './ProjectWorks';

export { TableTitle, TableBodyComponent, TableColumns } from './table';
export { ProjectWorksHeader } from './projectWorksHeader';
const tableRowsReducer = slice.reducer;

export { tableRowsReducer, fetchTableRows };
