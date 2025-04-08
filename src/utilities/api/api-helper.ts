import { APIResponse, APIRequestContext, request } from 'playwright';
import { logger } from '@utilities/reporter/custom-logger';
import { ApiConfigOptions, ConfigHelper, defaultApiConfigOptions } from './api-config';
import { ErrorHandler } from '@utilities/reporter/error-handler';
import { ContentType } from './content-types';

let apiContext: APIRequestContext | null = null;
const errorHandler = new ErrorHandler();

export  interface ApiConfigContext {
  apiConfigOptions: ApiConfigOptions;
  apiConfig: ConfigHelper;
};

/**
* Enum for HTTP methods to ensure type safety.
*/
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
};

/**
* Interface for API request options.
*/
export interface RequestOptions {
  endpoint: string;
  method: HttpMethod;
  body?: Record<string, any>;
  headers?: Record<string, string>;
};

export type QueryParams = Record<string, string>;

/**
 * Initializes the Playwright API request context.
 * @param baseURL - The base URL for API requests.
 * @param headers - Default headers (e.g., authentication).
 */
export async function createtApiContext(baseURL: string, headers: Record<string, string> = {}): Promise<void> {
    apiContext = await request.newContext({
      baseURL,
      extraHTTPHeaders: addHeaders(headers),
    });
  };

/**
 * Retrieves the current API context.
 * Throws an error if context is not set.
 */
export function getApiContext(): APIRequestContext {
    if (!apiContext) {
        throw errorHandler.handleError(new Error('API context is not initialized'), 'createApiContext() must be called first to initialize api context');
    }
    return apiContext;
};

/**
 * Makes an API request using Playwright.
 * @param options - Request options including method, endpoint, body, and headers.
 * @returns The Playwright APIResponse object.
 */
export async function apiRequest(options: RequestOptions): Promise<APIResponse> {
  const { method, endpoint, body, headers } = options;
  const context = getApiContext();

  // Apply additional headers
  const updatedHeaders = addHeaders(headers || {});

  // Log the request details
  logRequest(method, endpoint, body, updatedHeaders);

  // Make the actual API request
  const response = await context.fetch(endpoint, {
    method,
    headers: updatedHeaders,
    data: body ? JSON.stringify(body) : undefined,
  });

  // Log the response details
  await logResponse(response); 
  
  return response;
}
;

  /**
 * Adds additional headers to an API request context.
 * @param headers - Collection of paired header names and values.
 * @returns The updated headers.
 */
export function addHeaders(headers: Record<string, string>): Record<string, string> {
    try {
      logger.info(`Adding headers: ${JSON.stringify(headers)}`);
      return headers; // Simply return the new headers for use in requests
    } catch (error) {
      logger.error('Failed to add headers.', error);
      throw new Error('Failed to add headers.');
    }
  };

  /**
 * Adds a list of query parameters to a URL.
 * @param url - The base URL.
 * @param parameters - Collection of query parameters.
 * @returns The updated URL with query parameters.
 */
