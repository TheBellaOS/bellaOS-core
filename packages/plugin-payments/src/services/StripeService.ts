import Stripe from 'stripe';

export interface StripeConfig {
  apiKey: string;
  webhookSecret: string;
}

export class StripeService {
  private stripe: Stripe;
  private webhookSecret: string;
  
  constructor(apiKey: string, webhookSecret: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2023-10-16',
    });
    this.webhookSecret = webhookSecret;
  }
  
  async createCustomer(name: string, email: string, metadata: Record<string, string> = {}) {
    return this.stripe.customers.create({
      name,
      email,
      metadata,
    });
  }
  
  async getCustomer(customerId: string) {
    return this.stripe.customers.retrieve(customerId);
  }
  
  async updateCustomer(customerId: string, data: Stripe.CustomerUpdateParams) {
    return this.stripe.customers.update(customerId, data);
  }
  
  async deleteCustomer(customerId: string) {
    return this.stripe.customers.del(customerId);
  }
  
  async createPaymentIntent(amount: number, currency: string, customerId: string, metadata: Record<string, string> = {}) {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }
  
  async getPaymentIntent(paymentIntentId: string) {
    return this.stripe.paymentIntents.retrieve(paymentIntentId);
  }
  
  async cancelPaymentIntent(paymentIntentId: string) {
    return this.stripe.paymentIntents.cancel(paymentIntentId);
  }
  
  async createSubscription(customerId: string, priceId: string, metadata: Record<string, string> = {}) {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      metadata,
    });
  }
  
  async cancelSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.cancel(subscriptionId);
  }
  
  async createRefund(paymentIntentId: string, amount?: number) {
    return this.stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount,
    });
  }
  
  async constructWebhookEvent(payload: string | Buffer, signature: string) {
    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      this.webhookSecret
    );
  }
  
  async listPaymentMethods(customerId: string, type: string = 'card') {
    return this.stripe.customers.listPaymentMethods(
      customerId,
      { type }
    );
  }
  
  async attachPaymentMethod(paymentMethodId: string, customerId: string) {
    return this.stripe.paymentMethods.attach(
      paymentMethodId,
      { customer: customerId }
    );
  }
  
  async detachPaymentMethod(paymentMethodId: string) {
    return this.stripe.paymentMethods.detach(paymentMethodId);
  }
  
  async createSetupIntent(customerId: string) {
    return this.stripe.setupIntents.create({
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });
  }
  
  async createProduct(name: string, description: string, metadata: Record<string, string> = {}) {
    return this.stripe.products.create({
      name,
      description,
      metadata,
    });
  }
  
  async createPrice(productId: string, unitAmount: number, currency: string, recurring?: Stripe.PriceCreateParams.Recurring) {
    return this.stripe.prices.create({
      product: productId,
      unit_amount: unitAmount,
      currency,
      recurring,
    });
  }
}
