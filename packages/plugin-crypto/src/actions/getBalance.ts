import { EthereumService } from '../services/EthereumService';
import { SolanaService } from '../services/SolanaService';
import { BnbChainService } from '../services/BnbChainService';
import { Action } from '@bellaos/core';

export const getBalanceAction = (
  ethereumService: EthereumService,
  solanaService: SolanaService,
  bnbChainService: BnbChainService
) => {
  return async (params: any): Promise<Action> => {
    const { userId, network, address, tokenAddress } = params;
    
    try {
      if (network === 'ethereum') {
        if (tokenAddress) {
          const tokenBalance = await ethereumService.getTokenBalance(tokenAddress, address);
          
          return {
            type: 'crypto.tokenBalanceRetrieved',
            payload: {
              userId,
              network: 'ethereum',
              address,
              tokenAddress,
              balance: tokenBalance.balance.toString(),
              formatted: tokenBalance.formatted,
              symbol: tokenBalance.symbol,
              decimals: tokenBalance.decimals
            },
          };
        } else {
          const balance = await ethereumService.getBalance(address);
          
          return {
            type: 'crypto.balanceRetrieved',
            payload: {
              userId,
              network: 'ethereum',
              address,
              balance: balance.toString(),
              formatted: ethers.utils.formatEther(balance)
            },
          };
        }
      } else if (network === 'solana') {
        if (tokenAddress) {
          const tokenBalance = await solanaService.getTokenBalance(tokenAddress, address);
          
          return {
            type: 'crypto.tokenBalanceRetrieved',
            payload: {
              userId,
              network: 'solana',
              address,
              tokenAddress,
              balance: tokenBalance.balance.toString(),
              formatted: tokenBalance.formatted
            },
          };
        } else {
          const balance = await solanaService.getBalance(address);
          
          return {
            type: 'crypto.balanceRetrieved',
            payload: {
              userId,
              network: 'solana',
              address,
              balance: balance.balance.toString(),
              formatted: balance.formatted
            },
          };
        }
      } else if (network === 'bnbChain') {
        if (tokenAddress) {
          const tokenBalance = await bnbChainService.getTokenBalance(tokenAddress, address);
          
          return {
            type: 'crypto.tokenBalanceRetrieved',
            payload: {
              userId,
              network: 'bnbChain',
              address,
              tokenAddress,
              balance: tokenBalance.balance.toString(),
              formatted: tokenBalance.formatted,
              symbol: tokenBalance.symbol,
              decimals: tokenBalance.decimals
            },
          };
        } else {
          const balance = await bnbChainService.getBalance(address);
          
          return {
            type: 'crypto.balanceRetrieved',
            payload: {
              userId,
              network: 'bnbChain',
              address,
              balance: balance.balance.toString(),
              formatted: balance.formatted
            },
          };
        }
      } else {
        throw new Error('Invalid network');
      }
    } catch (error) {
      return {
        type: 'crypto.balanceRetrievalFailed',
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
