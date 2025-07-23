# BellaOS 🤖

<div align="center">
  <img src="./docs/static/img/bella_banner.jpg" alt="BellaOS Banner" width="100%" />
</div>

<div align="center">
  <a href="https://x.com/BellaOS_sol">
    <img src="https://img.shields.io/badge/Follow-@BellaOS__sol-1DA1F2?style=for-the-badge&logo=x&logoColor=white" alt="Follow on X" />
  </a>
</div>

## 🚩 Overview

BellaOS represents a significant advancement in AI agent operating systems, specifically designed to bridge the gap between artificial intelligence and financial systems. As a comprehensive platform, BellaOS enables developers to build, deploy, and manage AI agents with native financial capabilities.

The core innovation of BellaOS lies in its seamless integration of payment processing, banking connections, cryptocurrency operations, and trading functionality within a modular AI agent framework. By providing these capabilities as ready-to-use components, BellaOS dramatically reduces development time and complexity for financial AI applications.

## ✨ Key Features

- **Modular Plugin Architecture**: Extensible design that allows developers to add new capabilities while maintaining compatibility
- **Comprehensive Stripe Integration**: Complete payment processing capabilities for global transactions
- **Banking Connections**: Seamless integration with banking systems via Plaid and Open Banking APIs
- **Multi-Blockchain Support**: Native support for Ethereum, Solana, and BNB Chain
- **Cryptocurrency Wallet Management**: Create, manage, and secure crypto wallets directly through AI agents
- **Trading Capabilities**: Build sophisticated trading systems with real-time market data
- **Enterprise-Grade Security**: Financial-grade encryption and compliance features built into the core platform

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/bellaos/bella.git

# Navigate to the project directory
cd bella

# Install dependencies
pnpm install

# Configure your environment
cp .env.example .env

# Start BellaOS
pnpm start
```

### Automatically Start BellaOS
The start script provides an automated way to set up and run BellaOS:
```bash
sh scripts/start.sh
```
For detailed instructions on using the start script, including character management and troubleshooting, see our [Start Script Guide](./docs/docs/guides/start-script.md).
> **Note**: The start script handles all dependencies, environment setup, and character management automatically.

### Modify Character
1. Open `agent/src/defaultCharacter.ts` to modify the default character. Uncomment and edit.
2. To load custom characters:
    - Use `pnpm start --characters="path/to/your/character.json"`
    - Multiple character files can be loaded simultaneously
3. Connect with X (Twitter)
    - change `"clients": []` to `"clients": ["twitter"]` in the character file to connect with X

### Add more plugins
1. run `npx bellaos plugins list` to get a list of available plugins
2. run `npx bellaos plugins add @bellaos-plugins/plugin-NAME` to install the plugin into your instance

#### Additional Requirements
You may need to install Sharp. If you see an error when starting up, try installing it with the following command:
```
pnpm install --include=optional sharp
```

## 🔍 The Financial Integration Challenge

Building AI agents with financial capabilities has traditionally required developers to:

1. Create custom integrations with payment processors
2. Implement complex security protocols for handling sensitive financial data
3. Navigate the regulatory requirements of different financial systems
4. Develop specialized knowledge across both AI and financial domains
5. Maintain connections to rapidly evolving cryptocurrency ecosystems

This approach is resource-intensive, creates significant security risks, and results in fragmented solutions that are difficult to maintain and scale. The complexity of these challenges has limited the adoption of AI in financial applications, despite the clear potential for innovation in this space.

## 🛠️ Technical Architecture

BellaOS is built on a modular, event-driven architecture designed for flexibility, security, and performance:

### Agent Runtime Environment
- Isolated execution environments for security and stability
- Persistent state management across sessions
- Dynamic resource allocation based on agent needs
- Comprehensive monitoring and logging

```typescript
// Example: Creating an agent with financial capabilities
import { AgentRuntime } from '@bellaos/core';
import { PaymentPlugin } from '@bellaos/plugin-payments';
import { BankingPlugin } from '@bellaos/plugin-banking';
import { CryptoPlugin } from '@bellaos/plugin-crypto';

// Initialize the agent runtime
const runtime = new AgentRuntime({
  agentId: 'financial-assistant',
  model: 'gpt-4',
  memory: {
    shortTerm: true,
    longTerm: true,
    vectorStore: 'pinecone'
  },
  security: {
    encryptionLevel: 'financial',
    auditLogging: true
  }
});

