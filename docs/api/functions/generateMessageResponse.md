[@bellaos/core v0.25.9](../index.md) / generateMessageResponse

# Function: generateMessageResponse()

> **generateMessageResponse**(`opts`): `Promise`\<[`Content`](../interfaces/Content.md)\>

Send a message to the model for generateText.

## Parameters

• **opts**

The options for the generateText request.

• **opts.runtime**: [`IAgentRuntime`](../interfaces/IAgentRuntime.md)

• **opts.context**: `string`

The context of the message to be completed.

• **opts.modelClass**: [`ModelClass`](../enumerations/ModelClass.md)

## Returns

`Promise`\<[`Content`](../interfaces/Content.md)\>

The completed message.

## Defined in

[packages/core/src/generation.ts:1709](https://github.com/bellaOS/bella/blob/main/packages/core/src/generation.ts#L1709)
