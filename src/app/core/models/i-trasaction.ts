export interface ITransaction {
  transactionId: number;
  transactionType: string;
  originType: string;
  date: string;
  amount: number;
  description: string;
}
