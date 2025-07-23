import ccxt from 'ccxt';

export class TradingService {
  private exchange: ccxt.Exchange;
  
  constructor(exchangeId: string, apiKey: string, secret: string) {
    this.exchange = new ccxt[exchangeId]({
      apiKey,
      secret,
      enableRateLimit: true,
    });
  }
  
  async fetchMarkets() {
    return this.exchange.fetchMarkets();
  }
  
  async fetchTicker(symbol: string) {
    return this.exchange.fetchTicker(symbol);
  }
  
  async fetchOrderBook(symbol: string, limit: number = 20) {
    return this.exchange.fetchOrderBook(symbol, limit);
  }
  
  async fetchBalance() {
    return this.exchange.fetchBalance();
  }
  
  async createOrder(symbol: string, type: string, side: 'buy' | 'sell', amount: number, price?: number) {
    return this.exchange.createOrder(symbol, type, side, amount, price);
  }
  
  async cancelOrder(id: string, symbol: string) {
    return this.exchange.cancelOrder(id, symbol);
  }
  
  async fetchOrder(id: string, symbol: string) {
    return this.exchange.fetchOrder(id, symbol);
  }
  
  async fetchOrders(symbol: string, since?: number, limit?: number) {
    return this.exchange.fetchOrders(symbol, since, limit);
  }
  
  async fetchOpenOrders(symbol: string, since?: number, limit?: number) {
    return this.exchange.fetchOpenOrders(symbol, since, limit);
  }
  
  async fetchClosedOrders(symbol: string, since?: number, limit?: number) {
    return this.exchange.fetchClosedOrders(symbol, since, limit);
  }
  
  async fetchMyTrades(symbol: string, since?: number, limit?: number) {
    return this.exchange.fetchMyTrades(symbol, since, limit);
  }
  
  async fetchOHLCV(symbol: string, timeframe: string = '1h', since?: number, limit?: number) {
    return this.exchange.fetchOHLCV(symbol, timeframe, since, limit);
  }
  
  async deposit(currency: string, amount: number, address: string, tag?: string) {
    if (!this.exchange.has['deposit']) {
      throw new Error('Exchange does not support deposits');
    }
    
    return this.exchange.deposit(currency, amount, address, tag);
  }
  
  async withdraw(currency: string, amount: number, address: string, tag?: string) {
    return this.exchange.withdraw(currency, amount, address, tag);
  }
}
