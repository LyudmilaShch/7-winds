import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setEditable, setPath } from '../../tableRowsSlice';
import { ColumnTable } from '../tableColumns/TableColumns';
import { ChildrenRows } from '../tableRows/childrenRows';
import { ParentsType, RowStyles } from '../tableRows/TableRow.types';
import { EditTableRows, RowTable } from '../tableRows/TableRows';

import s from './TableBody.module.scss';

type TableBodyType = {
  columns: ColumnTable[];
  row: RowTable;
} & RowTable &
  RowStyles &
  ParentsType;

export default function TableBodyComponent({
  columns,
  row,
  id,
  child,
  parents,
  lineLevel,
}: TableBodyType) {
  const children = EditTableRows(child, lineLevel, true);
  const editable = useAppSelector(state => state.rows.editable);
  const dispatch = useAppDispatch();

  const editRowHandle = () => {
    if (editable === null) {
      dispatch(setEditable(id!));
      dispatch(setPath(parents || [id!]));
    }
  };

  return (
    <>
      <TableRow hover onDoubleClick={editRowHandle} className={s.tableRow}>
        {columns.map(colum => {
          const value = row[colum.id];
          return (
            <TableCell key={colum.id} component="th" scope="row" className={s.tableCell}>
              {value}
            </TableCell>
          );
        })}
      </TableRow>
      {child &&
        children.map(rowChild => (
          <ChildrenRows
            key={rowChild.id}
            child={rowChild}
            parents={parents}
            lineLevel={lineLevel}
          />
        ))}
    </>
  );
}
