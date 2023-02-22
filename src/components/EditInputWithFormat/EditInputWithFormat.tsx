import React from 'react';

import { NumericFormat } from 'react-number-format';

import s from './EditInputWithFormat.module.scss';

type EditInputType = {
  saveNewRow: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  newValue: number;
  setNewValue: (newValue: number) => void;
};
export default function EditInputWithFormat({
  saveNewRow,
  newValue,
  setNewValue,
}: EditInputType) {
  return (
    <div className={s.cell}>
      <NumericFormat
        valueIsNumericString
        decimalSeparator="."
        displayType="input"
        thousandSeparator=" "
        className={s.input}
        value={newValue}
        onBlur={() => String(newValue).trim().length === 0 && setNewValue(0)}
        onChange={e => setNewValue(Number(e.target.value.replace(/\s/g, '')))}
        onKeyDown={saveNewRow}
      />
    </div>
  );
}
