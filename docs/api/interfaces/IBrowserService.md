[@bellaos/core v0.25.9](../index.md) / IBrowserService

# Interface: IBrowserService

## Extends

- [`Service`](../classes/Service.md)

## Accessors

### serviceType

#### Get Signature

> **get** **serviceType**(): [`ServiceType`](../enumerations/ServiceType.md)

##### Returns

[`ServiceType`](../enumerations/ServiceType.md)

#### Inherited from

[`Service`](../classes/Service.md).[`serviceType`](../classes/Service.md#serviceType-1)

#### Defined in

[packages/core/src/types.ts:1280](https://github.com/bellaOS/bella/blob/main/packages/core/src/types.ts#L1280)

## Methods

### initialize()

> `abstract` **initialize**(`runtime`): `Promise`\<`void`\>

Add abstract initialize method that must be implemented by derived classes

#### Parameters

• **runtime**: [`IAgentRuntime`](IAgentRuntime.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Service`](../classes/Service.md).[`initialize`](../classes/Service.md#initialize)

#### Defined in

[packages/core/src/types.ts:1285](https://github.com/bellaOS/bella/blob/main/packages/core/src/types.ts#L1285)

***

### closeBrowser()

> **closeBrowser**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/core/src/types.ts:1423](https://github.com/bellaOS/bella/blob/main/packages/core/src/types.ts#L1423)

***

### getPageContent()

> **getPageContent**(`url`, `runtime`): `Promise`\<`object`\>

#### Parameters

• **url**: `string`

• **runtime**: [`IAgentRuntime`](IAgentRuntime.md)

#### Returns

`Promise`\<`object`\>

##### title

> **title**: `string`

##### description

> **description**: `string`

##### bodyContent

> **bodyContent**: `string`

#### Defined in

[packages/core/src/types.ts:1424](https://github.com/bellaOS/bella/blob/main/packages/core/src/types.ts#L1424)
