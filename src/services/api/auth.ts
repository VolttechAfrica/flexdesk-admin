import axios from "axios";
import { API_URL, MOCKARO_KEY } from "@config/constants";
import {
  LoginCredentials,
  ForgotPasswordCredentials,
  ForgotPasswordResponse,
  LoginResponse,
  OtpVerificationCredentials,
  OtpVerificationResponse,
  ResetPasswordCredentials,
  ResetPasswordResponse,
  RegisterCredentials,
  RegisterResponse,
} from "@type/auth";

// --- Helper to build headers ---
const getHeaders = (token?: string) => ({
  "Content-Type": "application/json",
  "X-API-Key": MOCKARO_KEY,
  ...(token && { Authorization: `Bearer ${token}` }),
});


export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/login`,
      credentials,
      { headers: getHeaders() }
    );
    return response.data;
  },

  forgotPassword: async (
    credentials: ForgotPasswordCredentials
  ): Promise<ForgotPasswordResponse> => {
    const response = await axios.post<ForgotPasswordResponse>(
      `${API_URL}/password/forgot`,
      credentials,
      { headers: getHeaders() }
    );
    return response.data;
  },

  verifyOtp: async (
    credentials: OtpVerificationCredentials
  ): Promise<OtpVerificationResponse> => {
    const response = await axios.post<OtpVerificationResponse>(
      `${API_URL}/password/otp/verify`,
      credentials,
      { headers: getHeaders(credentials.token) }
    );
    return response.data;
  },

  resetPassword: async (
    credentials: ResetPasswordCredentials
  ): Promise<ResetPasswordResponse> => {
    const { userId, token, newPassword } = credentials;
    const response = await axios.patch<ResetPasswordResponse>(
      `${API_URL}/password/reset`,
      { userId, newPassword },
      { headers: getHeaders(token) }
    );
    return response.data;
  },

  register: async (
    credentials: RegisterCredentials
  ): Promise<RegisterResponse> => {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/register`,
      credentials,
      { headers: getHeaders() }
    );
    return response.data;
  }
};
