import { TradingService } from '../services/TradingService';
import { Action } from '@bellaos/core';

export const getOrderHistoryAction = (tradingService: TradingService) => {
  return async (params: any): Promise<Action> => {
    const { userId, symbol, since, limit } = params;
    
    try {
      const orders = await tradingService.fetchOrders(
        symbol,
        since,
        limit
      );
      
      return {
        type: 'trading.orderHistoryRetrieved',
        payload: {
          userId,
          symbol,
          orders,
          count: orders.length
        },
      };
    } catch (error) {
      return {
        type: 'trading.orderHistoryRetrievalFailed',
        payload: {
          error: error.message,
          userId,
          symbol
        },
      };
    }
  };
};
