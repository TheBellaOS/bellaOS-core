import { Plugin, BellaCore } from '@bellaos/core';
import { TradingService } from './services/TradingService';
import { MarketDataService } from './services/MarketDataService';
import { StrategyService } from './services/StrategyService';
import { OrderModel } from './models/OrderModel';
import { MarketDataModel } from './models/MarketDataModel';
import { createOrderAction } from './actions/createOrder';
import { getMarketDataAction } from './actions/getMarketData';
import { executeStrategyAction } from './actions/executeStrategy';
import { getOrderHistoryAction } from './actions/getOrderHistory';

export interface TradingPluginConfig {
  exchange: {
    name: string;
    apiKey: string;
    secret: string;
  };
  defaultPairs: string[];
  strategies: {
    enabled: string[];
    config: Record<string, any>;
  };
}

export class TradingPlugin implements Plugin {
  name = 'trading';
  version = '1.0.0';
  
  private tradingService: TradingService;
  private marketDataService: MarketDataService;
  private strategyService: StrategyService;
  private core: BellaCore;
  
  initialize(core: BellaCore, config: TradingPluginConfig) {
    this.core = core;
    this.tradingService = new TradingService(
      config.exchange.name,
      config.exchange.apiKey,
      config.exchange.secret
    );
    
    this.marketDataService = new MarketDataService(
      config.exchange.name,
      config.exchange.apiKey,
      config.exchange.secret,
      config.defaultPairs
    );
    
    this.strategyService = new StrategyService(
      this.tradingService,
      this.marketDataService,
      config.strategies.config
    );
    
    // Register actions
    core.registerAction('trading.createOrder', createOrderAction(this.tradingService));
    core.registerAction('trading.getMarketData', getMarketDataAction(this.marketDataService));
    core.registerAction('trading.executeStrategy', executeStrategyAction(this.strategyService));
    core.registerAction('trading.getOrderHistory', getOrderHistoryAction(this.tradingService));
    
    // Initialize strategies
    this.initializeStrategies(config.strategies.enabled);
    
    console.log('Trading plugin initialized');
  }
  
  private initializeStrategies(enabledStrategies: string[]) {
    for (const strategy of enabledStrategies) {
      this.strategyService.initializeStrategy(strategy);
    }
  }
}

export { TradingService } from './services/TradingService';
export { MarketDataService } from './services/MarketDataService';
export { StrategyService } from './services/StrategyService';
export { OrderModel } from './models/OrderModel';
export { MarketDataModel } from './models/MarketDataModel';

// Default export
export default TradingPlugin;
