import { StrategyService } from '../services/StrategyService';
import { Action } from '@bellaos/core';

export const executeStrategyAction = (strategyService: StrategyService) => {
  return async (params: any): Promise<Action> => {
    const { userId, strategy, symbol, parameters } = params;
    
    try {
      const result = await strategyService.executeStrategy(
        strategy,
        symbol,
        parameters
      );
      
      return {
        type: 'trading.strategyExecuted',
        payload: {
          userId,
          strategy,
          symbol,
          signal: result.signal,
          data: result.data
        },
      };
    } catch (error) {
      return {
        type: 'trading.strategyExecutionFailed',
        payload: {
          error: error.message,
          userId,
          strategy,
          symbol
        },
      };
    }
  };
};
