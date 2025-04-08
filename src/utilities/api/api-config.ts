// api-config.ts
import * as dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env file

export enum SensitiveKeys {
  PASSWORD = 'password',
  TOKEN = 'token',
  AUTHORIZATION = 'Authorization',
  API_KEY = 'apiKey',
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  CLIENT_SECRET = 'client_secret',
  SECRET_KEY = 'secretKey'
}

export const sensitiveKeys: SensitiveKeys[] = [
  SensitiveKeys.PASSWORD,
  SensitiveKeys.TOKEN,
  SensitiveKeys.AUTHORIZATION,
  SensitiveKeys.API_KEY,
  SensitiveKeys.ACCESS_TOKEN,
  SensitiveKeys.REFRESH_TOKEN,
  SensitiveKeys.CLIENT_SECRET,
  SensitiveKeys.SECRET_KEY
];

export interface ApiConfigOptions {
  sensitiveKeys: SensitiveKeys[];
  logRequests: boolean;
  logResponses: boolean;
  baseURL: string;
};

// Default configuration without hardcoded fallback for baseURL
export const defaultApiConfigOptions: ApiConfigOptions = {
  sensitiveKeys,
  logRequests: true,
  logResponses: true,
  baseURL: '',  // Will be dynamically assigned from env or passed at runtime
};

export class ConfigHelper {
  private options: ApiConfigOptions;

  constructor(customOptions?: Partial<ApiConfigOptions>) {
    // Check if baseURL is set in the environment variables
    const envBaseURL = process.env.API_BASE_URL?.trim();

    if (envBaseURL) {
      // Set baseURL from environment variable
      this.options = {
        ...defaultApiConfigOptions,
        baseURL: envBaseURL,
        ...customOptions,  // Allow overrides from customConfig passed during instantiation
      };
    } else {
      // Throw an error if baseURL is not provided in env
      throw new Error('API_BASE_URL environment variable is required but not set.');
    }
  }

  // Method to get the baseURL from the configuration
  getBaseUrl(): string {
    return this.options.baseURL;
  }
  
  getConfig(): ApiConfigOptions {
    return this.options;
  }
  
  /**
 * Utility function to mask sensitive data in headers, request body, or response body.
 * This will replace any value associated with sensitive keys with '***'.
 * @param obj - The object to check for sensitive data (could be headers, body, etc.).
 * @param sensitiveKeys - An array of sensitive keys to look for in the object.
 * @returns A new object where sensitive data is masked.
 */
  maskSensitiveData = (obj: Record<string, any>): Record<string, any> => {
    const maskedObj: Record<string, any> = {};
  
    for (const [key, value] of Object.entries(obj)) {
      // If the key matches any of the sensitive keys (e.g., password, token), mask it.
      if (sensitiveKeys.some(sensitiveKey => key.toLowerCase().includes(sensitiveKey.toLowerCase()))) {
        maskedObj[key] = '*****'; 
      } else {
        maskedObj[key] = value; 
      }
    }
    return maskedObj;
  };
};
