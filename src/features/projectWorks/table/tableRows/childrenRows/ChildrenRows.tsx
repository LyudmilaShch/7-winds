import React from 'react';

import TableBodyComponent from '../../tableBody/TableBodyComponent';
import { TableColumns } from '../../tableColumns/TableColumns';
import { RowTable } from '../TableRows';

type childrenRowsProps = {
  child: RowTable;
  parents: any;
  lineLevel: number;
};

export default function ChildrenRows(props: childrenRowsProps) {
  const { child, parents, lineLevel } = props;

  const columns = TableColumns();

  return (
    <TableBodyComponent
      hasParent
      columns={columns}
      row={child}
      {...child}
      parents={[...parents, child.id!]}
      lineLevel={lineLevel + 1}
    />
  );
}
