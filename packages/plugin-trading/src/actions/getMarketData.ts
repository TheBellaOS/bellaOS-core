import { MarketDataService } from '../services/MarketDataService';
import { Action } from '@bellaos/core';

export const getMarketDataAction = (marketDataService: MarketDataService) => {
  return async (params: any): Promise<Action> => {
    const { userId, symbol, indicators = [] } = params;
    
    try {
      const marketData = await marketDataService.getMarketData(symbol, indicators);
      
      return {
        type: 'trading.marketDataRetrieved',
        payload: {
          userId,
          symbol,
          indicators,
          data: marketData
        },
      };
    } catch (error) {
      return {
        type: 'trading.marketDataRetrievalFailed',
        payload: {
          error: error.message,
          userId,
          symbol,
          indicators
        },
      };
    }
  };
};
