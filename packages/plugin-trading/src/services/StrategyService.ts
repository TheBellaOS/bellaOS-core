export class StrategyService {
  private tradingService: any;
  private marketDataService: any;
  private strategies: Map<string, any> = new Map();
  private config: Record<string, any>;
  
  constructor(tradingService: any, marketDataService: any, config: Record<string, any>) {
    this.tradingService = tradingService;
    this.marketDataService = marketDataService;
    this.config = config;
  }
  
  initializeStrategy(strategyName: string) {
    switch (strategyName) {
      case 'sma_crossover':
        this.strategies.set(strategyName, this.smaCrossoverStrategy.bind(this));
        break;
      case 'rsi_oversold':
        this.strategies.set(strategyName, this.rsiOversoldStrategy.bind(this));
        break;
      case 'macd_signal':
        this.strategies.set(strategyName, this.macdSignalStrategy.bind(this));
        break;
      case 'bollinger_bounce':
        this.strategies.set(strategyName, this.bollingerBounceStrategy.bind(this));
        break;
      default:
        throw new Error(`Unknown strategy: ${strategyName}`);
    }
    
    console.log(`Strategy ${strategyName} initialized`);
  }
  
  async executeStrategy(strategyName: string, symbol: string, params: any = {}) {
    if (!this.strategies.has(strategyName)) {
      throw new Error(`Strategy ${strategyName} not initialized`);
    }
    
    const strategy = this.strategies.get(strategyName);
    return strategy(symbol, params);
  }
  
  async smaCrossoverStrategy(symbol: string, params: any = {}) {
    const { shortPeriod = 20, longPeriod = 50 } = params;
    
    // Get market data with SMA indicator
    const marketData = await this.marketDataService.getMarketData(symbol, ['sma']);
    
    // Extract close prices
    const closePrices = marketData.ohlcv.map(candle => candle[4]);
    
    // Calculate SMAs
    const shortSMA = this.marketDataService.calculateSMA(closePrices, shortPeriod);
    const longSMA = this.marketDataService.calculateSMA(closePrices, longPeriod);
    
    // Previous values (one period back)
    const prevClosePrices = closePrices.slice(0, -1);
    const prevShortSMA = this.marketDataService.calculateSMA(prevClosePrices, shortPeriod);
    const prevLongSMA = this.marketDataService.calculateSMA(prevClosePrices, longPeriod);
    
    // Check for crossover
    const currentCrossover = shortSMA > longSMA;
    const previousCrossover = prevShortSMA > prevLongSMA;
    
    let signal = 'hold';
    
    if (currentCrossover && !previousCrossover) {
      signal = 'buy';
    } else if (!currentCrossover && previousCrossover) {
      signal = 'sell';
    }
    
    return {
      strategy: 'sma_crossover',
      symbol,
      signal,
      data: {
        shortSMA,
        longSMA,
        prevShortSMA,
        prevLongSMA,
        currentPrice: closePrices[closePrices.length - 1]
      }
    };
  }
  
  async rsiOversoldStrategy(symbol: string, params: any = {}) {
    const { period = 14, oversoldThreshold = 30, overboughtThreshold = 70 } = params;
    
    // Get market data with RSI indicator
    const marketData = await this.marketDataService.getMarketData(symbol, ['rsi']);
    
    // Extract close prices
    const closePrices = marketData.ohlcv.map(candle => candle[4]);
    
    // Calculate RSI
    const rsi = this.marketDataService.calculateRSI(closePrices, period);
    
    let signal = 'hold';
    
    if (rsi < oversoldThreshold) {
      signal = 'buy';
    } else if (rsi > overboughtThreshold) {
      signal = 'sell';
    }
    
    return {
      strategy: 'rsi_oversold',
      symbol,
      signal,
      data: {
        rsi,
        oversoldThreshold,
        overboughtThreshold,
        currentPrice: closePrices[closePrices.length - 1]
      }
    };
  }
  
  async macdSignalStrategy(symbol: string, params: any = {}) {
    const { fastPeriod = 12, slowPeriod = 26, signalPeriod = 9 } = params;
    
    // Get market data with MACD indicator
    const marketData = await this.marketDataService.getMarketData(symbol, ['macd']);
    
    // Extract close prices
    const closePrices = marketData.ohlcv.map(candle => candle[4]);
    
    // Calculate MACD
    const macd = this.marketDataService.calculateMACD(
      closePrices,
      fastPeriod,
      slowPeriod,
      signalPeriod
    );
    
    // Previous values (one period back)
    const prevClosePrices = closePrices.slice(0, -1);
    const prevMacd = this.marketDataService.calculateMACD(
      prevClosePrices,
      fastPeriod,
      slowPeriod,
      signalPeriod
    );
    
    // Check for crossover
    const currentCrossover = macd.macd > macd.signal;
    const previousCrossover = prevMacd.macd > prevMacd.signal;
    
    let signal = 'hold';
    
    if (currentCrossover && !previousCrossover) {
      signal = 'buy';
    } else if (!currentCrossover && previousCrossover) {
      signal = 'sell';
    }
    
    return {
      strategy: 'macd_signal',
      symbol,
      signal,
      data: {
        macd: macd.macd,
        signal: macd.signal,
        histogram: macd.histogram,
        currentPrice: closePrices[closePrices.length - 1]
      }
    };
  }
  
  async bollingerBounceStrategy(symbol: string, params: any = {}) {
    const { period = 20, stdDev = 2 } = params;
    
    // Get market data with Bollinger Bands indicator
    const marketData = await this.marketDataService.getMarketData(symbol, ['bollinger']);
    
    // Extract close prices
    const closePrices = marketData.ohlcv.map(candle => candle[4]);
    const currentPrice = closePrices[closePrices.length - 1];
    
    // Calculate Bollinger Bands
    const bollinger = this.marketDataService.calculateBollingerBands(closePrices, period, stdDev);
    
    let signal = 'hold';
    
    if (currentPrice < bollinger.lower) {
      signal = 'buy';
    } else if (currentPrice > bollinger.upper) {
      signal = 'sell';
    }
    
    return {
      strategy: 'bollinger_bounce',
      symbol,
      signal,
      data: {
        upper: bollinger.upper,
        middle: bollinger.middle,
        lower: bollinger.lower,
        currentPrice
      }
    };
  }
}
