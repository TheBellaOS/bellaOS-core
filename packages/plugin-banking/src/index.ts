import { Plugin, BellaCore } from '@bellaos/core';
import { PlaidService } from './services/PlaidService';
import { OpenBankingService } from './services/OpenBankingService';
import { AccountModel } from './models/AccountModel';
import { TransactionModel } from './models/TransactionModel';
import { linkAccountAction } from './actions/linkAccount';
import { getAccountsAction } from './actions/getAccounts';
import { getTransactionsAction } from './actions/getTransactions';
import { initiatePaymentAction } from './actions/initiatePayment';

export interface BankingPluginConfig {
  plaid: {
    clientId: string;
    secret: string;
    environment: string;
  };
  openBanking: {
    clientId: string;
    secret: string;
    redirectUri: string;
  };
}

export class BankingPlugin implements Plugin {
  name = 'banking';
  version = '1.0.0';
  
  private plaidService: PlaidService;
  private openBankingService: OpenBankingService;
  private core: BellaCore;
  
  initialize(core: BellaCore, config: BankingPluginConfig) {
    this.core = core;
    this.plaidService = new PlaidService(
      config.plaid.clientId,
      config.plaid.secret,
      config.plaid.environment
    );
    
    this.openBankingService = new OpenBankingService(
      config.openBanking.clientId,
      config.openBanking.secret,
      config.openBanking.redirectUri
    );
    
    // Register actions
    core.registerAction('banking.linkAccount', linkAccountAction(this.plaidService, this.openBankingService));
    core.registerAction('banking.getAccounts', getAccountsAction(this.plaidService, this.openBankingService));
    core.registerAction('banking.getTransactions', getTransactionsAction(this.plaidService, this.openBankingService));
    core.registerAction('banking.initiatePayment', initiatePaymentAction(this.plaidService, this.openBankingService));
    
    console.log('Banking plugin initialized');
  }
}

export { PlaidService } from './services/PlaidService';
export { OpenBankingService } from './services/OpenBankingService';
export { AccountModel } from './models/AccountModel';
export { TransactionModel } from './models/TransactionModel';

// Default export
export default BankingPlugin;
