import { EthereumService } from '../services/EthereumService';
import { SolanaService } from '../services/SolanaService';
import { BnbChainService } from '../services/BnbChainService';
import { Action } from '@bellaos/core';

export const createWalletAction = (
  ethereumService: EthereumService,
  solanaService: SolanaService,
  bnbChainService: BnbChainService
) => {
  return async (params: any): Promise<Action> => {
    const { userId, network, useMnemonic = true } = params;
    
    try {
      if (network === 'ethereum') {
        let wallet;
        let mnemonic;
        
        if (useMnemonic) {
          mnemonic = await ethereumService.generateMnemonic();
          wallet = await ethereumService.createWalletFromMnemonic(mnemonic);
        } else {
          wallet = await ethereumService.createRandomWallet();
        }
        
        return {
          type: 'crypto.walletCreated',
          payload: {
            userId,
            network: 'ethereum',
            address: wallet.address || wallet.publicKey,
            privateKey: wallet.privateKey,
            mnemonic,
          },
        };
      } else if (network === 'solana') {
        let wallet;
        let mnemonic;
        
        if (useMnemonic) {
          mnemonic = await solanaService.generateMnemonic();
          wallet = await solanaService.createWalletFromMnemonic(mnemonic);
        } else {
          wallet = await solanaService.createRandomWallet();
        }
        
        return {
          type: 'crypto.walletCreated',
          payload: {
            userId,
            network: 'solana',
            address: wallet.publicKey,
            privateKey: wallet.secretKey,
            mnemonic,
          },
        };
      } else if (network === 'bnbChain') {
        const wallet = await bnbChainService.createRandomWallet();
        
        return {
          type: 'crypto.walletCreated',
          payload: {
            userId,
            network: 'bnbChain',
            address: wallet.address,
            privateKey: wallet.privateKey,
          },
        };
      } else {
        throw new Error('Invalid network');
      }
    } catch (error) {
      return {
        type: 'crypto.walletCreationFailed',
        payload: {
          error: error.message,
          userId,
          network,
        },
      };
    }
  };
};
