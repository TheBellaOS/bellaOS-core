[@bellaos/core v0.25.9](../index.md) / findNearestEnvFile

# Function: findNearestEnvFile()

> **findNearestEnvFile**(`startDir`?): `any`

Recursively searches for a .env file starting from the current directory
and moving up through parent directories (Node.js only)

## Parameters

• **startDir?**: `any` = `...`

Starting directory for the search

## Returns

`any`

Path to the nearest .env file or null if not found

## Defined in

[packages/core/src/settings.ts:47](https://github.com/bellaOS/bella/blob/main/packages/core/src/settings.ts#L47)
