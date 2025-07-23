# @bellaos/plugin-trikon

Trikon plugin for Bella OS that provides token transfer functionality.

## Overview

This plugin is a Proof of Concept (POC) implementation for Trikon token transfers within the Bella ecosystem. It provides basic token transfer capabilities and wallet management.

## Installation
pnpm add @bellaos/plugin-trikon

## Configuration

The plugin requires the following environment variables:

- `TRIKON_WALLET_ADDRESS`: Your Trikon wallet address (must be a valid 64-character hex string starting with '0x')
- `TRIKON_INITIAL_BALANCE`: (Optional) The initial balance for the wallet. Defaults to "0" if not provided.

## Usage

To use the plugin, you need to add it to your Bella OS project.

### Security Considerations

- Never share your wallet address or private keys
- Always validate transaction amounts
- Monitor transfer operations for suspicious activity

```typescript
import { trikonPlugin } from "@bellaos/plugin-trikon";

const bella = new BellaOS({
    plugins: [trikonPlugin],
});
```
