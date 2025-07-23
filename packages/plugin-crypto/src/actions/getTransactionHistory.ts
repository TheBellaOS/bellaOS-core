import { EthereumService } from '../services/EthereumService';
import { SolanaService } from '../services/SolanaService';
import { BnbChainService } from '../services/BnbChainService';
import { Action } from '@bellaos/core';

export const getTransactionHistoryAction = (
  ethereumService: EthereumService,
  solanaService: SolanaService,
  bnbChainService: BnbChainService
) => {
  return async (params: any): Promise<Action> => {
    const { userId, network, address, startBlock, endBlock } = params;
    
    try {
      if (network === 'ethereum') {
        const history = await ethereumService.getTransactionHistory(
          address,
          startBlock,
          endBlock
        );
        
        return {
          type: 'crypto.transactionHistoryRetrieved',
          payload: {
            userId,
            network: 'ethereum',
            address,
            history,
            message: history.message
          },
        };
      } else if (network === 'solana') {
        const history = await solanaService.getTransactionHistory(address);
        
        return {
          type: 'crypto.transactionHistoryRetrieved',
          payload: {
            userId,
            network: 'solana',
            address,
            history
          },
        };
      } else if (network === 'bnbChain') {
        const history = await bnbChainService.getTransactionHistory(address);
        
        return {
          type: 'crypto.transactionHistoryRetrieved',
          payload: {
            userId,
            network: 'bnbChain',
            address,
            history,
            message: history.message
          },
        };
      } else {
        throw new Error('Invalid network');
      }
    } catch (error) {
      return {
        type: 'crypto.transactionHistoryRetrievalFailed',
        payload: {
          error: error.message,
          userId,
          network,
          address
        },
      };
    }
  };
};
