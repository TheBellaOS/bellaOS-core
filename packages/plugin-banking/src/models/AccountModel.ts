export interface AccountModel {
  id: string;
  userId: string;
  institutionId: string;
  accountId: string;
  accessToken: string;
  itemId: string;
  name: string;
  type: string;
  subtype: string;
  mask: string;
  balances: {
    available: number;
    current: number;
    limit?: number;
  };
  provider: 'plaid' | 'openBanking';
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, string>;
}
