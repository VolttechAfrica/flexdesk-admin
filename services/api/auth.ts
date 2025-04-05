
import { API_URL } from "../../config/constants";

export interface LoginCredentials {
  userid: string;
  password: string;
}

export interface UserData {
  userId: string;
  email: string;
  name: string;
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
    const response = await fetch(`${API_URL}/api/v2/school/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    
    return response.json();
  }
};
