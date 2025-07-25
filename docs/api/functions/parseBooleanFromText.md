[@bellaos/core v0.25.9](../index.md) / parseBooleanFromText

# Function: parseBooleanFromText()

> **parseBooleanFromText**(`text`): `boolean`

Parses a string to determine its boolean equivalent.

Recognized affirmative values: "YES", "Y", "TRUE", "T", "1", "ON", "ENABLE".
Recognized negative values: "NO", "N", "FALSE", "F", "0", "OFF", "DISABLE".

## Parameters

• **text**: `string`

The input text to parse.

## Returns

`boolean`

- Returns `true` for affirmative inputs, `false` for negative inputs, and `null` for unrecognized inputs or null/undefined.

## Defined in

[packages/core/src/parsing.ts:49](https://github.com/bellaOS/bella/blob/main/packages/core/src/parsing.ts#L49)
