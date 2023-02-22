import React from 'react';

import { RowData } from '../../../../../api/types';
import TableBodyNew from '../../tableBody/TableBodyNew';
import { TableColumns } from '../../tableColumns/TableColumns';

type childrenRowsProps = {
  child: RowData[];
  parents: any;
  lineLevel: number;
};

export default function ChildrenRowsNew(props: childrenRowsProps) {
  const { child, parents, lineLevel } = props;

  const columns = TableColumns();

  return (
    <TableBodyNew
      columns={columns}
      rowsData={child}
      lineLevel={lineLevel + 1}
      hasParent
      parents={[...parents]}
    />
  );
}
