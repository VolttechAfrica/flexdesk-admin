import Cookie from "js-cookie";
import { UserData } from "@type/user";


export const getCurrentUserFromCookie = (): UserData | null => {
    try {
      const user = Cookie.get("userData");
      return user ? JSON.parse(user) : null;
    } catch (err) {
      console.error("Error parsing user cookie:", err);
      return null;
    }
  };
  