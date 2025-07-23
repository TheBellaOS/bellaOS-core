export interface TransactionModel {
  id: string;
  userId: string;
  walletId: string;
  network: 'ethereum' | 'solana' | 'bnbChain';
  hash: string;
  from: string;
  to: string;
  amount: string;
  fee: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: Date;
  blockNumber?: number;
  tokenAddress?: string;
  tokenSymbol?: string;
  tokenDecimals?: number;
  metadata?: Record<string, string>;
}
