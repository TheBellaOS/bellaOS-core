import {
  messageCompletionFooter as coreMessageCompletionFooter,
  shouldRespondFooter as coreShouldRespondFooter,
  booleanFooter as coreBooleanFooter,
  parseShouldRespondFromText as coreParseShouldRespondFromText,
  stringArrayFooter as coreStringArrayFooter,
  postActionResponseFooter as corePostActionResponseFooter,
  parseJsonArrayFromText as coreParseJsonArrayFromText,
  parseJSONObjectFromText as coreParseJSONObjectFromText,
  extractAttributes as coreExtractAttributes,
  normalizeJsonString as coreNormalizeJsonString,
  cleanJsonResponse as coreCleanJsonResponse,
  parseActionResponseFromText as coreParseActionResponseFromText,
  truncateToCompleteSentence as coreTruncateToCompleteSentence,
} from '@bellaos/core';
import type { ActionResponse } from "./types.ts";

export const messageCompletionFooter = coreMessageCompletionFooter;
export const shouldRespondFooter = coreShouldRespondFooter;

export const parseShouldRespondFromText = (
    text: string
): "RESPOND" | "IGNORE" | "STOP" | null => {
  return coreParseShouldRespondFromText(text);
}

export const booleanFooter = coreBooleanFooter;

/**
 * Parses a string to determine its boolean equivalent.
 *
 * Recognized affirmative values: "YES", "Y", "TRUE", "T", "1", "ON", "ENABLE".
 * Recognized negative values: "NO", "N", "FALSE", "F", "0", "OFF", "DISABLE".
 *
 * @param {string} text - The input text to parse.
 * @returns {boolean|null} - Returns `true` for affirmative inputs, `false` for negative inputs, and `null` for unrecognized inputs or null/undefined.
 */
export const parseBooleanFromText = (text: string) => {
}

export const stringArrayFooter = coreStringArrayFooter

/**
 * Parses a JSON array from a given text. The function looks for a JSON block wrapped in triple backticks
 * with `json` language identifier, and if not found, it searches for an array pattern within the text.
 * It then attempts to parse the JSON string into a JavaScript object. If parsing is successful and the result
 * is an array, it returns the array; otherwise, it returns null.
 *
 * @param text - The input text from which to extract and parse the JSON array.
 * @returns An array parsed from the JSON string if successful; otherwise, null.
 */
export function parseJsonArrayFromText(text: string) {
  return coreParseJsonArrayFromText(text);
}

/**
 * Parses a JSON object from a given text. The function looks for a JSON block wrapped in triple backticks
 * with `json` language identifier, and if not found, it searches for an object pattern within the text.
 * It then attempts to parse the JSON string into a JavaScript object. If parsing is successful and the result
 * is an object (but not an array), it returns the object; otherwise, it tries to parse an array if the result
 * is an array, or returns null if parsing is unsuccessful or the result is neither an object nor an array.
 *
 * @param text - The input text from which to extract and parse the JSON object.
 * @returns An object parsed from the JSON string if successful; otherwise, null or the result of parsing an array.
 */
export function parseJSONObjectFromText(
    text: string
): Record<string, any> | null {
  return coreParseJSONObjectFromText(text);
}

/**
 * Extracts specific attributes (e.g., user, text, action) from a JSON-like string using regex.
 * @param response - The cleaned string response to extract attributes from.
 * @param attributesToExtract - An array of attribute names to extract.
 * @returns An object containing the extracted attributes.
 */
export function extractAttributes(
    response: string,
    attributesToExtract?: string[]
): { [key: string]: string | undefined } {
  return coreExtractAttributes(response, attributesToExtract);
}

/**
 * Normalizes a JSON-like string by correcting formatting issues:
 * - Removes extra spaces after '{' and before '}'.
 * - Wraps unquoted values in double quotes.
 * - Converts single-quoted values to double-quoted.
 * - Ensures consistency in key-value formatting.
 * - Normalizes mixed adjacent quote pairs.
 *
 * This is useful for cleaning up improperly formatted JSON strings
 * before parsing them into valid JSON.
 *
 * @param str - The JSON-like string to normalize.
 * @returns A properly formatted JSON string.
 */

export const normalizeJsonString = (str: string) => {
  return coreNormalizeJsonString(str);
}

/**
 * Cleans a JSON-like response string by removing unnecessary markers, line breaks, and extra whitespace.
 * This is useful for handling improperly formatted JSON responses from external sources.
 *
 * @param response - The raw JSON-like string response to clean.
 * @returns The cleaned string, ready for parsing or further processing.
 */

export function cleanJsonResponse(response: string): string {
  return coreCleanJsonResponse(response);
}

export const postActionResponseFooter = corePostActionResponseFooter;

export const parseActionResponseFromText = (
    text: string
): { actions: ActionResponse } => {
  return coreParseActionResponseFromText(text);
}

/**
 * Truncate text to fit within the character limit, ensuring it ends at a complete sentence.
 */
export function truncateToCompleteSentence(
    text: string,
    maxLength: number
): string {
  return coreTruncateToCompleteSentence(text, maxLength);
}