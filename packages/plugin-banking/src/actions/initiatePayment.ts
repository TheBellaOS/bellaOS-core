import { PlaidService } from '../services/PlaidService';
import { OpenBankingService } from '../services/OpenBankingService';
import { Action } from '@bellaos/core';

export const initiatePaymentAction = (
  plaidService: PlaidService,
  openBankingService: OpenBankingService
) => {
  return async (params: any): Promise<Action> => {
    const { 
      userId, 
      provider, 
      accessToken, 
      accountId,
      recipient,
      amount,
      currency,
      reference
    } = params;
    
    try {
      if (provider === 'openBanking') {
        // Initiate payment through Open Banking
        const paymentResponse = await openBankingService.initiatePayment(
          accessToken,
          accountId,
          recipient,
          amount,
          currency,
          reference
        );
        
        return {
          type: 'banking.paymentInitiated',
          payload: {
            provider: 'openBanking',
            userId,
            accountId,
            paymentId: paymentResponse.Data.PaymentId,
            status: paymentResponse.Data.Status,
            amount,
            currency,
            reference,
          },
        };
      } else {
        throw new Error('Payment initiation is only supported for Open Banking');
      }
    } catch (error) {
      return {
        type: 'banking.paymentInitiationFailed',
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
