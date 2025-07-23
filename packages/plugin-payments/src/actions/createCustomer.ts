import { StripeService } from '../services/StripeService';
import { Action } from '@bellaos/core';

export const createCustomerAction = (stripeService: StripeService) => {
  return async (params: any): Promise<Action> => {
    const { name, email, metadata } = params;
    
    try {
      const customer = await stripeService.createCustomer(name, email, metadata);
      
      return {
        type: 'payment.customerCreated',
        payload: {
          customerId: customer.id,
          name,
          email,
          metadata
        },
      };
    } catch (error) {
      return {
        type: 'payment.customerCreationFailed',
        payload: {
          error: error.message,
          name,
          email
        },
      };
    }
  };
};
