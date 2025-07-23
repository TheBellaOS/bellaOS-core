import { TradingService } from '../services/TradingService';
import { Action } from '@bellaos/core';

export const createOrderAction = (tradingService: TradingService) => {
  return async (params: any): Promise<Action> => {
    const { userId, symbol, type, side, amount, price } = params;
    
    try {
      const order = await tradingService.createOrder(
        symbol,
        type,
        side,
        amount,
        price
      );
      
      return {
        type: 'trading.orderCreated',
        payload: {
          userId,
          orderId: order.id,
          symbol,
          type,
          side,
          amount,
          price,
          status: order.status,
          timestamp: order.timestamp
        },
      };
    } catch (error) {
      return {
        type: 'trading.orderCreationFailed',
        payload: {
          error: error.message,
          userId,
          symbol,
          type,
          side,
          amount,
          price
        },
      };
    }
  };
};
