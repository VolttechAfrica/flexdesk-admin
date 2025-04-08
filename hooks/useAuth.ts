import { useState } from "react";
import { authService, LoginResponse } from "@services/api/auth.ts";
import { useRouter } from "next/router";

export const useAuth = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const login = async (email: string, password: string) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.login({
        email,
        password,
      });

      if (response.token) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        document.cookie = `token=${response.token}; path=/`;
        router.push("/dashboard");
        return true;
      } else {
        setError(response.error || "Login failed, email or password is wrong!");
        return false;
      }
    } catch (err) {
      setError("You are not allowed to login. Please try again");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