// Register financial plugins
runtime.registerPlugin(new PaymentPlugin({
  provider: 'stripe',
  apiKey: process.env.STRIPE_API_KEY
}));

runtime.registerPlugin(new BankingPlugin({
  provider: 'plaid',
  clientId: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET
}));

runtime.registerPlugin(new CryptoPlugin({
  networks: ['ethereum', 'solana', 'bnb-chain'],
  walletProvider: 'secure-enclave'
}));

// Start the agent
await runtime.start();
```

### Communication Bus
- Event-driven architecture for scalable, decoupled components
- Standardized protocols for consistent communication
- Priority queuing for time-sensitive financial operations
- Reliable message delivery with transaction semantics

```typescript
// Example: Setting up event handlers for financial operations
import { CommunicationBus } from '@bellaos/core';

const bus = new CommunicationBus();

// Handle payment events with high priority
bus.subscribe('payment.initiated', async (event) => {
  const { amount, currency, customerId } = event.data;
  
  // Process payment with transaction semantics
  const result = await bus.executeTransaction(async () => {
    const paymentIntent = await stripeService.createPaymentIntent({
      amount,
      currency,
      customer: customerId
    });
    
    await auditService.logFinancialEvent({
      type: 'payment_initiated',
      amount,
      currency,
      customerId,
      timestamp: new Date()
    });
    
    return paymentIntent;
  });
  
  return result;
}, { priority: 'high' });

// Handle banking events
bus.subscribe('banking.account.linked', async (event) => {
  // Process account linking
});
```

### Memory System
- Short-term context for conversation history
- Long-term memory for persistent information
- Document store for structured data
- Vector embeddings for semantic search and retrieval

```typescript
// Example: Using the memory system for financial context
import { MemorySystem } from '@bellaos/core';

const memory = new MemorySystem({
  shortTerm: {
    maxItems: 100,
    ttl: '1h'
  },
  longTerm: {
    storage: 'postgres',
    encryption: true
  },
  vectorStore: {
    provider: 'pinecone',
    dimensions: 1536,
    namespace: 'financial-data'
  }
});

// Store financial transaction in memory
await memory.store({
  type: 'transaction',
  data: {
    id: 'txn_123456',
    amount: 100.00,
    currency: 'USD',
    description: 'Monthly subscription',
    timestamp: new Date()
  },
  metadata: {
    category: 'subscription',
    recurring: true
  }
});

// Retrieve relevant financial context
const context = await memory.retrieveSimilar('What was my last subscription payment?', {
  filter: { type: 'transaction', 'metadata.category': 'subscription' },
  limit: 5
});
```

### Plugin Architecture
- Universal model support (Llama, Grok, OpenAI, Anthropic, Gemini)
- Versioning and dependency management
- Security sandbox with access controls
- Role-based multi-agent collaboration

```typescript
// Example: Creating a custom financial plugin
import { Plugin, Action, PluginManifest } from '@bellaos/core';

const manifest: PluginManifest = {
  name: 'custom-trading-plugin',
  version: '1.0.0',
  description: 'Custom trading strategies for financial agents',
  permissions: [
    'crypto.read',
    'crypto.trade',
    'banking.read'
  ],
  dependencies: [
    '@bellaos/plugin-crypto@^1.0.0'
  ]
};

class TradingStrategyPlugin extends Plugin {
  constructor() {
    super(manifest);
    
    // Register actions
    this.registerAction(new Action({
      name: 'executeStrategy',
      description: 'Execute a trading strategy',
      parameters: {
        strategy: { type: 'string', enum: ['dca', 'grid', 'momentum'] },
        asset: { type: 'string' },
        amount: { type: 'number' },
        timeframe: { type: 'string' }
      },
      handler: this.executeStrategy.bind(this)
    }));
  }
  
  async executeStrategy(params) {
    const { strategy, asset, amount, timeframe } = params;
    
    // Implementation of trading strategy
    switch (strategy) {
      case 'dca':
        return this.executeDollarCostAveraging(asset, amount, timeframe);
      case 'grid':
        return this.executeGridTrading(asset, amount, timeframe);
      case 'momentum':
        return this.executeMomentumTrading(asset, amount, timeframe);
      default:
        throw new Error(`Unknown strategy: ${strategy}`);
    }
  }
  
