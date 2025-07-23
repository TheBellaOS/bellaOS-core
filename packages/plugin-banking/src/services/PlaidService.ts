import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

export class PlaidService {
  private client: PlaidApi;
  
  constructor(clientId: string, secret: string, env: string = 'sandbox') {
    const configuration = new Configuration({
      basePath: PlaidEnvironments[env],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': clientId,
          'PLAID-SECRET': secret,
        },
      },
    });
    
    this.client = new PlaidApi(configuration);
  }
  
  async createLinkToken(userId: string, products: string[] = ['auth', 'transactions']) {
    const response = await this.client.linkTokenCreate({
      user: { client_user_id: userId },
      client_name: 'Bella OS',
      products: products as any[],
      country_codes: ['US'],
      language: 'en',
    });
    
    return response.data;
  }
  
  async exchangePublicToken(publicToken: string) {
    const response = await this.client.itemPublicTokenExchange({
      public_token: publicToken,
    });
    
    return response.data;
  }
  
  async getAccounts(accessToken: string) {
    const response = await this.client.accountsGet({
      access_token: accessToken,
    });
    
    return response.data;
  }
  
  async getTransactions(accessToken: string, startDate: string, endDate: string) {
    const response = await this.client.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    });
    
    return response.data;
  }
  
  async getBalance(accessToken: string, accountId: string) {
    const accounts = await this.getAccounts(accessToken);
    const account = accounts.accounts.find(acc => acc.account_id === accountId);
    
    return account ? account.balances : null;
  }
  
  async createProcessorToken(accessToken: string, accountId: string, processor: string) {
    const response = await this.client.processorTokenCreate({
      access_token: accessToken,
      account_id: accountId,
      processor: processor,
    });
    
    return response.data;
  }
  
  async getInstitution(institutionId: string) {
    const response = await this.client.institutionsGetById({
      institution_id: institutionId,
      country_codes: ['US'],
    });
    
    return response.data;
  }
  
  async getItem(accessToken: string) {
    const response = await this.client.itemGet({
      access_token: accessToken,
    });
    
    return response.data;
  }
  
  async invalidateAccessToken(accessToken: string) {
    const response = await this.client.itemAccessTokenInvalidate({
      access_token: accessToken,
    });
    
    return response.data;
  }
  
  async createPaymentInitiation(
    recipientName: string,
    iban: string,
    amount: number,
    currency: string,
    reference: string
  ) {
    // Note: Payment initiation is only available in the UK and Europe
    const recipient = await this.client.paymentInitiationRecipientCreate({
      name: recipientName,
      iban: iban,
    });
    
    const payment = await this.client.paymentInitiationPaymentCreate({
      recipient_id: recipient.data.recipient_id,
      reference: reference,
      amount: {
        value: amount,
        currency: currency,
      },
    });
    
    return payment.data;
  }
}
