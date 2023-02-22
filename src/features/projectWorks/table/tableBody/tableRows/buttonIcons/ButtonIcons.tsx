import React, { useMemo } from 'react';

import {
  createRowLocally,
  deleteRow,
  setEditable,
  setPath,
} from '../../../../tableRowsSlice';

import s from './ButtonIcons.module.scss';
import DeepLineValue from './deepLineValue/DeepLineValue';

import { RowData } from 'api/types';
import deleteIcon from 'assets/images/deleteIcon.svg';
import rowItemIcon from 'assets/images/rowItemIcon.svg';
import { useAppDispatch, useAppSelector } from 'hooks';

type ButtonIconsType = {
  hasParent: boolean;
  row: RowData;
  lineLevel: number;
  parents: any;
  id: number | undefined;
};

export default function ButtonIcons({
  hasParent,
  row,
  lineLevel,
  parents,
  id,
}: ButtonIconsType) {
  const editable = useAppSelector(state => state.rows.editable);
  const dispatch = useAppDispatch();
  const deepLine = DeepLineValue(row);

  const buttonsStyle = useMemo(
    () => (hasParent ? `${s.createRow} ${s.createRow_hasparent}` : `${s.createRow}`),
    [hasParent],
  );

  const createRowHandle = () => {
    if (editable === null) {
      dispatch(setEditable(0));
      dispatch(setPath(parents));
      dispatch(createRowLocally({ parentId: id! }));
    }
  };
  const deleteRowHandle = () => {
    if (editable === null) {
      dispatch(setPath(parents));
      dispatch(deleteRow(id!));
    }
  };

  return (
    <div className={s.blockWithItemLine}>
      <div
        className={s.buttonsBlock}
        style={{
          marginLeft: `${20 * lineLevel}px`,
        }}
      >
        <div className={s.leftLine} style={{ height: `${60 * deepLine}px` }} />
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
