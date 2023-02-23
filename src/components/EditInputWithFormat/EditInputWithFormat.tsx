import React, { ChangeEvent } from 'react';

import { NumericFormat } from 'react-number-format';

import s from './EditInputWithFormat.module.scss';

type EditInputType = {
  saveNewRow: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  newValue: number;
  setNewValue: (newValue: number) => void;
};
export const EditInputWithFormat = React.memo(
  ({ saveNewRow, newValue, setNewValue }: EditInputType) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewValue(Number(e.target.value.replace(/\s/g, '')));
    };

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
          onChange={onChangeHandler}
          onKeyDown={saveNewRow}
        />
      </div>
    );
  },
);
