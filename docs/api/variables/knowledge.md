[@bellaos/core v0.25.9](../index.md) / knowledge

# Variable: knowledge

> **knowledge**: `object`

## Type declaration

### get()

> **get**: (`runtime`, `message`) => `Promise`\<[`KnowledgeItem`](../type-aliases/KnowledgeItem.md)[]\>

#### Parameters

• **runtime**: [`AgentRuntime`](../classes/AgentRuntime.md)

• **message**: [`Memory`](../interfaces/Memory.md)

#### Returns

`Promise`\<[`KnowledgeItem`](../type-aliases/KnowledgeItem.md)[]\>

### set()

> **set**: (`runtime`, `item`, `chunkSize`, `bleed`) => `Promise`\<`void`\>

#### Parameters

• **runtime**: [`AgentRuntime`](../classes/AgentRuntime.md)

• **item**: [`KnowledgeItem`](../type-aliases/KnowledgeItem.md)

• **chunkSize**: `number` = `512`

• **bleed**: `number` = `20`

#### Returns

`Promise`\<`void`\>

### preprocess()

> **preprocess**: (`content`) => `string`

#### Parameters

• **content**: `string`

#### Returns

`string`

## Defined in

[packages/core/src/knowledge.ts:151](https://github.com/bellaOS/bella/blob/main/packages/core/src/knowledge.ts#L151)
