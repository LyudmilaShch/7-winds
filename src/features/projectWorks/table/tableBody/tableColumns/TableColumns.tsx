export interface ColumnTable {
  id: 'level' | 'rowName' | 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit';
  name: string;
  minWidth?: number;
}

export function TableColumns() {
  const columns: ColumnTable[] = [
    { id: 'level', name: 'Уровень' },
    { id: 'rowName', name: 'Наименование работ', minWidth: 250 },
    { id: 'salary', name: 'Основная зп' },
    { id: 'equipmentCosts', name: 'Оборудование' },
    { id: 'overheads', name: 'Накладные расходы' },
    { id: 'estimatedProfit', name: 'Сметная прибыль' },
  ];

  return columns;
}
