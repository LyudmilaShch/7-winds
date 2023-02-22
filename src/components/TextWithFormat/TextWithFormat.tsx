import React from 'react';

import { NumericFormat } from 'react-number-format';

import s from 'features/projectWorks/table/tableRows/TableRow.module.scss';

type TextWithFormatType = {
  value: number;
};
export default function TextWithFormat({ value }: TextWithFormatType) {
  return (
    <div className={s.cell}>
      <NumericFormat
        valueIsNumericString
        decimalSeparator="."
        displayType="text"
        thousandSeparator=" "
        value={value}
      />
    </div>
  );
}
