export interface WalletModel {
  id: string;
  userId: string;
  network: 'ethereum' | 'solana' | 'bnbChain';
  address: string;
  privateKey?: string; // Should be encrypted in a real implementation
  mnemonic?: string; // Should be encrypted in a real implementation
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, string>;
}
