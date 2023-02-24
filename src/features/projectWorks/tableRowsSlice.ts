import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { appActions } from '../commonActions';

import { tableRowsAPI } from 'api/tableRows-API';
import { CreateRowData, Data, ResType, RowData } from 'api/types';
import { handleAsyncServerNetworkError, ThunkError } from 'utils';

const objTraverse = require('obj-traverse/lib/obj-traverse');

const initialState: Data = {
  rows: [],
  loading: null,
  error: null,
  editable: null,
  path: [],
};

const { setAppStatus } = appActions;

const updateChangedRows = (changedRows: RowData[], currentRows: RowData[]) => {
  if (changedRows.length !== 0) {
    changedRows.forEach(el => {
      const FakeArrayChanged: any = [];
      const newObjectGeneral = el;
      let newObject: RowData = {
        child: [],
        equipmentCosts: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        rowName: '',
        salary: 0,
        supportCosts: 0,
      };
      currentRows.forEach((row: RowData) => {
        newObject = {
          ...objTraverse.findAll(row, 'child', {
            id: el.id,
          })[0],
        };
      });
      newObjectGeneral.child = newObject.child ? [...newObject.child] : [];
      currentRows.forEach(row => {
        const newData = objTraverse.findAndModifyAll(
          row,
          'child',
          { id: newObjectGeneral.id },
          newObjectGeneral,
        );
        if (newData) {
          FakeArrayChanged.push(newData);
        } else {
          FakeArrayChanged.push(el);
        }
      });
      currentRows = currentRows.map(row =>
        row.id === FakeArrayChanged.id ? { ...row, ...FakeArrayChanged.row } : row,
      );
    });
  }
};

export const fetchTableRows = createAsyncThunk<
  { tableRows: RowData[] },
  undefined,
  ThunkError
>('table/fetchTableRows', async (_, thunkAPI) => {
  thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
  try {
    const res = await tableRowsAPI.getRows();
    thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));
    return { tableRows: res.data };
  } catch (err: any) {
    return handleAsyncServerNetworkError(err, thunkAPI);
  }
});

export const createRow = createAsyncThunk<{ row: ResType }, CreateRowData, ThunkError>(
  'table/createRow',
  async (rowData, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
    try {
      const { rowName, parentId, salary, equipmentCosts, overheads, estimatedProfit } =
        rowData;
      const row: RowData = {
        rowName,
        parentId,
        salary,
        equipmentCosts,
        overheads,
        estimatedProfit,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
        child: [],
      };
      const res = await tableRowsAPI.createRow(row);
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));
      return { row: res.data };
    } catch (err: any) {
      return handleAsyncServerNetworkError(err, thunkAPI);
    }
  },
);

export const updateRow = createAsyncThunk<{ row: ResType }, CreateRowData, ThunkError>(
  'table/updateRow',
  async (rowData, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
    try {
      const { rowName, id, salary, equipmentCosts, overheads, estimatedProfit } = rowData;

      const row: RowData = {
        rowName,
        salary,
        equipmentCosts,
        overheads,
        estimatedProfit,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0,
        child: [],
      };
      const res = await tableRowsAPI.updateRow(id, row);
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));
      return { row: res.data };
    } catch (err: any) {
      return handleAsyncServerNetworkError(err, thunkAPI);
    }
  },
);

export const deleteRow = createAsyncThunk<{ id: number | null }, number, ThunkError>(
  'table/deleteRow',
  async (id, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: 'loading' }));
    try {
      await tableRowsAPI.deleteRow(id);
      thunkAPI.dispatch(setAppStatus({ status: 'succeeded' }));
      return { id };
    } catch (err: any) {
      return handleAsyncServerNetworkError(err, thunkAPI);
    }
  },
);

