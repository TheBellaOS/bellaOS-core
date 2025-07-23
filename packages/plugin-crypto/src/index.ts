import { Plugin, BellaCore } from '@bellaos/core';
import { EthereumService } from './services/EthereumService';
import { SolanaService } from './services/SolanaService';
import { BnbChainService } from './services/BnbChainService';
import { WalletModel } from './models/WalletModel';
import { TransactionModel } from './models/TransactionModel';
import { createWalletAction } from './actions/createWallet';
import { getBalanceAction } from './actions/getBalance';
import { sendTransactionAction } from './actions/sendTransaction';
import { getTransactionHistoryAction } from './actions/getTransactionHistory';

export interface CryptoPluginConfig {
  ethereum: {
    rpcUrl: string;
    chainId: number;
  };
  solana: {
    rpcUrl: string;
    network: string;
  };
  bnbChain: {
    rpcUrl: string;
    chainId: number;
  };
  defaultNetwork: 'ethereum' | 'solana' | 'bnbChain';
}

export class CryptoPlugin implements Plugin {
  name = 'crypto';
  version = '1.0.0';
  
  private ethereumService: EthereumService;
  private solanaService: SolanaService;
  private bnbChainService: BnbChainService;
  private core: BellaCore;
  
  initialize(core: BellaCore, config: CryptoPluginConfig) {
    this.core = core;
    this.ethereumService = new EthereumService(
      config.ethereum.rpcUrl,
      config.ethereum.chainId
    );
    
    this.solanaService = new SolanaService(
      config.solana.rpcUrl,
      config.solana.network
    );
    
    this.bnbChainService = new BnbChainService(
      config.bnbChain.rpcUrl,
      config.bnbChain.chainId
    );
    
    // Register actions
    core.registerAction('crypto.createWallet', createWalletAction(
      this.ethereumService, 
      this.solanaService, 
      this.bnbChainService
    ));
    
    core.registerAction('crypto.getBalance', getBalanceAction(
      this.ethereumService, 
      this.solanaService, 
      this.bnbChainService
    ));
    
    core.registerAction('crypto.sendTransaction', sendTransactionAction(
      this.ethereumService, 
      this.solanaService, 
      this.bnbChainService
    ));
    
    core.registerAction('crypto.getTransactionHistory', getTransactionHistoryAction(
      this.ethereumService, 
      this.solanaService, 
      this.bnbChainService
    ));
    
    console.log('Crypto plugin initialized');
  }
}

export { EthereumService } from './services/EthereumService';
export { SolanaService } from './services/SolanaService';
export { BnbChainService } from './services/BnbChainService';
export { WalletModel } from './models/WalletModel';
export { TransactionModel } from './models/TransactionModel';

// Default export
export default CryptoPlugin;
