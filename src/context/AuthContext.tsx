"use client"

import { createContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@services/api/auth';
import type { LoginResponse, ForgotPasswordResponse} from '@types/auth';
import type { UserData } from '@types/user';
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
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null); // Add userData state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const clearError = () => {
    setError(null);  // Clears the error state
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login({ email, password });
      setUser(res);
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
    router.push('/login');
  };

  const forgotPassword = async (email: string) => {
    setError(null);
    setMessage(null);  
    setIsLoading(true);

    try {
      const res: ForgotPasswordResponse = await authService.forgotPassword({ email });

      if (res.success) {
        setMessage(res.message);
        setUserData(res.data);
        Cookies.set("resetToken", res.token, {
          path: "/confirm-reset",
          expires: 0.01,
        });
        router.push('/confirm-reset');
      } else {
        setError(res.error || 'Failed to send reset link');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Internal Error, forgot password failed');
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
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
