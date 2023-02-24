import { useEffect, useState } from 'react';

import { RowData } from 'api/types';
import { useAppSelector } from 'hooks';

export default function DeepLineValue(row: RowData) {
  const [deepLevel, setDeepLevel] = useState<number>(0);
  const [lastDeepLevel, setLastDeepLevel] = useState<number>(0);
  const rowsData = useAppSelector(state => state.rows.rows);

  let level = 0;
  let lastlevel = 0;
  const getDeep = (rowData: RowData) => {
    rowData.child.map((e: RowData) => {
      level += 1;
      setDeepLevel(level);
      getDeep(e);
      return null;
    });
  };

  const getlastDeep = (rowData: RowData) => {
    lastlevel += rowData.child.length || 0;
    setLastDeepLevel(lastlevel);
    rowData.child.map((e: any) => {
      getlastDeep(e);
      return null;
    });
  };

  useEffect(() => {
    level = 0;
    lastlevel = 0;
    if (row.child && row.child.length !== 0) {
      getDeep(row);
      getlastDeep(row.child[row.child.length - 1]);
    } else {
      setDeepLevel(level);
      setLastDeepLevel(lastlevel);
    }
  }, [rowsData]);

  return deepLevel - lastDeepLevel;
}
