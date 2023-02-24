import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import TableContainer from '@mui/material/TableContainer';

import s from './ProjectWorks.module.scss';
import { ProjectWorksHeader } from './projectWorksHeader';
import { TableBodyComponent, TableColumns, TableTitle } from './table';

import { rowsDataSelector } from 'app/selectors';
import { useAppSelector } from 'hooks';

export function ProjectWorks() {
  const rowsData = useAppSelector(rowsDataSelector);
  const columns = TableColumns();

  return (
    <div className={s.ProjectWorksContainer}>
      <ProjectWorksHeader projectName="Строительно-монтажные работы" />
      <TableContainer component={Paper} className={s.ProjectWorksTableContainer}>
        <Table sx={{ minWidth: 650 }} className={s.ProjectWorksTable}>
          <TableTitle columns={columns} />
          <TableBody className={s.tableBody}>
            <TableBodyComponent
              rowsData={rowsData}
              lineLevel={0}
              hasParent={false}
              parents={[]}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
