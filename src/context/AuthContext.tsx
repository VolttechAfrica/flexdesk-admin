"use client"

import { createContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@services/api/auth';
import { LoginResponse, ForgotPasswordResponse, OtyVerificationResponse} from '@type/auth';
import { UserData } from '@type/user';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  message: string | null;
  isLoading: boolean;
  forgotPassword: (email: string) => Promise<void>;
  userData: UserData | null;
  clearError: () => void;
  otyVerification: (email: string, otp: string) => Promise<void>;
  isChangePasswordAuthenticated: boolean;
  clearMessage: () => void;
  revokeIsChangePasswordAuthenticated: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isChangePasswordAuthenticated, setIsChangePasswordAuthenticated] = useState(false);
  const router = useRouter();

  const clearError = () => {
    setError(null);
  };

  const clearMessage = () => {
    setMessage(null);
  };
  const revokeIsChangePasswordAuthenticated = () => {
    setIsChangePasswordAuthenticated(false);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login({ email, password });
      setUser(res);
      clearError();
      clearMessage();
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Internal Error, Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setUserData(null);
    router.replace('/login');
  };

  const forgotPassword = async (email: string) => {
    setError(null);
    setMessage(null);  
    setIsLoading(true);

    try {

      if(!email) throw new Error('Email is required');

      const res: ForgotPasswordResponse = await authService.forgotPassword({ email });

      if (res.success) {

        setMessage(res.message || 'Reset token sent to your email');
        setUserData(res.data);
        localStorage.setItem('userData', JSON.stringify(res.data));
        Cookies.set("resetToken", res.token, {
          expires: 0.01,
        });

        clearError();
        clearMessage();

        router.push('/verification-code');
      } else {
        setError(res.error || 'Failed to send reset token');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Internal Error, unable to complete request');
    } finally {
      setIsLoading(false);
    }
  };

  const otyVerification = async (userId: string, otp: string) => {
    setError(null);
    setMessage(null);
    setIsLoading(true);

    try {
      if(!otp) throw new Error('a valid OTP is required');
      if(!userId) throw new Error('Invalid user, please try again or contact support');
      if(!Cookies.get("resetToken")) throw new Error('Session expired, please try again');

      const res: OtyVerificationResponse = await authService.otyVerification({ userId, otp, token: Cookies.get("resetToken") || '' });

      if (res.success) {
        
        setIsChangePasswordAuthenticated(true);
        setMessage('Verification successful');
        setIsLoading(false);
        Cookies.set("resetToken", res.token, {
          expires: 0.01,
        });
        clearError();
        clearMessage();
        localStorage.removeItem('verification_expiry_start');
        localStorage.removeItem('countdown_start_time');

        router.replace('/change-password');
      } else {
        setError(res.error || 'Failed to verify OTP');
      }
    } catch (err: any) {
      setError(err.response?.message?.err.message || 'Internal Error, OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        isAuthenticated: !!user,
        login,
        logout,
        error,
        message,
        forgotPassword,
        isLoading,
        clearError,
        isChangePasswordAuthenticated,
        otyVerification,
        clearMessage,
        revokeIsChangePasswordAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
