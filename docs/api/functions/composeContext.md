[@bellaos/core v0.25.9](../index.md) / composeContext

# Function: composeContext()

> **composeContext**(`params`): `any`

Composes a context string by replacing placeholders in a template with corresponding values from the state.

This function takes a template string with placeholders in the format `{{placeholder}}` and a state object.
It replaces each placeholder with the value from the state object that matches the placeholder's name.
If a matching key is not found in the state object for a given placeholder, the placeholder is replaced with an empty string.

By default, this function uses a simple string replacement approach. However, when `templatingEngine` is set to `'handlebars'`, it uses Handlebars templating engine instead, compiling the template into a reusable function and evaluating it with the provided state object.

## Parameters

• **params**

The parameters for composing the context.

• **params.state**: [`State`](../interfaces/State.md)

The state object containing values to replace the placeholders in the template.

• **params.template**: [`TemplateType`](../type-aliases/TemplateType.md)

The template string or function containing placeholders to be replaced with state values.

• **params.templatingEngine?**: `"handlebars"`

The templating engine to use for compiling and evaluating the template (optional, default: `undefined`).

## Returns

`any`

The composed context string with placeholders replaced by corresponding state values.

## Example

```ts
// Given a state object and a template
const state = { userName: "Alice", userAge: 30 };
const template = "Hello, {{userName}}! You are {{userAge}} years old";

// Composing the context with simple string replacement will result in:
// "Hello, Alice! You are 30 years old."
const contextSimple = composeContext({ state, template });

// Using composeContext with a template function for dynamic template
const template = ({ state }) => {
const tone = Math.random() > 0.5 ? "kind" : "rude";
  return `Hello, {{userName}}! You are {{userAge}} years old. Be ${tone}`;
};
const contextSimple = composeContext({ state, template });
```

## Defined in

[packages/core/src/context.ts:37](https://github.com/bellaOS/bella/blob/main/packages/core/src/context.ts#L37)
