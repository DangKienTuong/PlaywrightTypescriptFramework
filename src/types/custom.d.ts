declare module 'httpntlm' {
    export interface NtlmOptions {
      username: string;
      password: string;
      domain: string;
      workstation?: string;
      url: string;
    }
  
    export interface Response {
      statusCode: number;
      headers: Record<string, string>;
    }
  
    export function get(options: NtlmOptions, callback: (err: Error, res: Response) => void): void;
  }

    