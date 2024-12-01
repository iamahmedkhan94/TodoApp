// Define a type for API error response
export interface APIError {
    response?: {
      data: string;
    };
    message: string;
  }

  export interface SessionResponse {
    isLogin: boolean;
  }