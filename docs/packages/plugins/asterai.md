# @bellaos/plugin-asterai

A plugin for interacting with [asterai](https://asterai.io) plugins and agents.

## Description

This plugin provides functionality to allow Bella agents to interact with
asterai plugins and agents.

This will expand your Bella character's utility by giving it access to all
the functionality of asterai's ecosystem of marketplace and private plugins
and agents.

## Installation

```bash
pnpm install @bellaos/plugin-asterai
```

## Configuration

The plugin requires the following environment variables to be set:

```typescript
ASTERAI_AGENT_ID=
ASTERAI_PUBLIC_QUERY_KEY=
```

## Usage

### Basic Integration

```typescript
import { asteraiPlugin } from '@bellaos/plugin-asterai';
```

### Example Usage

The plugin supports natural language for interacting with the asterai agent
through your Bella character.

For example, if your asterai agent can fetch weather data:

```typescript
"Hey Bella, how's the weather in LA?"
```

Bella will then query the asterai agent to fetch the information.

## Development Guide

### Setting Up Development Environment

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Build the plugin:

```bash
pnpm run build
```

4. Run tests:

```bash
pnpm run test
```

## Contributing

Contributions are welcome! Please see the CONTRIBUTING.md file for more information.

## License

This plugin is part of the Bella project. See the main project repository for license information.

