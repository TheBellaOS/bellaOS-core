export interface OrderModel {
  id: string;
  userId: string;
  exchange: string;
  symbol: string;
  type: 'market' | 'limit' | 'stop' | 'stop_limit';
  side: 'buy' | 'sell';
  amount: number;
  price?: number;
  stopPrice?: number;
  status: 'open' | 'closed' | 'canceled';
  filled: number;
  cost: number;
  fee: number;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date;
  metadata?: Record<string, string>;
}