export function addListQueryParameters(url: string, parameters: QueryParams[]): string {
    try {
      if (!parameters || parameters.length === 0) return url;
  
      const queryParams = parameters.map(param => `${encodeURIComponent(Object.keys(param)[0])}=${encodeURIComponent(Object.values(param)[0])}`);
      const queryString = queryParams.join('&');
  
      const updatedUrl = url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
      logger.info(`Added query parameters: ${queryString}`);
      return updatedUrl;
    } catch (error) {
      throw errorHandler.handleError(error, 'Failed to add query parameters.');
    }
  };
  
  /**
   * Adds a single query parameter to a URL.
   * @param url - The base URL.
   * @param key - The name of the query parameter.
   * @param value - The value of the query parameter.
   * @returns The updated URL with the query parameter.
   */
  export function addQueryParameter(url: string, key: string, value: string): string {
    try {
      if (!key || !value) return url;
  
      const updatedUrl = url.includes('?') ? `${url}&${encodeURIComponent(key)}=${encodeURIComponent(value)}` : `${url}?${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      logger.info(`Added query parameter: ${key}=${value}`);
      return updatedUrl;
    } catch (error) {
      throw errorHandler.handleError(error, 'Failed to add query parameter.');
    }
  };
  
  /**
   * Prepares the request body based on the specified content type.
   * @param bodyValue - The body content.
   * @param contentType - The content type.
   * @returns The formatted body based on content type.
   */
  export function prepareBody(bodyValue: any, contentType: ContentType): any {
    try {
      switch (contentType) {
        case ContentType.APPLICATION_JSON:
          return JSON.stringify(bodyValue);
        case ContentType.APPLICATION_FORM_URLENCODED:
          return new URLSearchParams(bodyValue).toString();
        default:
          return bodyValue;
      }
    } catch (error) {
      throw errorHandler.handleError(error, 'Failed to prepare request body.');
    }
  };
  
  /**
   * Adds the request body and sets the content type header.
   * @param bodyValue - The body content.
   * @param contentType - The content type (default: application/json).
   * @returns An object containing the formatted body and headers.
   */
  export function addRequestBody(
    bodyValue: any,
    contentType: ContentType = ContentType.APPLICATION_JSON
  ): { body: any; headers: Record<string, string> } {
    try {
      if (!bodyValue) {
        throw errorHandler.handleError(new Error('Body content is NULL or Empty'), 'Request body cannot be empty.');
      }
  
      const formattedBody = prepareBody(bodyValue, contentType);
      const headers: Record<string, string> = { 'Content-Type': contentType as string }; // Explicitly cast to string
  
      logger.info(`Added request body with Content-Type: ${contentType}`);
      return { body: formattedBody, headers };
    } catch (error) {
      throw errorHandler.handleError(error, 'Failed to add request body.');
    }
  };

  /**
 * Adds a URL segment to the base URL.
 * @param baseUrl - The base URL.
 * @param segment - The URL segment to append (e.g., `posts/1`).
 * @returns The updated URL with the added segment.
 */
export function addUrlSegment(baseUrl: string, segment: string): string {
    try {
      // Remove leading slashes from the segment and append it to the base URL
      const formattedSegment = segment.replace(/^\/+/, '');
      const updatedUrl = `${baseUrl}/${formattedSegment}`;
      
      logger.info(`Added URL segment: ${formattedSegment} to base URL: ${baseUrl}`);
      return updatedUrl;
    } catch (error) {
      throw errorHandler.handleError(error, 'Failed to add URL segment.');
    }
  };

/**
 * Initializes the API helper context with necessary configurations.
 * @param options - API configuration options.
 * @returns Initialized API helper context.
 */
export function initializeApiHelper(options: ApiConfigOptions = defaultApiConfigOptions): ApiConfigContext {
    return {
        apiConfigOptions: options,
        apiConfig: new ConfigHelper(options)
    };
};

/**
 * Logs the details of an API request.
 * @param method - HTTP method (e.g., GET, POST).
 * @param url - API request URL.
 * @param body - Optional request body.
 * @param headers - Optional request headers.
 * @param context - Optional The API helper context.
 */
export function logRequest(
    method: string,
    url: string,
    body?: Record<string, any>,
    headers?: Record<string, string>,
    context?: ApiConfigContext
): void {
    if(!context){
        context = initializeApiHelper();
    }
    if (context.apiConfigOptions.logRequests) {
        logger.info(`Request Method: ${method}`);
        logger.info(`Request URL: ${url}`);

        if (body) {
            logger.info(`Request Body: ${JSON.stringify(context.apiConfig.maskSensitiveData(body), null, 2)}`);
        }

        if (headers) {
            logger.info(`Request Headers: ${JSON.stringify(context.apiConfig.maskSensitiveData(headers), null, 2)}`);
        }
    }
};

/**
 * Logs the details of an API response.
 * @param response - The API response object.
 * @param context - Optional The API helper context.
 */
export async function logResponse(response: APIResponse, context?: ApiConfigContext): Promise<void> {
    if(!context){
        context = initializeApiHelper();
    }
    if (context.apiConfigOptions.logResponses) {
        logger.info(`Response Status: ${response.status()}`);
        logger.info(`Response Headers: ${JSON.stringify(context.apiConfig.maskSensitiveData(response.headers()), null, 2)}`);

        try {
            const body = await response.body();
            logger.info(`Response Body: ${JSON.stringify(context.apiConfig.maskSensitiveData(body), null, 2)}`);
        } catch (error) {
            logger.error(`Error retrieving response body: ${error}`);
        }
    }
};