  // Strategy implementations
  async executeDollarCostAveraging(asset, amount, timeframe) {
    // Implementation
  }
  
  async executeGridTrading(asset, amount, timeframe) {
    // Implementation
  }
  
  async executeMomentumTrading(asset, amount, timeframe) {
    // Implementation
  }
}
```

## 💰 Financial Integration Examples

### Payment Processing with Stripe

```typescript
// Example: Processing a payment with Stripe integration
import { PaymentService } from '@bellaos/plugin-payments';

const paymentService = new PaymentService({
  provider: 'stripe',
  apiKey: process.env.STRIPE_API_KEY
});

// Create a customer
const customer = await paymentService.createCustomer({
  email: 'customer@example.com',
  name: 'John Doe',
  metadata: {
    agentId: 'financial-assistant'
  }
});

// Create a payment method
const paymentMethod = await paymentService.createPaymentMethod({
  type: 'card',
  card: {
    number: '4242424242424242',
    expMonth: 12,
    expYear: 2025,
    cvc: '123'
  },
  billingDetails: {
    name: 'John Doe',
    email: 'customer@example.com'
  }
});

// Attach payment method to customer
await paymentService.attachPaymentMethod({
  customerId: customer.id,
  paymentMethodId: paymentMethod.id
});

// Process payment
const payment = await paymentService.createPayment({
  amount: 2000, // $20.00
  currency: 'usd',
  customerId: customer.id,
  paymentMethodId: paymentMethod.id,
  description: 'Subscription payment',
  metadata: {
    orderId: 'order_123',
    productId: 'prod_456'
  }
});

console.log(`Payment processed: ${payment.id}`);
```

### Banking Integration with Plaid

```typescript
// Example: Connecting to bank accounts with Plaid
import { BankingService } from '@bellaos/plugin-banking';

const bankingService = new BankingService({
  provider: 'plaid',
  clientId: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  environment: 'sandbox' // or 'development', 'production'
});

// Create a link token for the user
const linkToken = await bankingService.createLinkToken({
  userId: 'user-123',
  clientName: 'BellaOS Financial Assistant',
  products: ['auth', 'transactions'],
  countryCodes: ['US'],
  language: 'en'
});

// Exchange public token for access token (after user completes Plaid Link flow)
const exchangeResult = await bankingService.exchangePublicToken({
  publicToken: 'public-token-from-plaid-link'
});

const { accessToken, itemId } = exchangeResult;

// Get accounts
const accounts = await bankingService.getAccounts({
  accessToken
});

// Get transactions
const transactions = await bankingService.getTransactions({
  accessToken,
  startDate: '2023-01-01',
  endDate: '2023-01-31'
});

// Initiate payment (ACH transfer)
const payment = await bankingService.initiatePayment({
  accessToken,
  accountId: accounts[0].id,
  amount: 100.00,
  description: 'Bill payment',
  recipientId: 'recipient-123'
});

console.log(`Payment initiated: ${payment.id}`);
```

### Cryptocurrency Wallet Management

```typescript
// Example: Managing cryptocurrency wallets
import { CryptoService } from '@bellaos/plugin-crypto';

const cryptoService = new CryptoService({
  networks: ['ethereum', 'solana', 'bnb-chain'],
  nodeUrls: {
    ethereum: process.env.ETHEREUM_RPC_URL,
    solana: process.env.SOLANA_RPC_URL,
    'bnb-chain': process.env.BNB_CHAIN_RPC_URL
  },
  securityLevel: 'high'
});

// Create a new wallet
const wallet = await cryptoService.createWallet({
  network: 'ethereum',
  encryptionPassword: 'secure-password',
  backupEnabled: true
});

console.log(`Wallet created: ${wallet.address}`);

// Get wallet balance
const balance = await cryptoService.getBalance({
  network: 'ethereum',
  address: wallet.address,
  tokens: ['ETH', 'USDC', 'DAI']
});

console.log(`ETH Balance: ${balance.ETH}`);
console.log(`USDC Balance: ${balance.USDC}`);

