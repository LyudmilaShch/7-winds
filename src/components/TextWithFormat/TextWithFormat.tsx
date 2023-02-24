import React from 'react';

import { NumericFormat } from 'react-number-format';

type TextWithFormatType = {
  value: number;
};

export default function TextWithFormat({ value }: TextWithFormatType) {
  return (
    <div>
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
