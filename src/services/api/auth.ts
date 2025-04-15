// services/api.ts
import axios from "axios";
import { API_URL, MOCKARO_KEY } from "@config/constants";
import {
  LoginCredentials,
  ForgotPasswordCredentials,
  ForgotPasswordResponse,
  LoginResponse,
  OtyVerificationCredentials,
  OtyVerificationResponse,
} from "@type/auth";

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": MOCKARO_KEY,
        },
      }
    );
    return response.data;
  },

  async forgotPassword(
    credentials: ForgotPasswordCredentials
  ): Promise<ForgotPasswordResponse> {
    const response = await axios.post<ForgotPasswordResponse>(
      `${API_URL}/password/forgot`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": MOCKARO_KEY,
        },
      }
    );
    return response.data;
  },

  async otyVerification(
    credentials: OtyVerificationCredentials
  ): Promise<OtyVerificationResponse> {
    const response = await axios.post<OtyVerificationResponse>(
      `${API_URL}/password/otp/verify`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": MOCKARO_KEY,
          Authorization: `Bearer ${credentials.token}`,
        },
      }
    );
    return response.data;
  },
};
