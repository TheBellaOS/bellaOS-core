# @bellaos/plugin-ferepro

A plugin for enabling WebSocket communication with FerePro API to provide AI-driven market insights within the BellaOS ecosystem.

## Description

The FerePro plugin enables real-time communication with the FerePro API through WebSocket connections, providing market analysis, cryptocurrency comparisons, and financial insights.

## Features

- Real-time WebSocket communication
- Streaming and non-streaming response support
- Market data analysis and comparisons
- Cryptocurrency insights
- Debug mode for detailed responses
- Automatic connection management
- Comprehensive error handling
- Credit tracking and management

## Installation

```bash
pnpm install @bellaos/plugin-ferepro
```

## Configuration

### Required Environment Variables

```env
# Required
Ensure that FEREAI_USER_ID and FEREAI_API_KEY are correctly set in the character secrets 
sections or as environment variables.

FEREAI_USER_ID: FereAI User ID
FEREAI_API_KEY: FereAI API key

# Optional
FereAI pro take some time to respond. Set REQUEST_TIMEOUT to avoid response timeouts 
in the character settings section or as environment variable.

REQUEST_TIMEOUT: Number of milliseconds before a request times out

```

## Usage

### Example Queries

1. Basic Market Query:

```typescript
// Get top cryptocurrencies
"What are the top 5 cryptocurrencies?";
```

2. Comparison Analysis:

```typescript
// Compare specific cryptocurrencies
"Compare Ethereum and Bitcoin for the past 6 months";
```

3. Historical Data:

```typescript
// Get historical performance
"Compare top 3 coins against Bitcoin in the last 3 months";
```

## Development

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Build the plugin:

```bash
pnpm run build
```

4. Run in development mode:

```bash
pnpm run dev
```

## API Reference

### Core Components

1. **FereProService**

    - Manages WebSocket connections
    - Handles message sending/receiving
    - Processes streaming responses
    - Tracks credits and usage

2. **Actions**
    - EXECUTE_FEREPRO: Primary action for API communication
    - Supports market queries and analysis requests
    - Handles both streaming and non-streaming responses

### Response Structure

```typescript
export interface FereAIChatResponse {
  answer: string;
  chat_id: string;
  representation: any[];
  agent_api_name: string;
  query_summary: string;
  agent_credits: number;
  credits_available: number;
}
```

## Error Handling

The plugin includes comprehensive error handling for:

- WebSocket connection issues
- Invalid message formats
- API response errors
- Credit limitation issues

## Common Issues & Troubleshooting

### Connection Issues

1. **WebSocket Connection Failures**

    - Verify your internet connection
    - Check if the FerePro API service is available
    - Ensure your FERE_USER_ID and FERE_API_KEY is valid and active

2. **Message Timeout**

    - The connection might time out for long-running queries
    - Consider setting REQUEST_TIMEOUT to avoid response timeouts in the character settings section or as environment variable.

3. **Credit Depletion**
    - Monitor credits_available in responses
    - Set up alerts for low credit situations
    - Contact FerePro support for credit top-up

### Response Parsing

1. **Invalid Response Format**

    - Check if the query is properly formatted
    - Verify the message structure matches the API requirements
    - Enable debug mode for detailed error information

2. **Missing Data**
    - Ensure the requested timeframe is valid
    - Verify the cryptocurrencies exist in the database
    - Check if you have access to the requested data tier

## Safety & Best Practices

### Security

1. **API Credentials**

    - Never expose your FEREAI_USER_ID and FEREAI_API_KEY in public repositories
    - Use environment variables or secrets sections in the character settings section for sensitive data
    - Rotate credentials periodically if possible

2. **Rate Limiting**
    - Implement appropriate delays between requests
    - Monitor credit usage to prevent unexpected depletion
    - Cache responses when appropriate

### Data Handling

1. **Response Validation**

    - Always validate response data before processing
    - Implement proper error handling for malformed data
    - Log unexpected response formats for debugging

2. **Stream Management**
    - Close WebSocket connections properly after use
    - Implement reconnection logic for dropped connections
    - Handle partial responses in streaming mode

### Best Practices

1. **Query Optimization**

    - Keep queries focused and specific
    - Use streaming for large data requests
    - Implement caching for frequently requested data

2. **Error Handling**

    - Implement comprehensive error catching
    - Log errors with appropriate context
    - Provide meaningful error messages to users

3. **Resource Management**
    - Monitor WebSocket connection status
    - Implement connection pooling for high-volume usage
    - Clean up resources properly on service shutdown

## Contributing

Contributions are welcome! Please see the CONTRIBUTING.md file for more information.

## Credits

Special thanks to:

- The Bella community for their contributions and feedback

For more information about FerePro capabilities:

- [FereAI Website](https://www.fereai.xyz/)
- [FereAI Agents Documentation](https://docs.fereai.xyz/docs/product/ai-versions)

## License

This plugin is part of the Bella project. See the main project repository for license information.
