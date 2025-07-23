# Plugins

Plugins (or packages) are modular extensions that enhance the capabilities of BellaOS agents. They provide a flexible way to add new functionality, integrate external services, and customize agent behavior across different platforms.

**Browse the various plugins the bella dev community made here: [Package Showcase](/showcase)**

[![](/img/plugins.png)](/showcase)
> bellaOS maintains an official package registry at [github.com/bellaos-plugins/registry](https://github.com/bellaos-plugins/registry).

---


### Installation

Bella now supports dynamic plugin loading directly from the package registry. Here's a couple ways you can add plugins on bella:

1. Add the plugin to your project's dependencies (`package.json`):

```json
{
  "dependencies": {
    "@bellaos/plugin-solana": "github:bellaos-plugins/plugin-solana",
    "@bellaos/plugin-twitter": "github:bellaos-plugins/plugin-twitter"
  }
}
```

2. Configure the plugin in your character file:

```typescript
{
  "name": "MyAgent",
  "plugins": [
    "@bellaos/plugin-twitter",
    "@bellaos/plugin-example"
  ],
  "settings": {
    "example-plugin": {
      // Plugin-specific configuration
    }
  }
}
```

3. Use the new CLI tool:

You can list available plugins, install new ones, and remove them when needed.  

Go into the bella directory you cloned and type `npx bellaos plugins` to use it.

```bash
Usage: bellaos plugins [options] [command]

manage bellaOS plugins

Options:
  -h, --help              display help for command

Commands:
  list|l [options]        list available plugins
  add|install <plugin>    add a plugin
  remove|delete <plugin>  remove a plugin
  help [command]          display help for command
```

---

## Architecture

Bella uses a unified plugin architecture where everything is a plugin - including clients, adapters, actions, evaluators, and services. This approach ensures consistent behavior and better extensibility. Here's how the architecture works:

1. **Plugin Types**: Each plugin can provide one or more of the following:
   - Clients (e.g., Discord, Twitter, WhatsApp integrations)
   - Adapters (e.g., database adapters, caching systems)
   - Actions (custom behavior and responses functionality)
   - Evaluators (analysis, learning, decision-making components)
   - Services (background processes and integrations)
   - Providers (data or functionality providers)

2. **Plugin Interface**: All plugins implement the core Plugin interface:
   ```typescript
   type Plugin = {
       name: string;
       description: string;
       config?: { [key: string]: any };
       actions?: Action[];
       providers?: Provider[];
       evaluators?: Evaluator[];
       services?: Service[];
       clients?: Client[];
       adapters?: Adapter[];
   };
   ```

3. **Independent Repositories**: Each plugin lives in its own repository under the [bellaos-plugins](https://github.com/bellaos-plugins/) organization, allowing:
   - Independent versioning and releases
   - Focused issue tracking and documentation
   - Easier maintenance and contribution
   - Separate CI/CD pipelines

4. **Plugin Structure**: Each plugin repository should follow this structure:
   ```
   plugin-name/
   ├── images/
   │   ├── logo.jpg        # Plugin branding logo
   │   ├── banner.jpg      # Plugin banner image
   ├── src/
   │   ├── index.ts        # Main plugin entry point
   │   ├── actions/        # Plugin-specific actions
   │   ├── clients/        # Client implementations
   │   ├── adapters/       # Adapter implementations
   │   └── types.ts        # Type definitions
   │   └── environment.ts  # runtime.getSetting, zod validation
   ├── package.json        # Plugin dependencies
   └── README.md          # Plugin documentation
   ```

5. **Package Configuration**: Your plugin's `package.json` must include an `agentConfig` section:
   ```json
   {
     "name": "@bellaos/plugin-example",
     "version": "1.0.0",
     "agentConfig": {
       "pluginType": "bellaos:plugin:1.0.0",
       "pluginParameters": {
         "API_KEY": {
           "type": "string",
           "description": "API key for the service"
         }
       }
     }
   }
   ```

6. **Plugin Loading**: Plugins are dynamically loaded at runtime through the `handlePluginImporting` function, which:
   - Imports the plugin module
   - Reads the plugin configuration
   - Validates plugin parameters
   - Registers the plugin's components (clients, adapters, actions, etc.)

7. **Client and Adapter Implementation**: When implementing clients or adapters:

```typescript
   // Client example
   const discordPlugin: Plugin = {
     name: "discord",
     description: "Discord client plugin",
     clients: [DiscordClientInterface]
   };

   // Adapter example
   const postgresPlugin: Plugin = {
     name: "postgres",
     description: "PostgreSQL database adapter",
     adapters: [PostgresDatabaseAdapter]
   };
   
   // Adapter example
   export const browserPlugin = {
    name: "default",
    description: "Pdf",
    services: [PdfService],
    actions: [],
  };
```

### Environment Variables and Secrets

Plugins can access environment variables and secrets in two ways:

1. **Character Configuration**: Through `agent.json.secret` or character settings:
   ```json
   {
     "name": "MyAgent",
     "settings": {
       "secrets": {
         "PLUGIN_API_KEY": "your-api-key",
         "PLUGIN_SECRET": "your-secret"
       }
     }
   }
   ```

2. **Runtime Access**: Plugins can access their configuration through the runtime:
   ```typescript
   class MyPlugin implements Plugin {
     async initialize(runtime: AgentRuntime) {
       const apiKey = runtime.getSetting("PLUGIN_API_KEY");
       const secret = runtime.getSetting("PLUGIN_SECRET");
     }
   }
   ```

The `getSetting` method follows this precedence:
1. Character settings secrets
2. Character settings
3. Global settings

---

### Pull Request Requirements

When submitting a plugin to the [bellaOS Registry](https://github.com/bellaos-plugins/registry), your PR must include:

1. **Working Demo Evidence:**
   - Screenshots or video demonstrations of the plugin working with BellaOS
   - Test results showing successful integration
   - Example agent configuration using your plugin
   - Documentation of any specific setup requirements

2. **Integration Testing:**
   - Proof of successful dynamic loading with BellaOS
   - Test cases covering main functionality
   - Error handling demonstrations
   - Performance metrics (if applicable)

3. **Configuration Examples:**
   ```json
   {
     "name": "MyAgent",
     "plugins": ["@bellaos/your-plugin"],
     "settings": {
       "your-plugin": {
         // Your plugin's configuration
       }
     }
   }
   ```

4. **Quality Checklist:**
   - [ ] Plugin follows the standard structure
   - [ ] All required branding assets are included
   - [ ] Documentation is complete and clear
   - [ ] GitHub topics are properly set
   - [ ] Tests are passing
   - [ ] Demo evidence is provided

Visit the [Bellaos Plugin Development Guide]([https://github.com/bellaos-plugins/plugin-image](https://github.com/bellaOS/bella/blob/main/docs/notes/packages/plugins.md) for detailed information on creating new plugins.

### Plugin Branding and Images

To maintain a consistent and professional appearance across the BellaOS ecosystem, we recommend including the following assets in your plugin repository:

1. **Required Images:**
   - `logo.png` (400x400px) - Your plugin's square logo
   - `banner.png` (1280x640px) - A banner image for your plugin
   - `screenshot.png` - At least one screenshot demonstrating your plugin's functionality

2. **Image Location:**
   ```
   plugin-name/
   ├── assets/
   │   ├── logo.png
   │   ├── banner.png
   │   └── screenshots/
   │       ├── screenshot1.png
   │       └── screenshot2.png
   ```
   
3. **Image Guidelines:**
   - Use clear, high-resolution images
   - Keep file sizes optimized (< 500KB for logos, < 1MB for banners)
   - [Image example](https://github.com/bellaos-plugins/client-twitter/blob/main/images/banner.jpg)
   - Include alt text for accessibility

---

## Using Your Custom Plugins
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

## FAQ

### What exactly is a plugin in BellaOS?

A plugin is a modular extension that adds new capabilities to BellaOS agents, such as API integrations, custom actions, or platform connections. Plugins allow you to expand agent functionality and share reusable components with other developers.

### When should I create a plugin versus using existing ones?

Create a plugin when you need custom functionality not available in existing plugins, want to integrate with external services, or plan to share reusable agent capabilities with the community.

### What are the main types of plugin components?

Actions handle specific tasks, Providers supply data, Evaluators analyze responses, Services run background processes, Clients manage platform connections, and Adapters handle storage solutions.

### How do I test a plugin during development?

Use the mock client with `pnpm mock-bella --characters=./characters/test.character.json` for rapid testing, then progress to platform-specific testing like web interface or Twitter integration.

### Why isn't my plugin being recognized?

Most commonly this occurs due to missing dependencies, incorrect registration in your character file, or build configuration issues. Ensure you've run `pnpm build` and properly imported the plugin.

### Can I monetize my plugin?

Yes, plugins can be monetized through the BellaOS marketplace or by offering premium features/API access, making them an effective distribution mechanism for software products.

### How do I debug plugin issues?

Enable debug logging, use the mock client for isolated testing, and check the runtime logs for detailed error messages about plugin initialization and execution.

### What's the difference between Actions and Services?

Actions handle specific agent responses or behaviors, while Services provide ongoing background functionality or external API integrations that multiple actions might use.

## Additional Resources

- [BellaOS Registry](https://github.com/bellaos-plugins/registry)
- [Example Plugins](https://github.com/bellaos-plugins)
