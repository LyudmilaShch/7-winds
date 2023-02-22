import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { rowsDataSelector } from '../../app/selectors';
import { useAppSelector } from '../../hooks';

import s from './ProjectWorks.module.scss';
import { ProjectWorksHeader } from './projectWorksHeader/ProjectWorksHeader';
import TableBodyComponent from './table/tableBody/TableBodyComponent';
import { TableColumns } from './table/tableBody/tableColumns/TableColumns';
import { TableTitle } from './table/tableTitle/TableTitle';

export default function ProjectWorks() {
  const rowsData = useAppSelector(rowsDataSelector);
  const columns = TableColumns();

  return (
    <div className={s.ProjectWorksContainer}>
      <ProjectWorksHeader projectName="Строительно-монтажные работы" />
      <TableContainer component={Paper} className={s.ProjectWorksTableContainer}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className={s.ProjectWorksTable}
        >
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
