export interface ColumnTable {
  id: 'level' | 'rowName' | 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit';
  name: string;
}

export function TableColumns() {
  const columns: ColumnTable[] = [
    { id: 'level', name: 'Уровень' },
    { id: 'rowName', name: 'Наименование работ' },
    { id: 'salary', name: 'Основная з/п' },
    { id: 'equipmentCosts', name: 'Оборудование' },
    { id: 'overheads', name: 'Накладные расходы' },
    { id: 'estimatedProfit', name: 'Сметная прибыль' },
  ];

  return columns;
}