export const slice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    createRowLocally(state, action: PayloadAction<{ parentId: number }>) {
      const newRow: RowData = {
        equipmentCosts: 0,
        id: 0,
        estimatedProfit: 0,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: 0,
        parentId: action.payload.parentId,
        rowName: '',
        salary: 0,
        supportCosts: 0,
        child: [],
      };

      if (state.rows.length > 0) {
        let parentRow: RowData =
          state.rows.find(row => row.id === state.path[0]) || ({} as RowData);
        state.path.slice(1).forEach(id => {
          if (parentRow.child) {
            parentRow = parentRow.child.find(elem => elem.id === id) || ({} as RowData);
          }
        });
        if (parentRow.child) {
          parentRow.child?.push(newRow);
        } else {
          parentRow.child = [newRow];
        }
      } else {
        state.rows.push(newRow);
      }
    },

    setEditable(state, action: PayloadAction<number | null>) {
      state.editable = action.payload;
    },

    setPath(state, action: PayloadAction<Array<number>>) {
      state.path = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTableRows.fulfilled, (state, action) => {
        state.rows = action.payload.tableRows;
        if (action.payload.tableRows.length === 0) {
          const newRow: RowData = {
            equipmentCosts: 0,
            id: 0,
            estimatedProfit: 0,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: 0,
            parentId: null,
            rowName: '',
            salary: 0,
            supportCosts: 0,
            child: [],
          };
          state.rows.push(newRow);
          state.editable = 0;
          state.path = [0];
        }
      })

      .addCase(createRow.fulfilled, (state, action) => {
        if (state.path[0] !== 0) {
          let parentRow: RowData =
            state.rows.find(row => row.id === state.path[0]) || ({} as RowData);

          state.path.slice(1).forEach(id => {
            if (parentRow.child) {
              parentRow = parentRow.child.find(row => row.id === id) || ({} as RowData);
            }
          });

          parentRow.child = parentRow.child?.map(row =>
            row.id === 0 ? { ...row, ...action.payload.row.current } : row,
          );
          state.editable = null;
          state.path = [];
        } else {
          state.rows = state.rows.filter(row => row.id !== 0);
          state.rows.push(action.payload.row.current);
          state.editable = null;
          state.path = [];
        }
        updateChangedRows(action.payload.row.changed, state.rows);
      })

      .addCase(updateRow.fulfilled, (state, action) => {
        if (state.path.length > 1) {
          let parentRow: RowData =
            state.rows.find(row => row.id === state.path[0]) || ({} as RowData);

          state.path.slice(1, -1).forEach(id => {
            if (parentRow.child) {
              parentRow = parentRow.child.find(row => row.id === id) || ({} as RowData);
            }
          });

          parentRow.child = parentRow.child?.map(row =>
            row.id === state.editable ? { ...row, ...action.payload.row.current } : row,
          );
          state.editable = null;
          state.path = [];
        } else {
          state.rows = state.rows.map(row =>
            row.id === state.editable ? { ...row, ...action.payload.row.current } : row,
          );
          state.editable = null;
          state.path = [];
        }
        updateChangedRows(action.payload.row.changed, state.rows);
      })

      .addCase(deleteRow.fulfilled, (state, action) => {
        if (state.path.length > 1) {
          let parentRow: RowData =
            state.rows.find(row => row.id === state.path[0]) || ({} as RowData);

          state.path.slice(1, -1).forEach(id => {
            if (parentRow.child) {
              parentRow = parentRow.child.find(row => row.id === id) || ({} as RowData);
            }
          });

          parentRow.child = parentRow.child?.filter(row => row.id !== action.payload.id);
          state.editable = null;
          state.path = [];
        } else {
          state.rows = state.rows.filter(row => row.id !== state.path[0]);
        }
        if (state.rows.length === 0) {
          const newRow: RowData = {
            equipmentCosts: 0,
            id: 0,
            estimatedProfit: 0,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: 0,
            parentId: null,
            rowName: '',
            salary: 0,
            supportCosts: 0,
            child: [],
          };
          state.rows.push(newRow);
          state.editable = 0;
          state.path = [0];
        }
      });
  },
});

export const { createRowLocally, setEditable, setPath } = slice.actions;
