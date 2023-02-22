import React, { useState } from 'react';

import { CreateRowData, RowData } from '../../../../api/types';
import { EditInputWithFormat, TextWithFormat } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { createRow, updateRow } from '../../tableRowsSlice';

import ButtonIcons from './buttonIcons/ButtonIcons';
import s from './TableRow.module.scss';

export interface RowTable {
  level: JSX.Element;
  rowName: JSX.Element;
  salary: JSX.Element;
  equipmentCosts: JSX.Element;
  overheads: JSX.Element;
  estimatedProfit: JSX.Element;
  id: number | undefined;
  child: RowData[];
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  parentId?: number | null;
  supportCosts: number;
  total?: number;
}

export function TableRowNew(rowData: RowData, lineLevel: number, hasParent: boolean) {
  const level = (
    <div>
      <ButtonIcons
        hasParent={hasParent}
        id={rowData.id}
        lineLevel={lineLevel}
        parents={[rowData.id!]}
        row={rowData}
      />
    </div>
  );
  const rowName = <div>{rowData.rowName}</div>;
  const salary = <TextWithFormat value={rowData.salary} />;
  const equipmentCosts = <TextWithFormat value={rowData.equipmentCosts} />;
  const overheads = <TextWithFormat value={rowData.overheads} />;
  const estimatedProfit = <TextWithFormat value={rowData.estimatedProfit} />;

  return {
    level,
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
  };
}

export const EditTableRows = (
  rowsData: RowData[],
  lineLevel: number,
  hasParent: boolean,
) => {
  const [newRowName, setNewRowName] = useState('');
  const [newSalary, setNewSalary] = useState(0);
  const [newOverheads, setNewOverheads] = useState(0);
  const [newEstimatedProfit, setNewEstimatedProfit] = useState(0);
  const [newEquipmentCosts, setNewEquipmentCosts] = useState(0);
  const editable = useAppSelector(state => state.rows.editable);
  const dispatch = useAppDispatch();
  const createData = (
    level: JSX.Element,
    rowName: JSX.Element,
    salary: JSX.Element,
    equipmentCosts: JSX.Element,
    overheads: JSX.Element,
    estimatedProfit: JSX.Element,
    id: number | undefined,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    supportCosts: number,
    child: RowData[],
    parentId?: number | null,
    total?: number,
  ): RowTable => ({
    level,
    rowName,
    salary,
    equipmentCosts,
    overheads,
    estimatedProfit,
    id,
    machineOperatorSalary,
    mainCosts,
    materials,
    mimExploitation,
    supportCosts,
    child,
    parentId,
    total,
  });

  const rows: RowTable[] = rowsData.map((el: RowData) => {
    const saveNewRow = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const params: CreateRowData = {
          id: el.id,
          rowName: newRowName,
          parentId: el.parentId,
          salary: newSalary || 0,
          overheads: newOverheads || 0,
          equipmentCosts: newEquipmentCosts || 0,
          estimatedProfit: newEstimatedProfit || 0,
        };
        // eslint-disable-next-line no-unused-expressions
        editable === 0 ? dispatch(createRow(params)) : dispatch(updateRow(params));
      }
      return e.key;
    };
    const rowName = (
      <div>
        <input
          className={s.input}
          value={newRowName}
          onChange={e => setNewRowName(e.target.value)}
          onKeyDown={saveNewRow}
        />
      </div>
    );

    const level = (
      <div>
        <ButtonIcons
          hasParent={hasParent}
          id={el.id}
          lineLevel={lineLevel}
          parents={[el.id!]}
          row={el}
        />
      </div>
    );
    const salary = (
      <EditInputWithFormat
        newValue={newSalary}
        setNewValue={setNewSalary}
        saveNewRow={saveNewRow}
      />
    );
    const equipmentCosts = (
      <EditInputWithFormat
        newValue={newEquipmentCosts}
        setNewValue={setNewEquipmentCosts}
        saveNewRow={saveNewRow}
      />
    );
    const overheads = (
      <EditInputWithFormat
        newValue={newOverheads}
        setNewValue={setNewOverheads}
        saveNewRow={saveNewRow}
      />
    );
    const estimatedProfit = (
      <EditInputWithFormat
        newValue={newEstimatedProfit}
        setNewValue={setNewEstimatedProfit}
        saveNewRow={saveNewRow}
      />
    );

    return createData(
      level,
      rowName,
      salary,
      equipmentCosts,
      overheads,
      estimatedProfit,
      el.id,
      el.machineOperatorSalary,
      el.mainCosts,
      el.materials,
      el.mimExploitation,
      el.supportCosts,
      el.child,
      el.parentId,
      el.total,
    );
  });
  return rows;
};
