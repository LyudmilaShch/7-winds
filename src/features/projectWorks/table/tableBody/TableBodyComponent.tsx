import React from 'react';

import TableRow from '@mui/material/TableRow';

import { setEditable, setPath } from '../../tableRowsSlice';

import s from './TableBody.module.scss';
import { ChildrenRows, EditableTableRowComponent, TableRowComponent } from './tableRow';

import { RowData } from 'api/types';
import { useAppDispatch, useAppSelector } from 'hooks';

type TableBodyType = {
  rowsData: RowData[];
  lineLevel: number | 0;
  hasParent: boolean;
  parents: number[];
};

export function TableBodyComponent({
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
        const editRowHandle = () => {
          if (editable === null) {
            dispatch(setEditable(row.id!));
            dispatch(setPath([...parents, row.id!]));
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
                <EditableTableRowComponent
                  rowData={row}
                  lineLevel={lineLevel}
                  hasParent={hasParent}
                  parents={[...parents, row.id!]}
                />
              </TableRow>
              {row.child && (
                <ChildrenRows
                  child={row.child}
                  parents={[...parents, row.id!]}
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
              <TableRowComponent
                rowData={row}
                lineLevel={lineLevel}
                hasParent={hasParent}
                parents={[...parents, row.id!]}
              />
            </TableRow>
            {row.child && (
              <ChildrenRows
                child={row.child}
                lineLevel={lineLevel}
                parents={[...parents, row.id!]}
              />
            )}
          </>
        );
      })}
    </>
  );
}
