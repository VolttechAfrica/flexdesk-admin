'use client';

import { createContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { authService } from '@services/api/auth';
import { LoginResponse, ForgotPasswordResponse, OtpVerificationResponse, RegisterCredentials, RegisterResponse } from '@type/auth';
import { UserData } from '@type/user';
import { AuthContextType } from '@type/context';



export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);


  const router = useRouter();

  // Utility functions
  const clearError = () => setError(null);
  const clearMessage = () => setMessage(null);


  // Auth Actions
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authService.login({ email, password });
      setUser(res);
      Cookies.set('login_token', res.token);
      Cookies.set('loginUser', JSON.stringify(res.data));
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
    Cookies.remove('login_token');
    Cookies.remove('loginUser');
    router.replace('/login');
    return true;
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      if (!email) throw new Error('Email is required');
      const res: ForgotPasswordResponse = await authService.forgotPassword({ email });

      if (res.success) {
        setUserData(res.data);
        Cookies.set('resetToken', res.token, { expires: 0.01 });
        localStorage.setItem('userData', JSON.stringify(res.data));
        // setMessage(res.message || 'Reset token sent to your email');
        clearMessage();
        clearError();
        router.push('/verification-code');
      } else {
        throw new Error(res.error || 'Failed to send reset token');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Internal Error');
    } finally {
      setIsLoading(false);
    }
  };

  const otpVerification = async (userId: string, otp: string) => {
    setIsLoading(true);
    try {
      if (!otp || !userId) throw new Error('Missing required fields');
      const token = Cookies.get('resetToken');
      if (!token) throw new Error('Session expired, please try again');

      const res: OtpVerificationResponse = await authService.verifyOtp({ userId, otp, token });

      if (res.success) {
        Cookies.set('resetToken', res.token, { expires: 0.01 });
        localStorage.removeItem('verification_expiry_start');
        localStorage.removeItem('countdown_start_time');
        clearMessage();
        clearError();
        router.replace('/changepassword');
      } else {
        throw new Error(res.error || 'OTP verification failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Internal Error');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (userId: string, newPassword: string) => {
    setIsLoading(true);
    try {
      const token = Cookies.get('resetToken');
      if (!token) throw new Error('Invalid or expired token');
      if (!userId || !newPassword) throw new Error('Missing required fields');

      const res = await authService.resetPassword({ userId, newPassword, token });

      if (res.success) {
        setUser(null);
        setUserData(null);
        setMessage(res.message || 'Password reset successfully, proceed to login');
        clearError();
        localStorage.removeItem('verification_expiry_start');
        localStorage.removeItem('countdown_start_time');
        localStorage.removeItem('userData');
        setTimeout(() => {
          setMessage(null);
          Cookies.remove('resetToken');
          router.replace('/login');
        }, 2000);
      } else {
        throw new Error(res.error || 'Password reset failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Internal Error');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const res: RegisterResponse = await authService.register(data);

      if (res.success) {
        setMessage(res.message || 'Registration successful, proceed to login');
        clearError();
        setTimeout(() => {
          setMessage(null);
          router.push('/login');
        }, 2000);
      } else {
        throw new Error(res.error || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Internal Error');
    } finally {
      setIsLoading(false);
    }


  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        isAuthenticated: !!user,
        isLoading,
        isDisabled,
        error,
        message,
        login,
        logout,
        forgotPassword,
        otpVerification,
        resetPassword,
        register,
        clearError,
        clearMessage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
