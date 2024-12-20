import { API_AUTH_REGISTER, API_AUTH_LOGIN } from "../constants.js";
import { headers } from "../utils/headers.js";
import { User } from "./user.js";

export class Auth {
  static async register({ name, email, password }) {
    try {
      const response = await fetch(API_AUTH_REGISTER, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Registration failed: ${error.errors[0].message}`);
      }

      const userData = await response.json();
      return new User(
        userData.data.name,
        userData.data.email,
        userData.data.avatar
      );
    } catch (error) {
      console.error("Error during registration:", error.message);
      throw error;
    }
  }

  static async login({ email, password }) {
    try {
      const response = await fetch(API_AUTH_LOGIN, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Login failed: ${error.errors[0].message}`);
      }

      const { data } = await response.json();
      const { accessToken: token, ...user } = data;
      return new User(
        user.name,
        user.email,
        user.avatar.url,
        user.avatar.alt,
        user.credits,
        token
      );
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  }

  static logout() {
    localStorage.clear();
  }
}
