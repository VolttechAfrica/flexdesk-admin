// services/api.ts
import axios from "axios";
import { API_URL, MOCKARO_KEY } from "@config/constants";
import {
  LoginCredentials,
  ForgotPasswordCredentials,
  ForgotPasswordResponse,
  LoginResponse,
} from "@types/auth";

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/auth/login`,
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
      `${API_URL}/auth/forgot-password`,
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
};
