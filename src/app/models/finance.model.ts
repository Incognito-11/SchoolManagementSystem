export interface Finance {
  id?: number;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
}
