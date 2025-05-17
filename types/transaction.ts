export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}
export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  category: string;
  note: string;
  date: string;
  created_at: string;
}
