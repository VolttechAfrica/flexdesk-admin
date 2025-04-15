import { UserData } from "@type/user";

export interface LoginCredentials {
    email: string;
    password: string;
  }
  
export interface ForgotPasswordCredentials {
    email: string;
  }
  
export interface ForgotPasswordResponse {
    success: boolean;
    message: string;
    token: string;
    error: string;
    data: UserData;
  }
    
export interface LoginResponse {
    token: string;
    data: UserData;
    error: string;
  }
export interface OtyVerificationCredentials {
    userId: string;
    token: string;
    otp: string;
  }
  export interface OtyVerificationResponse {
    success: boolean;
    token: string;
    userId: string;
    error: string;

  }
