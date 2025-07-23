import axios from 'axios';

export class OpenBankingService {
  private clientId: string;
  private secret: string;
  private redirectUri: string;
  private tokenEndpoint: string = 'https://auth.openbanking.org/token';
  private apiEndpoint: string = 'https://api.openbanking.org';
  
  constructor(clientId: string, secret: string, redirectUri: string) {
    this.clientId = clientId;
    this.secret = secret;
    this.redirectUri = redirectUri;
  }
  
  async getAuthorizationUrl(state: string, scope: string = 'accounts payments') {
    const authUrl = 'https://auth.openbanking.org/authorize';
    const url = new URL(authUrl);
    
    url.searchParams.append('client_id', this.clientId);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('scope', scope);
    url.searchParams.append('redirect_uri', this.redirectUri);
    url.searchParams.append('state', state);
    
    return url.toString();
  }
  
  async exchangeCodeForToken(code: string) {
    const response = await axios.post(
      this.tokenEndpoint,
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.secret,
        redirect_uri: this.redirectUri,
        code: code,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
    return response.data;
  }
  
  async refreshToken(refreshToken: string) {
    const response = await axios.post(
      this.tokenEndpoint,
      new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: this.clientId,
        client_secret: this.secret,
        refresh_token: refreshToken,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    
    return response.data;
  }
  
  async getAccounts(accessToken: string) {
    const response = await axios.get(
      `${this.apiEndpoint}/accounts`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    
    return response.data;
  }
  
  async getAccount(accessToken: string, accountId: string) {
    const response = await axios.get(
      `${this.apiEndpoint}/accounts/${accountId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    
    return response.data;
  }
  
  async getTransactions(accessToken: string, accountId: string, fromDate: string, toDate: string) {
    const response = await axios.get(
      `${this.apiEndpoint}/accounts/${accountId}/transactions`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        params: {
          fromBookingDateTime: fromDate,
          toBookingDateTime: toDate,
        },
      }
    );
    
    return response.data;
  }
  
  async getBalance(accessToken: string, accountId: string) {
    const response = await axios.get(
      `${this.apiEndpoint}/accounts/${accountId}/balances`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    
    return response.data;
  }
  
  async initiatePayment(
    accessToken: string,
    debtorAccountId: string,
    creditorAccount: {
      name: string;
      sortCode: string;
      accountNumber: string;
    },
    amount: number,
    currency: string,
    reference: string
  ) {
    const response = await axios.post(
      `${this.apiEndpoint}/payments`,
      {
        Data: {
          Initiation: {
            InstructionIdentification: `PAYMENT-${Date.now()}`,
            EndToEndIdentification: `E2E-${Date.now()}`,
            InstructedAmount: {
              Amount: amount.toString(),
              Currency: currency,
            },
            DebtorAccount: {
              AccountId: debtorAccountId,
            },
            CreditorAccount: {
              SchemeName: 'UK.OBIE.SortCodeAccountNumber',
              Identification: creditorAccount.accountNumber,
              Name: creditorAccount.name,
              SecondaryIdentification: creditorAccount.sortCode,
            },
            RemittanceInformation: {
              Reference: reference,
            },
          },
        },
        Risk: {},
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  }
  
  async getPaymentStatus(accessToken: string, paymentId: string) {
    const response = await axios.get(
      `${this.apiEndpoint}/payments/${paymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );
    
    return response.data;
  }
}
