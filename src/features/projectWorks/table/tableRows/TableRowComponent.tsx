import React from 'react';

import { TextWithFormat } from '../../../../components';
import { setEditable, setPath } from '../../tableRowsSlice';

import ButtonIcons from './buttonIcons/ButtonIcons';
import s from './TableRow.module.scss';
import { ParentsType, RowStyles } from './TableRow.types';

import { RowData } from 'api/types';
import { useAppDispatch, useAppSelector } from 'hooks';

type TableRowProps = RowStyles & RowData & ParentsType & { row: RowData };

export default function TableRowComponent(props: TableRowProps) {
  const { row, id, hasParent, parents, lineLevel } = props;

  const editable = useAppSelector(state => state.rows.editable);
  const dispatch = useAppDispatch();

  // const buttonsStyle = useMemo(
  //   () => (hasParent ? `${s.createRow} ${s.createRow_hasparent}` : `${s.createRow}`),
  //   [hasParent],
  // );

  const editRowHandle = () => {
    if (editable === null) {
      dispatch(setEditable(id!));
      dispatch(setPath(parents || [id!]));
    }
  };

  if (editable !== null && editable === id) {
    // return (
    //   <EditableTableRows
    //     parents={parents}
    //     buttonsStyle={buttonsStyle}
    //     {...row}
    //     lineLevel={lineLevel}
    //   />
    // );
  }
  return (
    <>
      <div className={s.tableRow} onDoubleClick={editRowHandle}>
        <div>
          <ButtonIcons
            hasParent={hasParent}
            id={id}
            lineLevel={lineLevel}
            parents={parents}
            row={row}
          />
        </div>
        {/* <div className={s.blockInfo}> */}
        <div className={s.title}>{row.rowName}</div>
        <div className={s.cell}>
          <TextWithFormat value={row.salary} />
        </div>
        <div className={s.cell}>
          <TextWithFormat value={row.equipmentCosts} />
        </div>
        <div className={s.cell}>
          <TextWithFormat value={row.overheads} />
        </div>
        <div className={s.cell}>
          <TextWithFormat value={row.estimatedProfit} />
        </div>
        {/* </div> */}
      </div>
      {/* {child && */}
      {/*  child.map(rowChild => ( */}
      {/*    <ChildrenRows */}
      {/*      key={rowChild.id} */}
      {/*      child={rowChild} */}
      {/*      parents={parents} */}
      {/*      lineLevel={lineLevel} */}
      {/*    /> */}
      {/*  ))} */}
    </>
  );
}
