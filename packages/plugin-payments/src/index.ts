import { Plugin, BellaCore } from '@bellaos/core';
import { StripeService } from './services/StripeService';
import { CustomerModel } from './models/CustomerModel';
import { PaymentModel } from './models/PaymentModel';
import { createCustomerAction } from './actions/createCustomer';
import { createPaymentAction } from './actions/createPayment';
import { processWebhookAction } from './actions/processWebhook';

export interface PaymentPluginConfig {
  stripe: {
    apiKey: string;
    webhookSecret: string;
  };
}

export class PaymentPlugin implements Plugin {
  name = 'payments';
  version = '1.0.0';
  
  private stripeService: StripeService;
  private core: BellaCore;
  
  initialize(core: BellaCore, config: PaymentPluginConfig) {
    this.core = core;
    this.stripeService = new StripeService(config.stripe.apiKey, config.stripe.webhookSecret);
    
    // Register actions
    core.registerAction('payment.createCustomer', createCustomerAction(this.stripeService));
    core.registerAction('payment.createPayment', createPaymentAction(this.stripeService));
    core.registerAction('payment.processWebhook', processWebhookAction(this.stripeService));
    
    // Register event handlers
    core.on('user.created', this.handleUserCreated.bind(this));
    
    console.log('Payment plugin initialized');
  }
  
  async handleUserCreated(event: any) {
    // Automatically create a customer when a user is created
    const { user } = event.payload;
    try {
      const customer = await this.stripeService.createCustomer(user.name, user.email);
      console.log(`Created Stripe customer for user ${user.id}: ${customer.id}`);
    } catch (error) {
      console.error(`Failed to create Stripe customer for user ${user.id}:`, error);
    }
  }
}

export { StripeService } from './services/StripeService';
export { CustomerModel } from './models/CustomerModel';
export { PaymentModel } from './models/PaymentModel';

// Default export
export default PaymentPlugin;
