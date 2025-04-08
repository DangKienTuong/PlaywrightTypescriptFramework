export function generateRandomString(length: number): string {
  let randomString = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charsLength = chars.length;
  let counter = 0;
  while (counter < length) {
    randomString += chars.charAt(Math.floor(Math.random() * charsLength));
    counter += 1;
  }
  return randomString;
};

/**
 * Converts a given string to camelCase by making the first letter lowercase.
 * @param prop - The string to be converted to camelCase.
 * @returns A string where the first character is lowercase and the rest remains unchanged.
 */
export function camelCase(prop: string): string {
  return prop[0].toLowerCase() + prop.slice(1);
};

type TYesOrNo = 'Y' | 'N';

/**
 * Converts a string 'Y' or 'N' to a boolean value (true for 'Y' and false for 'N').
 * @param yesOrNo - A string that is either 'Y' or 'N'.
 * @returns A boolean value: true if 'Y', false if 'N'.
 */
export function conversionYNStringToBoolean(yesOrNo: TYesOrNo): boolean {
  return yesOrNo === 'Y';
};

/**
 * Converts a number to 0.0 if it's null or undefined, otherwise returns the original number.
 * @param amount - The number to check.
 * @returns 0.0 if amount is null or undefined, otherwise the original number.
 */
export function convertNullAmountAsZero(amount: number | null | undefined): number {
  return amount ?? 0.0;
};

/**
 * Trims the given string if it is not 'null' (case-insensitive) or empty.
 * If the string is 'null' or null, it returns an empty string.
 * @param str - The string to trim.
 * @returns A trimmed string if valid, an empty string if the string is 'null' or null, or null if input is null.
 */
export function trimNullable(str: string | null): string | null {
  if (!str || str.toLowerCase().trim() === 'null') return '';
  return str.trim();
};

/**
 * Converts a given string (or null/undefined) to its Base64-encoded string representation.
 * If the input is null or undefined, returns null.
 * 
 * @param input - The string to be encoded into Base64. It can be null or undefined.
 * @returns The Base64-encoded string, or null if the input is null or undefined.
 */
export function encryptToBase64(input: string | null | undefined): string | null {
  // Check if the input is null or undefined and return null if so
  if (input === null || input === undefined) {
    return null;
  }

  // Convert the input string to a Uint8Array using TextEncoder
  const encodedInput = new TextEncoder().encode(input); // Converts string to a byte array (Uint8Array)

  // Encode the byte array to Base64 using btoa after converting it to a string
  const base64String = btoa(String.fromCharCode(...encodedInput)); // Encodes byte array into Base64 string

  // Return the Base64-encoded string
  return base64String;
};

/**
   * Decrypts a Base64-encoded string and returns the decoded UTF-8 string.
   *
   * @param base64String - The Base64-encoded string that needs to be decrypted.
   *   - Can be null or undefined, in which case an error is thrown.
   *   - Should be a valid Base64 string for successful decryption.
   * 
   * @returns {string} - The decrypted UTF-8 string.
   * 
   * @throws {Error} - If the input is null/undefined or the decryption fails.
   */
export function decryptFromBase64(base64String: string | null | undefined): string {
  if (base64String === null || base64String === undefined) {
    throw new Error('Base64 string cannot be null or undefined.');
  }

  const decodedString = atob(base64String); 

  const decodedBytes = new Uint8Array(decodedString.length);
  for (let i = 0; i < decodedString.length; i++) {
    decodedBytes[i] = decodedString.charCodeAt(i); 
  }

  const textDecoder = new TextDecoder();
  const decodedResult = textDecoder.decode(decodedBytes); 

  if (!decodedResult) {
    throw new Error('Decrypted string is empty.');
  }

  return decodedResult; 
};

/**
 * Truncates a string to a specified length and adds "..." if it exceeds the maximum length.
 * 
 * @param valueString - The string to truncate.
 * @param maxChars - The maximum allowed number of characters.
 * @returns The truncated string with "..." appended if it exceeds the max length.
 */
export function truncateStringForDisplay(valueString: string, maxChars: number): string {
  if (!valueString) {
    return '';
  }

  return valueString.length <= maxChars ? valueString : `${valueString.slice(0, maxChars)}...`;
};
