import ccxt from 'ccxt';
import { SMA, RSI, MACD, BollingerBands } from 'trading-signals';

export class MarketDataService {
  private exchange: ccxt.Exchange;
  private pairs: string[];
  private marketData: Map<string, any> = new Map();
  
  constructor(exchangeId: string, apiKey: string, secret: string, pairs: string[]) {
    this.exchange = new ccxt[exchangeId]({
      apiKey,
      secret,
      enableRateLimit: true,
    });
    this.pairs = pairs;
  }
  
  async fetchTicker(symbol: string) {
    const ticker = await this.exchange.fetchTicker(symbol);
    this.marketData.set(`ticker:${symbol}`, ticker);
    return ticker;
  }
  
  async fetchOHLCV(symbol: string, timeframe: string = '1h', since?: number, limit?: number) {
    const ohlcv = await this.exchange.fetchOHLCV(symbol, timeframe, since, limit);
    this.marketData.set(`ohlcv:${symbol}:${timeframe}`, ohlcv);
    return ohlcv;
  }
  
  async fetchOrderBook(symbol: string, limit: number = 20) {
    const orderBook = await this.exchange.fetchOrderBook(symbol, limit);
    this.marketData.set(`orderBook:${symbol}`, orderBook);
    return orderBook;
  }
  
  async fetchAllTickers() {
    const tickers = await Promise.all(
      this.pairs.map(pair => this.fetchTicker(pair))
    );
    
    return tickers;
  }
  
  async fetchAllOHLCV(timeframe: string = '1h', since?: number, limit?: number) {
    const ohlcvs = await Promise.all(
      this.pairs.map(pair => this.fetchOHLCV(pair, timeframe, since, limit))
    );
    
    return ohlcvs;
  }
  
  calculateSMA(prices: number[], period: number) {
    const sma = new SMA(period);
    prices.forEach(price => sma.update(price));
    return sma.getResult().valueOf();
  }
  
  calculateRSI(prices: number[], period: number) {
    const rsi = new RSI(period);
    prices.forEach(price => rsi.update(price));
    return rsi.getResult().valueOf();
  }
  
  calculateMACD(prices: number[], fastPeriod: number = 12, slowPeriod: number = 26, signalPeriod: number = 9) {
    const macd = new MACD({
      fastPeriod,
      slowPeriod,
      signalPeriod,
      SimpleMAOscillator: true,
      SimpleMASignal: true
    });
    
    prices.forEach(price => macd.update(price));
    
    return {
      macd: macd.getResult().valueOf(),
      signal: macd.getSignal().valueOf(),
      histogram: macd.getHistogram().valueOf()
    };
  }
  
  calculateBollingerBands(prices: number[], period: number = 20, stdDev: number = 2) {
    const bb = new BollingerBands(period, stdDev);
    prices.forEach(price => bb.update(price));
    
    return {
      upper: bb.getUpperBand().valueOf(),
      middle: bb.getMiddleBand().valueOf(),
      lower: bb.getLowerBand().valueOf()
    };
  }
  
  async getMarketData(symbol: string, indicators: string[] = []) {
    // Fetch latest data
    const ticker = await this.fetchTicker(symbol);
    const ohlcv = await this.fetchOHLCV(symbol, '1h');
    
    // Extract close prices
    const closePrices = ohlcv.map(candle => candle[4]);
    
    const result: any = {
      symbol,
      ticker,
      ohlcv
    };
    
    // Calculate requested indicators
    for (const indicator of indicators) {
      switch (indicator) {
        case 'sma':
          result.sma = {
            sma20: this.calculateSMA(closePrices, 20),
            sma50: this.calculateSMA(closePrices, 50),
            sma200: this.calculateSMA(closePrices, 200)
          };
          break;
        case 'rsi':
          result.rsi = this.calculateRSI(closePrices, 14);
          break;
        case 'macd':
          result.macd = this.calculateMACD(closePrices);
          break;
        case 'bollinger':
          result.bollinger = this.calculateBollingerBands(closePrices);
          break;
      }
    }
    
    return result;
  }
}