// Send transaction
const transaction = await cryptoService.sendTransaction({
  network: 'ethereum',
  fromAddress: wallet.address,
  toAddress: '0x1234567890123456789012345678901234567890',
  amount: '0.1',
  token: 'ETH',
  gasLimit: 21000,
  privateKey: wallet.decryptPrivateKey('secure-password')
});

console.log(`Transaction sent: ${transaction.hash}`);

// Get transaction history
const history = await cryptoService.getTransactionHistory({
  network: 'ethereum',
  address: wallet.address,
  startBlock: 15000000,
  endBlock: 'latest',
  limit: 50
});

console.log(`Found ${history.length} transactions`);
```

### Trading Integration

```typescript
// Example: Implementing trading functionality
import { TradingService } from '@bellaos/plugin-trading';

const tradingService = new TradingService({
  exchanges: ['binance', 'coinbase', 'kraken'],
  apiKeys: {
    binance: {
      apiKey: process.env.BINANCE_API_KEY,
      secretKey: process.env.BINANCE_SECRET_KEY
    }
  },
  dataProviders: ['coingecko', 'tradingview']
});

// Get market data
const marketData = await tradingService.getMarketData({
  symbol: 'BTC/USDT',
  timeframe: '1h',
  limit: 100
});

// Create a trading order
const order = await tradingService.createOrder({
  exchange: 'binance',
  symbol: 'BTC/USDT',
  type: 'limit',
  side: 'buy',
  amount: 0.01,
  price: 50000,
  timeInForce: 'GTC'
});

console.log(`Order created: ${order.id}`);

// Execute a trading strategy
const strategyResult = await tradingService.executeStrategy({
  name: 'grid',
  params: {
    symbol: 'ETH/USDT',
    upperLimit: 2000,
    lowerLimit: 1800,
    gridLevels: 10,
    totalInvestment: 10000
  }
});

console.log(`Strategy executed: ${strategyResult.id}`);

// Get order history
const orderHistory = await tradingService.getOrderHistory({
  exchange: 'binance',
  symbol: 'BTC/USDT',
  startTime: new Date('2023-01-01'),
  endTime: new Date(),
  limit: 50
});

console.log(`Found ${orderHistory.length} orders`);
```

## 💼 Use Cases

BellaOS targets developers building AI solutions for:

### Personal Financial Assistant

A personal financial assistant built on BellaOS can:
```typescript
// Example implementation
const personalFinanceAgent = new BellaAgent({
  name: 'Finance Assistant',
  capabilities: [
    'banking.accounts.read',
    'banking.transactions.read',
    'payments.create',
    'crypto.wallets.manage'
  ]
});

// Connect to user's financial accounts
await personalFinanceAgent.connectAccounts({
  banking: true,
  investments: true,
  crypto: true
});

// Analyze spending patterns
const spendingAnalysis = await personalFinanceAgent.analyzeSpending({
  timeframe: 'last-3-months',
  categories: ['food', 'entertainment', 'transportation']
});

// Provide budget recommendations
const budgetRecommendations = await personalFinanceAgent.createBudget({
  income: 5000,
  savingsGoal: 1000,
  existingExpenses: spendingAnalysis
});
```

### Trading Bot

A trading bot built on BellaOS can:
```typescript
// Example implementation
const tradingBot = new BellaAgent({
  name: 'Crypto Trader',
  capabilities: [
    'crypto.market.read',
    'crypto.trade.execute',
    'crypto.wallets.manage'
  ]
});

// Configure trading strategy
await tradingBot.configureStrategy({
  type: 'momentum',
  assets: ['BTC', 'ETH', 'SOL'],
  timeframe: '4h',
  riskLevel: 'medium',
  maxPositionSize: '10%'
});

// Monitor market conditions
tradingBot.on('market.opportunity', async (data) => {
  const { asset, signal, confidence } = data;
  
  if (confidence > 0.75) {
    // Execute trade based on signal
    await tradingBot.executeTrade({
      asset,
      direction: signal === 'buy' ? 'long' : 'short',
      size: calculatePositionSize(confidence)
    });
  }
});

// Start trading bot
await tradingBot.start();
```

### Business Payment Automation

A business payment system built on BellaOS can:
```typescript
// Example implementation
const paymentSystem = new BellaAgent({
  name: 'Payment Processor',
  capabilities: [
    'payments.process',
    'banking.transfers',
    'accounting.integrate'
  ]
});

