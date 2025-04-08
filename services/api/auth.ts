import axios from "axios";
import { API_URL, MOCKARO_KEY } from "@config/constants";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserData {
  Id: string;
  email: string;
  name: string;
  organizationId: string;
  password: string;
  profilePicture: string;
  createdAt: string;
}

export interface LoginResponse {
  token: string;
  data: UserData;
  error: string;
}

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
};
