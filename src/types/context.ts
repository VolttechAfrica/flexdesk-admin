import { LoginResponse } from '@type/auth';
import { UserData } from '@type/user';

export interface AuthContextType {
  user: LoginResponse | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  error: string | null;
  message: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  otpVerification: (userId: string, otp: string) => Promise<void>;
  resetPassword: (userId: string, newPassword: string) => Promise<void>;
  clearError: () => void;
  clearMessage: () => void;
}