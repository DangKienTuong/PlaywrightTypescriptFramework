import { logger } from '@utilities/reporter/custom-logger';

export class ErrorHandler {
  
  /**
 * Checks whether a value is not empty (i.e., not null, undefined, or an empty string).
 * If the value is empty, it throws an error with a custom message indicating the specific field.
 * @param value - The value to check for being non-empty. It could be of any type.
 * @param name - The name of the field or variable being validated. This is used in the error message if the validation fails.
 * @throws {Error} Throws an error if the value is null, undefined, or an empty string.
 */
checkNotEmpty(value: any, name: string): void {
    // Check if the value is null, undefined, or an empty string
    if (value === null || value === undefined || value === '') {
      // Throw an error if the value is empty
      throw new Error(`${name} must not be null, undefined, or empty.`);
    }
  };
  
  /**
   * Handles errors by logging the error message and rethrowing it.
   * This method is useful for centralizing error handling logic and ensuring consistent logging of errors.
   * If the error is an instance of the built-in `Error` object, its message is logged.
   * If the error is of unknown type, a generic message is logged instead.
   * @param error - The error object that was thrown. This is expected to be of `unknown` type.
   * @param customMessage - A custom message that provides context about where the error occurred.
   * This message is prefixed to the logged error message.
   * @throws {unknown} Rethrows the error after logging it for further handling upstream.
   */
  handleError(error: unknown, customMessage: string): void {
    // Check if the error is an instance of the Error class
    if (error instanceof Error) {
      // Log the error message from the error object if it's an instance of Error
      logger.error(`${customMessage}: ${error.message}`);
    } else {
      // Log a generic error message if the error is not an instance of Error
      logger.error(`${customMessage}: Unknown error occurred`);
    }
  
    // Rethrow the error so that it can be handled upstream
    throw error;
  };
  
}
