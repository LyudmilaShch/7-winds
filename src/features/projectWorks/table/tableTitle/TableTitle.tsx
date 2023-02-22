import React from 'react';

import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import s from './TableTitle.module.scss';

type TableTitleType = {
  columns: { id: string; name: string }[];
};
export function TableTitle({ columns }: TableTitleType) {
  return (
    <TableHead>
      <TableRow className={s.tableTitleContainer}>
        {columns.map(column => (
          <TableCell key={column.id} className={s.tableTitle}>
            {column.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
