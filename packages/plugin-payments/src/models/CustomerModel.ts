export interface CustomerModel {
  id: string;
  stripeCustomerId: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, string>;
}
