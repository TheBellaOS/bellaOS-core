export interface TransactionModel {
  id: string;
  accountId: string;
  transactionId: string;
  amount: number;
  currency: string;
  date: string;
  name: string;
  merchantName?: string;
  category: string[];
  pending: boolean;
  type: string;
  provider: 'plaid' | 'openBanking';
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, string>;
}
