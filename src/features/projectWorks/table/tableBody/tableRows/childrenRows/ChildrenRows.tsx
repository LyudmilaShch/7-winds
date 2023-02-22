import React from 'react';

import TableBodyComponent from '../../TableBodyComponent';

import { RowData } from 'api/types';

type childrenRowsProps = {
  child: RowData[];
  parents: any;
  lineLevel: number;
};

export default function ChildrenRows(props: childrenRowsProps) {
  const { child, parents, lineLevel } = props;

  return (
    <TableBodyComponent
      rowsData={child}
      lineLevel={lineLevel + 1}
      hasParent
      parents={[...parents]}
    />
  );
}
