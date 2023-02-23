export type RowData = {
  child: RowData[];
  equipmentCosts: number;
  id?: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId?: number | null;
  rowName: string;
  salary: number;
  supportCosts: number;
  total?: number;
  parentsDeepLine?: number;
};

export type Data = {
  rows: RowData[];
  loading: string | null;
  error: string | null;
  editable: number | null;
  path: number[];
};

export type CreateRowData = {
  rowName: string;
  parentId?: number | null;
  id?: number;
  salary: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
};

export type ResType = {
  current: RowData;
  changed: RowData[];
};
export type FieldErrorType = { field: string; error: string };

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors?: Array<FieldErrorType>;
  data: D;
};
