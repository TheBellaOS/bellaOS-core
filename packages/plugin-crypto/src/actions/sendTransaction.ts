import { EthereumService } from '../services/EthereumService';
import { SolanaService } from '../services/SolanaService';
import { BnbChainService } from '../services/BnbChainService';
import { Action } from '@bellaos/core';

export const sendTransactionAction = (
  ethereumService: EthereumService,
  solanaService: SolanaService,
  bnbChainService: BnbChainService
) => {
  return async (params: any): Promise<Action> => {
    const { 
      userId, 
      network, 
      privateKey, 
      to, 
      amount, 
      tokenAddress,
      tokenDecimals,
      gasPrice 
    } = params;
    
    try {
      if (network === 'ethereum') {
        if (tokenAddress && tokenDecimals) {
          // Send token transaction
          const tx = await ethereumService.sendTokenTransaction(
            privateKey,
            tokenAddress,
            to,
            amount,
            tokenDecimals,
            gasPrice
          );
          
          return {
            type: 'crypto.tokenTransactionSent',
            payload: {
              userId,
              network: 'ethereum',
              hash: tx.hash,
              from: tx.from,
              to,
              tokenAddress,
              amount,
              gasPrice: tx.gasPrice?.toString(),
              gasUsed: tx.gasUsed?.toString()
            },
          };
        } else {
          // Send ETH transaction
          const tx = await ethereumService.sendTransaction(
            privateKey,
            to,
            amount,
            gasPrice
          );
          
          return {
            type: 'crypto.transactionSent',
            payload: {
              userId,
              network: 'ethereum',
              hash: tx.hash,
              from: tx.from,
              to,
              amount,
              gasPrice: tx.gasPrice?.toString(),
              gasUsed: tx.gasUsed?.toString()
            },
          };
        }
      } else if (network === 'solana') {
        // Send SOL transaction
        const tx = await solanaService.sendTransaction(
          privateKey,
          to,
          parseFloat(amount)
        );
        
        return {
          type: 'crypto.transactionSent',
          payload: {
            userId,
            network: 'solana',
            signature: tx.signature,
            from: tx.from,
            to,
            amount
          },
        };
      } else if (network === 'bnbChain') {
        if (tokenAddress && tokenDecimals) {
          // Send token transaction
          const tx = await bnbChainService.sendTokenTransaction(
            privateKey,
            tokenAddress,
            to,
            amount,
            tokenDecimals,
            gasPrice
          );
          
          return {
            type: 'crypto.tokenTransactionSent',
            payload: {
              userId,
              network: 'bnbChain',
              hash: tx.transactionHash,
              from: tx.from,
              to,
              tokenAddress,
              amount,
              gasPrice: tx.gasPrice?.toString(),
              gasUsed: tx.gasUsed?.toString()
            },
          };
        } else {
          // Send BNB transaction
          const tx = await bnbChainService.sendTransaction(
            privateKey,
            to,
            amount,
            gasPrice
          );
          
          return {
            type: 'crypto.transactionSent',
            payload: {
              userId,
              network: 'bnbChain',
              hash: tx.transactionHash,
              from: tx.from,
              to,
              amount,
              gasPrice: tx.gasPrice?.toString(),
              gasUsed: tx.gasUsed?.toString()
            },
          };
        }
      } else {
        throw new Error('Invalid network');
      }
    } catch (error) {
      return {
        type: 'crypto.transactionFailed',
        payload: {
          error: error.message,
          userId,
          network,
          to,
          amount
        },
      };
    }
  };
};
