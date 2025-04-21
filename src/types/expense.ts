
export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: Date;
}

export type ExpenseSummary = {
  total: number;
  count: number;
  date: string;
}

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
}
