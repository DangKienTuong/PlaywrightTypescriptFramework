import { AuthenticationType } from './authentication-types';
import { logger } from '@utilities/reporter/custom-logger';
import { ErrorHandler } from '@utilities/reporter/error-handler';
import { decryptFromBase64 } from '@utilities/common/string-utils';

const errorHandler: ErrorHandler = new ErrorHandler();

/**
 * A helper class to manage different types of authentication and handle proxy settings.
 * Supports NTLM, Basic, and Bearer authentication methods with optional proxy configurations.
 */
export class Authenticator {
  /**
   * Authenticates the provided request using the specified authentication type.
   * 
   * @param authType - The type of authentication (NTLM, Basic, Bearer, etc.).
   * @param user - The username for authentication (if required).
   * @param password - The password for authentication (if required).
   * @param domain - The domain for NTLM authentication (if applicable).
   * @param baseUrl - The base URL of the API for NTLM authentication.
   * @returns {Promise<string>} - Returns the authentication token (or value) to be used in the Authorization header.
   */
  public async authenticate(
    authType: AuthenticationType,
    user: string = '',
    password: string = ''
  ): Promise<string> {
    try {
      const decryptedPassword = password ? decryptFromBase64(password) : '';
      switch (authType) {
        case AuthenticationType.Basic:
          return this.basicAuthenticate(user, decryptedPassword);
        case AuthenticationType.Bearer:
          return this.bearerAuthenticate(user); // Assuming Bearer authentication can use user as the token.
        default:
          throw errorHandler.handleError(new Error('Unsupported authentication type'), 'Failed to authenticate');
      }
    } catch (error: unknown) {
      throw errorHandler.handleError(error, 'Failed to authenticate');
    }
  };

  /**
   * Performs Basic authentication and returns the authorization header.
   * 
   * @param user - The username for Basic authentication.
   * @param password - The password for Basic authentication.
   * @returns {string} - Basic authentication token to be used in the Authorization header.
   */
  private basicAuthenticate(user: string, password: string): string {
    const encodedCredentials = Buffer.from(`${user}:${password}`).toString('base64');
    const authHeader = `Basic ${encodedCredentials}`;
    logger.info('Basic authentication applied successfully.');
    return authHeader;
  };

  /**
   * Performs Bearer authentication and returns the authorization header.
   * 
   * @param token - The Bearer token (usually provided).
   * @returns {string} - Bearer authentication token to be used in the Authorization header.
   */
  private bearerAuthenticate(token: string): string {
    const authHeader = `Bearer ${token}`;
    logger.info('Bearer authentication applied successfully.');
    return authHeader;
  };
}
