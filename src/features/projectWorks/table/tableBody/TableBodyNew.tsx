import React from 'react';

import TableRow from '@mui/material/TableRow';

import { RowData } from '../../../../api/types';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setEditable, setPath } from '../../tableRowsSlice';
import ChildrenRowsNew from '../tableRows/childrenRows/ChildrenRowsNew';
import { ParentsType } from '../tableRows/TableRow.types';
import { EditTableRowNew, TableRowNew } from '../tableRows/TableRowNew';

import s from './TableBody.module.scss';

type TableBodyType = {
  rowsData: RowData[];
  lineLevel: number | 0;
  hasParent: boolean;
} & ParentsType;

export default function TableBodyNew({
  rowsData,
  hasParent,
  lineLevel,
  parents,
}: TableBodyType) {
  const editable = useAppSelector(state => state.rows.editable);
  const dispatch = useAppDispatch();

  return (
    <>
      {rowsData.map((row: RowData) => {
        // const data = TableRowNew(row, lineLevel, hasParent);
        const editRowHandle = () => {
          if (editable === null) {
            dispatch(setEditable(row.id!));
            dispatch(setPath(parents || [row.id!]));
          }
        };

        if (editable !== null && editable === row.id) {
          return (
            <>
              <TableRow
                key={row.id}
                hover
                className={s.tableRow}
                onDoubleClick={editRowHandle}
              >
                <EditTableRowNew
                  rowData={row}
                  lineLevel={lineLevel}
                  hasParent={hasParent}
                />
              </TableRow>
              {row.child && (
                <ChildrenRowsNew
                  child={row.child}
                  parents={[row.id!]}
                  lineLevel={lineLevel}
                />
              )}
            </>
          );
        }
        return (
          <>
            <TableRow
              key={row.id}
              hover
              className={s.tableRow}
              onDoubleClick={editRowHandle}
            >
              <TableRowNew rowData={row} lineLevel={lineLevel} hasParent={hasParent} />
            </TableRow>
            {row.child && (
              <ChildrenRowsNew
                child={row.child}
                parents={[row.id!]}
                lineLevel={lineLevel}
              />
            )}
          </>
        );
      })}
    </>
  );
}
