import { StripeService } from '../services/StripeService';
import { Action } from '@bellaos/core';

export const createPaymentAction = (stripeService: StripeService) => {
  return async (params: any): Promise<Action> => {
    const { amount, currency, customerId, metadata } = params;
    
    try {
      const paymentIntent = await stripeService.createPaymentIntent(
        amount,
        currency,
        customerId,
        metadata
      );
      
      return {
        type: 'payment.paymentCreated',
        payload: {
          paymentIntentId: paymentIntent.id,
          clientSecret: paymentIntent.client_secret,
          amount,
          currency,
          customerId,
          status: paymentIntent.status,
          metadata
        },
      };
    } catch (error) {
      return {
        type: 'payment.paymentCreationFailed',
        payload: {
          error: error.message,
          amount,
          currency,
          customerId
        },
      };
    }
  };
};
