import { PlaidService } from '../services/PlaidService';
import { OpenBankingService } from '../services/OpenBankingService';
import { Action } from '@bellaos/core';

export const getTransactionsAction = (
  plaidService: PlaidService,
  openBankingService: OpenBankingService
) => {
  return async (params: any): Promise<Action> => {
    const { userId, provider, accessToken, accountId, startDate, endDate } = params;
    
    try {
      if (provider === 'plaid') {
        // Get transactions from Plaid
        const transactionsResponse = await plaidService.getTransactions(
          accessToken,
          startDate,
          endDate
        );
        
        // Filter by account if specified
        const transactions = accountId
          ? transactionsResponse.transactions.filter(tx => tx.account_id === accountId)
          : transactionsResponse.transactions;
        
        return {
          type: 'banking.transactionsRetrieved',
          payload: {
            provider: 'plaid',
            userId,
            accountId,
            transactions,
            total: transactions.length,
          },
        };
      } else if (provider === 'openBanking') {
        // Get transactions from Open Banking
        if (!accountId) {
          throw new Error('Account ID is required for Open Banking transactions');
        }
        
        const transactionsResponse = await openBankingService.getTransactions(
          accessToken,
          accountId,
          startDate,
          endDate
        );
        
        return {
          type: 'banking.transactionsRetrieved',
          payload: {
            provider: 'openBanking',
            userId,
            accountId,
            transactions: transactionsResponse.Data.Transaction,
            total: transactionsResponse.Data.Transaction.length,
          },
        };
      } else {
        throw new Error('Invalid provider');
      }
    } catch (error) {
      return {
        type: 'banking.transactionsRetrievalFailed',
        payload: {
          error: error.message,
          userId,
          provider,
          accountId,
        },
      };
    }
  };
};
