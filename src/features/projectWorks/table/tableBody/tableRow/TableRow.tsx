import React, { useCallback, useState } from 'react';

import TableCell from '@mui/material/TableCell';

import { createRow, updateRow } from '../../../tableRowsSlice';
import { TableColumns } from '../tableColumns';

import ButtonIcons from './buttonIcons/ButtonIcons';
import s from './TableRow.module.scss';

import { CreateRowData, RowData } from 'api/types';
import { EditInputWithFormat, TextWithFormat } from 'components';
import { useAppDispatch, useAppSelector } from 'hooks';

type TableRowType = {
  rowData: RowData;
  lineLevel: number;
  hasParent: boolean;
  parents: number[];
};
export function TableRowComponent({
  rowData,
  hasParent,
  lineLevel,
  parents,
}: TableRowType) {
  const columns = TableColumns();
  const level = (
    <div>
      <ButtonIcons
        hasParent={hasParent}
        id={rowData.id}
        lineLevel={lineLevel}
        parents={parents}
        row={rowData}
      />
    </div>
  );
  const rowName = <div>{rowData.rowName}</div>;
  const salary = <TextWithFormat value={rowData.salary} />;
  const equipmentCosts = <TextWithFormat value={rowData.equipmentCosts} />;
  const overheads = <TextWithFormat value={rowData.overheads} />;
  const estimatedProfit = <TextWithFormat value={rowData.estimatedProfit} />;

  const row = {
    level,
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
  };

  return (
    <>
      {columns.map(colum => {
        const value = row[colum.id];
        return (
          <TableCell key={colum.id} component="th" scope="row" className={s.tableCell}>
            {value}
          </TableCell>
        );
      })}
    </>
  );
}

export function EditableTableRowComponent({
  rowData,
  hasParent,
  lineLevel,
  parents,
}: TableRowType) {
  const [newRowName, setNewRowName] = useState(rowData.rowName);
  const [newSalary, setNewSalary] = useState(rowData.salary);
  const [newOverheads, setNewOverheads] = useState(rowData.overheads);
  const [newEstimatedProfit, setNewEstimatedProfit] = useState(rowData.estimatedProfit);
  const [newEquipmentCosts, setNewEquipmentCosts] = useState(rowData.equipmentCosts);
  const editable = useAppSelector(state => state.rows.editable);
  const dispatch = useAppDispatch();
  const columns = TableColumns();

  const saveNewRow = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const params: CreateRowData = {
          id: rowData.id,
          rowName: newRowName,
          parentId: rowData.parentId,
          salary: newSalary || 0,
          overheads: newOverheads || 0,
          equipmentCosts: newEquipmentCosts || 0,
          estimatedProfit: newEstimatedProfit || 0,
        };
        // eslint-disable-next-line no-unused-expressions
        editable === 0 ? dispatch(createRow(params)) : dispatch(updateRow(params));
      }
      return e.key;
    },
    [newRowName, newSalary, newOverheads, newEstimatedProfit, newEquipmentCosts],
  );

  const level = (
    <div>
      <ButtonIcons
        hasParent={hasParent}
        id={rowData.id}
        lineLevel={lineLevel}
        parents={parents}
        row={rowData}
      />
    </div>
  );
  const rowName = (
    <div>
      <input
        className={s.input}
        value={newRowName}
        onChange={e => setNewRowName(e.target.value)}
        onKeyDown={saveNewRow}
      />
    </div>
  );
  const salary = (
    <EditInputWithFormat
      newValue={newSalary}
      setNewValue={setNewSalary}
      saveNewRow={saveNewRow}
    />
  );
  const equipmentCosts = (
    <EditInputWithFormat
      newValue={newEquipmentCosts}
      setNewValue={setNewEquipmentCosts}
      saveNewRow={saveNewRow}
    />
  );
  const overheads = (
    <EditInputWithFormat
      newValue={newOverheads}
      setNewValue={setNewOverheads}
      saveNewRow={saveNewRow}
    />
  );
  const estimatedProfit = (
    <EditInputWithFormat
      newValue={newEstimatedProfit}
      setNewValue={setNewEstimatedProfit}
      saveNewRow={saveNewRow}
    />
  );

  const row = {
    level,
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
  };

  return (
    <>
      {columns.map(colum => {
        const value = row[colum.id];
        return (
          <TableCell key={colum.id} component="th" scope="row" className={s.tableCell}>
            {value}
          </TableCell>
        );
      })}
    </>
  );
}
