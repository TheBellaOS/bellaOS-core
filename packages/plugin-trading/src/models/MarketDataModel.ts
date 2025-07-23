export interface MarketDataModel {
  id: string;
  symbol: string;
  exchange: string;
  timeframe: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: Date;
  indicators?: {
    sma?: {
      sma20?: number;
      sma50?: number;
      sma200?: number;
    };
    rsi?: number;
    macd?: {
      macd: number;
      signal: number;
      histogram: number;
    };
    bollinger?: {
      upper: number;
      middle: number;
      lower: number;
    };
  };
}
