export interface Expense {
  id: string;
  name: string;
  bu: 'Products' | 'Marketing';
  pic: string;
  budget: number;
  actual: number;
}
