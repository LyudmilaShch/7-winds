import React, { useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { useAppDispatch, useAppSelector } from '../../hooks';

import s from './ProjectWorks.module.scss';
import { ProjectWorksHeader } from './projectWorksHeader/ProjectWorksHeader';
import TableBodyComponent from './table/tableBody/TableBodyComponent';
import TableBodyNew from './table/tableBody/TableBodyNew';
import { TableColumns } from './table/tableColumns/TableColumns';
import { EditTableRows } from './table/tableRows/TableRows';
import { TableTitle } from './table/tableTitle/TableTitle';
import { fetchTableRows } from './tableRowsSlice';

export default function ProjectWorks() {
  const rowsData = useAppSelector(state => state.rows.rows);
  const columns = TableColumns();
  const rows = EditTableRows(rowsData, 0, false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTableRows());
  }, []);

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
          <TableBody>
            {rows.map(row => (
              <TableBodyComponent
                hasParent={false}
                key={row.id}
                columns={columns}
                row={row}
                {...row}
                parents={[row.id!]}
                lineLevel={1}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} className={s.ProjectWorksTableContainer}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className={s.ProjectWorksTable}
        >
          <TableTitle columns={columns} />
          <TableBodyNew
            columns={columns}
            rowsData={rowsData}
            lineLevel={0}
            hasParent={false}
          />
          {/* <TableBody> */}
          {/*  {rowsData.map(row => { */}
          {/*    const data = TableRowNew(row, 0, false); */}
          {/*    return ( */}
          {/*      <TableRow hover className={s.tableRow} key={row.id}> */}
          {/*        {columns.map(colum => { */}
          {/*          const value = data[colum.id]; */}
          {/*          return ( */}
          {/*            <TableCell */}
          {/*              key={colum.id} */}
          {/*              component="th" */}
          {/*              scope="row" */}
          {/*              className={s.tableCell} */}
          {/*            > */}
          {/*              {value} */}
          {/*            </TableCell> */}
          {/*          ); */}
          {/*        })} */}
          {/*      </TableRow> */}
          {/*    ); */}
          {/*  })} */}
          {/* </TableBody> */}
        </Table>
      </TableContainer>

      {/* <table className={s.ProjectWorksTable}> */}
      {/*  <tr> */}
      {/*    <TableTitle */}
      {/*      columnsName={[ */}
      {/*        { id: 0, name: 'Уровень' }, */}
      {/*        { id: 1, name: 'Наименование работ' }, */}
      {/*        { id: 2, name: 'Основная з/п' }, */}
      {/*        { id: 2, name: 'Оборудование' }, */}
      {/*        { id: 3, name: 'Накладные расходы' }, */}
      {/*        { id: 4, name: 'Сметная прибыль' }, */}
      {/*      ]} */}
      {/*    /> */}
      {/*  </tr> */}
      {/*  {mainRows()} */}
      {/* </table> */}
    </div>
  );
}