// Process customer payment
async function handleCustomerPayment(paymentDetails) {
  // Validate payment information
  const validationResult = await paymentSystem.validatePayment(paymentDetails);
  
  if (validationResult.valid) {
    // Process payment
    const payment = await paymentSystem.processPayment({
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      method: paymentDetails.method,
      customerId: paymentDetails.customerId
    });
    
    // Generate receipt
    const receipt = await paymentSystem.generateReceipt(payment);
    
    // Update accounting system
    await paymentSystem.updateAccounting({
      type: 'revenue',
      amount: payment.amount,
      category: payment.metadata.category,
      date: payment.created
    });
    
    return {
      success: true,
      paymentId: payment.id,
      receipt
    };
  }
  
  return {
    success: false,
    errors: validationResult.errors
  };
}
```

## 📊 Performance Comparison

BellaOS has been benchmarked against alternative solutions to highlight its unique advantages in the financial AI space:

| Feature | BellaOS | Generic AI Platforms | Financial API Aggregators |
|---------|---------|----------------------|--------------------------|
| AI Agent Capabilities | ✅ Comprehensive | ❌ None | ⚠️ Limited |
| Payment Processing | ✅ Native Integration | ❌ Custom Integration Required | ✅ Available |
| Banking Connections | ✅ Native Integration | ❌ Custom Integration Required | ✅ Available |
| Cryptocurrency Support | ✅ Native Integration | ❌ Custom Integration Required | ⚠️ Limited |
| Trading Capabilities | ✅ Native Integration | ❌ Custom Integration Required | ⚠️ Limited |
| Security Framework | ✅ Financial-Grade | ⚠️ General Purpose | ✅ Financial-Grade |
| Compliance Features | ✅ Comprehensive | ❌ Limited | ⚠️ Varies |
| Multi-Agent Support | ✅ Native | ⚠️ Varies | ❌ Not Available |
| Extensibility | ✅ Plugin Architecture | ⚠️ Varies | ⚠️ Limited |

## 🛠️ System Requirements

### Minimum Requirements
- CPU: Dual-core processor
- RAM: 4GB
- Storage: 1GB free space
- Internet connection: Broadband (1 Mbps+)

### Software Requirements
- Python 2.7+ (3.8+ recommended)
- Node.js 23+
- pnpm
- Git

### Optional Requirements
- GPU: For running local LLM models
- Additional storage: For document storage and memory
- Higher RAM: For running multiple agents

## 📁 Project Structure

```
bella/
├── packages/
│   ├── core/           # Core BellaOS functionality
│   ├── clients/        # Client implementations
│   ├── plugin-payments/ # Payment processing plugin
│   ├── plugin-banking/ # Banking integration plugin
│   ├── plugin-crypto/  # Cryptocurrency plugin
│   └── plugin-trading/ # Trading functionality plugin
├── docs/              # Documentation
├── scripts/           # Utility scripts
└── examples/          # Example implementations
```

## 🔧 Using Your Custom Plugins

Plugins that are not in the official registry for BellaOS can be used as well. Here's how:

### Installation
1. Upload the custom plugin to the packages folder:
```
packages/
├─plugin-example/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts        # Main plugin entry
│   ├── actions/        # Custom actions
│   ├── providers/      # Data providers
│   ├── types.ts        # Type definitions
│   └── environment.ts  # Configuration
├── README.md
└── LICENSE
```

2. Add the custom plugin to your project's dependencies in the agent's package.json:
```json
{
  "dependencies": {
    "@bellaos/plugin-example": "workspace:*"
  }
}
```

3. Import the custom plugin to your agent's character.json
```json
  "plugins": [
    "@bellaos/plugin-example",
  ],
```

## 📄 License

BellaOS is licensed under the MIT License - see the LICENSE file for details.

## 📚 Citation

```bibtex
@article{walters2025bella,
  title={Bella: A Web3 friendly AI Agent Operating System},
  author={Walters, Shaw and Gao, Sam and Nerd, Shakker and Da, Feng and Williams, Warren and Meng, Ting-Chien and Han, Hunter and He, Frank and Zhang, Allen and Wu, Ming and others},
  journal={arXiv preprint arXiv:2501.06781},
  year={2025}
}
```
