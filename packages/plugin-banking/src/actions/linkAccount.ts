import { PlaidService } from '../services/PlaidService';
import { OpenBankingService } from '../services/OpenBankingService';
import { Action } from '@bellaos/core';

export const linkAccountAction = (
  plaidService: PlaidService,
  openBankingService: OpenBankingService
) => {
  return async (params: any): Promise<Action> => {
    const { userId, provider, publicToken, code, state } = params;
    
    try {
      if (provider === 'plaid' && publicToken) {
        // Handle Plaid account linking
        const exchangeResponse = await plaidService.exchangePublicToken(publicToken);
        const accessToken = exchangeResponse.access_token;
        const itemId = exchangeResponse.item_id;
        
        // Get account details
        const accountsResponse = await plaidService.getAccounts(accessToken);
        
        return {
          type: 'banking.accountLinked',
          payload: {
            provider: 'plaid',
            userId,
            accessToken,
            itemId,
            accounts: accountsResponse.accounts,
            institution: accountsResponse.item.institution_id,
          },
        };
      } else if (provider === 'openBanking' && code && state) {
        // Handle Open Banking account linking
        const tokenResponse = await openBankingService.exchangeCodeForToken(code);
        const accessToken = tokenResponse.access_token;
        const refreshToken = tokenResponse.refresh_token;
        
        // Get account details
        const accountsResponse = await openBankingService.getAccounts(accessToken);
        
        return {
          type: 'banking.accountLinked',
          payload: {
            provider: 'openBanking',
            userId,
            accessToken,
            refreshToken,
            accounts: accountsResponse.Data.Account,
            state,
          },
        };
      } else {
        throw new Error('Invalid provider or missing required parameters');
      }
    } catch (error) {
      return {
        type: 'banking.accountLinkFailed',
        payload: {
          error: error.message,
          userId,
          provider,
        },
      };
    }
  };
};
