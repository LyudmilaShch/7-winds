import React from 'react';

import TableBody from '@mui/material/TableBody/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { RowData } from '../../../../api/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setEditable, setPath } from '../../tableRowsSlice';
import { ColumnTable, TableColumns } from '../tableColumns/TableColumns';
import ChildrenRowsNew from '../tableRows/childrenRows/ChildrenRowsNew';
import { ParentsType } from '../tableRows/TableRow.types';
import { TableRowNew } from '../tableRows/TableRowNew';

import s from './TableBody.module.scss';

type TableBodyType = {
  columns: ColumnTable[];
  rowsData: RowData[];
  lineLevel: number | 0;
  hasParent: boolean;
} & ParentsType;

export default function TableBodyNew({
  columns,
  rowsData,
  hasParent,
  lineLevel,
  // child,
  parents,
}: TableBodyType) {
  const editable = useAppSelector(state => state.rows.editable);
  const dispatch = useAppDispatch();
  const columnsNew = TableColumns();

  return (
    <TableBody>
      {rowsData.map(row => {
        const data = TableRowNew(row, lineLevel, hasParent);
        const editRowHandle = () => {
          if (editable === null) {
            dispatch(setEditable(row.id!));
            dispatch(setPath(parents || [row.id!]));
          }
        };
        return (
          <>
            <TableRow
              hover
              className={s.tableRow}
              key={row.id}
              onDoubleClick={editRowHandle}
            >
              {columnsNew.map(colum => {
                const value = data[colum.id];
                return (
                  <TableCell
                    key={colum.id}
                    component="th"
                    scope="row"
                    className={s.tableCell}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
            {row.child && (
              <ChildrenRowsNew
                key={row.id}
                child={row.child}
                parents={[row.id!]}
                lineLevel={lineLevel}
              />
            )}
            {/*               row.child.map(rowChild => (
                 <ChildrenRowsNew
                   key={rowChild.id}
                   child={row.child}
                   parents={[row.id!]}
                   lineLevel={lineLevel}
                 />
               )) */}
          </>
        );
      })}
    </TableBody>
  );
}
