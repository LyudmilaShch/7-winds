import axios from 'axios';

import { CreateRowData, ResponseType, RowData } from './types';

const baseURL = 'http://185.244.172.108:8081/v1/outlay-rows/entity/52316/row/';

const instance = axios.create({
  baseURL,
});
export const tableRowsAPI = {
  getRows() {
    return instance.get<Array<RowData>>('list');
  },
  createRow(row: CreateRowData) {
    return instance.post<ResponseType<{ item: CreateRowData }>>('create', { ...row });
  },
  updateRow(id: number | undefined, row: RowData) {
    return instance.post<ResponseType<{ item: CreateRowData }>>(`${id}/update`, {
      ...row,
    });
  },
  deleteRow(id: number | undefined) {
    return instance.delete(`${id}/delete`);
  },
};
