import React from 'react';

import { RowData } from '../../../../../api/types';
import TableBodyNew from '../../tableBody/TableBodyNew';

type childrenRowsProps = {
  child: RowData[];
  parents: any;
  lineLevel: number;
};

export default function ChildrenRowsNew(props: childrenRowsProps) {
  const { child, parents, lineLevel } = props;

  return (
    <TableBodyNew
      rowsData={child}
      lineLevel={lineLevel + 1}
      hasParent
      parents={[...parents]}
    />
  );
}
