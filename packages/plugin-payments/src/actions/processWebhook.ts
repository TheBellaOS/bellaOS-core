import { StripeService } from '../services/StripeService';
import { Action } from '@bellaos/core';

export const processWebhookAction = (stripeService: StripeService) => {
  return async (params: any): Promise<Action> => {
    const { payload, signature } = params;
    
    try {
      const event = await stripeService.constructWebhookEvent(payload, signature);
      
      // Handle different event types
      switch (event.type) {
        case 'payment_intent.succeeded':
          return {
            type: 'payment.succeeded',
            payload: {
              paymentIntentId: event.data.object.id,
              amount: event.data.object.amount,
              currency: event.data.object.currency,
              customerId: event.data.object.customer,
              metadata: event.data.object.metadata
            },
          };
          
        case 'payment_intent.payment_failed':
          return {
            type: 'payment.failed',
            payload: {
              paymentIntentId: event.data.object.id,
              error: event.data.object.last_payment_error,
              customerId: event.data.object.customer
            },
          };
          
        case 'customer.subscription.created':
          return {
            type: 'subscription.created',
            payload: {
              subscriptionId: event.data.object.id,
              customerId: event.data.object.customer,
              status: event.data.object.status,
              metadata: event.data.object.metadata
            },
          };
          
        case 'customer.subscription.updated':
          return {
            type: 'subscription.updated',
            payload: {
              subscriptionId: event.data.object.id,
              customerId: event.data.object.customer,
              status: event.data.object.status,
              metadata: event.data.object.metadata
            },
          };
          
        case 'customer.subscription.deleted':
          return {
            type: 'subscription.cancelled',
            payload: {
              subscriptionId: event.data.object.id,
              customerId: event.data.object.customer
            },
          };
          
        default:
          return {
            type: 'payment.webhookReceived',
            payload: {
              eventType: event.type,
              eventId: event.id
            },
          };
      }
    } catch (error) {
      return {
        type: 'payment.webhookFailed',
        payload: {
          error: error.message
        },
      };
    }
  };
};
