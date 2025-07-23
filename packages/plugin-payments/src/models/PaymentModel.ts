export interface PaymentModel {
  id: string;
  stripePaymentIntentId: string;
  customerId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, string>;
}
