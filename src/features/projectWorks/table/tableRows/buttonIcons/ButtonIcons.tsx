import React, { useEffect, useMemo, useState } from 'react';

import { addRowLocally, deleteRow, setEditable, setPath } from '../../../tableRowsSlice';

import s from './ButtonIcons.module.scss';

import deleteIcon from 'assets/images/deleteIcon.svg';
import rowItemIcon from 'assets/images/rowItemIcon.svg';
import { useAppDispatch, useAppSelector } from 'hooks';

type ButtonIconsType = {
  hasParent: any;
  row: any;
  lineLevel: any;
  parents: any;
  id: any;
};

export default function ButtonIcons({
  hasParent,
  row,
  lineLevel,
  parents,
  id,
}: ButtonIconsType) {
  const [deepLevel, setDeepLevel] = useState<any>(null);
  const [lastDeepLevel, setLastDeepLevel] = useState<any>(null);

  const editable = useAppSelector(state => state.rows.editable);
  const dispatch = useAppDispatch();

  const buttonsStyle = useMemo(
    () => (hasParent ? `${s.createRow} ${s.createRow_hasparent}` : `${s.createRow}`),
    [hasParent],
  );

  const createRowHandle = () => {
    if (editable === null) {
      dispatch(setEditable(0));
      dispatch(setPath(parents));
      dispatch(addRowLocally(id!));
    }
  };
  const deleteRowHandle = () => {
    if (editable === null) {
      dispatch(setPath(parents));
      dispatch(deleteRow(id!));
    }
  };

  let level = 0;
  let lastlevel = 0;

  const getDeep = (arr: any) => {
    if (arr.total > 0) {
      arr.child.map((e: any) => {
        level += 1;
        setDeepLevel(level);
        getDeep(e);
        return null;
      });
    }
  };

  const getlastDeep = (arr: any) => {
    lastlevel += arr.total;
    setLastDeepLevel(lastlevel);
    if (arr.total > 0) {
      arr.child.map((e: any) => {
        getlastDeep(e);
        return null;
      });
    }
  };
  useEffect(() => {
    lastlevel = 0;

    if (row.child && row.child.length !== 0) {
      getDeep(row);
      getlastDeep(row.child[row.child.length - 1]);
    }
  }, [row]);

  return (
    <div className={s.blockWithItemLine}>
      <div
        className={s.buttonsBlock}
        style={{
          marginLeft: `${20 * lineLevel}px`,
        }}
      >
        <div
          className={s.leftLine}
          style={{ height: `${60 * (deepLevel - lastDeepLevel)}px` }}
        />
        <div className={s.buttons_cont}>
          <button type="button" onClick={createRowHandle} className={buttonsStyle}>
            <img src={rowItemIcon} alt="rowItemIcon" />
          </button>
          <button type="button" onClick={deleteRowHandle} className={s.delRow}>
            <img src={deleteIcon} alt="deleteIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
