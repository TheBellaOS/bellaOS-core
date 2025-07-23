import { PlaidService } from '../services/PlaidService';
import { OpenBankingService } from '../services/OpenBankingService';
import { Action } from '@bellaos/core';

export const getAccountsAction = (
  plaidService: PlaidService,
  openBankingService: OpenBankingService
) => {
  return async (params: any): Promise<Action> => {
    const { userId, provider, accessToken, accountId } = params;
    
    try {
      if (provider === 'plaid') {
        // Get accounts from Plaid
        if (accountId) {
          // Get specific account
          const accountsResponse = await plaidService.getAccounts(accessToken);
          const account = accountsResponse.accounts.find(acc => acc.account_id === accountId);
          
          if (!account) {
            throw new Error('Account not found');
          }
          
          return {
            type: 'banking.accountRetrieved',
            payload: {
              provider: 'plaid',
              userId,
              account,
            },
          };
        } else {
          // Get all accounts
          const accountsResponse = await plaidService.getAccounts(accessToken);
          
          return {
            type: 'banking.accountsRetrieved',
            payload: {
              provider: 'plaid',
              userId,
              accounts: accountsResponse.accounts,
            },
          };
        }
      } else if (provider === 'openBanking') {
        // Get accounts from Open Banking
        if (accountId) {
          // Get specific account
          const accountResponse = await openBankingService.getAccount(accessToken, accountId);
          
          return {
            type: 'banking.accountRetrieved',
            payload: {
              provider: 'openBanking',
              userId,
              account: accountResponse.Data.Account[0],
            },
          };
        } else {
          // Get all accounts
          const accountsResponse = await openBankingService.getAccounts(accessToken);
          
          return {
            type: 'banking.accountsRetrieved',
            payload: {
              provider: 'openBanking',
              userId,
              accounts: accountsResponse.Data.Account,
            },
          };
        }
      } else {
        throw new Error('Invalid provider');
      }
    } catch (error) {
      return {
        type: 'banking.accountRetrievalFailed',
        payload: {
          error: error.message,
          userId,
          provider,
        },
      };
    }
  };
};
